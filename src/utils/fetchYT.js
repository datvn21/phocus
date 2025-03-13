import { Command } from "@tauri-apps/plugin-shell";

// @ts-ignore
const fecthYT = async (url) => {
  let spawn = await Command.create("yt-dlp", ["--dump-json", url]).execute();
  const data = JSON.parse(spawn.stdout.trim());

  const videoInfo = {
    title: data.title || "Unknown Title",
    author: data.uploader || "Unknown Author",
    mp3Url: data.url || "",
    thumbnail: data.thumbnails?.[0]?.url || "",
  };

  // console.log("Video Info:", videoInfo);

  return videoInfo;
};

export default fecthYT;
