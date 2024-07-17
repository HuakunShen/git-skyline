"use client";
// This file is only responsible for rendering the 3D model, data should be passed in as props
import { type GitContribution } from "@git-skyline/common";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSceneStore } from "@/app/lib/store";
import { useSearchParams } from "next/navigation";

function normalize(count: number, minHeight = 4, base = 4, offset = 2): number {
  switch (true) {
    case count === 0:
      return minHeight;
    case count > 40:
      return count;
    default:
      return count * (base + offset);
  }
}

interface PropType {
  data: GitContribution;
}

function Skyline({ data, base }: PropType & { base: boolean }): JSX.Element {
  const sceneStore = useSceneStore();
  const numRows = Math.floor(data.days.length / 7);
  const xOffset = (numRows * 12) / 2;
  const scene = useThree((state) => state.scene);
  const yOffset = 0;
  const baseHeight = 10;

  useEffect(() => {
    setTimeout(() => {
      sceneStore.setScene(scene.clone());
    }, 1000);
  }, []);

  return (
    <>
      {data.days.map((dayData) => {
        const height = normalize(dayData.count, base ? 0 : 4); // if model base added, set minimum height to 0
        const { year, month, day } = dayData.date;
        return (
          <mesh
            key={`${year}-${month}-${day}`}
            position={[
              12 * dayData.week - xOffset,
              height / 2 + yOffset,
              dayData.weekday * 12 - 12 * 3, // center the model in weekday-axis
            ]}
          >
            <boxGeometry args={[10, height, 10]} />
            <meshStandardMaterial color={dayData.color} />
          </mesh>
        );
      })}
      {base && (
        <mesh position={[0, -baseHeight / 2 + yOffset + 1, 0]}>
          <boxGeometry args={[12 * 54, baseHeight, 12 * 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}
    </>
  );
}

export default function ContributionModel({ data }: PropType): JSX.Element {
  const searchParams = useSearchParams();
  const enableZoom = searchParams.get("enableZoom") === "false" ? false : true; // default to true
  const enablePan = searchParams.get("enablePan") === "false" ? false : true; // default to true
  const enableBase = searchParams.get("base") === "true" ? true : false;
  const enableDamping =
    searchParams.get("enableDamping") === "false" ? false : true; // default to true
  const autoRotate = searchParams.get("autoRotate");
  const autoRotateSpeed = searchParams.get("autoRotateSpeed");
  const parsedAutoRotateSpeed = autoRotateSpeed
    ? parseFloat(autoRotateSpeed)
    : 0.5;
  const parsedAutoRotate =
    autoRotate && parsedAutoRotateSpeed ? autoRotate !== "false" : true;

  return (
    <Canvas shadows>
      <PerspectiveCamera fov={60} makeDefault position={[10, 400, 500]}>
        <OrbitControls
          autoRotate={parsedAutoRotate}
          autoRotateSpeed={parsedAutoRotateSpeed}
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableDamping={enableDamping}
        />
      </PerspectiveCamera>
      <directionalLight color="#fff" position={[0, 200, 200]} />
      <directionalLight color="#fff" position={[-100, 100, 100]} />
      <directionalLight color="#fff" position={[200, 100, 100]} />
      <directionalLight color="#fff" position={[0, 200, -200]} />
      <Skyline data={data} base={enableBase} />
    </Canvas>
  );
}
