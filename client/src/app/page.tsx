"use client";
import React, { Suspense } from "react";
import { useState, useEffect, useRef } from "react";
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
import { col } from "framer-motion/client";

type ApplianceStatus = {
  ac: boolean;
  refrigerator: boolean;
  ceilingFan: boolean;
  oven: boolean;
  tv: boolean;
  washerDryer: boolean;
  porchLight: boolean;
  ceilingLight: boolean;
};

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [cumulativePercentage, setCumulativePercentage] = useState(0);

  const [percentage, setPercentage] = useState({
    ac: 0,
    refrigerator: 0,
    ceilingFan: 0,
    oven: 0,
    tv: 0,
    washerDryer: 0,
    porchLight: 0,
    ceilingLight: 0,
  });

  const [applianceStatus, setApplianceStatus] = useState<ApplianceStatus>({
    ac: false,
    refrigerator: false,
    ceilingFan: false,
    oven: false,
    tv: false,
    washerDryer: false,
    porchLight: false,
    ceilingLight: false,
  });

  // monthly kWh
  const energyConsumedPerMonth = {
    ac: 302.67,
    refrigerator: 45.5,
    ceilingFan: 2.67,
    oven: 28.08,
    tv: 17.25,
    washerDryer: 64.08,
    porchLight: 18.25,
    ceilingLight: 58.17,
  };

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

    socket.on("applianceStatuses", (data) => {
      setApplianceStatus(data);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ac unit");
    };
  }, []);

  const handlePercentageChange = (appliance: string, newPercentage: number) => {
    setPercentage((prev) => ({ ...prev, [appliance]: newPercentage }));
  };

  const colorPanel = (percentage: number) => {
    if (percentage < 70) {
      return "bg-emerald-500 bg-opacity-40";
    } else if (percentage < 85) {
      return "bg-amber-500 bg-opacity-80";
    } else {
      return "bg-red-500 bg-opacity-85 shake";
    }
  };

  useEffect(() => {
    const currentSum = Object.values(percentage).reduce(
      (acc, curr) => acc + curr
    );
    const total = Object.entries(percentage).length * 100;
    setCumulativePercentage((currentSum / total) * 100);
    console.log(cumulativePercentage);
  }, [percentage]);

  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-evenly bg-slate-200">
        <div className="w-2/5 flex h-full flex-row items-center justify-evenly gap-x-5 p-10 pl-7">
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div
              className={`w-full h-full m-2 pl-5 ${
                applianceStatus.ac ? colorPanel(percentage.ac) : "bg-slate-300"
              } rounded-3xl`}
            >
              <AirConditionerScene
                status={applianceStatus.ac}
                monthlyKWh={energyConsumedPerMonth.ac}
                onPercentageChange={(newPercentage) => {
                  handlePercentageChange("ac", newPercentage);
                }}
              />
            </div>
            <div
              className={`w-full h-full m-2 pl-5 ${
                applianceStatus.refrigerator
                  ? colorPanel(percentage.refrigerator)
                  : "bg-slate-300"
              }  rounded-3xl`}
            >
              <RefrigeratorScene
                status={applianceStatus.refrigerator}
                monthlyKWh={energyConsumedPerMonth.refrigerator}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("refrigerator", newPercentage)
                }
              />
            </div>
            <div
              className={`m-2 w-full h-full pl-5 ${
                applianceStatus.ceilingFan
                  ? colorPanel(percentage.ceilingFan)
                  : "bg-slate-300"
              }  rounded-3xl`}
            >
              <CeilingFanScene
                status={applianceStatus.ceilingFan}
                monthlyKWh={energyConsumedPerMonth.ceilingFan}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("ceilingFan", newPercentage)
                }
              />
            </div>

            <div
              className={`m-2 pl-5  w-full h-full ${
                applianceStatus.oven
                  ? colorPanel(percentage.oven)
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <ElectricOvenScene
                status={applianceStatus.oven}
                monthlyKWh={energyConsumedPerMonth.oven}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("oven", newPercentage)
                }
              />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-evenly">
            <div
              className={`m-2 pl-5 w-full h-full ${
                applianceStatus.tv ? colorPanel(percentage.tv) : "bg-slate-300"
              }  rounded-3xl`}
            >
              <TelevisionScene
                status={applianceStatus.tv}
                monthlyKWh={energyConsumedPerMonth.tv}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("tv", newPercentage)
                }
              />
            </div>
            <div
              className={`m-2 pl-5 w-full h-full ${
                applianceStatus.washerDryer
                  ? colorPanel(percentage.washerDryer)
                  : "bg-slate-300"
              }  rounded-3xl`}
            >
              <WasherDryerScene
                status={applianceStatus.washerDryer}
                monthlyKWh={energyConsumedPerMonth.washerDryer}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("washerDryer", newPercentage)
                }
              />
            </div>
            <div
              className={`m-2 pl-5 w-full h-full ${
                applianceStatus.porchLight
                  ? colorPanel(percentage.porchLight)
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <PorchLightScene
                status={applianceStatus.porchLight}
                monthlyKWh={energyConsumedPerMonth.porchLight}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("porchLight", newPercentage)
                }
              />
            </div>
            <div
              className={`m-2 pl-5 w-full h-full ${
                applianceStatus.ceilingLight
                  ? colorPanel(percentage.ceilingLight)
                  : "bg-slate-300"
              } rounded-3xl`}
            >
              <CeilingLightScene
                status={applianceStatus.ceilingLight}
                monthlyKWh={energyConsumedPerMonth.ceilingLight}
                onPercentageChange={(newPercentage) =>
                  handlePercentageChange("ceilingLight", newPercentage)
                }
              />
            </div>
          </div>
        </div>

        <div className="w-3/5 h-screen">
          <div className="absolute z-10">
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <p>Transport: {transport}</p>
            <p>AC: {applianceStatus.ac ? "on" : "off"}</p>
            <p>Refrigerator: {applianceStatus.refrigerator ? "on" : "off"}</p>
            <p>Ceiling Fan: {applianceStatus.ceilingFan ? "on" : "off"}</p>
            <p>Oven: {applianceStatus.oven ? "on" : "off"}</p>
            <p>TV: {applianceStatus.tv ? "on" : "off"}</p>
            <p>WasherDryer: {applianceStatus.washerDryer ? "on" : "off"}</p>
            <p>PorchLight: {applianceStatus.porchLight ? "on" : "off"}</p>
            <p>CeilingLight: {applianceStatus.ceilingLight ? "on" : "off"}</p>
          </div>
          <div className="h-full w-full z-0">
            <Canvas
              camera={{ position: [-60, 10, 80], fov: 50 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={2} />
                <group position={[0, -10, 0]} scale={0.25}>
                  <Sky />
                </group>
                <group position={[0, -15, 0]} scale={0.7}>
                  <directionalLight position={[5, 10, 5]} intensity={1} />
                  <Volcano />
                </group>
                <OrbitControls />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}
