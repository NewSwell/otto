import { fetchArtistTopTracks } from "./lastfm"
import { fetchVideoByTrack } from "./youtube"
import { getTrack, addTrack } from './data'

export async function getVideo(artist: string) {
  const tracks = await fetchArtistTopTracks(artist)
  const tracklist = tracks?.toptracks?.track
  const track = tracklist[Math.floor(Math.random()*tracklist.length)]

  let video

  try{
    video = await getTrack(track.artist.name, track.name)
    if (video?.track?.[0]?.youtubeId) {
      console.log('got video from cache/data', video)
      const track = video.track[0];
      return {
        artist: track.artist,
        track: track.name,
        video: track.youtubeId,
      };
    }
  } catch (error) {
    console.log("Unable to get track from cache")
  }

  try {
    video = await fetchVideoByTrack(`${track.artist.name} - ${track.name} (Official Video)`)
    console.log('got video from api', video)
    addTrack(track.artist.name, track.name, video)
  } catch {
    console.log("Unable to get track from api")
    return {};
  }

  return {
    artist: track.artist.name,
    track: track.name,
    video,
  }
}
