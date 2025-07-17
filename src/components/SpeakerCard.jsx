const SpeakerCard = ({ speaker }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-white flex items-center justify-center">
        {speaker.image ? (
          <img src={speaker.image} alt={speaker.name} className="flex justify-center items-center rounded-full text-center w-50 h-50 mb-5 mt-12 bg-amber-950" />
        ) : (
          <span className="text-gray-500">Speaker Image</span>
        )}
      </div>
      <div className="p-4 mt-10">
        <h3 className="font-bold text-lg mb-1 text-center">{speaker.name}</h3>
        <p className="text-[#9f2226] text-center">{speaker.title}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;