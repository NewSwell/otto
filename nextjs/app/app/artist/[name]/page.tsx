import Player from "../../ui/Player";
import { PlaylistProvider } from "../../lib/PlaylistContext"
export default async function IndexPage({ params }: { params: { name: string } }) {

  const { name } = params;
  
  return (
    <main className="absolute top-[60px] left-0 right-0 bottom-0 bg-black flex justify-center">
      <div className="w-auto h-full aspect-video">
      <PlaylistProvider>
        <Player artist={name} />
      </PlaylistProvider>
      </div>
    </main>
  );
}
