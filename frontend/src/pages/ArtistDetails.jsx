import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailQuery } from "../redux/services/songFetch";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailQuery(artistId);

  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  var artistData1 = artistData?.artists?.artists[0];
  var artistrelated = artistData?.tracks;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, artistrelated, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col mt-5">
      <DetailsHeader artistId={artistId} artistData={artistData1} />

      <RelatedSongs
        data={artistData?.tracks}
        artistsId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
