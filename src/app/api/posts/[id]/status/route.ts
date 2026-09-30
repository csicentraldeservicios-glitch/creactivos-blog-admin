import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setPostStatus } from "@/lib/blogger";

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const form = await request.formData();
  const action = form.get("action") === "revert" ? "revert" : "publish";
  try {
    await setPostStatus(id, action);
    return NextResponse.redirect(new URL(`/posts/${id}?saved=1`, request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(new URL(`/posts/${id}?error=api`, request.url), { status: 303 });
  }
}
