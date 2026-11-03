import { NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';

// No fallback credentials: if these aren't configured the dashboard stays locked.
const ANALYTICS_USER = process.env.ANALYTICS_USER;
const ANALYTICS_PASS = process.env.ANALYTICS_PASS;

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="JAQYI Analytics", charset="UTF-8"',
    },
  });
}

/** Constant-time string comparison (hash first so lengths always match). */
function safeEqual(a, b) {
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}

export function proxy(request) {
  // Protects the /analytics dashboard AND its data endpoint (/analytics/data).
  // The public tracker (POST /api/analytics) is intentionally NOT matched —
  // a 401 + WWW-Authenticate there would show a login popup to every visitor.
  if (!ANALYTICS_USER || !ANALYTICS_PASS) {
    return new NextResponse('Analytics dashboard is not configured.', { status: 503 });
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorized();
  }

  try {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
    const colonIndex = decoded.indexOf(':');
    if (colonIndex === -1) return unauthorized();
    const username = decoded.slice(0, colonIndex);
    const password = decoded.slice(colonIndex + 1);

    // Evaluate both comparisons so timing doesn't reveal which one failed
    const userOk = safeEqual(username, ANALYTICS_USER);
    const passOk = safeEqual(password, ANALYTICS_PASS);
    if (!(userOk && passOk)) return unauthorized();
  } catch {
    return unauthorized();
  }

  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/analytics', '/analytics/:path*'],
};
