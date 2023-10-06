"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Model() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
}

export default function Contribution() {
  return (
    <Suspense fallback={null}>
      <Canvas fallback={null}>
        <Model />
      </Canvas>
    </Suspense>
  );
}
