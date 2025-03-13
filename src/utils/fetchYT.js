import { Command } from "@tauri-apps/plugin-shell";

// @ts-ignore
const fecthYT = async (url) => {
  let spawn = await Command.create("yt-dlp", ["--dump-json", url]).execute();
  const data = JSON.parse(spawn.stdout.trim());
  // const data = {
  //   title: "pov: late night vibes [playlist]",
  //   uploader: "celestial",
  //   thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
  //   url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  // };
  const videoInfo = {
    title: data.title || "",
    author: data.uploader || "",
    mp3Url: data.url || "",
    thumbnail: data.thumbnail || "",
  };

  // console.log("Video Info:", videoInfo);

  return videoInfo;
};

export default fecthYT;
