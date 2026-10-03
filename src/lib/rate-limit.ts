// Límite simple de intentos de login fallidos por dirección IP (en memoria; basta para un solo servidor).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 8;
const fails = new Map<string, { count: number; first: number }>();

export function clientIp(headers: Headers): string {
  // Railway añade la IP real al final de x-forwarded-for.
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",").pop()!.trim();
  return headers.get("x-real-ip") ?? "local";
}

export function isBlocked(ip: string): boolean {
  const e = fails.get(ip);
  if (!e) return false;
  if (Date.now() - e.first > WINDOW_MS) {
    fails.delete(ip);
    return false;
  }
  return e.count >= MAX_FAILS;
}

export function recordFailure(ip: string): void {
  const now = Date.now();
  const e = fails.get(ip);
  if (!e || now - e.first > WINDOW_MS) fails.set(ip, { count: 1, first: now });
  else e.count += 1;
  if (fails.size > 5000) fails.clear();
}

export function clearFailures(ip: string): void {
  fails.delete(ip);
}
