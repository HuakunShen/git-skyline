import {
  ContributionCalendar,
  DefaultGitHubContributionDocument,
  GitHubContributionByDateDocument,
} from "@git-skyline/github-graphql";
import { ContributionAPI } from "./base";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";

export type GitHubContributionResult = Omit<
  ContributionCalendar,
  "months" | "isHalloween"
>;

export class GitHubAPI implements ContributionAPI {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(token: string) {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "https://api.github.com/graphql",
        headers: {
          authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          "User-Agent": "git-skyline",
        },
      }),
    });
  }

  async getContributions(
    username: string
  ): Promise<GitHubContributionResult | undefined> {
    const response = await this.client.query({
      query: DefaultGitHubContributionDocument,
      variables: { username },
    });

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
    const response = await this.client.query({
      query: GitHubContributionByDateDocument,
      variables: {
        username,
        from: startDate.toISOString(),
        to: endDate.toISOString(),
      },
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
    const response = await this.client.query({
      query: GitHubContributionByDateDocument,
      variables: {
        username,
        from: startDate.toISOString(),
        to: endDate.toISOString(),
      },
    });
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    return response.data.user?.contributionsCollection.contributionCalendar;
  }
}
