import React, { useState } from "react";
import { motion } from "motion/react";
import Hello from "@/components/Welcome/Hello";
import Register from "@/components/Welcome/Register.";
export default function Welcome() {
  const [isFirstVisible, setIsFirstVisible] = useState(true);

  const switchPage = () => {
    setIsFirstVisible(!isFirstVisible);
  };

  return (
    <div className="w-full h-full overflow-hidden relative rounded-xl">
      <motion.div
        className="w-full h-full grid grid-cols-1 grid-rows-[100%_100%] absolute"
        animate={{ y: isFirstVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.5, easing: "ease-in-out" }}
      >
        <Hello onSwitchPage={switchPage} />
        <Register onSwitchPage={switchPage} />
      </motion.div>
    </div>
  );
}
