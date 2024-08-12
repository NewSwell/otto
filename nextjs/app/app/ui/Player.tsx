"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import PlayerQueue from './PlayerQueue'
import { usePlaylistDispatch, usePlaylist } from '../lib/PlaylistContext'
import { useSession } from 'next-auth/react'
 

export default function Player({ artist } : {artist: string}) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const dispatch = usePlaylistDispatch()
  const playlist = usePlaylist()
  const { data: session, status } = useSession()
  let preferences = {}
  if (status === "authenticated"){
    const {user} = session
    preferences = user.preferences
  } 

  async function fetchPlaylist(){
    try {
      const query = new URLSearchParams({artist})
      const response = await fetch(`/playlist/api?${query}`)
      const data = await response.json()
      return data
    } catch {
      throw "Unable to fetch playlist"
    }
  }

  async function fetchTrack(artist: string){
    try {
      const query = new URLSearchParams({artist})
      const response = await fetch(`/queue/api?${query}`)
      const data = await response.json()
      return data
    } catch {
      throw "Unable to fetch track"
    }
  }


  function playNext() {
    setCurrentIndex(currentIndex + 1);
  }

  async function queueNext() {
    const nextIndex = currentIndex + 1
    const next = playlist?.[nextIndex]
    if(next && !next.video){
      const video = await fetchTrack(next.artist)
      dispatch({
        type: 'changed',
        index: nextIndex,
        track: video,
      })
    }
  }

  useEffect(() => {
    const updatePlaylist = async () => {
      const data = await fetchPlaylist()
      // dispatch({
      //   type: 'added',
      //   track: data.video,
      // })
      // data.similarArtists.forEach(artist => (
      //   dispatch({
      //     type: 'added',
      //     track: {artist},
      //   })
      // ))
      console.log('data', data);
      data.tracklist.forEach(item => {
        const video = item.url.substring(item.url.length - 11)
        const {artist, track} = item
        dispatch({
          type: 'added',
          track: {artist, track, video},
        })
      })

    }

    updatePlaylist()
  }, [artist])

  if(!playlist.length) return
  console.log('playlist', playlist)
  const url = `https://www.youtube.com/watch?v=${playlist[currentIndex].video}`

  console.log('url', url)

  return  <>
    <ReactPlayer 
      url={url} 
      playing={true} 
      width='100%'
      height='100%'
      // onStart={queueNext}
      onEnded={playNext}
      controls={preferences?.showControls}
    />
    <PlayerQueue 
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
    />
  </>
}
