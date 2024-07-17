import { writeFileSync } from "fs";
import { resolve } from "path";

const envContent = `
GITHUB_API_TOKEN=${process.env.GITHUB_API_TOKEN}
`;
writeFileSync(
  resolve(__dirname, "../packages/github-graphql/.env"),
  envContent
);
