import SpeakerCard from '../components/SpeakerCard';
import { speakers } from '../constants/speakers';
import { Link } from 'react-router-dom';

const Landing = () => {
    // function classNames (...classes){
    //     return classes.filter(Boolean).join(" ");
    // }
  return (
    <div className="container mx-auto px-4 py-12 mt-8 flex flex-col">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          CONFERENCE OF FAITHFUL AMBASSADORS
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-[#cd4547] mb-6">
          THE RISE OF VIPS
        </h2>
        <p className="text-xl mb-8">
          Visionaries, Innovators, Pacesetters and Solution providers
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          <div className="bg-[#AD3435] p-6 rounded-lg text-white">
            <p className="font-bold ">Saturday 23rd August, 2025 | 9am</p>
            <p>Pistis Hub, Maryland-Lagos.</p>
          </div>
        </div>
        {/* Register Section */}
        <Link 
          to="/register" 
          className="hover:bg-[#ad3435] border-2 text-[#ad3435] hover:text-white px-8 py-3 rounded-md font-bold text-lg transition-colors inline-block"
        >
          REGISTER NOW
        </Link>
      </section>

      <section className="mb-16">
        <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
          Across the continent, bold thinkers and creators are re-imagining industries, solving local challenges, and setting global trends. From fintech revolutions in Nigeria's Lagos to green energy breakthroughs in Kenya's Nairobi — Africa's innovators are not just participating in the future, they're defining it.
        </p>
        
        <div className="text-center">
          <p className="text-xl font-bold mb-4">
            Join 1000+ solution providers & innovators to imagine the future and create the magic
          </p>
        </div>
      </section>
    {/* featured speakers */}

    <section className="mb-16">
        <h3 className="text-2xl font-bold mb-12 text-center">Featured Speakers</h3>

        {/* CEO Speaker(s) */}
        <div className="flex justify-center items-center mb-10 w-full">
            {speakers
                .filter((speaker) => speaker.CEO)
                .map((speaker, index) => (
                <div key={index} className="flex justify-center">
                    <SpeakerCard speaker={speaker} />
                </div>
            ))}
        </div>

        {/* Non-CEO Speakers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {speakers
                .filter((speaker) => !speaker.CEO)
                .map((speaker, index) => (
                    <div key={index}>
                        <SpeakerCard speaker={speaker} />
                    </div>
            ))}
        </div>
    </section>

    </div>
  );
};

export default Landing;