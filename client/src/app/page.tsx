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

export default function Home() {
  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        {" "}
        <div className="h-1/2 w-full flex flex-row justify-evenly bg-slate-300">
          <div>
            <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={8} />
              {/* <group position={[0, 0, 0]}> */}
              <AirConditioner />
              {/* </group> */}

              <OrbitControls />
            </Canvas>
          </div>
          <div>
            <Canvas camera={{ position: [-30, 0, 70], fov: 60 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={8} />
              {/* <group position={[0, 0, 0]}> */}
              <Refrigerator />
              {/* </group> */}

              <OrbitControls />
            </Canvas>
          </div>
          <div>
            <Canvas camera={{ position: [0, -200, 500], fov: 60 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 10]} intensity={8} />
              {/* <group position={[0, 0, 0]}> */}
              <CeilingFan />
              {/* </group> */}

              <OrbitControls />
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
              <OrbitControls />
            </Canvas>
          </div>
        </div>
        <div className="fixed h-1/2 bottom-0 left-0 w-full ">
          <Canvas camera={{ position: [-80, 10, 1], fov: 50 }}>
            <ambientLight intensity={2} />

            <group position={[0, -10, 0]}>
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <Volcano />
            </group>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </>
  );
}
