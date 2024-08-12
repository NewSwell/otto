import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});

async function isYoutubeUrlEmbeddable(url: string){
    console.log('isYoutubeUrlEmbeddable', url)
    const urlEncoded = encodeURIComponent(url)
    const response = await fetch(`https://www.youtube.com/oembed?url=${urlEncoded}`)

    return (response.status === 200)
        ? 'YES'
        : 'NO'
}

// TODO Parallel
async function resolveToolCalls(toolCalls){
    const messages = []
    for (const call of toolCalls) {
        const args = JSON.parse(call.function.arguments)
        const content = await isYoutubeUrlEmbeddable(args.url)
        messages.push({
            role: 'tool',
            content: content,
            tool_call_id: call.id,
        })
    }
    return messages
}

export async function getPlaylist(artist: string){

    const prompt = `Create a list of 5 music artists similar to ${artist}.

    Find a popular track for each of the music artists in the list, including ${artist}.

    Next, get the YouTube Official Video url for each of the tracks, and make sure the url leads to a currenlty available video. If the Youtube video url is not embeddable find another video by the same artist that is embeddable.

    Give me a list of the artists, their popular tracks and the YouTube URL for the track in JSON. Put the artist ${artist} at the top of the list. 
    
    You should only respond in JSON format as described below, and you will NOT wrap it within JSON md markers:

    {
        "tracklist": [
            {"artist": "Artist Name", "track": "Track Name", "url": "YouTube Video URL"}, 
            {"artist": "Artist Name", "track": "Track Name", "url": "YouTube Video URL"}
        ]
    }
    
    Ensure the response can be parsed by javascript JSON.parse.`
    
    const context: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'user', content: prompt }
    ]

    try {
        const response = await client.chat.completions.create({
            messages: context,
            model: 'gpt-4o-mini',
            response_format: { "type": "json_object" },
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'isYoutubeUrlEmbeddable',
                        description: 'Determine if the Youtube url is embeddable.',
                        parameters: {
                            type: 'object',
                            properties: {
                                url: {
                                    type: 'string',
                                    description: 'The URL of the Youtube video.'
                                }
                            },
                            required: ['url']
                        }
                    }
                }
            ],
            tool_choice: 'auto',
        })
        console.log('playlist chat compltetion', response)
        console.log(response.choices[0].message)

        const willInvokeFunction = response.choices[0].finish_reason === 'tool_calls'
        const toolCalls = response.choices[0].message.tool_calls
        if(willInvokeFunction){
            context.push(response.choices[0].message)
            const toolCallsResolved = await resolveToolCalls(toolCalls)
            context.push(...toolCallsResolved)

            const secondResponse = await client.chat.completions.create({
                messages: context,
                model: 'gpt-4o-mini',
                response_format: { "type": "json_object" }
            })

            console.log('secondResponse', secondResponse)

            return secondResponse.choices[0].message.content

        } else {
            return response.choices[0].message.content
        }
    } catch (error) {
        console.log('error', error)
        throw new Error('Failed to fetch playlist from OpenAI.')
    }   
}
