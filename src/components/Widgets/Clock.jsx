import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padStart = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center backdrop-blur-xl gap-0.5 font-mono bg-white/40 shadow hover:bg-white transition-colors duration-200 justify-center rounded-lg xl:rounded-xl h-full w-full text-2xl xl:text-4xl">
      <span>{padStart(time.getHours())}</span>
      <span className="text-zinc-500">:</span>
      <span>{padStart(time.getMinutes())}</span>
      <span className="text-zinc-500">:</span>
      <span>{padStart(time.getSeconds())}</span>
    </div>
  );
}

export default Clock;
