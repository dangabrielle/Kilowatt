"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Volcano from "../models/Volcano";
import Sky from "../models/Sky";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";

const login = () => {
  const audioPlayback = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioPlayback.current?.play();
  }, []);

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center">
        <div className="absolute z-10 w-1/3 h-2/5 pt-16">
          <div className="relative flex flex-col items-center z-50 text-center sm:text-s md:text-base lg:text-lg xl:text-xl 2xl:text-2xl floatText">
            <h1>HAWAI&apos;I HACKATHON 2024</h1>
            <h1>Hawai&apos;i Keiki Museum Challenge</h1>
            <h1 className="relative text-stone-800 p-2 pb-0 bg-opacity-70 mt-2 text-center sm:text-xs md:text-base lg:text-lg">
              <em>KILOWATT ISLAND SURGE</em>
            </h1>
            <button className="relative text-center hover:scale-100 active:scale-105 text-amber-900 z-50 pl-3 pr-3 pt-1 pb-1 m-1 mt-0 hover:bg-amber-900 hover:text-white hover:bg-opacity-50 rounded-full text-xs md:text-md lg:text-base ">
              <Link href="/about">
                <em>About this project</em>
              </Link>
            </button>
            <button className="relative text-center pl-4 pr-4 pt-1 pb-1 m-1 mb-2 hover:scale-105 active:scale-110 text-white z-50 bg-yellow-900 shadow-gray-700 shadow-md hover:bg-yellow-700 bg-opacity-70 rounded-md p-2 text-xs md:text-md lg:text-base">
              <a href="/api/auth/login">Login or Sign Up</a>
            </button>
          </div>
        </div>
        <div className="h-screen w-screen z-0">
          <Canvas camera={{ position: [-60, 10, 80], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={2} />
              <group position={[0, -10, 0]} scale={0.285}>
                <Sky />
              </group>
              <group position={[0, -20, 0]} scale={0.7}>
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <Volcano cumulativePercentage={0} />
              </group>
              <OrbitControls />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default login;
