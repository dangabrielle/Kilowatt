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
import Sky from "./models/Sky";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [acUnitMessage, setAcUnitMessage] = useState({
    ac: false,
    refrigerator: false,
    ceilingFan: false,
    oven: false,
    tv: false,
    washerDryer: false,
    porchLight: false,
    ceilingLight: false,
  });

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
    socket.on("applianceStatuses", (data) => {
      setAcUnitMessage(data);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ac unit");
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-evenly bg-slate-200">
        <div className="w-2/5 flex h-full flex-row items-center justify-around gap-x-5 mr-10 ml-10">
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div className="m-2 pl-5  bg-slate-300 rounded-3xl">
              <AirConditionerScene />
            </div>
            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <RefrigeratorScene />
            </div>
            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <CeilingFanScene />
            </div>

            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <ElectricOvenScene />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <TelevisionScene />
            </div>
            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <WasherDryerScene />
            </div>
            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <PorchLightScene />
            </div>
            <div className="m-2 pl-5 bg-slate-300 rounded-3xl">
              <CeilingLightScene />
            </div>
          </div>
        </div>

        <div className="w-3/5">
          <div className="absolute z-10">
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <p>Transport: {transport}</p>
            <p>AC: {acUnitMessage.ac ? "on" : "off"}</p>
            <p>Refrigerator: {acUnitMessage.refrigerator ? "on" : "off"}</p>
            <p>Ceiling Fan: {acUnitMessage.ceilingFan ? "on" : "off"}</p>
            <p>Oven: {acUnitMessage.oven ? "on" : "off"}</p>
            <p>TV: {acUnitMessage.tv ? "on" : "off"}</p>
            <p>WasherDryer: {acUnitMessage.washerDryer ? "on" : "off"}</p>
            <p>PorchLight: {acUnitMessage.porchLight ? "on" : "off"}</p>
            <p>CeilingLight: {acUnitMessage.ceilingLight ? "on" : "off"}</p>
          </div>
          <div className="h-full z-0">
            <Canvas camera={{ position: [-60, 10, 80], fov: 50 }}>
              <ambientLight intensity={2} />
              <group position={[0, -10, 0]} scale={0.25}>
                <Sky />
              </group>
              <group position={[0, -15, 0]} scale={0.7}>
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <Volcano />
              </group>
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}
