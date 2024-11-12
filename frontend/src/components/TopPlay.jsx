import { useEffect, useRef, useLocation } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import {
  useGetTopArtistsQuery,
  useGetTopChartQuery,
} from "../redux/services/songFetch";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div
      className="w-full grid grid-cols-[5%_85%_10%] gap-1 items-center
                    hover:bg-[#4c426e] py-2 px-4 rounded-lg cursor-pointer mb-2"
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

      <div className="flex flex-row justify-between item-center">
        <img
          src={song?.album?.images[0].url}
          className="w-20 h-20 rounded-lg"
        />

        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.id}`}>
            <p className="text-xl font-bold text-white">{song?.name}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].id}`}>
            <p className="text-base mt-1 text-gray-300">
              {song?.artists[0].name}
            </p>
          </Link>
        </div>
      </div>
      <div className="justify-center items-end float-right">
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song)}
        />
      </div>
    </div>
  );
};

const TopPlay = () => {
  const location = useLocation();

  // Hide the component for a specific route (e.g., '/specific-route')
  if (location.pathname.startsWith("/search/")) {
    return null; 
  }
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  
  const { data, isFetching, error } = useGetTopChartQuery();

  const {
    data: artistsData,
    isFetchingArtist,
    errorArtists,
  } = useGetTopArtistsQuery();

  var topPlays = data?.tracks?.items?.filter(
    (x) => x?.track?.preview_url != null
  );

  topPlays?.sort((a, b) =>
    a?.track?.popularity > b?.track?.popularity ? -1 : 1
  );
  topPlays = topPlays?.slice(0, 5);
  const topArtists = artistsData?.artists?.slice(0, 8);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: topPlays, i }));
    dispatch(playPause(true));
  };

  return (
    <div
     
      className="xl:ml-6 ml-0 xl:mb-6 mb-0 flex-1
      xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song?.track?.id}
              song={song?.track}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song?.track, i)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className=" flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topArtists?.map((artist, i) => (
            <SwiperSlide
              key={artist?.id}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg animate-slideright"
            >
              <Link to={`/artists/${artist?.id}`}>
                <img
                  src={artist?.images[0].url}
                  alt="name"
                  className="sm:w-full md:w-4/5 rounded-full object-cover h-4/5"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
