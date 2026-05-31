/**
 * In-memory analytics store.
 * Persists within a serverless function's warm lifecycle.
 * For durable storage, replace `events` with a DB call (MongoDB, Supabase, etc.)
 */

const MAX_EVENTS = 2000;
const events = []; // { ts, path, ref, ua, ip, country }

function parseUA(ua = '') {
  const ua_lower = ua.toLowerCase();
  if (/mobile|android|iphone|ipad/.test(ua_lower)) return 'Mobile';
  if (/tablet/.test(ua_lower)) return 'Tablet';
  return 'Desktop';
}

// ---------- POST /api/analytics — track a page view ----------
export async function POST(request) {
  try {
    const body = await request.json();
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const country = request.headers.get('x-vercel-ip-country') || '—';
    const city = request.headers.get('x-vercel-ip-city') || '—';
    const ua = request.headers.get('user-agent') || '';

    const event = {
      ts: Date.now(),
      path: body.path || '/',
      ref: body.referrer || '',
      ua,
      device: parseUA(ua),
      ip,
      country,
      city,
    };

    events.unshift(event);          // newest first
    if (events.length > MAX_EVENTS) events.length = MAX_EVENTS;

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}

// ---------- GET /api/analytics — return aggregated data ----------
export async function GET() {
  const now = Date.now();
  const DAY = 86_400_000;
  const WEEK = 7 * DAY;

  // Bucketed stats
  const today = events.filter((e) => now - e.ts < DAY);
  const week  = events.filter((e) => now - e.ts < WEEK);

  // Top pages
  const pageCount = {};
  events.forEach((e) => {
    pageCount[e.path] = (pageCount[e.path] || 0) + 1;
  });
  const topPages = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, views]) => ({ path, views }));

  // Unique visitors (by IP, last 7 days)
  const uniqueIPs = new Set(week.map((e) => e.ip));

  // Hourly breakdown (last 24 h)
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const bucketStart = now - (23 - i) * 3_600_000;
    const bucketEnd   = bucketStart + 3_600_000;
    return {
      hour: new Date(bucketStart).getHours(),
      views: events.filter((e) => e.ts >= bucketStart && e.ts < bucketEnd).length,
    };
  });

  // Device breakdown
  const devices = {};
  events.forEach((e) => { devices[e.device] = (devices[e.device] || 0) + 1; });

  // Country breakdown (top 5)
  const countries = {};
  events.forEach((e) => { countries[e.country] = (countries[e.country] || 0) + 1; });
  const topCountries = Object.entries(countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, views]) => ({ country, views }));

  // Recent 20 events
  const recent = events.slice(0, 20).map((e) => ({
    ts: e.ts,
    path: e.path,
    device: e.device,
    country: e.country,
    city: e.city,
    ref: e.ref,
  }));

  return Response.json({
    totals: {
      allTime: events.length,
      today: today.length,
      week: week.length,
      uniqueVisitors: uniqueIPs.size,
    },
    topPages,
    hourly,
    devices,
    topCountries,
    recent,
    updatedAt: now,
  });
}
