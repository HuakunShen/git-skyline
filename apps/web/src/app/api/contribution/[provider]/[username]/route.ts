import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GitProvider, type GitContribution } from "@git-skyline/common";
import { contributionRetrieverFactory } from "../../../../lib/contribution";
import { ApolloError } from "@apollo/client";
import { contributionCache } from "@/app/lib/cache";

export function GET(
  request: NextRequest,
  { params }: { params: { username: string; provider: string } }
): Promise<Response> {
  const provider = GitProvider.parse(params.provider) as GitProvider;
  const username = z.string().min(2).parse(params.username);
  const searchParams = request.nextUrl.searchParams;
  const yearParam = searchParams.get("year");
  const year = yearParam
    ? z
        .string()
        .transform((v) => parseInt(v))
        .parse(yearParam)
    : undefined;

  // parse startdate and enddate
  // const startDateParam = searchParams.get("startDate");
  // const endDateParam = searchParams.get("endDate");
  // const startDate = startDateParam
  //   ? z
  //       .string()
  //       .transform((v) => new Date(v))
  //       .parse(startDateParam)
  //   : undefined;
  // const endDate = endDateParam
  //   ? z
  //       .string()
  //       .transform((v) => new Date(v))
  //       .parse(endDateParam)
  //   : undefined;

  const contributionRetriever = contributionRetrieverFactory(provider);
  let dataFetchPromise: Promise<GitContribution | undefined>;
  if (year) {
    const cacheVal = contributionCache.get(`${provider}/${username}/${year}`);
    if (cacheVal) {
      dataFetchPromise = new Promise((resolve) => {
        resolve(cacheVal as GitContribution);
      });
    } else {
      dataFetchPromise = contributionRetriever.getContributionsByYear(
        username,
        year
      );
    }
    // } else if (startDate && endDate) {
    //   dataFetchPromise = contributionRetriever.getContributionsByDate(
    //     username,
    //     startDate,
    //     endDate
    //   );
  } else {
    const cacheVal = contributionCache.get(`${provider}/${username}`);
    if (cacheVal) {
      dataFetchPromise = new Promise((resolve) => {
        resolve(cacheVal as GitContribution);
      });
    } else {
      dataFetchPromise = contributionRetriever.getContributions(username);
    }
  }
  return dataFetchPromise
    .then((data) => {
      if (!data) {
        return new Response("Not found", { status: 404 });
      }
      contributionCache.set(`${provider}-${username}-${year}`, data);
      return NextResponse.json(data);
    })
    .catch((err) => {
      // check if error is ApolloErrror

      if (err instanceof ApolloError) {
        return new Response(err.message, { status: 400 });
      } else {
        return new Response(err.message, { status: 400 });
      }
    });
}
