"use server"

import { gql } from "@apollo/client";
import createApolloClient from "./apollo-client"

const client = createApolloClient();

export async function getUser( providerId: string ){
  try{
    const { data } = await client.query({
      query: gql`query { 
        user(
          filter: { 
            provider_x_id: { _eq: "${providerId}" }
          }
        ) {  
          id
          username 
          preferences
        }
      }`,
    });
    return data.user[0]
  } catch (error) {
    throw new Error(`Failed to fetch graphql data: ${error}`)
  }
}


export async function addUser( username: string, providerId: string) {
  const mutation = {
    mutation: gql`
      mutation AddUser($username: String!, $providerId: String!) {
        create_user_item(data: { username: $username, provider_x_id: $providerId }) {
          username
          provider_x_id
        }
      }
    `,
    variables: {
      username,
      providerId
    }
  }

  try{
    const data = await client.mutate(mutation)
  } catch(error) {
    throw new Error(`Unable to add user ${username}`)
  }
}


export async function updateUserPreferences( id: string, preferences: object ) {
  const preferencesJson = JSON.stringify(preferences)
  const mutation = {
    mutation: gql`
      mutation UpdateUserPreferences($id: ID!, $preferences: String!) {
        update_user_item(id: $id, data: { preferences: $preferences }) {
          id
          preferences
        }
      }
    `,
    variables: {
      id,
      preferences: preferencesJson
    }
  }

  try{
    const result = await client.mutate(mutation)   
    return result.data.update_user_item.preferences
  } catch(error) {
    throw new Error(`Unable to update user ${id}: ${error}`)
  }
}
