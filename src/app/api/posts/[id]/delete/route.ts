import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deletePost } from "@/lib/blogger";

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    await deletePost(id);
    return NextResponse.redirect(new URL("/?deleted=1", request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(new URL(`/posts/${id}?error=api`, request.url), { status: 303 });
  }
}
