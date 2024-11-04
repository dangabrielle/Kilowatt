import React from "react";
import { Canvas } from "@react-three/fiber";
import PorchLight from "../models/PorchLight";
import ProgressBar from "./ProgressBar";

interface ApplianceSceneProps {
  status: boolean;
  monthlyKWh: number;
}

const PorchLightScene = ({ status, monthlyKWh }: ApplianceSceneProps) => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas camera={{ position: [1, 0.5, 10], fov: 25 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 0, 10]} intensity={1} />

          <group position={[-0.15, -1, -0.5]}>
            <PorchLight />
          </group>
        </Canvas>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar status={status} monthlyKWh={monthlyKWh} />
      </div>
    </div>
  );
};

export default PorchLightScene;
