import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailQuery } from "../redux/services/songFetch";
import { nanoid } from "nanoid";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailQuery(songid);

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, relatedSong1, i }));
    dispatch(playPause(true));
  };
  const songDataPart1 = songData?.track?.tracks[0];
  const data = songData?.related?.tracks;

  var lyrics_data = songData?.lyrics?.message?.body?.lyrics;

  const relatedSong1 = data;

  const songData2 = lyrics_data?.hasOwnProperty("lyrics_body")
    ? lyrics_data.lyrics_body.split("*")[0].split("\n")
    : null;

  
  return (
    <>
      <div>
        <div className="flex flex-col mt-5">
          {songData ? (
            <DetailsHeader songId={songid} songData={songDataPart1} />
          ) : null}

          <div className="mb-5">
            <h2 className="text-white text-3xl font-bold mt-5">Lyrics</h2>

            <div className="mt-4">
              {songData2 != null ? (
                songData2?.map((line, i) => (
                  <div key={nanoid()}>
                    <p className="text-gray-400 text-base my-2">{line}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-base my-2">
                  Sorry, no lyrics found!!!
                </p>
              )}
              {songData2 != null && (
                <p className="text-gray-400 text-base">
                  **for more refer Musixmatch
                </p>
              )}
            </div>
          </div>

          {data ? (
            <RelatedSongs
              data={data}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SongDetails;
