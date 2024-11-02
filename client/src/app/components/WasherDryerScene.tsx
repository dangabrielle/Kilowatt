import React from "react";
import { Canvas } from "@react-three/fiber";
import ProgressBar from "./ProgressBar";
import WasherDryer from "../models/WasherDryer";

const WasherDryerScene = () => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas camera={{ position: [0, 0, 10], fov: 80 }}>
          <ambientLight intensity={9} />
          <directionalLight position={[1, 2, 9]} intensity={50} />
          <group position={[-7, -5, 0]}>
            <WasherDryer />
          </group>
        </Canvas>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar />
      </div>
    </div>
  );
};

export default WasherDryerScene;
