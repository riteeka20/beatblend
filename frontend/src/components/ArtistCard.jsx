import { useNavigate } from "react-router-dom";

const ArtistCard = (artists) => {
  const navigate = useNavigate();
  artists = artists.track

  return (
    <div
      className="flex flex-col w-[210px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm
    animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artists?.id}`)}
    >
      <img
        alt="artists"
        src={artists?.images[0].url}
        className="w-full h-48 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg truncate text-white">
        {artists?.name}
      </p>
    </div>
  );
};

export default ArtistCard;
