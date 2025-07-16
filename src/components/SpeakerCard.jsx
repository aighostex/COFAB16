const SpeakerCard = ({ speaker }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {speaker.image ? (
          <img src={speaker.image} alt={speaker.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-500">Speaker Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
        <p className="text-[#9f2226]">{speaker.title}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;