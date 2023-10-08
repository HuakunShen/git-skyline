import NodeCache from "node-cache";

export const contributionCache = new NodeCache({
  stdTTL: 60 * 60 * 25,
  checkperiod: 60 * 60,
});
