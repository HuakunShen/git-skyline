"use client";
import { type GitContribution } from "@git-skyline/common";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
// import {GLTFExporter} from 'three/build/'
// import { STLExporter } from "three/addons/exporters/STLExporter.js";

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

function save(blob: Blob, filename: string): void {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveArrayBuffer(buffer: ArrayBuffer, filename: string): void {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

function saveString(text: string, filename: string): void {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function Skyline({ data }: PropType): JSX.Element {
  const numRows = Math.floor(data.days.length / 7);
  const xOffset = (numRows * 12) / 2;
  // const scene = useThree((state) => state.scene);
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
  return (
    <Canvas shadows>
      {/* <axesHelper args={[100]} /> */}
      <PerspectiveCamera fov={60} makeDefault position={[10, 400, 500]}>
        <OrbitControls autoRotate={true} autoRotateSpeed={0.5} enableDamping />
      </PerspectiveCamera>
      {/* <ambientLight intensity={0.4} color="#fff" /> */}

      <directionalLight color="#fff" position={[0, 200, 200]} />
      <directionalLight color="#fff" position={[0, 200, -200]} />
      <Skyline data={data} />
    </Canvas>
  );
}
