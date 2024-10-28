import { ContributionAdapter } from "../adapter/contribution";
import { type ContributionAPI } from "../api";
import { GitContribution } from "../types";

export class ContributionRetriever {
  private adapter: ContributionAdapter;
  private api: ContributionAPI;

  constructor(api: ContributionAPI, adapter: ContributionAdapter) {
    this.adapter = adapter;
    this.api = api;
  }

  async getContributions(
    username: string
  ): Promise<GitContribution | undefined> {
    const data = await this.api.getContributions(username);
    return this.adapter.transform(data!);
  }
  async getContributionsByYear(
    username: string,
    year: number
  ): Promise<GitContribution | undefined> {
    const data = await this.api.getContributionsByYear(username, year);
    return this.adapter.transform(data!);
  }
  async getContributionsByDate(
    username: string,
    startDate: Date,
    endDate: Date
  ): Promise<GitContribution | undefined> {
    const data = await this.api.getContributionsByDate(
      username,
      startDate,
      endDate
    );
    return this.adapter.transform(data!);
  }
}
