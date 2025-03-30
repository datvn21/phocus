import React from "react";
import Clock from "./Clock";
import Music from "./Music";

export default function RenderWidget({ widget }) {
  console.log(widget);
  switch (widget.type) {
    case "clock":
      return <Clock />;
    case "music":
      return <Music />;
    default:
      return null;
  }
}
