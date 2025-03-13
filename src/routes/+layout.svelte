<script>
  import TitleBar from "../components/TitleBar.svelte";
  import "../app.css";
  let { children } = $props();
</script>

<main class="p-2 h-full overflow-hidden overflow-y-hidden">
  <TitleBar></TitleBar>
  <div class="h-[calc(100lvh - 3rem)]">{@render children()}</div>
</main>
