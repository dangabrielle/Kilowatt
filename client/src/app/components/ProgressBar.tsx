import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  status: boolean;
  monthlyKWh: number;
}

const ProgressBar = ({ status, monthlyKWh }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const dailykWh = monthlyKWh / 30;
  const secondsInDay = 24 * 3600;
  const energyRatePerSecond = (dailykWh / secondsInDay) * 1000;
  console.log(status, dailykWh);

  useEffect(() => {
    console.log("Progress:", progress, "Daily kWh:", dailykWh);
  }, [progress, dailykWh]);

  useEffect(() => {
    if (!status) {
      setProgress(0);
      return;
    }

    const intervalId = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + energyRatePerSecond, dailykWh);
        console.log("Progress:", newProgress); // Log the new progress value
        return newProgress;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [status]);

  const heightPercentage = (progress / dailykWh) * 100;
  console.log("height percentage", heightPercentage);
  //   const barHeight = Math.max((progress / monthlyKWh) * 100, 1);
  return (
    <div className="relative w-3/4 h-full  bg-gray-200 rounded-2xl overflow-hidden">
      <motion.div
        className="absolute bottom-0 w-full h-full z-0 bg-green-500"
        style={{ height: `${heightPercentage}%` }}
        initial={{ height: 0 }}
        animate={{ height: `${heightPercentage}%` }}
      ></motion.div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {progress.toFixed(2)} kWh
      </div>
    </div>
  );
};

export default ProgressBar;
