<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { alertMessages, showAlert } from "../utils/alertStore"; // Import updated alert store

  const timeLeft = writable(25 * 60); // 25 minutes in seconds
  const isRunning = writable(false);
  const isPaused = writable(false);

  /**
   * @type {number | undefined}
   */
  let interval;

  onMount(() => {
    return () => clearInterval(interval);
  });

  function startTimer() {
    isRunning.set(true);
    isPaused.set(false);
    clearInterval(interval); // Ensure no duplicate intervals
    interval = setInterval(() => {
      timeLeft.update((t) => {
        if (t <= 0) {
          clearInterval(interval);
          isRunning.set(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(interval);
    isPaused.set(true);
    alertMessages.addAlert({
      content: "Timer paused",
      title: "Paused",
    });
    showAlert.set(true);
  }

  function resetTimer() {
    clearInterval(interval);
    timeLeft.set(25 * 60);
    isRunning.set(false);
    isPaused.set(false);
    alertMessages.addAlert({
      content: "Timer reset",
      title: "Reset",
    });
    showAlert.set(true);
  }

  /**
   * @param {number} num
   */
  function padStart(num) {
    return String(num).padStart(2, "0");
  }
</script>

<div
  class="flex flex-col items-center justify-center gap-4 xl:gap-6 w-full h-full p-6 bg-white/80 hover:bg-white rounded-lg shadow-lg"
>
  <div class="text-4xl xl:text-6xl font-mono">
    {#await $timeLeft then t}
      <span>{padStart(Math.floor(t / 60))}</span>
      <span class="text-zinc-500">:</span>
      <span>{padStart(t % 60)}</span>
    {/await}
  </div>
  <div class="flex gap-2">
    <button
      onclick={startTimer}
      class="p-3 group w-12 h-12 items-center flex justify-center text-zinc-500 rounded-full transition"
      aria-label="Start Timer"
    >
      <img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/Play.svg"
        alt="Play"
      />
    </button>
    <button
      onclick={pauseTimer}
      class="p-3 group w-12 h-12 items-center flex justify-center text-zinc-500 rounded-full transition"
      aria-label="Pause Timer"
    >
      <img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/Pause.svg"
        alt="Pause"
      />
    </button>
    <button
      onclick={resetTimer}
      class="p-3 group w-12 h-12 items-center flex justify-center text-zinc-500 rounded-full transition"
      aria-label="Reset Timer"
    >
      <img
        class="w-4 h-4 transition-transform duration-200 group-hover:scale-125"
        src="/Square.svg"
        alt="Reset"
      />
    </button>
  </div>
</div>
