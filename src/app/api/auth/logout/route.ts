import { go } from "@/lib/http";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const res = go("/login");
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
