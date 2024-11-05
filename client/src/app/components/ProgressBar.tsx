import { useEffect, useState } from "react";

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
        console.log("Progress:", newProgress);
        return newProgress;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [status]);

  const heightPercentage = (progress / dailykWh) * 100;

  return (
    <div className="relative w-3/4 h-full  bg-gray-200 rounded-2xl overflow-hidden">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        style={{ display: "none" }}
      >
        <symbol id="wave">
          <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
          <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
          <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
          <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
        </symbol>
      </svg>
      <div className="box">
        <div
          id="water"
          className="water absolute bottom-0 w-full h-full"
          style={{
            transform: `translateY(${100 - heightPercentage}%)`,
            transition: "transform 0.06s ease-in-out",
          }}
        >
          <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
            <use xlinkHref="#wave"></use>
          </svg>
          <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
            <use xlinkHref="#wave"></use>
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 text-center">
        {progress.toFixed(2)} kWh
      </div>
    </div>
  );
};

export default ProgressBar;
