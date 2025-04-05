import { EllipsisIcon } from "lucide-react";
import { Minus } from "lucide-react";
import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), done: false }]);
      setInput("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="w-full grid drag-handle grid-rows-[10px_3rem_1fr] gap-2 h-full p-2">
      <div className="h-full w-full flex justify-between items-center">
        <EllipsisIcon className="text-black/30 hover:cursor-grab " size={20} />
        <button
          className="w-auto h-full text-xs font-normal text-gray-500 hover:text-gray-800 transition-colors duration-200"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setTodos([]);
          }}
        >
          clear
        </button>
      </div>
      <input
        className="w-full drag-cancel font-semibold text-base h-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        spellCheck="false"
        autoCorrect="off"
        placeholder="New task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />
      <ul className="overflow-auto w-full flex gap-2 flex-col ">
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => {
              toggleTodo(index);
            }}
            className="flex cursor-pointer drag-cancel min-h-12 w-full p-4 max-w-full group bg-black/3 rounded-md items-center justify-between"
          >
            <div
              className={`flex-1  select-none font-semibold ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(index);
              }}
              className="z-10  text-transparent group-hover:text-red-500 transition-colors duration-200"
            >
              <Minus size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
