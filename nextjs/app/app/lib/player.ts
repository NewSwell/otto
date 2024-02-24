import { fetchArtistTopTracks } from "./lastfm"
import { fetchVideoByTrack } from "./youtube"

export async function getVideo(artist: string) {
  const tracks = await fetchArtistTopTracks(artist)
  const tracklist = tracks?.toptracks?.track
  const track = tracklist[Math.floor(Math.random()*tracklist.length)]
  // const track = tracklist[0];

  const video = await fetchVideoByTrack(`${track.artist.name} - ${track.name} (Official Video)`)

  return {
    artist: track.artist.name,
    track: track.name,
    video,
  }
}
