<script>
  import fetchYT from "../utils/fetchYT";
  let url = $state("");
  // @ts-ignore
  const fetch = async (e) => {
    e.preventDefault();
    const link = e.target[0].value;
    const data = await fetchYT(link);
    console.log(data);
    url = data.mp3Url;
  };
</script>

<form onsubmit={fetch}>
  <input type="text" />
  <button>get url</button>
  {#if url}
    <audio src={url} controls></audio>
  {/if}
</form>
