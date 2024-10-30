import React from "react";
import ProgressBar from "./ProgressBar";
import { Canvas } from "@react-three/fiber";
import AirConditioner from "../models/AirConditioner";

const AirConditionerScene = () => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-1/2 flex items-center">
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={8} />
          <group position={[0, -1, 0]}>
            <AirConditioner />
          </group>
        </Canvas>
      </div>
      <div className="relative ml-5 w-1/2 h-5/6 ">
        <ProgressBar />
      </div>
    </div>
  );
};

export default AirConditionerScene;
