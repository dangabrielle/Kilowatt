import React, { Suspense, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Canvas } from "@react-three/fiber";
import AirConditioner from "../models/AirConditioner";
import { ApplianceSceneProps } from "../../../types";

const AirConditionerScene = ({
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
    <div className="flex h-full  flex-row items-center justify-evenly content-center rounded-3xl">
      <div className="w-3/4 flex flex-col items-center">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          className="w-full h-screen"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={8} />
            <group position={[0, -0.8, 0]}>
              <AirConditioner status={status} />
            </group>
          </Suspense>
        </Canvas>
        <div>
          <p className="sm:text-xs md:text-sm 2xl:text-base -mt-5 text-center">
            Air Conditioner {text}
          </p>
        </div>
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

export default AirConditionerScene;
