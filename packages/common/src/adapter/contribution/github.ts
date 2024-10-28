import { z } from "zod";
import { ContributionAdapter } from "./base";
import { GitContribution, GitProvider, GitDayContribution } from "../../types";
import { type ContributionCalendarWeek } from "@hk/github-graphql";
import { type GitHubContributionResult } from "../../api/contribution/github";

export class GitHubContributionAdapter extends ContributionAdapter {
  transform(data: GitHubContributionResult): GitContribution {
    const weeks: ContributionCalendarWeek[] = data?.weeks ?? [];
    const days: GitDayContribution[] = weeks
      .map((week, idx) => {
        const days: GitDayContribution[] = week.contributionDays.map(
          (contributionDay) => {
            const x = z
              .string()
              .regex(/^\d{4}-\d{2}-\d{2}$/)
              .parse(contributionDay.date);
            const split = x
              .split("-")
              .map((n) => z.number().parse(parseInt(n)));
            const [year, month, day] = split;
            const parsed = GitDayContribution.parse({
              date: { year, month, day },
              count: contributionDay.contributionCount,
              color: contributionDay.color,
              weekday: contributionDay.weekday,
              week: idx,
              ContributionLevel: contributionDay.contributionLevel,
            });
            return parsed;
          }
        );
        return days;
      })
      .flat();
    return GitContribution.parse({
      provider: GitProvider.Enum.github,
      totalContribution: data?.totalContributions,
      days,
      colors: data?.colors,
    }) as GitContribution;
  }
}
