import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="flex flex-col w-[210px] p-4 bg-white/5 bg-opacity-80
      backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <div className="relative w-full h-41 group">
        <div
          className={`absolute inset-0 justify-center items-center
                            bg-slate-400 bg-opacity-50
                            group-hover:flex ${
                              activeSong === song.name
                                ? "flex bg-black bg-opacity-70"
                                : "hidden"
                            } `}
        >
          {song?.preview_url && (
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          )}
        </div>
        <img alt="song_img" src={song?.album?.images[0].url}></img>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>{Capitalize(song?.name)}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song?.artists[0]
                ? `/artists/${song?.artists[0].id}`
                : "/top-artists"
            }
          >
            {song?.artists[0].name}
          </Link>
        </p>
      </div>
    </div>
  );
};

function Capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default SongCard;
