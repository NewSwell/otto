import { fetchTopArtists } from '../lib/lastfm';

export default async function ArtistList() {

  const response = await fetchTopArtists();

  return (
    <div>
      {response?.artists?.artist?.map(artist => (
          <div key={artist.id}>{artist.name}</div>
      ))}
    </div>
  );
};
