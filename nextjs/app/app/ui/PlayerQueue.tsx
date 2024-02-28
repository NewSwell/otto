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
  const currentTrack = playlist?.[currentIndex];
  const nextTrack = playlist?.[currentIndex + 1];
  if(!nextTrack?.track) return 

  return (
    <div className="group w-60 h-24 p-3 rounded overflow-hidden bg-gray-500/50 text-white absolute z-0 bottom-10 right-10">
      <div className="group-hover:-translate-y-24 transition-transform text-sm">
        <div className="h-24">
          <div className="text-xs font-thin mb-2">NOW PLAYING</div>
          <div className="font-medium truncate">{currentTrack.artist}</div>
          <div className="truncate">{currentTrack.track}</div>
        </div>
        <div className="h-24 flex sp-2">
          <div className="flex-auto w-44">
            <div className="text-xs font-thin mb-2">NEXT UP</div>
            <div className="font-medium truncate">{nextTrack.artist}</div>
            <div className="truncate">{nextTrack.track}</div>
          </div>
          <div className="flex-none w-8 h-8">
            <button className="w-8 h-8 grid place-content-center place-self-end bg-white rounded-full" onClick={(() => setCurrentIndex(currentIndex + 1))}>
              <PlayIcon className="text-black w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
