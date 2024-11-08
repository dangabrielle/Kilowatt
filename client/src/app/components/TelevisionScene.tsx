import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Television from "../models/Television";
import ProgressBar from "./ProgressBar";
import { ApplianceSceneProps } from "../../../types";

const TelevisionScene = ({
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
        <p className="sm:text-xs md:text-sm 2xl:text-base -mt-2 text-center">
          TV {text}
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

export default TelevisionScene;
