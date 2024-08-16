/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "ui",
    "three",
    "@git-skyline/github-graphql",
    "github-graphql",
  ],
};

module.exports = nextConfig;
