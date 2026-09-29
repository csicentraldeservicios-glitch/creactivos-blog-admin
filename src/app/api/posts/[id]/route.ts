import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parsePostForm, updatePost } from "@/lib/blogger";

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const input = parsePostForm(await request.formData());
  const back = (q: string) =>
    NextResponse.redirect(new URL(`/posts/${id}?${q}`, request.url), { status: 303 });
  if (!input.title) return back("error=title");
  try {
    await updatePost(id, input);
    return back("saved=1");
  } catch {
    return back("error=api");
  }
}
