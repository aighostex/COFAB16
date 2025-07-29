import { useState } from 'react';
import { Link } from 'react-router-dom';
import confab from '../assets/confab16.svg'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <header className="bg-[#1F2E49] w-full shadow-sm fixed z-[1000]">
      <div className="container mx-auto p-0 py-3 flex justify-between items-center">
        <Link to="/" className="text-sm flex gap-3 items-center font-[400] text-white">
        <img src={confab} alt="confab16" className='h-20 w-20 rounded-full' /><span className='text-white font-bold text-2xl'>CONFAB</span>
        </Link>
        
        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8 text-white">
          <div className='flex items-center justify-center gap-6 absolute left-[38%]'>
          <Link to="/" className="font-medium hover:text-[#f97c19]">Home</Link>
          <Link to="/" className="font-medium hover:text-[#f97c19]">About</Link>
          <Link to="/" className="font-medium hover:text-[#f97c19]">Why Attend</Link>
          <Link to="#speakers" className="font-medium hover:text-[#f97c19]">Speakers</Link>
          <Link to="/admin-login" className="font-medium hover:text-[#f97c19]">
                Admin
          </Link>
           
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
        <div className="md:hidden bg-white py-2 px-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="font-medium hover:text-[#ce2e31] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/register" 
              className="font-medium hover:text-[#ce2e31] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link to="/admin-login" className="font-medium hover:text-black">
                Admin
            </Link>
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;