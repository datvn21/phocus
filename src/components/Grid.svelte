<script>
  import "gridstack/dist/gridstack.min.css";
  import { GridStack } from "gridstack";
  import Clock from "./Clock.svelte";
  import Task from "./Task.svelte";
  import Music from "./Music.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    var items = [
      { content: "hi" }, // will default to location (0,0) and 1x1
      { w: 1, content: "another longer widget!" },
      { w: 1, content: "another longer widget!" },
      { w: 1, content: "another longer widget!" }, // will be placed next at (1,0) and 2x1
    ];
    var grid = GridStack.init({ float: true });
    grid.load(items);
  });
</script>

<div class="w-full h-full grid-stack"></div>
