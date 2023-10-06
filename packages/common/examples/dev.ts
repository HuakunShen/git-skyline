// Run this file with `bun examples/dev.ts`
import { GitHubAPI } from "~/api";
import { GitHubContributionAdapter } from "~/adapter/contribution/github";
import { ContributionRetriever } from "~/retriever";
import { z } from "zod";

const github_token = z.string().parse(process.env.GITHUB_API_TOKEN);
const githubApi = new GitHubAPI(github_token);
// get first day of 2022 aoe time
const startDate = new Date(Date.UTC(2023, 0, 1, 0, 0, 0));
// get last day of 2022 aoe time
const endDate = new Date(Date.UTC(2023, 11, 31, 23, 59, 59));

const username = "HuakunShen";
const contributionRetriever = new ContributionRetriever(
  githubApi,
  new GitHubContributionAdapter()
);

const contributions = await contributionRetriever.getContributionsByYear(
  username,
  2023
);
// const contributions = await contributionRetriever.getContributions(username);
console.log(contributions);
await Bun.write("contributions.json", JSON.stringify(contributions, null, 2));

// write contributions to file
