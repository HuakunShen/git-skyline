import { graphql } from "../gql";

export const getContributions = graphql(`
  query DefaultGitHubContribution($username: String!) {
    user(login: $username) {
      email
      createdAt
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              weekday
              date
              contributionCount
              color
              contributionLevel
            }
            firstDay
          }
          colors
        }
      }
    }
  }
`);

export const getContributionsByDate = graphql(`
  query GitHubContributionByDate(
    $username: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    user(login: $username) {
      email
      createdAt
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              weekday
              date
              contributionCount
              color
              contributionLevel
            }
            firstDay
          }
          colors
        }
      }
    }
  }
`);
