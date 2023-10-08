"use client";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GitContribution, GitProvider } from "@git-skyline/common";
import ContributionVanilla from "@/app/components/contribution-vanilla";
import { useContributionsStore, useUserInputStore } from "@/app/lib/store";
import { useSceneStore } from "@/app/lib/store";
import { exportGLTFModel, exportSTDModel } from "@/app/lib/exporter";
import Link from "next/link";
import DefaultLayout from "@/app/components/layouts/default";

interface PropType {
  provider: string;
  username: string;
}

export default function PageInner({
  username,
  provider,
}: PropType): JSX.Element {
  const userInputStore = useUserInputStore();
  const contributionStore = useContributionsStore();
  const sceneStore = useSceneStore();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  // const contributionRetriever = contributionRetrieverFactory(params.provider);
  const [contributionData, setContributionData] =
    useState<null | GitContribution>(null);

  function downloadGLTFModel() {
    if (sceneStore.scene) {
      exportGLTFModel(sceneStore.scene, `github-${username}-${year}.gltf`);
    }
  }

  function downloadSTLModel() {
    if (sceneStore.scene) {
      exportSTDModel(sceneStore.scene, `github-${username}-${year}.stl`);
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center px-10 py-4">
          <p>
            Contribution of{" "}
            <span className="font-bold underline">
              {userInputStore.username}
            </span>{" "}
            in <span className="font-bold">{userInputStore.year}</span>
            {contributionStore.contributions?.totalContribution ? (
              <span>
                . Total:{" "}
                <strong className="font-bold">
                  {contributionStore.contributions?.totalContribution}
                </strong>
              </span>
            ) : null}
          </p>
          <div className="flex space-x-4">
            <Link
              href={usePathname() + "/embed?" + searchParams.toString()}
              className="btn btn-sm btn-secondary"
            >
              Embed Page
            </Link>
            <div className="dropdown dropdown-hover dropdown-left">
              <label tabIndex={0} className="btn btn-sm btn-secondary">
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
        </div>
        <ContributionVanilla provider={provider} username={username} />
      </div>
    </DefaultLayout>
  );
}
