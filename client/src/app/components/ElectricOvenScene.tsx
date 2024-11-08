import React, { Suspense, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Canvas } from "@react-three/fiber";
import ElectricOven from "../models/ElectricOven";
import { ApplianceSceneProps } from "../../../types";

const ElectricOvenScene = ({
  status,
  monthlyKWh,
  onPercentageChange,
}: ApplianceSceneProps) => {
  const [text, setText] = useState("");
  const handleChange = (newPercentage: number) => {
    if (newPercentage === 0) {
      setText("");
    } else if (newPercentage < 50) {
      setText(": 🏄🏼‍♂️  GOOD");
    } else if (newPercentage < 85) {
      setText(": 🤷🏽‍♂️  OK");
    } else if (newPercentage < 100) {
      setText(": 🤯 BAD");
    } else if (newPercentage == 100) {
      setText(": TURN OFF!!");
    }
  };

  return (
    <div className="flex h-full flex-row items-center justify-evenly content-center">
      <div className="w-3/4 flex flex-col items-center">
        <Canvas
          camera={{ position: [1, 0.5, 1], fov: 25 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 0, 10]} intensity={1} />

            <group position={[-1.2, -0.65, -0.5]}>
              <ElectricOven status={status} />
            </group>
          </Suspense>
        </Canvas>
        <p className="sm:text-xs md:text-sm 2xl:text-base -mt-3 text-center">
          Electric Oven {text}
        </p>
      </div>
      <div className="relative flex items-center justify-center w-1/2 h-5/6">
        <ProgressBar
          status={status}
          monthlyKWh={monthlyKWh}
          onPercentageChange={onPercentageChange}
          onNewText={(newPercentage) => {
            handleChange(newPercentage);
          }}
        />
      </div>
    </div>
  );
};

export default ElectricOvenScene;
