import React from "react";

export default function Image() {
  return (
    <div className="drag-handle bg-white/40 shadow overflow-hidden h-full w-full rounded-lg xl:rounded-xl hover:bg-white backdrop-blur-2xl">
      <img
        alt="1"
        className="w-full h-full object-cover"
        src="https://i.pinimg.com/564x/db/6e/77/db6e77106a10787b339da6e0b590410c.jpg"
      />
    </div>
  );
}
