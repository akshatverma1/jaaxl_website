/**
 * POST /api/analytics — public page-view tracker (called by AnalyticsTracker).
 *
 * Aggregated stats are served from /analytics/data, which sits behind the
 * dashboard's Basic Auth (see proxy.js). This route intentionally has no GET.
 */
import { createHash } from 'node:crypto';
import { addEvent } from '@/lib/analyticsStore';

function parseUA(ua = '') {
  const ua_lower = ua.toLowerCase();
  if (/ipad|tablet/.test(ua_lower)) return 'Tablet';
  if (/mobile|android|iphone/.test(ua_lower)) return 'Mobile';
  return 'Desktop';
}

const BOT_RE = /bot|crawler|spider|crawling|headless|lighthouse|preview/i;

// Conversion events the site may send (anything else is rejected)
const EVENT_NAMES = new Set([
  'whatsapp_click',
  'doott_click',
  'phone_click',
  'email_click',
  'booking_click',
  'contact_submit',
  'chatbot_lead',
  'job_application',
]);

/** Pseudonymous visitor id — raw IPs are never stored. */
function visitorId(ip, ua) {
  const salt = process.env.ANALYTICS_SALT || 'jaqyi-analytics';
  return createHash('sha256').update(`${salt}:${ip}:${ua}`).digest('hex').slice(0, 16);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const ua = request.headers.get('user-agent') || '';
    if (BOT_RE.test(ua)) return Response.json({ ok: true });

    const path = typeof body?.path === 'string' ? body.path.slice(0, 300) : '/';
    if (!path.startsWith('/')) {
      return Response.json({ ok: false }, { status: 400 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const decode = (v) => {
      try {
        return v ? decodeURIComponent(v) : '—';
      } catch {
        return v;
      }
    };

    const isEvent = body?.type === 'event';
    if (isEvent && !EVENT_NAMES.has(body?.name)) {
      return Response.json({ ok: false }, { status: 400 });
    }

    await addEvent({
      ts: Date.now(),
      type: isEvent ? 'event' : 'pageview',
      ...(isEvent ? { name: body.name } : {}),
      path,
      ref: typeof body?.referrer === 'string' ? body.referrer.slice(0, 500) : '',
      device: parseUA(ua),
      vid: visitorId(ip, ua),
      country: request.headers.get('x-vercel-ip-country') || '—',
      city: decode(request.headers.get('x-vercel-ip-city')),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[analytics] track error:', err?.message);
    return Response.json({ ok: false }, { status: 400 });
  }
}
