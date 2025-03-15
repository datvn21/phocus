<script>
  // @ts-nocheck

  import fecthYT from "../utils/fetchYT";
  import { bgImage } from "../utils/store";
  let player = $state(null);
  let isPlaying = $state(false);

  let text = $state("");
  let data = $state(null);
  // data = {
  //   title: "Playlist Speed up | Những bản nhạc hot của Dangrangto",
  //   author: "Whojsdat",
  //   thumbnail: "https://i.ytimg.com/vi/i0zmZ8CJetQ/maxresdefault.jpg",
  //   mp3Url:
  //     "https://rr4---sn-8pxuuxa-nbo6r.googlevideo.com/videoplayback?expire=1741967115&ei=q_rTZ8f3LbSX1d8P4oLrsQU&ip=115.73.223.143&id=o-AKDWtmn4k6m4dntUrnwrhTvAVDa0XPc9CJ0O-YMGFEcZ&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1741945515%2C&mh=VG&mm=31%2C26&mn=sn-8pxuuxa-nbo6r%2Csn-oguelnl7&ms=au%2Conr&mv=m&mvi=4&pl=22&rms=au%2Cau&initcwndbps=2248750&bui=AccgBcMEqdOGlyW3Yaa3yKV8jD3z0qlsSAlntsLwGtvyE7ZQaHLStYRj_czS1wzOhbCXNFeXg2HExb_j&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Fd28Zgp-gGgosIof9abGQa8Q&rqh=1&gir=yes&clen=25127877&ratebypass=yes&dur=1192.623&lmt=1738369982799696&mt=1741945021&fvip=5&lmw=1&fexp=51358317%2C51411872&c=TVHTML5&sefc=1&txp=5438534&n=K3vxmBS1AolHSA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AFVRHeAwRgIhAN1QdJ1stbZADO5nFTFoK2SCBsMaAFaIhKoQzI3dmgE0AiEAn9fvPDZ5FzOW8qCB8iT22FTcJSRVbUTGPTuB90rgIuM%3D&sig=AJfQdSswRQIgK-HwRxxQ9D6_rATI6ngJFEnlbjjgH4C6ZKPFPpLK0rgCIQDuN9IOx8vg3BilSi7d0qF5CVMIlV3AAUShUMQWm-bNNw%3D%3D",
  // };
  // @ts-ignore
  const fetch = async (e) => {
    e.preventDefault();
    const link = e.target[0].value;
    data = await fecthYT(link);
    bgImage.set(data.thumbnail);
    console.log(data);
  };

  function updateData() {
    sharedData.set("Dữ liệu từ con");
  }
</script>

<div
  class="w-full h-full bg-white/80 hover:bg-white transition-colors duration-200 rounded-lg xl:rounded-xl"
>
  {#if data}
    <div
      class="flex flex-row gap-2 max-h-full items-center justify-center h-full overflow-hidden"
    >
      <audio
        onpause={() => (isPlaying = false)}
        onplaying={() => (isPlaying = true)}
        bind:this={player}
        src={data.mp3Url}
        loop
      ></audio>
      <button
        class="max-h-full p-2 rounded-xl overflow-hidden"
        onclick={() => (isPlaying ? player?.pause() : player?.play())}
      >
        <img
          class="h-full hover:opacity-80"
          src={data.thumbnail}
          alt={data.title}
        />
      </button>
      <div class="h-full flex flex-col gap-2 pr-1 justify-around">
        <p class="xl:text-lg text-md font-medium">{data.title}</p>
        <p class="text-sm">{data.author}</p>
      </div>
    </div>
  {:else}
    <form
      onsubmit={fetch}
      class="flex flex-col gap-2 items-center justify-center h-full py-4 px-8"
    >
      <input
        bind:value={text}
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
