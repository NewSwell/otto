const endpoint = 'https://ws.audioscrobbler.com/2.0/'
const baseQuery = {
    api_key: process.env.LASTFM_API_KEY ?? '',
    limit: '10',
    format: 'json',
} 

async function api(query: object) {
    try {
        console.log('fetch', `${endpoint}?${query}`)
        const response = await fetch(`${endpoint}?${query}`)
        const json = await response.json()
        return json
    } catch (error) {
        throw new Error('Failed to fetch Last.fm data.')
    }
}

export async function fetchTopArtists() {
    const query = new URLSearchParams({
        ...baseQuery, 
        method: 'chart.gettopartists',
    })

    return await api(query)
}

export async function fetchTopTracks() {
    const query = new URLSearchParams({
        ...baseQuery, 
        method: 'chart.gettoptracks',
    })

    return await api(query)
}

export async function fetchArtistTopTracks(artist: string) {
    const query = new URLSearchParams({
        ...baseQuery, 
        artist,
        method: 'artist.gettoptracks',
        autocorrect: '1',
    })

    return await api(query)
}

export async function fetchSimilarArtists(artist: string) {
    const query = new URLSearchParams({
        ...baseQuery, 
        artist,
        method: 'artist.getsimilar',
        autocorrect: '1',
    })

    const results =  await api(query)

    return results?.similarartists?.artist?.map((artist: any) => artist.name)
}

