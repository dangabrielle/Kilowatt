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
        <div className=" w-1/3 flex flex-col justify-evenly bg-slate-300">
          <div>
            <AirConditionerScene />
          </div>
          <div>
            <Canvas camera={{ position: [-30, 0, 70], fov: 60 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={8} />
              {/* <group position={[0, 0, 0]}> */}
              <Refrigerator />
              {/* </group> */}

              {/* <OrbitControls /> */}
            </Canvas>
          </div>
          <div>
            <Canvas camera={{ position: [0, -200, 500], fov: 60 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={8} />
              {/* <group position={[0, 0, 0]}> */}
              <CeilingFan />
              {/* </group> */}

              {/* <OrbitControls /> */}
            </Canvas>
          </div>

          <div>
            <Canvas camera={{ position: [1, 0.5, 1], fov: 70 }}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 0, 10]} intensity={1} />

              <group position={[-0.5, -0.5, -0.5]}>
                {/* Move ElectricOven 2 units to the left */}
                <ElectricOven />
              </group>
              {/* <OrbitControls /> */}
            </Canvas>
          </div>
        </div>
        <div className="w-2/3">
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
