import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Clock } from "lucide-react";
import { Image } from "lucide-react";
import { MusicIcon } from "lucide-react";
import { NotebookPenIcon } from "lucide-react";
import { ListTodo } from "lucide-react";

export default function CommandBox({ addWidget }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e) => {
      if ((e.key === "t" || e.key === "T") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const addWidgetTrigger = (type) => {
    addWidget(type);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Widgets">
          {[
            {
              name: "Clock",
              icon: <Clock strokeWidth={2.5} className="text-gray-500" />,
              action: "clock",
            },
            {
              name: "Image",
              icon: <Image strokeWidth={2.5} className="text-gray-500" />,
              action: "image",
            },
            {
              name: "Music Player",
              icon: <MusicIcon strokeWidth={2.5} className="text-gray-500" />,
              action: "music",
            },
            {
              name: "Quick Note",
              icon: (
                <NotebookPenIcon strokeWidth={2.5} className="text-gray-500" />
              ),
              action: "quick-note",
            },
            {
              name: "Todo List",
              icon: <ListTodo strokeWidth={2.5} className="text-gray-500" />,
              action: "todo-list",
            },
          ].map((widget, index) => (
            <CommandItem key={index}>
              <div
                className="w-full gap-2 justify-start h-full flex items-center focus:bg-gray-100 hover:bg-gray-100 rounded-md transition-all"
                onClick={() => {
                  addWidgetTrigger(widget.action);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  console.log("Enter key pressed");
                  e.preventDefault();
                  if (e.key === "Enter") {
                    addWidgetTrigger(widget.action);
                    setOpen(false);
                  }
                }}
                aria-label={`Add ${widget.name} widget`}
                tabIndex={0}
              >
                {widget.icon}
                {widget.name}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem>User</CommandItem>
          <CommandItem>About</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
