import React from "react";
import TitleBar from "../TitleBar";
import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";
export default function AppLayout() {
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
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
