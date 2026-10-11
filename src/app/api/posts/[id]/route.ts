import { go } from "@/lib/http";
import type { NextRequest } from "next/server";
import { parsePostForm, updatePost } from "@/lib/blogger";

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const input = parsePostForm(await request.formData());
  const back = (q: string) =>
    go(`/posts/${id}?${q}`);
  if (!input.title) return back("error=title");
  try {
    await updatePost(id, input);
    return back("saved=1");
  } catch {
    return back("error=api");
  }
}
