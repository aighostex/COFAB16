import { useState } from 'react';
import { Link } from 'react-router-dom';
import confab from '../assets/confab16.svg'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <header className="bg-[#ce2e31] w-full shadow-sm z-[1000]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-sm flex items-center font-[400] text-white">
        <img src={confab} alt="confab16" className='h-20 w-20 rounded-full' /><span>CONFERENCE OF <br /> THE FAITHFUL AMBASSADORS</span>
        </Link>
        
        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex space-x-8 text-white">
          <Link to="/" className="font-medium hover:text-black">Home</Link>
          <Link to="/register" className="font-medium hover:text-black">Register</Link>
          {/* {isAdmin && (
            <Link to="/dashboard" className="font-medium hover:text-indigo-600">Dashboard</Link>
          )} */}
          {!localStorage.getItem('adminAuth') && (
            <Link to="/admin-login" className="text-sm text-white hover:text-black">
                Admin
            </Link>
            )}
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
            {!localStorage.getItem('adminAuth') && (
            <Link to="/admin-login" className="text-sm text-white hover:text-black">
                Admin
            </Link>
            )}
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;