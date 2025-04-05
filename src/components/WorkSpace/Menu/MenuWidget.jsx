import { Menu } from "lucide-react";
import React from "react";

export default function MenuWidget() {
  return (
    <div className="h-10 z-10 w-10 cursor-pointer rounded-full flex justify-center items-center bg-black/50 hover:bg-black backdrop-blur-xl absolute hover:scale-110 transition-al duration-300 left-4 bottom-4">
      <Menu size={20} color="white" />
    </div>
  );
}
