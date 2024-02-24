import Search from './ui/search';
import TopArtists from './ui/TopArtists';
import TopTracks from './ui/TopTracks';

console.log('env', process.env);
export default async function IndexPage() {

  return (
    <main className="flex items-center justify-center md:h-full">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="columns-2 flex w-full max-w-[600px] space-x-2.5">
          <div className="flex h-20 w-full items-start rounded-lg dark:bg-gray-700 p-3 md:h-36">
            <div className="w-32 text-gray-50 md:w-36">
              <TopArtists />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
