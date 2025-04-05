import { alertLoading, alertSuccess } from "@/lib/alertCustomized";
import fetchYT from "@/utils/fetchYT";
import { PauseIcon } from "lucide-react";
import { GripHorizontal } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Loader2 } from "lucide-react";
import { EllipsisIcon } from "lucide-react";
import { PlayIcon } from "lucide-react";
import { Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Music() {
  const [url, setUrl] = useState("");
  const [music, setMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;
    console.log("YouTube URL:", e.target[0].value);
    setUrl(e.target[0].value);
  };

  useEffect(() => {
    // console.log(url);
    if (url === "") return;
    const fetchMusic = async () => {
      const id = alertLoading({
        title: "Fetching...",
        description: url,
      });
      const musicData = await fetchYT(url);
      alertSuccess({
        title: "Fetched Successfully",
        description: musicData.title,
        id,
      });
      setMusic(musicData);
    };
    fetchMusic();
  }, [url]);

  useEffect(() => {
    if (music === null || url == "") return;
    if (audioRef.current && music) {
      audioRef.current.src = music.mp3Url; // Cập nhật nhạc

      audioRef.current.play(); // Tiếp tục phát nếu đang bật
    }
  }, [music]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((prev) => !prev);
  };

  if (!url)
    return (
      <form
        className="bg-white/40 drag-handle shadow h-full w-full pb-2 rounded-lg xl:rounded-xl hover:bg-white backdrop-blur-2xl px-4 py-2 flex flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full drag-cancel xl:text-base text-sm p-2 rounded-md xl:rounded-lg outline-2"
          type="url"
          placeholder="Paste link here..."
          required
        />
        <button
          className="bg-black text-white drag-cancel xl:text-xl text-sm xl:px-4 xl:py-2 p-2 px-4 rounded-lg"
          type="submit"
        >
          Enter
        </button>
      </form>
    );

  if (!music || url == "")
    return (
      <div className="flex justify-center items-center bg-white/40 shadow h-full w-full px-2 pb-2 rounded-lg xl:rounded-xl hover:bg-white backdrop-blur-2xl">
        <Loader2 className="animate-spin" size={40} strokeWidth={3} />
      </div>
    );

  return (
    <div className="grid grid-rows-[30px_1fr] items-center bg-white/40 shadow h-full w-full px-2 pb-2 rounded-lg xl:rounded-xl hover:bg-white backdrop-blur-2xl">
      <div className="h-full w-full flex justify-between items-center">
        <EllipsisIcon className="text-black/30 hover:cursor-grab " size={20} />
        <button
          className="w-auto h-full "
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => {
            setUrl("");
            setMusic(null);
          }}
        >
          <RotateCcw
            className="text-black/30 hover:cursor-pointer "
            size={20}
          />
        </button>
      </div>
      <button
        onMouseDown={(e) => e.stopPropagation()}
        className="h-full w-auto flex justify-center overflow-hidden items-center hover:scale-105 transition-transform duration-300"
        onClick={togglePlay}
      >
        <img
          className="w-auto h-full aspect-square object-cover rounded-full xl:p-4 music-roation"
          src={music.thumbnail}
          alt={music.title}
        />
      </button>

      <audio ref={audioRef} />
    </div>
  );
}
