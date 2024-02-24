"use client"

import { createContext, useContext, useReducer } from 'react'

const PlaylistContext = createContext([])
const PlaylistDispatchContext = createContext(null)

export function PlaylistProvider({ children }: React.PropsWithChildren) {
  const [playlist, dispatch] = useReducer(
    playlistReducer,
    initialPlaylist
  )

  return (
    <PlaylistContext.Provider value={playlist}>
      <PlaylistDispatchContext.Provider value={dispatch}>
        {children}
      </PlaylistDispatchContext.Provider>
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  return useContext(PlaylistContext)
}

export function usePlaylistDispatch() {
  return useContext(PlaylistDispatchContext)
}

function playlistReducer(playlist: any[], action: object) {
  switch (action.type) {
    case 'added': {
      return [...playlist, action.track]
    }
    case 'changed': {
      playlist[action.index] = action.track
      return [...playlist]
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

const initialPlaylist: any[] = [
  // {artist: "Ween", track: "Tried And True", video: "SvYnkbwI-VI"}
]
