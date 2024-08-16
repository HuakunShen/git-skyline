import { useEffect } from "react";
import Plot from "react-plotly.js";
import React from "react";

export default function GitHubStarHistory({
  username,
  repo,
}: {
  username: string;
  repo: string;
}) {
  const [starHistory, setStarHistory] = React.useState<
    { date: Date; count: number }[]
  >([]);

  useEffect(() => {
    fetch(`/api/star-history/github/${username}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        setStarHistory(data);
      });
  }, [username, repo]);

  return (
    <div>
      {starHistory.length > 0 ? (
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
            title: `Star History of ${username}/${repo}`,
            xaxis: { title: "Date" },
            yaxis: { title: "Stars" },
          }}
          // layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
