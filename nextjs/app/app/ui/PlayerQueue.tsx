"use client"

import { usePlaylist } from "../lib/PlaylistContext"
import { PlayIcon } from "@heroicons/react/24/solid"

export default function PlayerQueue({
  currentIndex,
  setCurrentIndex
} : {
  currentIndex: number,
  setCurrentIndex: Function
}) {
  const playlist = usePlaylist()

  // render data
  const nextTrack = playlist?.[currentIndex + 1];
  if(!nextTrack?.track) return 

  console.log('playlist', playlist)

  return (
    <div className="flex items-end w-[250px] p-3 bg-gray-500/50 text-white absolute z-0 bottom-10 right-10">
      <div className="flex-grow">
        <div className="">NEXT UP</div>
        <div className="font-bold">{nextTrack.artist}</div>
        <div className="">{nextTrack.track}</div>
      </div>
      <div className="flex-none w-6 h-6">
        <button className="w-6 h-6 bg-white rounded-full" onClick={(() => setCurrentIndex(currentIndex + 1))}>
          <PlayIcon className="text-black" />
        </button>
      </div>
    </div>
  )
}
