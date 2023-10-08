import type { CodegenConfig } from "@graphql-codegen/cli";

const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        authorization: `Bearer ${GITHUB_API_TOKEN}`,
        "User-Agent": "GitHub GraphQL SDK",
      },
    },
  },

  documents: "src/operations/**/*.gql",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
    // "src/gql/request.ts": {
    //   plugins: [
    //     "typescript",
    //     "typescript-operations",
    //     "typescript-graphql-request",
    //   ],
    //   config: {
    //     rawRequest: true,
    //   },
    // },
  },
};

export default config;
