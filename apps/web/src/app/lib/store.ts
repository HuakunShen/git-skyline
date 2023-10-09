import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Scene } from "three";
import { GitContribution } from "@git-skyline/common";

const now = new Date();

export type State = {
  username: string;
  year: string;
  setUsername: (username: string) => void;
  setYear: (year: string) => void;
};

export const useUserInputStore = create<State, [["zustand/persist", unknown]]>(
  persist(
    (set, get) => ({
      username: "",
      year: "Recent 1 Year",
      setUsername: (username: string) => set((state) => ({ username })),
      setYear: (year: string) => set((state) => ({ year })),
    }),
    {
      name: "user-input-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export type SceneState = {
  // gltfSceneContent: SceneType;
  scene: Scene | null;
  setScene: (scene: Scene) => void;
  // setGltfSceneContent: (scene: SceneType) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  // gltfSceneContent: null,
  scene: null,
  setScene: (scene: Scene) => set((state) => ({ scene })),
  // setGltfSceneContent: (scene: SceneType) =>
  //   set((state) => ({ gltfSceneContent: scene })),
}));

export type ContributionCacheState = {
  contributions: GitContribution | null;
  fetchDate: Date | null;
  url: string;
  setContributions: (contributions: GitContribution) => void;
  setFetchDate: (date: Date) => void;
  setUrl: (url: string) => void;
};

export const useContributionsStore = create<
  ContributionCacheState,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, get) => ({
      contributions: null,
      fetchDate: null,
      url: "",
      setContributions: (contributions: GitContribution) => {
        set({ contributions });
      },
      setFetchDate: (date: Date) => {
        set({ fetchDate: date });
      },
      setUrl: (url: string) => {
        set({ url });
      },
    }),
    {
      name: "contributions-cache-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
