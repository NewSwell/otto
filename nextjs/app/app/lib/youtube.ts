const endpoint = 'https://www.googleapis.com/youtube/v3/search';
const baseQuery = {
    maxResults: '1',
    type: 'video',
    format: '5',
    topicId: '/m/04rlf',
    key: process.env.YOUTUBE_API_KEY ?? '',
};

async function api(query: object) {
    try {
        const response = await fetch(`${endpoint}?${query}`);
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error('Failed to fetch Youtube data.');
    }
};

export async function fetchVideoByTrack(track: string) {
    const query = new URLSearchParams({
        ...baseQuery, 
        q: track,
    });

    console.log('fetchVideoByTrack', track);
    const result = await api(query);
    // const result = {};
    
    console.log('result', result);
    return result?.items?.[0]?.id?.videoId || 'SvYnkbwI-VI';
}
