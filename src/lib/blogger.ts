const API = "https://www.googleapis.com/blogger/v3";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
export const BLOGGER_SCOPE = "https://www.googleapis.com/auth/blogger";

export const BLOG_URL =
  process.env.BLOGGER_BLOG_URL ?? "https://creactivosaudiovisual.blogspot.com/";

export type PostStatus = "LIVE" | "DRAFT" | "SCHEDULED";

export interface BloggerPost {
  id: string;
  title: string;
  content?: string;
  url?: string;
  status?: PostStatus;
  published?: string;
  updated?: string;
  labels?: string[];
}

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} no está configurado`);
  return v;
}

export function appUrl(): string {
  return (process.env.APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function redirectUri(): string {
  return `${appUrl()}/api/blogger/callback`;
}

export function isConnected(): boolean {
  return Boolean(process.env.BLOGGER_REFRESH_TOKEN);
}

export function authUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: env("GOOGLE_CLIENT_ID"),
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: BLOGGER_SCOPE,
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

async function tokenRequest(body: Record<string, string>) {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env("GOOGLE_CLIENT_ID"),
      client_secret: env("GOOGLE_CLIENT_SECRET"),
      ...body,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description ?? data.error ?? "Error OAuth");
  return data as { access_token: string; refresh_token?: string; expires_in: number };
}

export function exchangeCode(code: string) {
  return tokenRequest({
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri(),
  });
}

let cached: { token: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 30_000) return cached.token;
  const data = await tokenRequest({
    refresh_token: env("BLOGGER_REFRESH_TOKEN"),
    grant_type: "refresh_token",
  });
  cached = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cached.token;
}

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error?.message ?? `Blogger API ${res.status}`);
  return data as T;
}

let blogId: string | undefined = process.env.BLOGGER_BLOG_ID;

export async function getBlogId(): Promise<string> {
  if (blogId) return blogId;
  const blog = await api<{ id: string }>(`/blogs/byurl?url=${encodeURIComponent(BLOG_URL)}`);
  blogId = blog.id;
  return blogId;
}

export async function getBlog() {
  const id = await getBlogId();
  return api<{ id: string; name: string; url: string; posts: { totalItems: number } }>(
    `/blogs/${id}`,
  );
}

export async function listPosts(pageToken?: string) {
  const id = await getBlogId();
  const q = new URLSearchParams({ maxResults: "20", orderBy: "updated", fetchBodies: "false" });
  for (const s of ["live", "draft", "scheduled"]) q.append("status", s);
  if (pageToken) q.set("pageToken", pageToken);
  const data = await api<{ items?: BloggerPost[]; nextPageToken?: string }>(
    `/blogs/${id}/posts?${q}`,
  );
  return { posts: data.items ?? [], nextPageToken: data.nextPageToken };
}

export async function getPost(postId: string) {
  return api<BloggerPost>(`/blogs/${await getBlogId()}/posts/${postId}`);
}

export interface PostInput {
  title: string;
  content: string;
  labels: string[];
}

export async function createPost(input: PostInput, isDraft: boolean) {
  return api<BloggerPost>(`/blogs/${await getBlogId()}/posts?isDraft=${isDraft}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updatePost(postId: string, input: PostInput) {
  return api<BloggerPost>(`/blogs/${await getBlogId()}/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function setPostStatus(postId: string, action: "publish" | "revert") {
  return api<BloggerPost>(`/blogs/${await getBlogId()}/posts/${postId}/${action}`, {
    method: "POST",
  });
}

export async function deletePost(postId: string) {
  await api<void>(`/blogs/${await getBlogId()}/posts/${postId}`, { method: "DELETE" });
}

export function parsePostForm(form: FormData): PostInput {
  return {
    title: String(form.get("title") ?? "").trim(),
    content: String(form.get("content") ?? ""),
    labels: String(form.get("labels") ?? "")
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean),
  };
}
