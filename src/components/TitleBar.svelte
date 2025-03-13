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
  const drag_app = (e) => {
    if (e.buttons === 1) {
      e.detail === 2 ? appWindow.toggleMaximize() : appWindow.startDragging();
    }
  };
</script>

<div
  class="min-h-12 h-12 rounded-lg w-full flex hover:bg-white/20 transition-colors duration-200 flex-row-reverse items-center"
>
  <div class="flex flex-row-reverse gap-2 pr-2">
    <button
      onclick={close_app}
      class="group w-8 h-8 flex justify-center items-center rounded-full bg-white/50 hover:bg-white/40 transition-colors duration-200"
      ><img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/X.svg"
        alt="Close"
      /></button
    >
    <button
      onclick={minimize_app}
      class="group w-8 h-8 flex justify-center items-center rounded-full bg-white/50 hover:bg-white/40 transition-colors duration-200"
      ><img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/Minus.svg"
        alt="Minimize"
      /></button
    >
    <button
      onclick={fullscreen_app}
      class="group w-8 h-8 flex justify-center items-center rounded-full bg-white/50 hover:bg-white/40 transition-colors duration-200"
      ><img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/CornersOut.svg"
        alt="Maximize"
      /></button
    >
  </div>
  <button
    draggable="true"
    onmousedown={(e) => drag_app(e)}
    class=" w-full h-full"
    aria-label="Drag"
  ></button>
</div>
