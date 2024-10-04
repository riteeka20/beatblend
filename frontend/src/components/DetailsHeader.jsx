import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songId, songData }) => {
  const songData1 = songData?.album;
  const artistData1 = artistData;

  var songDuration = songData?.duration_ms;
  songDuration = songDuration / 60000;
  var releaseDate = new Date(songData1?.release_date);
  releaseDate = releaseDate.getFullYear();
  var minutesPart = Math.floor(songDuration);
  var secPart = (songDuration - minutesPart).toFixed(2).split(".")[1];

  return (
    <div className="relative w-full flex flex-col">
      <div
        className="w-full bg-gradient-to-l from-transparent p-4
       to-slate-900 md:h-4/5 sm:h-36 h-28  grid grid-cols-[18%_82%] gap-1"
      >
        <img
          alt="art"
          src={
            !artistId
              ? songData1?.images[0].url //.images[0].url :
              : artistData1?.images[0].url
          }
          className="md:w-4/5 sm:w-36 w-28 md:h-4/5 sm:h-36 h-28 rounded-full object-cover
            border-2 shadow-xl shadow-black mt-4 ml-3"
        />
        <div className="ml-5 mt-auto mb-auto">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData1?.name : songData1?.name}
          </p>

          {!artistId && (
            <Link to={`/artists/${songData1?.artists[0].id}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData1?.artists[0].name}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artistData1?.genres[0]
              : `${releaseDate} \u2981 ${minutesPart}:${secPart}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
