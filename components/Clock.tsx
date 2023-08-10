import dayjs from "dayjs";
import { WiCloud } from "react-icons/wi";
import { MdOutlineLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
import { useInterval } from "@mantine/hooks";
const Clock = () => {
  const month = dayjs().format("MMMM");
  const day = dayjs().format("Do");
  const [time, setTime] = useState(dayjs().format("hh:mm"));
  const interval = useInterval(() => setTime(dayjs().format("hh:mm")), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);
  return (
    <div className="relative mb-10 flex flex-col items-center p-2 font-askhar text-slate-300">
      <div className="mb-2 flex w-full items-center justify-between px-5 pl-2 md:mb-0 md:h-24 md:px-5 md:pl-2">
        <div className="flex items-center">
          <WiCloud className=" text-5xl  md:text-8xl" />
          <div className="flex flex-col font-semibold">
            <span className="text-xs">30°F</span>
            <div className="flex gap-1">
              <MdOutlineLocationOn className="text-xs" />
              <span className="text-xs">Plano, TX</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-md font-semibold md:text-4xl">{month}</span>
          <span className="text-xs font-medium md:text-xl">{day}</span>
        </div>
      </div>
      <span className="bg-gradient-to-b from-[#39B5E0_50%] to-[rgb(0_0_0/.5)_80%] bg-clip-text text-9xl font-bold text-transparent opacity-70 md:text-[200px]">
        {time}
      </span>
    </div>
  );
};

export default Clock;
