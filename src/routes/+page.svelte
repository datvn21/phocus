<script>
  import Grid from "../components/Grid.svelte";

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

<div class="w-full h-full xl:px-26"><Grid></Grid></div>
