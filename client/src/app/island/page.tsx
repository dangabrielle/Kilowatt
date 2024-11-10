"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { socket } from "../../socket";
import { Canvas } from "@react-three/fiber";
import Volcano from "../models/Volcano";
import AirConditionerScene from "../components/AirConditionerScene";
import RefrigeratorScene from "../components/RefrigeratorScene";
import CeilingFanScene from "../components/CeilingFanScene";
import ElectricOvenScene from "../components/ElectricOvenScene";
import TelevisionScene from "../components/TelevisionScene";
import WasherDryerScene from "../components/WasherDryerScene";
import PorchLightScene from "../components/PorchLightScene";
import CeilingLightScene from "../components/CeilingLightScene";
import Sky from "../models/Sky";
import dynamic from "next/dynamic";
import Link from "next/link";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

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
  const [cumulativePercentage, setCumulativePercentage] = useState(0);
  const [textBubble, setTextBubble] = useState("");

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
    socket.on("applianceStatuses", (data) => {
      setApplianceStatus(data);
    });
    return () => {
      socket.off("applianceStatuses");
    };
  }, []);

  const handlePercentageChange = (appliance: string, newPercentage: number) => {
    setPercentage((prev) => ({ ...prev, [appliance]: newPercentage }));
  };

  const colorPanel = (percentage: number) => {
    if (percentage < 50) {
      return "bg-emerald-500 bg-opacity-40";
    } else if (percentage < 85) {
      return "bg-amber-500 bg-opacity-80";
    } else {
      return "bg-red-500 bg-opacity-85 shake";
    }
  };

  useEffect(() => {
    const handleText = (percentage: number) => {
      if (percentage < 1) {
        setTextBubble("QUICK! Turn some stuff on!");
      } else if (percentage < 5) {
        setTextBubble("Nice job! Let's turn more things on");
      } else if (percentage < 25) {
        setTextBubble(
          "Just be careful not to use too much energy..or our island will sink!"
        );
      } else if (percentage < 50) {
        setTextBubble(
          "We're at a good place! Let's try to stay in this range."
        );
      } else if (percentage < 85) {
        setTextBubble(
          "We're using up extra energy than we should..let's turn something off to save electric."
        );
      } else if (percentage < 100) {
        setTextBubble(
          "We're in the danger zone! Turn something off immediately!!"
        );
      } else if (percentage === 100) {
        setTextBubble(
          "OH NO!! Our island sank!!! Save it by turning something off!!"
        );
      }
    };

    handleText(cumulativePercentage);
  }, [cumulativePercentage]);

  useEffect(() => {
    const currentSum = Object.values(percentage).reduce(
      (acc, curr) => acc + curr
    );
    const total = Object.entries(percentage).length * 100;
    setCumulativePercentage(Math.round((currentSum / total) * 100));
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

        <div className="relative w-3/5 h-screen">
          <div className="absolute top-5 right-10 z-50 bg-neutral-200 shadow-md  hover:scale-105 hover:bg-orange-200 hover:bg-opacity-70 active:scale-110 active:bg-orange-200 shadow-gray-500 text-rose-950 bg-opacity-80 p-1 pr-3 pl-3 rounded-2xl">
            <button>
              <a href="/api/auth/logout">Logout</a>
            </button>
          </div>
          <div className="absolute flex w-full h-1/3 flex-row z-10 p-10 justify-center">
            <div
              style={{
                textAlign: "center",
                position: "relative",

                marginRight: "1rem",
                color: "white",
                height: "50%",
                width: "50%",
                fontSize: "1.5rem",
                textShadow: "black 2px 2px 2px",
              }}
            >
              <div className="relative flex flex-col items-center -ml-28">
                <h1 className="relative text-center">ISLAND ENERGY USAGE</h1>

                <GaugeComponent
                  style={{
                    position: "relative",
                    width: "70%",
                    opacity: 90,
                  }}
                  marginInPercent={{
                    top: 0.12,
                    bottom: 0.0,
                    left: 0.15,
                    right: 0.1,
                  }}
                  arc={{
                    emptyColor: "#a4c6b7c7",

                    subArcs: [
                      {
                        limit: 50,
                        color: "#5BE12C",
                        showTick: true,
                      },
                      {
                        limit: 85,
                        color: "#F58B19",
                        showTick: true,
                      },
                      {
                        limit: 100,
                        color: "#EA4228",
                        showTick: true,
                      },
                    ],
                  }}
                  labels={{
                    tickLabels: {
                      defaultTickValueConfig: {
                        style: {
                          fill: "white",
                          fontSize: "1rem",
                          textShadow: "black 1px 1px 1px",
                        },
                      },
                    },
                  }}
                  value={cumulativePercentage}
                />
              </div>
            </div>
            <div className="w-2/5 h-1/2 mt-14 mr-10 -ml-16 flex items-center justify-center floatText">
              <div className="m-10 sm:text-s md:text-base lg:text-lg 2xl:text-2xl text-center">
                {textBubble}
                {/* <a href="/api/auth/login">Login</a> */}
              </div>
            </div>
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
                <group position={[0, -18, 0]} scale={0.7}>
                  <directionalLight position={[5, 10, 5]} intensity={2} />
                  <Volcano cumulativePercentage={cumulativePercentage} />
                </group>
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
}
