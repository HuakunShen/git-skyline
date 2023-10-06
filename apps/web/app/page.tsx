"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GitProvider } from "@git-skyline/common";
import { range } from "./lib/utils";

export default function Home(): JSX.Element {
  const router = useRouter();
  const now = new Date();
  const years = range(2008, now.getFullYear()).reverse();
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [username, setUsername] = useState("");

  function go(): void {
    if (!username) {
      // alert("Please enter a GitHub username");
      return;
    }

    router.push(
      `/contribution/${GitProvider.Enum.github}/${username}?year=${selectedYear}`
    );
  }

  return (
    <main className="h-full flex justify-center items-center ">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-bold">Your GitHub Story in 3D</h1>
        <p className="text-lg">
          View a 3D model of your GitHub contribution graph. Share it, print it,
          and more!
        </p>
        <form
          className="join"
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
        >
          <div>
            <div>
              <input
                className="input input-bordered join-item border border-secondary"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="@github_username"
                value={username}
              />
            </div>
          </div>
          <select
            className="select select-bordered join-item border border-secondary"
            onChange={(e) => {
              setSelectedYear(parseInt(e.target.value));
            }}
            value={selectedYear}
          >
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <button
            className="btn btn-secondary join-item rounded-r-full"
            onClick={go}
            type="submit"
          >
            Create a Skyline
          </button>
        </form>
      </div>
    </main>
  );
}
