import React, { Suspense, useState } from "react";
import ProgressBar from "./ProgressBar";
import Refrigerator from "../models/Refrigerator";
import { Canvas } from "@react-three/fiber";
import { ApplianceSceneProps } from "../../../types";

const RefrigeratorScene = ({
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
    <div className="flex flex-row h-full items-center justify-evenly content-center">
      <div className="w-3/4 flex flex-col items-center">
        <Canvas
          camera={{ position: [-30, 0, 40], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={8} />
            <group position={[-2, 10, 0]}>
              <Refrigerator status={status} />
            </group>
          </Suspense>
        </Canvas>
        <p className="sm:text-xs md:text-sm 2xl:text-base -mt-1 text-center">
          Refrigerator {text}
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

export default RefrigeratorScene;
