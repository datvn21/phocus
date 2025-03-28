import React, { useState, useRef, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import Clock from "../Widgets/Clock";

function Draggable({ id, x, y }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-40 h-40 absolute cursor-pointer"
      style={{
        left: x,
        top: y,
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
      }}
    >
      <Clock />
    </div>
  );
}

export default function DragAndDrop() {
  const [items, setItems] = useState({
    1: { x: 50, y: 50 },
    2: { x: 150, y: 50 },
  });

  const homeRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (homeRef.current) {
      setBounds({
        width: homeRef.current.offsetWidth,
        height: homeRef.current.offsetHeight,
      });
    }
  }, []);

  const dragEnd = (e) => {
    if (!e.delta) return;
    const { id } = e.active;

    setItems((prev) => {
      const newX = Math.min(
        Math.max(prev[id].x + e.delta.x, 0),
        bounds.width - 40
      );
      const newY = Math.min(
        Math.max(prev[id].y + e.delta.y, 0),
        bounds.height - 40
      );

      return { ...prev, [id]: { x: newX, y: newY } };
    });
  };

  return (
    <DndContext onDragEnd={dragEnd}>
      <div
        ref={homeRef}
        className="relative w-full h-full rounded-xl overflow-hidden"
      >
        {Object.entries(items).map(([id, { x, y }]) => (
          <Draggable key={id} id={id} x={x} y={y} />
        ))}
      </div>
    </DndContext>
  );
}
