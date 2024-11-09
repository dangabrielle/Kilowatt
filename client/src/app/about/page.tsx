"use client";
import Island from "../models/Island";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sky from "../models/Sky";
import Link from "next/link";

const about = () => {
  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center">
      <div className="relative flex flex-col items-center justify-center z-10 mr-auto -mt-5 sm:ml-0 md:ml-20 lg:ml-48 sm:w-full md:w-1/2 lg:w-2/5 h-3/5 m-10 floatTextAbout text-center overflow-auto">
        <h1 className="sm:text-xl md:text-2xl lg:text-3xl break-words">
          HAWAI'I HACKATHON 2024
        </h1>
        <h2 className="sm:text-lg md:text-xl lg:text-2xl p-0.5 italic break-words">
          Hawai'i Keiki Museum Challenge
        </h2>
        <p className="p-3 sm:text-xs md:text-base lg:text-lg break-words">
          Aloha and welcome to Kilowatt Island Surge! -- an energy visualization
          application designed for Hawai'i keiki to learn about energy
          consumption in a typical household. This is a proof of concept
          software for the Hawai'i Keiki Museum's future playhouse, where
          children (ages 0-10) can switch appliances on/off and see how much
          energy is being utilized per second. The initiative of this project is
          to educate children to conserve as much energy as possible by keeping
          our appliances off when not in use.
        </p>
        <p className="p-3 sm:text-xs md:text-base lg:text-lg ">
          In this prototype, kids are taken to an island where their main goal
          is to keep it afloat! They can turn on an appliance (i.e, AC,
          refrigerator, ceiling light), see how much energy is being used up
          over time, and turn it off if it's reached max capacity (for the day).
          If the cumulative amount of energy has reached its maximum limit, the
          island will sink!
        </p>
        <button className="relative text-center hover:scale-105 active:scale-100 text-white z-50 bg-yellow-900 w-full max-w-xs shadow-gray-700 shadow-md hover:bg-yellow-700 bg-opacity-70 rounded-md p-2 text-xs md:text-md lg:text-base">
          <Link href="/api/auth/login">Try it out here!</Link>
        </button>
      </div>
      <div className="absolute w-full h-full z-0">
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