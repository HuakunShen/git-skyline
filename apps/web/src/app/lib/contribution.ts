import {
  type ContributionAPI,
  type ContributionAdapter,
  ContributionRetriever,
  GitHubAPI,
  GitHubContributionAdapter,
  GitProvider,
} from "@git-skyline/common";

export function contributionRetrieverFactory(
  gitProvider: GitProvider
): ContributionRetriever {
  const token = process.env.GITHUB_API_TOKEN;
  let api: ContributionAPI;
  let adapter: ContributionAdapter;
  switch (gitProvider) {
    case GitProvider.Enum.github:
      if (!token) throw new Error("GITHUB_API_TOKEN is not set");
      api = new GitHubAPI(token);
      adapter = new GitHubContributionAdapter();
      return new ContributionRetriever(api, adapter);
    default:
      throw new Error(`Unknown git provider ${gitProvider as string}`);
  }
}
