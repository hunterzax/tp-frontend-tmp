import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth, UserPayload } from '@/utils/apiAuthMiddleware';

const UPSTREAM_URL = 'https://api.upstream.com'; // Mock upstream
const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://myapp.com'];

async function handler(req: NextRequest, _context: { params: Record<string, string | string[]> }, user: UserPayload) {
    // CORS Check
    const origin = req.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.json({ error: 'CORS policy violation' }, { status: 403 });
    }

    // SSRF Protection: Validate URL (Mocking validation here since URL is hardcoded base)
    if (!UPSTREAM_URL.startsWith('https://')) {
        return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
    }

    try {
        // Inject Server-Side Secrets (Never exposed to client)
        const secureHeaders = {
            'Authorization': `Bearer ${process.env.UPSTREAM_ACCESS_TOKEN || 'secure-upstream-token'}`,
            'x-jwt-token': process.env.UPSTREAM_JWT_TOKEN || 'server-signed-jwt',
            'Content-Type': 'application/json',
        };

        // Forward the request to the upstream
        // Note: In a real app we might forward query params as well
        const response = await fetch(`${UPSTREAM_URL}/data`, {
            method: 'GET',
            headers: secureHeaders,
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Upstream Error' }, { status: response.status });
        }

        const data = await response.json();

        const res = NextResponse.json(data);

        // Set CORS headers on response if needed for browser clients
        if (origin && ALLOWED_ORIGINS.includes(origin)) {
            res.headers.set('Access-Control-Allow-Origin', origin);
            res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        }

        return res;

    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Proxy Failed' }, { status: 502 });
    }
}

export const GET = withAuth(handler, { requiredPermission: 'f_view' });

// Handle OPTIONS for CORS Preflight
export async function OPTIONS(req: NextRequest) {
    const origin = req.headers.get('origin');
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Authorization, Content-Type',
            },
        });
    }
    return new NextResponse(null, { status: 204 });
}
