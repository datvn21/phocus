import React from "react";
import { PlusCircle } from "lucide-react";
import { Trash } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import Clock from "./Clock";
import Music from "./Music";
import Image from "./Image";
import CalendarWidget from "./CalendarWidget";
import QuickNote from "./QuickNote";
import TodoList from "./ToDoList";

export default function RenderWidget({ deleteWidget, index, widget }) {
  const widgetCase = () => {
    switch (widget.type) {
      case "clock":
        return <Clock />;
      case "music":
        return <Music />;
      case "image":
        return <Image />;
      case "quick-note":
        return <QuickNote />;
      case "todo-list":
        return <TodoList />;
      default:
        return <></>;
    }
  };
  //console.log(widget);
  return (
    <div className="w-full h-full">
      <ContextMenu>
        <ContextMenuTrigger>{widgetCase()}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <div className="group w-full h-full flex items-center opacity-80 flex-row gap-2">
              <div>
                <PlusCircle
                  className="text-black group-hover:text-green-500 transition-colors duration-100"
                  size={24}
                  strokeWidth={3}
                />
              </div>
              <p className="font-bold text-md">Add</p>
            </div>
          </ContextMenuItem>
          <ContextMenuItem>
            <button
              onClick={() => deleteWidget(index)}
              className="group w-full h-full flex items-center opacity-80 flex-row gap-2"
            >
              <div>
                <Trash
                  className="text-black group-hover:text-red-500 transition-colors duration-200"
                  size={24}
                  strokeWidth={3}
                />
              </div>
              <p className="font-bold text-md">Delete</p>
            </button>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
