import React from "react";
import { Canvas } from "@react-three/fiber";
import Television from "../models/Television";
import ProgressBar from "./ProgressBar";
interface ApplianceSceneProps {
  status: boolean;
  monthlyKWh: number;
}
const TelevisionScene = ({ status, monthlyKWh }: ApplianceSceneProps) => {
  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex items-center">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={8} />
          <group position={[-0.3, -0.1, 0]}>
            <Television status={status} />
          </group>
        </Canvas>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar status={status} monthlyKWh={monthlyKWh} />
      </div>
    </div>
  );
};

export default TelevisionScene;
