"use client";
import { Canvas } from "@react-three/fiber";
import { GitContribution } from "@git-skyline/common";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { STLExporter } from "three/addons/exporters/STLExporter.js";

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

interface Props {
  data: GitContribution;
}

function save(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

function saveString(text: string, filename: string) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function Skyline({ data }: Props) {
  const numRows = Math.floor(data.days.length / 7);
  const xOffset = (numRows * 12) / 2;
  const scene = useThree((state) => state.scene);
  const yOffset = 0;
  //   useEffect(() => {
  //     console.log(scene);
  //     const exporter = new GLTFExporter();
  //     exporter.parse(
  //       scene,
  //       (gltf) => {
  //         console.log(gltf);
  //         if (gltf instanceof ArrayBuffer) {
  //           saveArrayBuffer(gltf, "scene.glb");
  //         } else {
  //           const output = JSON.stringify(gltf, null, 2);
  //           console.log(output);
  //           saveString(output, "scene.gltf");
  //         }
  //       },
  //       function (error) {
  //         console.log(error);
  //       },
  //       {
  //         trs: true,
  //         onlyVisible: true,
  //         binary: false,
  //         maxTextureSize: 4096,
  //       }
  //     );
  //   }, [scene]);
  return (
    <>
      {data.days.map((day, idx) => {
        const height = normalize(day.count);

        return (
          <mesh
            key={idx}
            position={[
              12 * day.week - xOffset,
              height / 2 + yOffset,
              day.weekday * 12,
            ]}
          >
            <boxGeometry args={[10, height, 10]} />
            <meshStandardMaterial color={day.color} />
          </mesh>
        );
      })}
    </>
  );
}

export default function ContributionModel({ data }: Props) {
  return (
    <Canvas shadows>
      {/* <axesHelper args={[100]} /> */}
      <PerspectiveCamera makeDefault position={[10, 400, 500]} fov={60}>
        <OrbitControls enableDamping autoRotate={false} autoRotateSpeed={0.5} />
      </PerspectiveCamera>
      {/* <ambientLight intensity={0.4} color="#fff" /> */}

      <directionalLight color="#fff" position={[0, 200, 200]} />
      <directionalLight color="#fff" position={[0, 200, -200]} />
      <Skyline data={data} />
    </Canvas>
  );
}
