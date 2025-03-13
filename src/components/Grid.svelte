<script>
  // @ts-nocheck

  import "gridstack/dist/gridstack.min.css";
  import { GridStack } from "gridstack";
  import Clock from "./Clock.svelte";
  import Task from "./Task.svelte";
  import Music from "./Music.svelte";
  import { onMount } from "svelte";
  import Widget from "./Widget.svelte";

  onMount(() => {
    var grid = GridStack.init({
      maxRow: 8,
      float: true,
      disableResize: true,
      cellHeight: "auto",
      minRow: 4, // Giữ bố cục không quá dày đặc
      resizable: {
        handles: "e, se, s, sw, w", // Giới hạn resize theo hướng mong muốn
      },
    });
    grid.load();
  });
</script>

<div class=" w-full h-full grid-stack overflow-y-hidden">
  <Widget w={3} h={3}><Clock /></Widget>
  <Widget w={3} h={3}><Clock /></Widget>
  <Widget w={6} h={2}><Music /></Widget>
</div>
