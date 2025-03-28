import React from "react";

export default function Container({ children }) {
  return (
    <div className="w-full h-full backdrop-blur-xs shadow rounded-xl">
      {children}
    </div>
  );
}
