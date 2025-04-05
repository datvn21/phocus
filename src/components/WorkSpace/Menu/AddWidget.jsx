import { Plus } from "lucide-react";
import React from "react";

export default function AddWidget({ addWidget }) {
  return (
    <button
      onClick={addWidget}
      className="h-10 z-10 w-10 cursor-pointer rounded-full flex justify-center items-center bg-black/80 absolute hover:scale-110 transition-transform duration-300 left-4 bottom-4"
    >
      <Plus size={20} color="white" />
    </button>
  );
}
