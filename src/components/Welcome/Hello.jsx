import React from "react";
import Container from "../Container";
import { ArrowRight } from "lucide-react";

export default function Hello({ onSwitchPage }) {
  return (
    <Container>
      <div className="flex flex-col gap-8 h-full w-full justify-center items-center">
        <h1 className="text-4xl font-bold">Do you need to Focus?</h1>
        <button
          className="bg-black text-white p-4 hover:scale-110 hover:rotate-90 transition-all duration-200 rounded-full"
          onClick={() => onSwitchPage()}
        >
          <ArrowRight />
        </button>
      </div>
    </Container>
  );
}
