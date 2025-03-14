<script>
  import TitleBar from "../components/TitleBar.svelte";
  import "../app.css";
  import { bgImage } from "../utils/store";
  console.log(bgImage);
  let { children } = $props();
</script>

<main
  style={$bgImage
    ? `background-image: url('${$bgImage}');`
    : `--color: #E1E1E1;
       background-color: #F3F3F3;
       background-image: 
         linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
         linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent);
       background-size: 55px 55px;`}
  class="h-lvh bg-cover"
>
  <div
    class={`${!$bgImage ? "" : "backdrop-blur-2xl"} h-lvh p-2 overflow-hidden overflow-y-hidden`}
  >
    <TitleBar></TitleBar>
    <div class="h-[calc(100lvh - 3rem)]">{@render children()}</div>
  </div>
</main>
