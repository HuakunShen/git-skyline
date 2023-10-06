import { GitContribution } from "../../types";

/**
 * This is the base class for adapters for all git providers.
 */
export abstract class ContributionAdapter {
  abstract transform(contribution: unknown): GitContribution;
}
