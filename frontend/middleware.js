import { NextResponse } from 'next/server';

const ANALYTICS_USER = process.env.ANALYTICS_USER || 'admin';
const ANALYTICS_PASS = process.env.ANALYTICS_PASS || 'jaqyi@dashboard';

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="JAQYI Analytics", charset="UTF-8"',
    },
  });
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /analytics pages and /api/analytics data endpoint
  if (
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/api/analytics')
  ) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return unauthorized();
    }

    try {
      const base64Credentials = authHeader.slice(6);
      const decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const colonIndex = decoded.indexOf(':');
      const username = decoded.slice(0, colonIndex);
      const password = decoded.slice(colonIndex + 1);

      if (username !== ANALYTICS_USER || password !== ANALYTICS_PASS) {
        return unauthorized();
      }
    } catch {
      return unauthorized();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/analytics/:path*', '/api/analytics/:path*'],
};
