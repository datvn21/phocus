<script>
  import { getCurrentWindow } from "@tauri-apps/api/window";
  const appWindow = getCurrentWindow();
  const minimize_app = () => {
    appWindow.minimize();
  };
  const fullscreen_app = async () => {
    (await appWindow.isFullscreen())
      ? await appWindow.setFullscreen(false)
      : await appWindow.setFullscreen(true);
  };
  const close_app = () => {
    appWindow.close();
  };

  // @ts-ignore
  const drag_app = async (e) => {
    if (e.buttons === 1) {
      e.detail === 2
        ? appWindow.setFullscreen(
            (await appWindow.isFullscreen()) ? false : true
          )
        : appWindow.startDragging();
    }
  };
</script>

<div
  class="min-h-12 backdrop-blur-xs shadow xl:h-16 h-12 xl:px-4 rounded-lg w-full flex hover:bg-black/5 transition-colors duration-200 flex-row-reverse items-center"
>
  <div class="flex flex-row-reverse gap-2 pr-2">
    <button
      onclick={close_app}
      class="group w-8 h-8 flex justify-center items-center rounded-full bg-black/20 hover:bg-white/40 transition-colors duration-200"
      ><img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/X.svg"
        alt="Close"
      /></button
    ><button
      onclick={fullscreen_app}
      class="group w-8 h-8 flex justify-center items-center rounded-full bg-black/20 hover:bg-white/40 transition-colors duration-200"
      ><img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/CornersOut.svg"
        alt="Maximize"
      /></button
    >
    <button
      onclick={minimize_app}
      class="group w-8 h-8 flex justify-center items-center rounded-full bg-black/20 hover:bg-white/40 transition-colors duration-200"
      ><img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/Minus.svg"
        alt="Minimize"
      /></button
    >
  </div>
  <button
    draggable="true"
    onmousedown={(e) => drag_app(e)}
    class=" w-full h-full flex items-center justify-start"
    aria-label="Drag"
    ><span
      class="px-2 py-1 font-medium text-black/50 hover:text-black/80 hover:scale-105 transition-transform duration-200 rounded-md text-xl"
      >Phocus</span
    ></button
  >
</div>
