import "./DragAndDrop.css";
import { getData, setData } from "@/utils/store";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import GridLayout from "react-grid-layout";
import RenderWidget from "../Widgets/RenderWidget";
import { alertError } from "@/lib/alertCustomized";
import CommandBox from "../CommandBox";

const DragAndDrop = () => {
  const [rootLayout, setRootLayout] = useState(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const maxRows = 4;
  const maxCols = 6;
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

  const [layout, setLayout] = useState([]);
  const [map, setMap] = useState(Array(30).fill(0));

  useEffect(() => {
    const fetchLayout = async () => {
      const savedLayout = await getData("layout");
      //console.log(savedLayout);
      if (
        savedLayout &&
        JSON.stringify(savedLayout) !== JSON.stringify(layout)
      ) {
        setLayout(savedLayout);
      }
    };
    fetchLayout();
  }, []);

  useEffect(() => {
    setMap(createMap(layout));
    const saveLayout = async () => {
      //console.log("Saving layout", layout);
      await setData("layout", layout);
    };
    saveLayout();
  }, [layout]);

  const createMap = (layout) => {
    let map = Array(30).fill(0);

    layout.forEach((item) => {
      for (let dx = 0; dx < item.w; dx++) {
        for (let dy = 0; dy < item.h; dy++) {
          const index = (item.y + dy) * maxCols + (item.x + dx);
          if (index < 30) map[index] = 1;
        }
      }
    });

    return map;
  };

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

  const handleResizeStop = (layout, oldItem, newItem) => {
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((item) =>
        item.i === newItem.i ? { ...item, w: newItem.w, h: newItem.h } : item
      );

      setMap(createMap(updatedLayout));
      return updatedLayout;
    });
  };

  const getNewLayoutPosition = (w, h) => {
    for (let y = 0; y <= maxRows - h; y++) {
      for (let x = 0; x <= maxCols - w; x++) {
        let canPlace = true;

        for (let dx = 0; dx < w; dx++) {
          for (let dy = 0; dy < h; dy++) {
            const index = (y + dy) * maxCols + (x + dx);
            if (map[index] === 1) {
              canPlace = false;
              break;
            }
          }
          if (!canPlace) break;
        }

        if (canPlace) return { x, y };
      }
    }

    return null;
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((item) =>
        item.i === newItem.i ? { ...item, x: newItem.x, y: newItem.y } : item
      );
      return updatedLayout;
    });
  };

  const addWidget = (type) => {
    let size = { w: 1, h: 1 };
    switch (type) {
      case "calendar":
        size = { w: 2, h: 2 };
        break;
      case "quick-note":
        size = { w: 1, h: 2 };
        break;
      case "todo-list":
        size = { w: 1, h: 2 };
        break;
    }

    const position = getNewLayoutPosition(size.w, size.h);

    if (!position) {
      alertError({
        title: "Not engough space!",
        description: "Please add more space",
      });
      return;
    }

    const newWidget = {
      i: uuidv4(),
      x: position.x,
      y: position.y,
      w: size.w,
      h: size.h,
      type: type || "clock",
    };

    setLayout([...layout, newWidget]);
  };

  const deleteWidget = (index) => {
    const newLayout = [...layout];
    newLayout.splice(index, 1);
    setLayout(newLayout);
  };

  return (
    <div ref={currentLayout} className="overflow-hidden h-full">
      <CommandBox addWidget={addWidget} />
      {/* <MenuWidget /> */}
      {rootLayout && (
        <GridLayout
          className="layout h-full"
          draggableHandle=".drag-handle"
          draggableCancel=".drag-cancel"
          layout={layout}
          cols={6}
          maxRows={maxRows}
          rowHeight={(rowHeight - 25) / 4}
          width={gridWidth}
          isDraggable={true}
          isResizable={true}
          compactType={null}
          preventCollision={true}
          margin={[5, 5]}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          onLayoutChange={handleLayoutChange}
        >
          {layout.map((item, index) => (
            <div
              key={item.i}
              className="rounded-lg bg-white flex items-center justify-center"
            >
              <RenderWidget
                deleteWidget={deleteWidget}
                index={index}
                widget={item}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  );
};

export default DragAndDrop;
