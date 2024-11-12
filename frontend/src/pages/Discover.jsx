import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/songFetch";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const genreTitle = genres.find(({ value }) => value === genreListId)?.value;
  const { data, isFetching, isError } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader title="Loading Data...." />;
  if (isError) return <Error />;
  var data1 = data?.tracks?.items;

  data1 = data1.filter((x) => x.preview_url != null);

  var topArtists = new Map();
  data1.forEach((x, i) => {
    topArtists.set(x.artists[0].id, x.artists[0].name);
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-white text-left">
            Discover {genreTitle}
          </h2>
          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId}
            className="bg-black text-white p-3 text-sm rounded-lg outline-none
                sm:mt-0 mt-5"
          >
            {" "}
            {genres.map((g) => (
              <option key={g.value} value={g.value}>
                {g.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data1.map((x, i) => (
            <SongCard
              key={x?.id}
              song={x}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
