<script>
  import TitleBar from "../components/TitleBar.svelte";
  import "../app.css";
  import { bgImage } from "../utils/store";
  import AlertWidget from "../components/AlertWidget.svelte";
  import { fly } from "svelte/transition"; // Import fly transition
  console.log(bgImage);
  let { children } = $props();
</script>

<main
  style={$bgImage && false
    ? `background-image: url('${$bgImage}');`
    : `--color: #E1E1E1;
       background-color: #F3F3F3;
       background-image: 
         linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
         linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent);
       background-size: 55px 55px;`}
  class="h-lvh bg-cover"
  transition:fly
>
  <div
    class={`${true ? "" : "backdrop-blur-2xl bg-black/10"} h-lvh p-2  overflow-hidden overflow-y-hidden`}
  >
    <AlertWidget />
    <div class="xl:px-4"><TitleBar></TitleBar></div>
    <div class="h-[calc(100lvh - 3rem)]">{@render children()}</div>
  </div>
</main>
