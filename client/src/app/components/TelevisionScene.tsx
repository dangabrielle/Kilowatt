import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Television from "../models/Television";
import ProgressBar from "./ProgressBar";
import { ApplianceSceneProps } from "../../../types";

const TelevisionScene = ({
  status,
  monthlyKWh,
  onPercentageChange,
}: ApplianceSceneProps) => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 60 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={8} />
            <group position={[-0.3, -0.1, 0]}>
              <Television status={status} />
            </group>
          </Suspense>
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

export default TelevisionScene;
