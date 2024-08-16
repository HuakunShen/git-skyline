"use client";
import DefaultLayout from "@/app/components/layouts/default";
import React, { FormEvent } from "react";
import Plot from "react-plotly.js";

export default function Home(): JSX.Element {
  const [starHistory, setStarHistory] = React.useState<
    { date: Date; count: number }[]
  >([]);

  const [repoName, setRepoName] = React.useState<string>(
    "CrossCopy/tauri-plugin-clipboard"
  );

  const username = repoName.split("/")[0];
  const repo = repoName.split("/")[1];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    fetch(`/api/star-history/github/${username}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        setStarHistory(data);
      });
  }

  return (
    <DefaultLayout>
      <main className="px-10 py-5">
        <form onSubmit={onSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Enter Repo Name</span>
            </div>
            <input
              type="text"
              placeholder="<username>/<repo name>"
              className="input input-bordered input-secondary w-full max-w-xs"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
            <button className="btn" type="submit">
              Submit
            </button>
          </label>
        </form>
        {starHistory.length > 0 && (
          <Plot
            data={[
              {
                x: starHistory.map((d) => d.date),
                y: starHistory.map((d) => d.count),
                type: "scatter",
                // mode: "lines+markers",
                // marker: { color: "red" },
              },
              // { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{
              title: `Star History of ${repoName}`,
              xaxis: { title: "Date" },
              yaxis: { title: "Stars" },
            }}
            // layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
          />
        )}
      </main>
    </DefaultLayout>
  );
}
