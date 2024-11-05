import React from "react";
import { Canvas } from "@react-three/fiber";
import ProgressBar from "./ProgressBar";
import CeilingLight from "../models/CeilingLight";
import { OrbitControls } from "@react-three/drei";
import { ApplianceSceneProps } from "../../../types";
import { Suspense } from "react";

const CeilingLightScene = ({
  status,
  monthlyKWh,
  onPercentageChange,
}: ApplianceSceneProps) => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas
          camera={{ position: [0, 2, 10], fov: 10 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={8} />
            <group position={[0, -0.15, 0]}>
              <CeilingLight status={status} />
            </group>
          </Suspense>
          {/* <OrbitControls /> */}
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

export default CeilingLightScene;
