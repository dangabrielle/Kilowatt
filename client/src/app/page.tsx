"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Island from "../app/models/Island"; // Adjust the path as necessary
import Volcano from "../app/models/Volcano";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [-80, 30, 100], fov: 40 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* <Island /> */}
        <Volcano />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
