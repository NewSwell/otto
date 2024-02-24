"use client";

export const dynamic = "force-dynamic";

import { gql } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_ARTISTS = gql`
  query GetArtists {
    artist {
      id
      name
    }
  }
`;

export default function ArtistList() {
  const { data } = useSuspenseQuery(GET_ARTISTS);
  console.log(data);

  return (
    <div>
      {data.artist.map(artist => (
          <div key={artist.id}>{artist.name}</div>
      ))}
    </div>
  );
};