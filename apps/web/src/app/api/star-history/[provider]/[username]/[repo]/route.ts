import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GitProvider, type GitContribution } from "@git-skyline/common";
import { ApolloError } from "@apollo/client";
import { contributionCache } from "@/app/lib/cache";
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

  // return dataFetchPromise
  //   .then((data) => {
  //     if (!data) {
  //       return new Response("Not found", { status: 404 });
  //     }
  //     contributionCache.set(`${provider}-${username}-${year}`, data);
  //     return NextResponse.json(data);
  //   })
  //   .catch((err) => {
  //     // check if error is ApolloErrror

  //     if (err instanceof ApolloError) {
  //       return new Response(err.message, { status: 400 });
  //     } else {
  //       return new Response(err.message, { status: 400 });
  //     }
  //   });
}
