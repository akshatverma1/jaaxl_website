'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef(null);

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
