/**
 * Lightweight conversion tracking → POST /api/analytics (type: 'event').
 * Event names are whitelisted server-side; see app/api/analytics/route.js.
 */
export function track(name, props = {}) {
  if (typeof window === 'undefined') return;
  try {
    const body = JSON.stringify({
      type: 'event',
      name,
      path: window.location.pathname,
      props,
    });
    // sendBeacon survives page navigation (e.g. clicking an outbound link)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', new Blob([body], { type: 'application/json' }));
    } else {
      fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
    }
  } catch {
    /* never break the page for analytics */
  }
}
