import React, { useEffect, useRef, useState } from "react";
import TitleBar from "../TitleBar";
import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";

import { setData } from "../../utils/store";
export default function AppLayout() {
  const [isSettingWindow, setIsSettingWindow] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const updateContainerSize = async () => {
      if (!container.current) return; // Kiểm tra container đã được mount chưa

      const offSet = [
        container.current.offsetWidth,
        container.current.offsetHeight,
      ];

      console.log(await setData("container", offSet));
      setIsSettingWindow(true);
    };

    updateContainerSize();
  }, []);

  return (
    <>
      <main
        style={{
          // backgroundImage:
          //   "url('https://images7.alphacoders.com/119/thumb-1920-1195443.jpg')",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          "--color": "#E1E1E1",
          backgroundColor: "#F3F3F3",
          backgroundImage: `
          linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent)
        `,
          backgroundSize: "55px 55px",
        }}
        className="p-4 h-lvh gap-2 xl:gap-8 grid grid-rows-[3rem_auto]"
      >
        <TitleBar />
        <div ref={container} className="w-full h-full rikka">
          {isSettingWindow && <Outlet />}
        </div>
      </main>
      <Toaster />
    </>
  );
}
