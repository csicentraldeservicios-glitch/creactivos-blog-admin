import { go } from "@/lib/http";
import type { NextRequest } from "next/server";
import { deletePost } from "@/lib/blogger";

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    await deletePost(id);
    return go("/blogger?deleted=1");
  } catch {
    return go(`/posts/${id}?error=api`);
  }
}
