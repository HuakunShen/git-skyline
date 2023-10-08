"use client";
// This file is only responsible for rendering the 3D model, data should be passed in as props
import { type GitContribution } from "@git-skyline/common";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSceneStore } from "@/app/lib/store";
import { useSearchParams } from "next/navigation";

function normalize(count: number, base = 4, offset = 2): number {
  switch (true) {
    case count === 0:
      return base;
    case count > 40:
      return count;
    default:
      return count * (base + offset);
  }
}

interface PropType {
  data: GitContribution;
}

function Skyline({ data }: PropType): JSX.Element {
  const sceneStore = useSceneStore();
  const numRows = Math.floor(data.days.length / 7);
  const xOffset = (numRows * 12) / 2;
  const scene = useThree((state) => state.scene);

  const yOffset = 0;
  // useEffect(() => {
  //   const exporter = new GLTFExporter();

  // }, [scene]);
  useEffect(() => {
    sceneStore.setScene(scene.clone());
  }, [scene]);

  return (
    <>
      {data.days.map((dayData) => {
        const height = normalize(dayData.count);
        const { year, month, day } = dayData.date;
        return (
          <mesh
            key={`${year}-${month}-${day}`}
            position={[
              12 * dayData.week - xOffset,
              height / 2 + yOffset,
              dayData.weekday * 12,
            ]}
          >
            <boxGeometry args={[10, height, 10]} />
            <meshStandardMaterial color={dayData.color} />
          </mesh>
        );
      })}
    </>
  );
}

export default function ContributionModel({ data }: PropType): JSX.Element {
  const searchParams = useSearchParams();
  const enableZoom = searchParams.get("enableZoom") === "false" ? false : true; // default to true
  const enablePan = searchParams.get("enablePan") === "false" ? false : true; // default to true
  const enableDamping =
    searchParams.get("enableDamping") === "false" ? false : true; // default to true
  const autoRotate = searchParams.get("autoRotate");
  const autoRotateSpeed = searchParams.get("autoRotateSpeed");
  const parsedAutoRotateSpeed = autoRotateSpeed
    ? parseFloat(autoRotateSpeed)
    : 0.5;
  const parsedAutoRotate =
    autoRotate && parsedAutoRotateSpeed ? autoRotate === "false" : true;

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
      <Skyline data={data} />
    </Canvas>
  );
}
