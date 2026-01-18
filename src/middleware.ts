import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'th'];
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1. Skip public files
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    // 2. Locale Detection
    let locale = DEFAULT_LOCALE;
    const pathLocale = SUPPORTED_LOCALES.find(l => pathname.startsWith(`/${l}`));
    if (pathLocale) {
        locale = pathLocale;
    } else {
        // If no locale in path, redirect to default
        // Note: In real app, check cookies or headers
        console.log('[Middleware] Redirecting to default locale:', DEFAULT_LOCALE);
        return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url));
    }

    // 3. Server-Side Auth Check
    // Check for the specific cookie mentioned in requirements
    const token = req.cookies.get('v4r2d9z5m3h0c1p0x7l')?.value;
    const isAuthRoute = pathname.includes('/authorization');

    if (isAuthRoute && !token) {
        console.warn('[Middleware] Unauthorized access attempt to:', pathname);
        return NextResponse.redirect(new URL(`/${locale}/signin`, req.url));
    }

    // 4. Security Headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url); // Pass URL to layout if needed

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:;");

    return response;
}

export const config = {
    matcher: [
        // Verify all routes except API 
        // root, auth pages, authorization pages
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
