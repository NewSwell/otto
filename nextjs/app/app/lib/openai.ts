import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});

export async function getPlaylist(artist: string){

    const prompt = `Create a list of 5 music artists similar to ${artist}.

    Find a popular track for each of the music artists in the list, including ${artist}.

    Next, get the YouTube url for each of the tracks.

    Give me a list of the artists, their popular tracks and the YouTube URL for the track in JSON. Put the artist ${artist} at the top of the list. 
    
    You should only respond in JSON format as described below, and you will NOT wrap it within JSON md markers:

    {"tracklist"[{"artist": "Artist Name", "track": "Track Name", "url": "YouTube Video URL"}, {"artist": "Artist Name", "track": "Track Name" "url": "YouTube Video URL"}]}
    
    Ensure the response can be parsed by Python json.loads`

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
        response_format: { "type": "json_object" },
    })

    // return chatCompletion?.choices[0]
    return chatCompletion?.choices[0].message.content
}
