import { getVideo } from '../../lib/player'
import { toTitleCase } from '../../lib/util'

// export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const searchParams = request.nextUrl.searchParams

  try {
    
    const artist = toTitleCase(searchParams.get('artist'))
    const video = await getVideo(artist)

    return Response.json(video)
  } catch (err) {
    return Response.json({ error: 'failed to load data' })
  }
}
