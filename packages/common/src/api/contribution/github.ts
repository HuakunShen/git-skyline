import { GraphQLClient } from "graphql-request";
import {
  ContributionCalendar,
  DefaultGitHubContributionDocument,
  GitHubContributionByDateDocument,
} from "@git-skyline/github-graphql/src/gql/graphql";
// import { getSdk, ContributionCalendar } from "@git-skyline/github-graphql";
import { ContributionAPI } from "./base";

export type GitHubContributionResult = Omit<
  ContributionCalendar,
  "months" | "isHalloween"
>;

export class GitHubAPI implements ContributionAPI {
  // private sdk: ReturnType<typeof getSdk>;
  client: GraphQLClient;

  constructor(token: string) {
    this.client = new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        authorization: `Bearer ${token}`,
        "User-Agent": "GitHub GraphQL SDK",
      },
    });
    // this.sdk = getSdk(client);
  }

  async getContributions(
    username: string
  ): Promise<GitHubContributionResult | undefined> {
    const response = await this.client.request(
      DefaultGitHubContributionDocument,
      { username }
    );

    // if (response.errors) {
    //   throw new Error(response.errors[0].message);
    // }
    return response.user?.contributionsCollection.contributionCalendar;
  }

  async getContributionsByYear(
    username: string,
    year: number
  ): Promise<GitHubContributionResult | undefined> {
    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    const response = await this.client.request(
      GitHubContributionByDateDocument,
      {
        username,
        from: startDate.toISOString(),
        to: endDate.toISOString(),
      }
    );
    // if (response.errors) {
    //   throw new Error(response.errors[0].message);
    // }
    return response.user?.contributionsCollection.contributionCalendar;
  }

  async getContributionsByDate(
    username: string,
    startDate: Date,
    endDate: Date
  ): Promise<GitHubContributionResult | undefined> {
    const response = await this.client.request(
      DefaultGitHubContributionDocument,
      { username, from: startDate.toISOString(), to: endDate.toISOString() }
    );
    // if (response.errors) {
    //   throw new Error(response.errors[0].message);
    // }
    return response.user?.contributionsCollection.contributionCalendar;
  }
}
