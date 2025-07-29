import SpeakerCard from '../components/SpeakerCard';
import { speakers } from '../constants/speakers';


const Speakers = () => {
  return (
     <section className="mb-16 mt-16 scroll-m-40" id='speakers'>
        <h1 className="text-6xl font-bold mb-12 text-center">CONFAB SPEAKERS 2025</h1>

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
  )
}

export default Speakers
