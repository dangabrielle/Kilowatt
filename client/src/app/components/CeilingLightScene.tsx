import React from "react";
import { Canvas } from "@react-three/fiber";
import ProgressBar from "./ProgressBar";
import CeilingLight from "../models/CeilingLight";
import { OrbitControls } from "@react-three/drei";
const CeilingLightScene = () => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas camera={{ position: [0, 2, 10], fov: 10 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={8} />
          <group position={[0, -0.15, 0]}>
            <CeilingLight />
          </group>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar />
      </div>
    </div>
  );
};

export default CeilingLightScene;
