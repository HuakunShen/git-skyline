import { NextRequest, NextResponse } from "next/server";
import { contributionCache } from "@/app/lib/cache";

export function GET(request: NextRequest): Response {
  return NextResponse.json({
    keys: contributionCache.keys(),
  });
}
