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

  // ONLY protect the /analytics dashboard pages.
  // Do NOT protect /api/analytics — the tracker POSTs there on every page
  // load, and a 401 + WWW-Authenticate header causes the browser to show
  // a login popup to every visitor.
  if (pathname.startsWith('/analytics')) {
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
  // Only run middleware on /analytics/* — NOT on /api/* routes
  matcher: ['/analytics/:path*'],
};
