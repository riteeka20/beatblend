import { Error, Loader, ArtistCard } from "../components";
import { useGetTopArtistsQuery } from "../redux/services/songFetch";

const TopArtists = () => {
  const { data: artistsData, isFetching, error } = useGetTopArtistsQuery();

  if (isFetching) return <Loader title="Loading artists..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover
        <span className="font-black"> Top Artists</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artistsData?.artists.map((artist, i) => (
          <ArtistCard key={artist.id} track={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
