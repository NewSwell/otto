import { fetchSimilarArtists } from '../../lib/lastfm'
import { getVideo } from '../../lib/player'
import { toTitleCase } from '../../lib/util'
import { getPlaylist } from '../../lib/openai'


export async function GET(request: Request) {
// console.log('request', request);

  const searchParams = request.nextUrl.searchParams
  console.log('searchParams', searchParams)

  try {
    const artist = toTitleCase(searchParams.get('artist'));
    // const [similarArtists, video] = await Promise.all([
    //   fetchSimilarArtists(artist),
    //   getVideo(artist),
    // ]);
    const playlist = await getPlaylist(artist)
    return Response.json(JSON.parse(playlist))
  } catch (err) {
    return Response.json({ error: 'failed to load data' })
  }
}
