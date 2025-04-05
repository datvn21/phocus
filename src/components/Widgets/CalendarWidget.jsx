import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full h-full">
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-full h-full items-center justify-center flex"
      />
    </div>
  );
}
