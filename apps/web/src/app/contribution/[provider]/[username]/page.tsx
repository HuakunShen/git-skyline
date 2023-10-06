"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ContributionModel from "@/app/components/ContributionModel";
import { GitContribution, GitProvider } from "@git-skyline/common";

interface Props {
  params: { provider: string; username: string };
}

export default function Page({ params }: Props) {
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const username = params.username;
  const provider = GitProvider.parse(params.provider);
  // const contributionRetriever = contributionRetrieverFactory(params.provider);
  const [contributionData, setContributionData] =
    useState<null | GitContribution>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (startDate) {
      searchParams.append("startDate", startDate.toISOString());
    }
    if (endDate) {
      searchParams.append("endDate", endDate.toISOString());
    }
    if (year) {
      searchParams.append("year", year);
    }
    const url = `/api/contribution/${provider}/${username}?${searchParams.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setContributionData(data);
      });
    // contributionRetriever.getContributions(params.username).then((data) => {
    //   setContributionData(data);
    // });
  }, [provider, username, year, startDate, endDate]);
  return (
    <div id="canvas-container" className="h-full">
      {contributionData && <ContributionModel data={contributionData} />}
    </div>
  );
}
