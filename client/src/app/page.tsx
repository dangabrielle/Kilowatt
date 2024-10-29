"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Island from "../app/models/Island"; // Adjust the path as necessary
import Volcano from "../app/models/Volcano";
import AirConditioner from "../app/models/AirConditioner";
import Refrigerator from "../app/models/Refrigerator";
import CeilingFan from "../app/models/CeilingFan";
import ElectricOven from "../app/models/ElectricOven";
import { OrbitControls } from "@react-three/drei";
import ProgressBar from "./components/ProgressBar";
import AirConditionerScene from "./components/AirConditionerScene";
import RefrigeratorScene from "./components/RefrigeratorScene";
import CeilingFanScene from "./components/CeilingFanScene";
import ElectricOvenScene from "./components/ElectricOvenScene";

export default function Home() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {" "}
        <div className="w-1/2 flex h-full flex-row items-center justify-evenly bg-slate-300">
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div>
              <AirConditionerScene />
            </div>
            <div>
              <RefrigeratorScene />
            </div>
            <div>
              <CeilingFanScene />
            </div>

            <div>
              <ElectricOvenScene />
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="w-1/2">
          <Canvas camera={{ position: [-60, 10, 80], fov: 50 }}>
            <ambientLight intensity={2} />

            <group position={[0, -10, 0]} scale={0.7}>
              <directionalLight position={[5, 10, 5]} intensity={1} />
              <Volcano />
            </group>
            {/* <OrbitControls /> */}
          </Canvas>
        </div>
      </div>
    </>
  );
}
