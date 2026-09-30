import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPost, parsePostForm } from "@/lib/blogger";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const input = parsePostForm(form);
  if (!input.title) {
    return NextResponse.redirect(new URL("/posts/new?error=title", request.url), { status: 303 });
  }
  try {
    const post = await createPost(input, form.get("intent") !== "publish");
    return NextResponse.redirect(new URL(`/posts/${post.id}?saved=1`, request.url), { status: 303 });
  } catch {
    return NextResponse.redirect(new URL("/posts/new?error=api", request.url), { status: 303 });
  }
}
