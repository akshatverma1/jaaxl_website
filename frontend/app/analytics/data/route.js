/**
 * GET /analytics/data — aggregated stats for the dashboard.
 * Lives under /analytics so proxy.js applies the same Basic Auth as the page.
 */
import { getEvents, isPersistent } from '@/lib/analyticsStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  let events;
  try {
    events = await getEvents();
  } catch (err) {
    console.error('[analytics] read error:', err?.message);
    return Response.json({ error: 'Storage unavailable' }, { status: 503 });
  }

  const now = Date.now();
  const DAY = 86_400_000;
  const WEEK = 7 * DAY;

  const today = events.filter((e) => now - e.ts < DAY);
  const week = events.filter((e) => now - e.ts < WEEK);

  const pageCount = {};
  events.forEach((e) => {
    pageCount[e.path] = (pageCount[e.path] || 0) + 1;
  });
  const topPages = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, views]) => ({ path, views }));

  // Unique visitors (last 7 days) — `ip` kept for events recorded before hashing
  const uniqueVisitors = new Set(week.map((e) => e.vid || e.ip));

  const hourly = Array.from({ length: 24 }, (_, i) => {
    const bucketStart = now - (23 - i) * 3_600_000;
    const bucketEnd = bucketStart + 3_600_000;
    return {
      hour: new Date(bucketStart).getHours(),
      views: events.filter((e) => e.ts >= bucketStart && e.ts < bucketEnd).length,
    };
  });

  const devices = {};
  events.forEach((e) => {
    devices[e.device] = (devices[e.device] || 0) + 1;
  });

  const countries = {};
  events.forEach((e) => {
    countries[e.country] = (countries[e.country] || 0) + 1;
  });
  const topCountries = Object.entries(countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, views]) => ({ country, views }));

  const recent = events.slice(0, 20).map((e) => ({
    ts: e.ts,
    path: e.path,
    device: e.device,
    country: e.country,
    city: e.city,
    ref: e.ref,
  }));

  return Response.json(
    {
      totals: {
        allTime: events.length,
        today: today.length,
        week: week.length,
        uniqueVisitors: uniqueVisitors.size,
      },
      topPages,
      hourly,
      devices,
      topCountries,
      recent,
      persistent: isPersistent,
      updatedAt: now,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
