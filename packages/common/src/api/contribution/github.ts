import { GraphQLClient } from "graphql-request";
import { getSdk } from "@hk/github-graphql/req";
import { type ContributionAPI } from "./base";
import type { ContributionCalendar } from "@hk/github-graphql";

export type GitHubContributionResult = Omit<
  ContributionCalendar,
  "months" | "isHalloween"
>;

export class GitHubAPI implements ContributionAPI {
  client: GraphQLClient;

  constructor(token: string) {
    this.client = new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        authorization: `Bearer ${token}`,
        "User-Agent": "github-graphql package",
      },
    });
  }

  async getContributions(
    username: string
  ): Promise<GitHubContributionResult | undefined> {
    const sdk = getSdk(this.client);
    const response = await sdk.DefaultGitHubContribution({ username });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data.user?.contributionsCollection.contributionCalendar;
  }

  async getContributionsByYear(
    username: string,
    year: number
  ): Promise<GitHubContributionResult | undefined> {
    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    const sdk = getSdk(this.client);
    const response = await sdk.GitHubContributionByDate({
      username,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.user?.contributionsCollection.contributionCalendar;
  }

  async getContributionsByDate(
    username: string,
    startDate: Date,
    endDate: Date
  ): Promise<GitHubContributionResult | undefined> {
    const sdk = getSdk(this.client);
    const response = await sdk.GitHubContributionByDate({
      username,
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.user?.contributionsCollection.contributionCalendar;
  }
}
