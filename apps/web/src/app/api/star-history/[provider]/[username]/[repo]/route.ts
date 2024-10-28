import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GitProvider } from "@git-skyline/common";
import { getStarHistory } from "github-graphql";

export function GET(
  request: NextRequest,
  { params }: { params: { username: string; provider: string; repo: string } }
): Promise<Response> {
  const provider = GitProvider.parse(params.provider) as GitProvider;
  const username = z.string().min(2).parse(params.username);
  const repo = z.string().min(1).parse(params.repo);
  let token = process.env.GITHUB_API_TOKEN;
  if (!token) {
    throw new Error("GITHUB_API_TOKEN is not set");
  }

  return getStarHistory(username, repo, token).then((starHistory) => {
    return NextResponse.json(starHistory);
  });
}
