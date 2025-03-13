<script>
  import TitleBar from "../components/TitleBar.svelte";
  import "../app.css";
  let { children } = $props();
</script>

<main class="p-2">
  <TitleBar></TitleBar>
  {@render children()}
</main>
