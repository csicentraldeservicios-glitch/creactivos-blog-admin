import { go } from "@/lib/http";
import type { NextRequest } from "next/server";
import { setPostStatus } from "@/lib/blogger";

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const form = await request.formData();
  const action = form.get("action") === "revert" ? "revert" : "publish";
  try {
    await setPostStatus(id, action);
    return go(`/posts/${id}?saved=1`);
  } catch {
    return go(`/posts/${id}?error=api`);
  }
}
