import { GraphQLClient } from "graphql-request";
import { getSdk, ContributionCalendar } from "@git-skyline/github-graphql";
import { ContributionAPI } from "./base";

export type GitHubContributionResult = Omit<
  ContributionCalendar,
  "months" | "isHalloween"
>;

export class GitHubAPI implements ContributionAPI {
  private sdk: ReturnType<typeof getSdk>;
  constructor(token: string) {
    const client = new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    this.sdk = getSdk(client);
  }

  async getContributions(
    username: string
  ): Promise<GitHubContributionResult | undefined> {
    const response = await this.sdk.DefaultGitHubContribution({ username });
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
    const response = await this.sdk.GitHubContributionByDate({
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
    const response = await this.sdk.GitHubContributionByDate({
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
