import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetAroundYouTracksQuery } from "../redux/services/songFetch";
import axios from "axios";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, isFetching, error } = useGetAroundYouTracksQuery();

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(
        `https://api.geoapify.com/v1/ipinfo?apiKey=aff6b2d30c4f48de81f2af7b8198163e`
      )
      .then((res) => {
        setCountry(res?.data?.country?.iso_code);
        setCountryName(res?.data?.country?.name);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(true));
  }, [country]);

  var data1 = data?.tracks?.items;

  if (isFetching) return <Loader title="Loading Songs around you..." />;

  if (error & (country !== "")) return <Error />;

  data1 = data1?.filter((x) => x.track.preview_url != null);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
        <span className="font-black"> {countryName}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data1?.map((song, i) => (
          <SongCard
            key={song.track?.id}
            song={song.track}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data1}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
