import { go } from "@/lib/http";
import type { NextRequest } from "next/server";
import { createPost, parsePostForm } from "@/lib/blogger";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const input = parsePostForm(form);
  if (!input.title) {
    return go("/posts/new?error=title");
  }
  try {
    const post = await createPost(input, form.get("intent") !== "publish");
    return go(`/posts/${post.id}?saved=1`);
  } catch {
    return go("/posts/new?error=api");
  }
}
