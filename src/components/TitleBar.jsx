import CloseIcon from "../assets/Close.svg";
import FullScreenIcon from "../assets/CornersOut.svg";
import MinimizeIcon from "../assets/Minus.svg";
import { getCurrentWindow } from "@tauri-apps/api/window";

const TitleBar = () => {
  const appWindow = getCurrentWindow();
  const minimize = () => appWindow.minimize();
  // const fullscreen = async () => {
  //   const isFullscreen = await appWindow.isFullscreen();
  //   await appWindow.setFullscreen(!isFullscreen);
  // };
  const close = () => appWindow.close();
  const drag = async (e) => {
    const isFullscreen = await appWindow.isFullscreen();
    if (e.buttons === 1) {
      e.detail === 2
        ? appWindow.setFullscreen(isFullscreen ? false : true)
        : !isFullscreen
        ? appWindow.startDragging()
        : null;
    }
  };
  return (
    <div className="backdrop-blur-xl bg-white/40 shadow-xs xl:h-16 h-full xl:px-4  px-2 rounded-xl w-full flex hover:bg-white/60 transition-colors duration-300 flex-row-reverse items-center">
      <div className="flex flex-row-reverse gap-2 pr-2">
        <button
          onClick={close}
          className="group w-8 h-8 flex justify-center items-center rounded-full bg-black/20 hover:bg-white/40 transition-all duration-200"
        >
          <img
            className="fill-current w-4 h-4 transition-transform duration-200 group-hover:scale-125"
            src={CloseIcon}
            alt="Close"
          />
        </button>
        {/* <button
          onClick={fullscreen}
          className="group w-8 h-8 flex justify-center items-center rounded-full bg-black/20 hover:bg-white/40 transition-all duration-200"
        >
          <img
            className="fill-current w-4 h-4 transition-transform duration-200 group-hover:scale-125"
            src={FullScreenIcon}
            alt="Maximize"
          />
        </button> */}
        <button
          onClick={minimize}
          className="group w-8 h-8 flex justify-center items-center rounded-full bg-black/20 hover:bg-white/40 transition-all duration-200"
        >
          <img
            className="fill-current w-4 h-4 transition-transform duration-200 group-hover:scale-125"
            src={MinimizeIcon}
            alt="Minimize"
          />
        </button>
      </div>
      <button
        draggable
        onMouseDown={drag}
        className="w-full h-full flex items-center justify-start"
        aria-label="Drag"
      >
        <span className="px-2 py-1 font-medium text-black/50 hover:text-black/80 hover:scale-105 transition-transform duration-200 rounded-md text-xl">
          Phocus
        </span>
      </button>
    </div>
  );
};

export default TitleBar;
