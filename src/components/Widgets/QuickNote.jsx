import { EllipsisIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const QuickNote = () => {
  const [note, setNote] = useState("");

  // useEffect(() => {
  //   const savedNote = localStorage.getItem("phocus-quick-note");
  //   if (savedNote) setNote(savedNote);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('phocus-quick-note', note);
  // }, [note]);

  return (
    <div className="bg-white/80 drag-handle grid grid-rows-[10px_1fr] gap-2 backdrop-blur-md border border-gray-300 rounded-2xl shadow-xl p-2 h-full w-full">
      <div className="h-full w-full flex justify-between items-center">
        <EllipsisIcon className="text-black/30 hover:cursor-grab " size={20} />
        <button
          className="w-auto h-full text-xs font-normal text-gray-500 hover:text-gray-800 transition-colors duration-200"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setNote("");
          }}
        >
          clear
        </button>
      </div>
      <textarea
        onClick={(e) => e.stopPropagation()}
        spellCheck="false"
        autoCorrect="off"
        className="w-full drag-cancel h-full resize-none rounded-xl p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type something here..."
      />
    </div>
  );
};

export default QuickNote;
