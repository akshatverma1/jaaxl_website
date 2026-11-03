/**
 * Analytics event storage.
 *
 * Uses Upstash Redis (or Vercel KV, which is Upstash under the hood) over its
 * REST API when configured, so events survive cold starts and are shared by
 * every serverless instance. Falls back to an in-memory buffer for local dev.
 *
 * Env vars (either pair works):
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   KV_REST_API_URL        + KV_REST_API_TOKEN
 */

export const MAX_EVENTS = 5000;
const KEY = 'jaqyi:analytics:events';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const isPersistent = Boolean(REDIS_URL && REDIS_TOKEN);

const memoryEvents = []; // newest first

async function redisPipeline(commands) {
  const res = await fetch(`${REDIS_URL.replace(/\/+$/, '')}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  return res.json();
}

export async function addEvent(event) {
  if (!isPersistent) {
    memoryEvents.unshift(event);
    if (memoryEvents.length > MAX_EVENTS) memoryEvents.length = MAX_EVENTS;
    return;
  }
  await redisPipeline([
    ['LPUSH', KEY, JSON.stringify(event)],
    ['LTRIM', KEY, '0', String(MAX_EVENTS - 1)],
  ]);
}

export async function getEvents() {
  if (!isPersistent) return memoryEvents;
  const [result] = await redisPipeline([['LRANGE', KEY, '0', String(MAX_EVENTS - 1)]]);
  return (result?.result || [])
    .map((raw) => {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}
