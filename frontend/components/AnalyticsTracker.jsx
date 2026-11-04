'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';

/** Map an outbound link to a conversion event name (or null). */
function linkEvent(href = '') {
  if (href.includes('wa.me/')) return 'whatsapp_click';
  if (href.includes('doott.jaqyi.com')) return 'doott_click';
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (/cal\.com|calendly\.com/.test(href)) return 'booking_click';
  return null;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef(null);

  // One delegated listener records clicks on conversion links anywhere on the site
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a || window.location.pathname.startsWith('/analytics')) return;
      const name = linkEvent(a.getAttribute('href'));
      if (name) track(name, { href: a.href.slice(0, 200) });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  useEffect(() => {
    // Don't track the analytics dashboard itself
    if (pathname.startsWith('/analytics')) return;
    // Avoid double-firing on the same path
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    const payload = {
      path: pathname,
      referrer: document.referrer,
    };

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Use keepalive so the request survives navigation
      keepalive: true,
    }).catch(() => {
      // Silent fail — never break the user experience
    });
  }, [pathname]);

  return null;
}
