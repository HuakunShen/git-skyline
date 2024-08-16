"use client";
import "@/stylesheet/transparent-bg.css";

import dynamic from "next/dynamic";
import Loading from "@/app/components/loading";

interface PropType {
  params: { provider: string; username: string; repo: string };
}

const StarHistoryLoad = dynamic(() => import("@/app/components/star-history"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function StarHistory({ params }: PropType) {
  const { provider, username, repo } = params;

  return (
    <div>
      {provider === "github" && (
        <StarHistoryLoad username={username} repo={repo} />
      )}
    </div>
  );
}
