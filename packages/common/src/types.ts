import { z } from "zod";
import { ContributionLevel as ContributionLevelCodegen } from "@git-skyline/github-graphql";

export const GitProvider = z.enum(["github"]);
export type GitProvider = z.infer<typeof GitProvider>;

export const Weekday = z.number().min(0).max(6);
export type Weekday = z.infer<typeof Weekday>;

export const ContributionLevel = z.union([
  z.literal(ContributionLevelCodegen.None),
  z.literal(ContributionLevelCodegen.FirstQuartile),
  z.literal(ContributionLevelCodegen.SecondQuartile),
  z.literal(ContributionLevelCodegen.ThirdQuartile),
  z.literal(ContributionLevelCodegen.FourthQuartile),
]);

export type ContributionLevel = z.infer<typeof ContributionLevel>;

export const GitDayContribution = z.object({
  date: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
  }),
  count: z.number(),
  color: z.string(),
  weekday: Weekday,
  week: z.number(),
  contributionLevel: z.string().optional(),
});
export type GitDayContribution = z.infer<typeof GitDayContribution>;

export const GitContribution = z.object({
  provider: GitProvider,
  totalContribution: z.number(),
  days: GitDayContribution.array(),
  colors: z.string().array().optional(),
});
export type GitContribution = z.infer<typeof GitContribution>;
