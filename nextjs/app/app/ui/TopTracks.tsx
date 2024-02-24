import { fetchTopTracks } from '../lib/lastfm';

export default async function ArtistList() {

  const response = await fetchTopTracks();
  
  return (
    <div>
      {response?.tracks?.track?.map(track => (
          <div key={track.id}>{track.name}</div>
      ))}
    </div>
  );
};
