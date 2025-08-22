import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Skip middleware for /api routes (let CloudFront handle those)
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  // Handle CloudFront specific routing
  // This helps ensure that paths are correctly handled when coming through CloudFront
  if (pathname.endsWith('/') && pathname !== '/') {
    const normalizedPath = pathname.slice(0, -1);
    const url = request.nextUrl.clone();
    url.pathname = normalizedPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Apply this middleware to all pages except API routes and static files
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
