import SongBar from "./SongBar";
import { nanoid } from "nanoid";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistsId,
}) => {
  const relatedSongs = !artistsId ? data : data?.tracks;

  return (
    <div className="flex flex-col mt-5">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>
      {!artistsId ? (
        <div className="mt-6 w-full flex flex-col">
          {Object.keys(relatedSongs)?.map((song, i) => (
            <SongBar
              key={nanoid()}
              song={relatedSongs[song]}
              i={i}
              artistId={artistsId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 w-full flex flex-col">
          {relatedSongs &&
            Object.keys(relatedSongs)?.map((song, i) => (
              <SongBar
                key={nanoid()}
                song={relatedSongs[i]}
                i={i}
                artistId={artistsId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default RelatedSongs;
