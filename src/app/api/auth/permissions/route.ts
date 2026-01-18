import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth, UserPayload } from '@/utils/apiAuthMiddleware';

// We import the mock function/db from middleware for consistency in this demo.
// In a real app, this might come from a shared service/lib.
// Since we didn't export the mock DB from middleware, we will simulate the "Source of Truth" behavior
// by returning the data we already attached to the 'user' object if we had attached it,
// OR by re-fetching it. Ideally, middleware attaches it to `user.permissions` if feasible,
// but typed strictly usually passing just the payload.

// Let's assume we re-calculate or fetch permissions here based on roles in payload.

const MOCK_PERMISSIONS: Record<string, string[]> = {
    'admin-role': ['f_view', 'f_edit', 'f_noti_inapp'],
    'user-role': ['f_view', 'f_noti_inapp'],
    'guest-role': [],
};

function getPermissionsForRoles(roles: string[]): string[] {
    const permissions = new Set<string>();
    roles.forEach(role => {
        const rolePerms = MOCK_PERMISSIONS[role] || [];
        rolePerms.forEach(p => permissions.add(p));
    });
    return Array.from(permissions);
}

async function handler(req: NextRequest, _context: { params: Record<string, string | string[]> }, user: UserPayload) {
    // This endpoint acts as the Source of Truth for the frontend
    const permissions = getPermissionsForRoles(user.roles || []);

    return NextResponse.json({
        user: {
            id: user.sub,
            email: user.email,
            roles: user.roles
        },
        permissions: permissions
    });
}

export const GET = withAuth(handler);
