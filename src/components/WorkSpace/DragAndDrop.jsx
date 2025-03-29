import { getData } from "@/utils/store";
import React, { useState, useEffect, useRef, use } from "react";
import GridLayout from "react-grid-layout";
import Clock from "../Widgets/Clock";

const Home = () => {
  const [rootLayout, setRootLayout] = useState(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const maxRows = 4;
  const currentLayout = useRef(null);

  useEffect(() => {
    const fetchRootLayout = async () => {
      const offSet = await getData("container");
      setRootLayout(offSet);
      setGridWidth(offSet[0]);
      setRowHeight(offSet[1]);
    };
    fetchRootLayout();
  }, []);

  useEffect(() => {
    if (!rootLayout) return;
    const handleResize = () => {
      setGridWidth(
        rootLayout[0] < currentLayout.current.offsetWidth
          ? currentLayout.current.offsetWidth
          : rootLayout[0]
      );
      setRowHeight(
        rootLayout[0] < currentLayout.current.offsetWidth
          ? currentLayout.current.offsetHeight
          : rootLayout[1]
      );
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rootLayout]);

  useEffect(() => {
    console.log(gridWidth, rowHeight);
  }, [gridWidth, rowHeight]);

  // return (
  //   <div className="w-full h-full" ref={currentLayout}>
  //     hadwu
  //   </div>
  // );
  const initialLayout = [
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 2, y: 0, w: 2, h: 1 },
    { i: "3", x: 4, y: 0, w: 2, h: 1 },
  ];

  const [layout, setLayout] = useState(initialLayout);

  const handleLayoutChange = (newLayout) => {
    let changed = false;
    const fixedLayout = newLayout.map((item) => {
      if (item.y + item.h > maxRows) {
        changed = true;
        return { ...item, y: maxRows - item.h };
      }
      return item;
    });

    if (changed) setLayout(fixedLayout);
  };

  return (
    <div ref={currentLayout} className="overflow-hidden h-full">
      {rootLayout && (
        <GridLayout
          className="layout h-full"
          layout={layout}
          cols={6}
          maxRows={maxRows * 1}
          rowHeight={(rowHeight - 5 * 5) / 4}
          width={gridWidth}
          isDraggable={true}
          isResizable={true}
          compactType={null}
          preventCollision={true}
          margin={[5, 5]}
          //onLayoutChange={handleLayoutChange}
        >
          {layout.map((item) => (
            <div
              key={item.i}
              className=" rounded-lg flex items-center justify-center"
            >
              <Clock key={item.i} />
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
};

export default Home;
