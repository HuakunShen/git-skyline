import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Scene } from "three";

const now = new Date();

export type State = {
  username: string;
  year: number;
  setUsername: (username: string) => void;
  setYear: (year: number) => void;
};

export const useUserInputStore1 = create<State>((set) => ({
  username: "",
  year: now.getFullYear(),
  setUsername: (username: string) => set((state) => ({ username })),
  setYear: (year: number) => set((state) => ({ year })),
}));

export const useUserInputStore = create<State, [["zustand/persist", unknown]]>(
  persist(
    (set, get) => ({
      username: "",
      year: now.getFullYear(),
      setUsername: (username: string) => set((state) => ({ username })),
      setYear: (year: number) => set((state) => ({ year })),
    }),
    {
      name: "user-input-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type SceneType = ArrayBuffer | string | null;

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
