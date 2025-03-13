<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const hours = writable(new Date().getHours());
  const minutes = writable(new Date().getMinutes());
  const seconds = writable(new Date().getSeconds());

  /**
   * @type {number | undefined}
   */
  let interval;

  onMount(() => {
    interval = setInterval(() => {
      const now = new Date();
      hours.set(now.getHours());
      minutes.set(now.getMinutes());
      seconds.set(now.getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  });

  /**
   * @param {number} num
   */
  function padStart(num) {
    return String(num).padStart(2, "0");
  }
</script>

<div
  class="flex items-center gap-0.5 font-mono bg-white/80 justify-center rounded-lg h-full w-full text-2xl xl:text-4xl"
>
  <span>{padStart($hours)}</span>
  <span class="text-zinc-500">:</span>
  <span>{padStart($minutes)}</span>
  <span class="text-zinc-500">:</span>
  <span>{padStart($seconds)}</span>
</div>
