/**
 * Rate limiter em memória.
 * Cada instância serverless tem sua própria store — adequado para volume
 * pequeno. Para escala maior, substituir por Upstash Redis.
 */

type Slot = { count: number; resetAt: number };
const store = new Map<string, Slot>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const slot = store.get(key);

  if (!slot || now >= slot.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (slot.count >= limit) return { allowed: false, remaining: 0 };

  slot.count++;
  return { allowed: true, remaining: limit - slot.count };
}

export function clientIp(req: Request): string {
  return (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
}
