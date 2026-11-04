'use client';

import { usePathname } from 'next/navigation';
import { whatsappUrl } from '@/data/site';

/** Floating WhatsApp chat button (bottom-right on every public page). */
export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith('/analytics')) return null;

  const message = pathname?.startsWith('/products/doott')
    ? "Hi JAQYI! I have a question about Doott."
    : undefined;

  return (
    <a
      href={whatsappUrl(message)}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with JAQYI on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 29l8.27-1.58a12.1 12.1 0 0 0 3.77.6h.01c6.63 0 12.03-5.37 12.03-11.98C28.08 8.36 22.67 3 16.04 3Zm0 21.94h-.01c-1.18 0-2.34-.21-3.43-.61l-.6-.22-4.9.94.97-4.68-.24-.62a9.77 9.77 0 0 1-.76-3.78c0-5.43 4.44-9.85 9.98-9.85 5.53 0 9.98 4.42 9.98 9.86 0 5.43-4.45 8.96-9.99 8.96Zm5.47-7.37c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"
        />
      </svg>
      <span className="wa-float__label">Chat with us</span>
    </a>
  );
}
