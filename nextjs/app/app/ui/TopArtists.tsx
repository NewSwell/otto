import { fetchTopArtists } from '../lib/lastfm';
import { toUrlCase } from '../lib/util';

export default async function ArtistList() {

  const response = await fetchTopArtists();

  return (
    <div>
      {response?.artists?.artist?.map(artist => (
          <div>
            <a key={artist.mbid} href={`artist/${toUrlCase(artist.name)}`}>{artist.name}</a>
          </div>
      ))}
    </div>
  );
};
