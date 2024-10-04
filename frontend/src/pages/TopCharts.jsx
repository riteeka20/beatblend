import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartQuery } from "../redux/services/songFetch";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartQuery();

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  var topCharts = data?.tracks?.items?.filter(
    (x) => x?.track?.preview_url != null
  );
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover
        <span className="font-black"> Top Charts</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts?.map(
          (song, i) =>
            song?.track?.preview_url && (
              <SongCard
                key={song.track.id}
                song={song.track}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={topCharts}
              />
            )
        )}
      </div>
    </div>
  );
};

export default TopCharts;
