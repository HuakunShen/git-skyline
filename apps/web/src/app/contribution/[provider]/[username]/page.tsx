"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GitContribution, GitProvider } from "@git-skyline/common";
import ContributionModel from "../../../components/contribution-model";

interface PropType {
  params: { provider: string; username: string };
}

export default function Page({ params }: PropType): JSX.Element {
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
    const newSearchParams = new URLSearchParams();
    if (startDate) {
      newSearchParams.append("startDate", startDate.toISOString());
    }
    if (endDate) {
      newSearchParams.append("endDate", endDate.toISOString());
    }
    if (year) {
      newSearchParams.append("year", year);
    }
    const url = `/api/contribution/${provider}/${username}?${newSearchParams.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data: GitContribution) => {
        setContributionData(GitContribution.parse(data));
      })
      .catch((err) => {
        console.error(err);
      });
    // contributionRetriever.getContributions(params.username).then((data) => {
    //   setContributionData(data);
    // });
  }, [provider, username, year, startDate, endDate]);
  return (
    <div className="h-full" id="canvas-container">
      {contributionData ? <ContributionModel data={contributionData} /> : null}
    </div>
  );
}
