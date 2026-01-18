import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// Mock secret for JWT verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-change-me');

interface AuthConfig {
    requiredPermission?: string;
    allowPublic?: boolean;
}

export interface UserPayload {
    sub: string;
    email: string;
    roles: string[];
}

type AuthenticatedHandler = (
    req: NextRequest,
    context: { params: Record<string, string | string[]> },
    user: UserPayload
) => Promise<NextResponse> | NextResponse;

// Mock Permissions Database
const MOCK_PERMISSIONS: Record<string, string[]> = {
    'admin-role': ['f_view', 'f_edit', 'f_noti_inapp'],
    'user-role': ['f_view', 'f_noti_inapp'],
    'guest-role': [],
};

async function verifyToken(token: string): Promise<UserPayload | null> {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        return payload as unknown as UserPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

async function getUserPermissions(roles: string[]): Promise<string[]> {
    // Simulate DB call
    const permissions = new Set<string>();
    roles.forEach(role => {
        const rolePerms = MOCK_PERMISSIONS[role] || [];
        rolePerms.forEach(p => permissions.add(p));
    });
    return Array.from(permissions);
}

export function withAuth(handler: AuthenticatedHandler, config: AuthConfig = {}) {
    return async (req: NextRequest, context: { params: Promise<any> | any }) => {

        let userId = 'anonymous';

        try {
            if (config.allowPublic) {
                return await handler(req, context, null as any);
            }

            // 1. Token Extraction
            let token = req.headers.get('authorization')?.replace('Bearer ', '');
            if (!token) {
                token = req.cookies.get('v4r2d9z5m3h0c1p0x7l')?.value;
            }

            if (!token) {
                const ip = req.headers.get('x-forwarded-for') || 'unknown';
                console.warn(`[Audit] 401 Unauthorized - No Token - IP: ${ip}`);
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            // 2. Validation
            const user = await verifyToken(token);
            if (!user) {
                const ip = req.headers.get('x-forwarded-for') || 'unknown';
                console.warn(`[Audit] 401 Unauthorized - Invalid Token - IP: ${ip}`);
                return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
            }
            userId = user.sub;

            // 3. Permission Fetching
            const permissions = await getUserPermissions(user.roles || []);

            // 4. Authorization
            if (config.requiredPermission && !permissions.includes(config.requiredPermission)) {
                console.warn(`[Audit] 403 Forbidden - Missing Permission: ${config.requiredPermission} - User: ${userId}`);
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }

            // 5. Audit Log (Success)
            console.log(`[Audit] Access Granted - User: ${userId} - Endpoint: ${req.nextUrl.pathname}`);

            return await handler(req, context, user);

        } catch (err) {
            console.error('[Middleware Error]', err);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    };
}
