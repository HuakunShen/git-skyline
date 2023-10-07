"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { GitContribution, GitProvider } from "@git-skyline/common";
import ContributionModel from "@/app/components/contribution-model";
import { useUserInputStore } from "@/app/lib/store";
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
  const userInputStore = useUserInputStore();
  const sceneStore = useSceneStore();
  const searchParams = useSearchParams();
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
    axios
      .get(url)
      .then((res) => {
        setContributionData(GitContribution.parse(res.data));
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
      });
  }, [provider, username, year, startDate, endDate]);

  function downloadGLTFModel() {
    if (sceneStore.scene) {
      exportGLTFModel(sceneStore.scene, `github-${username}-${year}.gltf`);
    }
    // const scene = sceneStore.gltfSceneContent;
    // if (scene) {
    //   if (scene instanceof ArrayBuffer) {
    //     saveArrayBuffer(scene, `github-${username}-${year}.gltf`);
    //   } else {
    //     saveString(scene, `github-${username}-${year}.gltf`);
    //   }
    // }
  }

  function downloadSTLModel() {
    if (sceneStore.scene) {
      exportSTDModel(sceneStore.scene, `github-${username}-${year}.stl`);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-10 py-4">
        <p>
          Contribution of{" "}
          <span className="font-bold underline">{userInputStore.username}</span>{" "}
          in <span className="font-bold">{userInputStore.year}</span>
        </p>
        <div className="dropdown dropdown-hover dropdown-left">
          <label tabIndex={0} className="btn btn-sm">
            Download
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={downloadGLTFModel}>GLTF</a>
            </li>
            <li>
              <a onClick={downloadSTLModel}>STL</a>
            </li>
          </ul>
        </div>
      </div>
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
