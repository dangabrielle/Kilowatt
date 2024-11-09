"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Volcano from "../models/Volcano";
import Sky from "../models/Sky";
import Link from "next/link";

const login = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center">
        <div className="absolute z-10 w-1/3 h-2/5 pt-16">
          <div className="relative flex flex-col items-center z-50 text-center sm:text-s md:text-base lg:text-lg xl:text-xl 2xl:text-2xl floatText">
            <h1>HAWAI'I HACKATHON 2024</h1>
            <h1>Hawai'i Keiki Museum Challenge</h1>
            <h1 className="relative text-stone-800 p-2 bg-opacity-70 mt-2 text-center text-xs md:text-md lg:text-base">
              <em>KILOWATT ISLAND SURGE</em>
            </h1>
            <button className="relative text-center  hover:scale-105 active:scale-110 text-white z-50 bg-yellow-900 w-1/2 shadow-gray-700 shadow-md hover:bg-yellow-700 bg-opacity-70 rounded-md p-2 text-xs md:text-md lg:text-base">
              <Link href="/api/auth/login">Login of Sign Up</Link>
            </button>
            <button>
              <Link href="/about">About this project</Link>
            </button>
          </div>
        </div>
        <div className="h-screen w-screen z-0">
          <Canvas
            camera={{ position: [-60, 10, 80], fov: 50 }}
            // style={{ width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={2} />
              <group position={[0, -10, 0]} scale={0.285}>
                <Sky />
              </group>
              <group position={[0, -20, 0]} scale={0.7}>
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <Volcano cumulativePercentage={0} />
              </group>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default login;
