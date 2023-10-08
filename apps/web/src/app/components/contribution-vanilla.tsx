"use client";
// This file should contain logic for fetching contribution data from server and displaying model, nothing more
// Do not display any decoration like header, footer, button etc.
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { GitContribution, GitProvider } from "@git-skyline/common";
import ContributionModel from "@/app/components/contribution-model";
import { useContributionsStore, useUserInputStore } from "@/app/lib/store";
import Loading from "@/app/components/loading";
import { useSceneStore } from "@/app/lib/store";
import {
  saveArrayBuffer,
  saveString,
  exportGLTFModel,
  exportSTDModel,
} from "@/app/lib/exporter";
import axios from "axios";

interface PropType {
  provider: string;
  username: string;
}

export default function PageInner({
  username,
  provider,
}: PropType): JSX.Element {
  const searchParams = useSearchParams();
  const contributionStore = useContributionsStore();

  const year = searchParams.get("year");
  // const contributionRetriever = contributionRetrieverFactory(params.provider);
  const [contributionData, setContributionData] =
    useState<null | GitContribution>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(""); // reset error message
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
    // check client-side cache

    if (contributionStore.url === url) {
      // check if fetch date is within 1 day
      if (contributionStore.fetchDate) {
        const diff =
          new Date().getTime() -
          new Date(contributionStore.fetchDate).getTime();
        if (diff < 1000 * 60 * 60 * 24) {
          setContributionData(
            GitContribution.parse(contributionStore.contributions)
          );
          return;
        }
      }
    }

    axios
      .get(url)
      .then((res) => {
        setContributionData(GitContribution.parse(res.data));
        contributionStore.setContributions(res.data);
        contributionStore.setFetchDate(new Date());
        contributionStore.setUrl(url);
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
      });
  }, [provider, username, year, startDate, endDate]);

  return (
    <div className="flex flex-col h-full">
      {errorMsg ? (
        <div className="px-10">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMsg}</span>
          </div>
        </div>
      ) : (
        <div className="grow" id="canvas-container">
          {contributionData ? (
            <ContributionModel data={contributionData} />
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
}
