import React from "react";
import ProgressBar from "./ProgressBar";
import Refrigerator from "../models/Refrigerator";
import { Canvas } from "@react-three/fiber";
import { ApplianceSceneProps } from "../../../types";

const RefrigeratorScene = ({
  status,
  monthlyKWh,
  onPercentageChange,
}: ApplianceSceneProps) => {
  return (
    <div className="flex flex-row h-full items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas camera={{ position: [-30, 0, 40], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={8} />
          <group position={[-2, 10, 0]}>
            <Refrigerator status={status} />
          </group>
        </Canvas>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar
          status={status}
          monthlyKWh={monthlyKWh}
          onPercentageChange={onPercentageChange}
        />
      </div>
    </div>
  );
};

export default RefrigeratorScene;
