/**
 * Base URL of the JAQYI backend (Express app in /backend).
 *
 * NEXT_PUBLIC_API_URL must be set at build time for production deployments.
 * The localhost fallback only applies in development so a misconfigured
 * production build fails loudly instead of silently posting to localhost.
 */
const envUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');

export const API_BASE_URL =
  envUrl || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '');

if (!API_BASE_URL && typeof window !== 'undefined') {
  console.error('[JAQYI] NEXT_PUBLIC_API_URL is not set — contact, chatbot lead and careers forms cannot reach the backend.');
}
