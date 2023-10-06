import {
  GitProvider,
  GitHubAPI,
  GitHubContributionAdapter,
  ContributionRetriever,
} from "@git-skyline/common";

export function contributionRetrieverFactory(gitProvider: GitProvider) {
  switch (gitProvider) {
    case GitProvider.Enum.github:
      const token = process.env.GITHUB_API_TOKEN;
      if (!token) throw new Error("GITHUB_API_TOKEN is not set");
      const api = new GitHubAPI(token);
      const adapter = new GitHubContributionAdapter();
      return new ContributionRetriever(api, adapter);
    default:
      throw new Error(`Unknown git provider ${gitProvider}`);
  }
}
