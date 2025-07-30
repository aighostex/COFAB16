import { Link } from 'react-router-dom';
import SpeakerCard from '../components/SpeakerCard';
import { useState } from 'react';
import confab from '../assets/confab16.svg';
import Speakers from '../components/Speakers';
import { Card, CardContent } from '/src/components/ui/Card';

import {
  Calendar,
  MapPin,
  Users,
  Globe,
  Star,
} from "lucide-react";

const Landing = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <div className="bg-[#F0F0f0] pt-10  py-12 mt-8 ">
      {/* Header */}
      <header className="bg-[#1F2E49] w-full shadow-sm fixed z-[1000] left-0 top-0 px-1.5">
            <div className="container mx-auto p-0 py-3 flex justify-between items-center">
              <Link to="/" className="text-sm flex gap-3 items-center font-[400] text-white">
              <img src={confab} alt="confab16" className='h-20 w-20 rounded-full' /><span className='text-white font-bold text-2xl'>CONFAB</span>
              </Link>
              
              {/* Desktop Navigation - hidden on mobile */}
              <nav className="hidden md:flex items-center space-x-8 text-white">
                <div className='flex items-center justify-center gap-6 absolute left-[38%]'>
                <a href="#home" className="font-medium hover:text-[#f97c19]">Home</a>
                <a href="#about" className="font-medium hover:text-[#f97c19]">About</a>
                <a href="#attend" className="font-medium hover:text-[#f97c19]">Why Attend</a>
                <a href="#speakers" className="font-medium hover:text-[#f97c19]">Speakers</a>
                <a href="#" className="font-medium hover:text-[#f97c19]">Explore</a>
                {/* <Link to="/admin-login" className="font-medium hover:text-[#f97c19]">
                      Admin
                </Link> */}
                 
              </div>
              <Link 
                to="/register" 
                className="bg-[#f97c19] hover:bg-[#db6500] text-white px-8 py-3 rounded-md font-bold text-lg transition-colors inline-block"
              >
                REGISTER NOW
              </Link>
              </nav>
              
              {/* Mobile menu button - visible only on mobile */}
              <button 
                className="md:hidden text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            
            {/* Mobile menu - appears below header when open */}
            {isMenuOpen && (
              <div className="md:hidden bg-white py-4 px-4 border-t ">
                <div className="flex flex-col space-y-3">
                  <a 
                    href="#home" 
                    className="font-medium hover:text-[#ce2e31] py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </a>
                  <a 
                    href='#about'
                    className="font-medium hover:text-[#ce2e31] py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                  <a 
                    href="#attend" 
                    className="font-medium hover:text-[#ce2e31] py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Why Attend
                  </a>
                  <a 
                    href="#speakers" 
                    className="font-medium hover:text-[#ce2e31] py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Speakers
                  </a>
                  <Link 
                    to="" 
                    className="font-medium hover:text-[#ce2e31] py-2"
                  >
                    Explore
                  </Link>
                  <Link 
                    to="/register" 
                    className="font-medium hover:text-[#ce2e31] text-center py-2 border-2 rounded-[8px] inline-block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                  {/* <Link to="/admin-login" className="font-medium hover:text-black">
                      Admin
                  </Link> */}
                  
                </div>
              </div>
            )}
          </header>

            {/* Hero section */}
      <section className="text-center flex items-center justify-center scroll-m-90 bg-[url(/src/assets/confab.jpg)] bg-cover bg-local bg-no-repeat bg-center h-[100vh]" id='home'>
        <div>
        <h1 className="text-5xl text-[#f0f0f0] md:text-7xl font-bold mb-4">
          Defining The Future
        </h1>
        <h2 className=' md:text-2xl text-[#f0f0f0] font-bold mb-4'>Fuel Your Vision. Find Your Tribe. Forge Your Path.</h2>
        </div>
      </section>

      {/* about section */}
      <section className='flex flex-col scroll-m-20 items-center px-6 md:px-0 py-20 bg-[#fafafa]' id='about'>
        <div className='text-left'>
        <h2 className='text-left text-5xl text-[#cd4547] font-bold mb-2'>CONFAB16</h2>
        <h2 className="text-3xl text-left md:text-4xl font-medium text-[#6b6b6b] mb-4">
          THE RISE OF VIPS
        </h2>
        
        <p className="text-xl mb-8">
          Visionaries, Innovators, Pacesetters and Solution providers
        </p>
         <p className="text-xl md:text-2xl text-justify mb-8 leading-relaxed max-w-3xl mx-auto">
          <span>The Confab is an organization for godly young professionals, working class, entrepreneurs and every young person who has a big dream. <br /> </span>
          Across the continent, bold thinkers and creators are re-imagining industries, solving local challenges, and setting global trends. From fintech revolutions in Nigeria's Lagos to green energy breakthroughs in Kenya's Nairobi — Africa's innovators are not just participating in the future, they're defining it.
        </p>
        
         
        </div>


        {/* Register Section */}
        <Link 
          to="/register" 
          className="bg-[#cd4547] hover:scale-105 border-2 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors inline-block"
        >
          REGISTER NOW
        </Link>
      </section>

      {/* Time and venue */}
      <section className="py-16 bg-white">
        <h1 className='text-center mb-10 font-bold text-4xl'>Join Us </h1>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white border-[#f7e5c8] transform hover:scale-105 transition-all">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-[#ffb33b] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Event Date</h3>
                <p className="text-xl text-gray-500">
                  23rd August, 2025
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-[#ebf5ed] transform hover:scale-105 transition-all">
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-[#16a149] mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Venue</h3>
                <p className="text-xl text-gray-500">
                  <a href="https://maps.app.goo.gl/xWk5WzZmQCL6stZ77">
                  Pistis Hub, Maryland - Lagos
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <p className="text-xl text-center font-semibold mt-8">
              Join <span className="text-[#f97c19] font-bold">1000+</span>{" "}
              solution providers & innovators to imagine the future and create
              the magic ⚡🌍
            </p>
      </section>

    {/* Features */}
      <section className="py-16 scroll-m-20 border-t border-b border-[#daeedf] bg-linear-330 bg-[#fafafa]" id='attend'>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Attend?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-[#f7e5c8]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#f7e5c8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#fae4c1] transition-colors">
                  <Users className="w-8 h-8 text-[#ffb33b]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Network with Innovators
                </h3>
                <p className="text-muted-foreground">
                  Connect with 1000+ solution providers and industry leaders
                  shaping Africa's future.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-[#daeedf]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#ebf5ed] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#daeedf] transition-colors">
                  <Globe className="w-8 h-8 text-[#16a149]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Insights</h3>
                <p className="text-muted-foreground">
                  Learn from success stories across the continent and discover
                  global trends.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-[#ffe8d9]">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#fff4ec] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-african-sunset/20 transition-colors">
                  <Star className="w-8 h-8 text-[#fa8938]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Shape the Future</h3>
                <p className="text-muted-foreground">
                  Be part of transformative discussions that will define
                  Africa's innovation landscape.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* featured speakers */}
      <Speakers />
    
   



    <section className='bg-gray-100 p-6'>
      <div className="container mx-auto px-4 text-center mb-15 mt-20 ">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Don't miss this opportunity to be part of Africa's most
            transformative innovation conference.
          </p>
            <div>
              <Link 
              to="/register"
              className='bg-[#cd4547] hover:scale-105 border-2 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors inline-block'
              >
              
                  Register Now
              </Link>
            </div>
        </div>
        </section>


    </div>

    
  );
};

export default Landing;