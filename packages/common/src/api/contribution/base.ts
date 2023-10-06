export interface ContributionAPI {
  getContributions(username: string): Promise<unknown | undefined>;
  getContributionsByYear(
    username: string,
    year: number
  ): Promise<unknown | undefined>;
  getContributionsByDate(
    username: string,
    startDate: Date,
    endDate: Date
  ): Promise<unknown | undefined>;
}
