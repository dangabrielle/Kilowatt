"use client";
import Island from "../models/Island";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Sky from "../models/Sky";

const about = () => {
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="absolute z-10 w-1/2 h-full">about</div>
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [65, 19, 80], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={2} />
            <group position={[0, -10, 0]} scale={0.3}>
              <Sky />
            </group>
            <group position={[65, 10, 0]} scale={40}>
              <directionalLight position={[5, 10, 5]} intensity={2} />
              <Island />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default about;
