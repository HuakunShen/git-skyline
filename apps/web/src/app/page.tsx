"use client";
import { useRouter } from "next/navigation";
import { GitProvider } from "@git-skyline/common";
import { range } from "./lib/utils";
import { useUserInputStore } from "@/app/lib/store";
import DefaultLayout from "@/app/components/layouts/default";
import { RECENT_ONE_YEAR } from "@/app/lib/constant";

export default function Home(): JSX.Element {
  const router = useRouter();
  const now = new Date();
  const years: (number | string)[] = range(2008, now.getFullYear()).reverse();
  years.unshift(RECENT_ONE_YEAR);
  const userInputStore = useUserInputStore();

  function go(): void {
    if (!userInputStore.username) {
      return;
    }
    let url = `/contribution/${GitProvider.Enum.github}/${userInputStore.username}`;
    if (/^\d{4}$/.test(userInputStore.year.toString())) {
      url += `?year=${userInputStore.year}`;
    }
    router.push(url);
  }

  return (
    <DefaultLayout>
      <main className="h-full flex justify-center items-center ">
        <div className="flex flex-col items-center space-y-8 px-5">
          <h1 className="text-5xl font-bold bg-gradient-to-r to-danger bg-clip-text text-transparent from-indigo-500 via-purple-500 to-pink-500">
            Your GitHub Story in 3D
          </h1>

          <p className="text-lg">
            View a 3D model of your GitHub contribution graph. Share it, print
            it, and more!
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
                  className="input input-bordered join-item border border-secondary rounded-l-full w-32"
                  onChange={(e) => {
                    userInputStore.setUsername(e.target.value.trim());
                  }}
                  placeholder="@github_username"
                  value={userInputStore.username}
                />
              </div>
            </div>
            <select
              className="select select-bordered join-item border border-secondary"
              onChange={(e) => {
                userInputStore.setYear(e.target.value);
              }}
              value={userInputStore.year}
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
              Skyline
            </button>
          </form>
        </div>
      </main>
    </DefaultLayout>
  );
}
