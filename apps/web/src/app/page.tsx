"use client";
import { useRouter } from "next/navigation";
import { range } from "@/app/lib/utils";
import { useState } from "react";
import { GitProvider } from "@git-skyline/common";

export default function Home() {
  const router = useRouter();
  const now = new Date();
  const years = range(2008, now.getFullYear()).reverse();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [username, setUsername] = useState("");

  function go() {
    if (!username) {
      alert("Please enter a GitHub username");
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
                placeholder="@github_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <select
            className="select select-bordered join-item border border-secondary"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <button
            className="btn btn-secondary join-item rounded-r-full"
            type="submit"
            onClick={go}
          >
            Create a Skyline
          </button>
        </form>
      </div>
    </main>
  );
}
