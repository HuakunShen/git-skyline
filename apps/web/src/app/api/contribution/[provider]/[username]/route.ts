import { type NextRequest } from "next/server";
import { z } from "zod";
import {
  GitProvider,
  GitHubAPI,
  GitHubContributionAdapter,
  ContributionRetriever,
  GitContribution,
} from "@git-skyline/common";
import { contributionRetrieverFactory } from "@/app/lib/contribution";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string; provider: string } }
) {
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
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const startDate = startDateParam
    ? z
        .string()
        .transform((v) => new Date(v))
        .parse(startDateParam)
    : undefined;
  const endDate = endDateParam
    ? z
        .string()
        .transform((v) => new Date(v))
        .parse(endDateParam)
    : undefined;

  const contributionRetriever = contributionRetrieverFactory(provider);
  let data: GitContribution | undefined;
  if (year) {
    data = await contributionRetriever.getContributionsByYear(username, year);
  } else if (startDate && endDate) {
    data = await contributionRetriever.getContributionsByDate(
      username,
      startDate,
      endDate
    );
  } else {
    data = await contributionRetriever.getContributions(username);
  }
  if (!data) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(data);
}
