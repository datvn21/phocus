<script>
  import TitleBar from "../components/TitleBar.svelte";
  import "../app.css";
  import { bgImage } from "../utils/store";
  console.log(bgImage);
  let { children } = $props();
</script>

<main
  style={$bgImage ? `background-image: url('${$bgImage}'); ` : ""}
  class="h-lvh bg-cover"
>
  <div class="backdrop-blur-2xl h-lvh p-2 overflow-hidden overflow-y-hidden">
    <TitleBar></TitleBar>
    <div class="h-[calc(100lvh - 3rem)]">{@render children()}</div>
  </div>
</main>
