import React, { useState } from "react";
import Container from "../Container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { setUser } from "@/utils/user";
import { useNavigate } from "react-router";

export default function Register({ onSwitchPage }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !age || !gender) {
      toast("Please fill in all the fields.");
      return;
    }
    if (setUser({ name, age, gender })) navigate("/");
  };

  return (
    <Container>
      <div className="relative px-20 flex flex-col justify-center pb-20 h-full gap-10 items-start">
        <button onClick={onSwitchPage}>
          <p className="px-3 py-1 hover:bg-gray-950/5 rounded-md text-md font-normal">
            Back
          </p>
        </button>

        <form className="pl-20 flex-col flex gap-5">
          <div className="h-full flex flex-row gap-2 items-center">
            <h1 className="text-2xl font-bold">Hi, My name is</h1>
            <input
              className="min-w-20 w-auto h-full bg-white/80 px-4 rounded-md p-2 outline-none text-2xl font-bold"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="h-full flex flex-row gap-2 items-center">
            <h1 className="text-2xl font-bold">I am</h1>
            <input
              className="max-w-30 min-w-15 w-auto h-full bg-white/80 px-4 rounded-md p-2 outline-none text-2xl font-bold"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <h1 className="text-2xl font-bold">years old</h1>
          </div>

          <div className="h-full flex flex-row gap-2 items-center">
            <h1 className="text-2xl font-bold">And my gender is</h1>
            <Select onValueChange={setGender}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="not-sure">Not sure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <button
          className="p-4 absolute bottom-30 right-20 hover:scale-110 transition-transform duration-300 flex items-center justify-center rounded-full bg-black"
          onClick={handleSubmit}
        >
          <Check color="white" />
        </button>
      </div>
    </Container>
  );
}
