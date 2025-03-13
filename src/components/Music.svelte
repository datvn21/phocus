<script>
  // @ts-nocheck

  import fecthYT from "../utils/fetchYT";

  let url = $state("");
  let data = $state(null);

  // @ts-ignore
  const fetch = async (e) => {
    e.preventDefault();
    const link = e.target[0].value;
    data = await fecthYT(link);
    console.log(data);
  };
</script>

<div class="w-full h-full bg-white/80 rounded-lg">
  {#if data}
    <div class="flex flex-row gap-2 items-center justify-center h-full">
      <img
        class="max-h-full h-full rounded-lg"
        src={data.thumbnail}
        alt={data.title}
      />
    </div>
  {:else}
    <form
      onsubmit={fetch}
      class="flex flex-col gap-2 items-center justify-center h-full py-4 px-8"
    >
      <input
        bind:value={url}
        type="text"
        placeholder="Nhập link"
        class="w-full h-full rounded-lg p-2 border border-gray-200 outline-none outline-white/80"
      />
      <button
        class="outline-none w-16 h-16 rounded-full bg-white/60 hover:bg-white/40"
        >Go</button
      >
    </form>
  {/if}
</div>
