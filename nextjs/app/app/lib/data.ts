import { gql } from "@apollo/client";
import createApolloClient from "./apollo-client"

const client = createApolloClient();
 
export async function getTrack( artist: string, name: string ){
  try{
    const { data } = await client.query({
      query: gql`query { 
        track(
          filter: { 
            artist: { _eq: "${artist}" }
            name: { _eq: "${name}" } 
          }
        ) { 
          id 
          name 
          artist 
          youtubeId
        }
      }`,
    });
    return data
  } catch (error) {
    throw new Error('Failed to fetch graphql data.')
  }
}

export async function addTrack( artist: string, name: string, youtubeId:string ) {
  const mutation = {
    mutation: gql`
      mutation AddTrack($artist: String!, $name: String!, $youtubeId: String!) {
        create_track_item(data: { artist: $artist, name: $name, youtubeId: $youtubeId }) {
          artist
          name
          youtubeId
        }
      }
    `,
    variables: {
      artist,
      name,
      youtubeId
    }
  }

  try{
    const data = await client.mutate(mutation)
  } catch(error) {
    console.log('error', error)
    throw new Error(`Unable to add track ${artist} ${name} ${youtubeId}`)
  }
}

