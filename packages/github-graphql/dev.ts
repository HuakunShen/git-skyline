import { request, gql, GraphQLClient } from "graphql-request";
import { DefaultGitHubContributionDocument } from "./src/gql/graphql";

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer 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`,
  },
});
const response = await client.request(DefaultGitHubContributionDocument, { username: "HuakunShen" });
console.log(response);

