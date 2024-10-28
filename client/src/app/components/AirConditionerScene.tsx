import React from "react";
import ProgressBar from "./ProgressBar";
import { Canvas } from "@react-three/fiber";
import AirConditioner from "../models/AirConditioner";
import { OrbitControls } from "@react-three/drei";

const AirConditionerScene = () => {
  return (
    <div className="flex flex-row items-center justify-evenly content-center">
      <div className="w-1/2 flex items-center">
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={8} />
          <group position={[0, -1, 0]}>
            <AirConditioner />
          </group>

          <OrbitControls />
        </Canvas>
      </div>
      <div className="w-1/2 flex justify-center">
        <ProgressBar />
      </div>
    </div>
  );
};

export default AirConditionerScene;
