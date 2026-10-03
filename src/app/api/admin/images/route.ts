import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { guardAdmin } from "@/lib/admin-guard";
import { listImages } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const denied = guardAdmin(request);
  if (denied) return denied;
  return NextResponse.json({ images: await listImages() });
}
