/**
 * Token de sessão do admin.
 * Usa Web Crypto API — funciona em Edge Runtime (middleware) e Node.js 18+.
 * O token é HMAC-SHA256(secret+password, payload) — invalidado ao trocar senha ou secret.
 */

const PAYLOAD = "caboclo:admin:v1";

export async function computeAdminToken(): Promise<string> {
  const secret = `${process.env.ADMIN_SECRET ?? ""}:${process.env.ADMIN_PASSWORD ?? ""}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(PAYLOAD));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Comparação em tempo constante para evitar timing attacks. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
