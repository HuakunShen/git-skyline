import { request, gql, GraphQLClient } from "graphql-request";
import { DefaultGitHubContributionDocument } from "./src/gql/graphql";

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer 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`,
  },
});
const response = await client.request(DefaultGitHubContributionDocument, { username: "HuakunShen" });
console.log(response);

