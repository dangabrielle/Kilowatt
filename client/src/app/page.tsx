"use client";
import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { Canvas } from "@react-three/fiber";
import Volcano from "../app/models/Volcano";
import { OrbitControls } from "@react-three/drei";
import AirConditionerScene from "./components/AirConditionerScene";
import RefrigeratorScene from "./components/RefrigeratorScene";
import CeilingFanScene from "./components/CeilingFanScene";
import ElectricOvenScene from "./components/ElectricOvenScene";
import TelevisionScene from "./components/TelevisionScene";
import WasherDryerScene from "./components/WasherDryerScene";
import PorchLightScene from "./components/PorchLightScene";
import CeilingLightScene from "./components/CeilingLightScene";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [acUnitMessage, setAcUnitMessage] = useState("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // to receive messages, use socket.on
    // to send messages, use socket.emit

    // testing ac unit websocket connection sample
    socket.on("ac unit", (data) => {
      setAcUnitMessage(data.message);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

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
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div>
              <TelevisionScene />
            </div>
            <div>
              <WasherDryerScene />
            </div>
            <div>
              <PorchLightScene />
            </div>
            <div>
              <CeilingLightScene />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <p>Transport: {transport}</p>
            <p>
              AC Unit Message: {acUnitMessage ? acUnitMessage : "Nothing yet."}
            </p>
          </div>
          <Canvas camera={{ position: [-60, 10, 80], fov: 50 }}>
            <ambientLight intensity={2} />

            <group position={[0, -10, 0]} scale={0.7}>
              <directionalLight position={[5, 10, 5]} intensity={1} />
              <Volcano />
            </group>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </>
  );
}
