import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 w-full text-white font-poppins transition-all duration-300 ${
        isScrolled ? 'bg-[#2C7961] shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Nama */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img 
                src="/images/Logo.png" 
                alt="Logo Desa"
                className="h-12 w-12 object-contain rounded-full bg-white/10 ring-1 ring-white/20" 
              />
              <div className="leading-tight">
                <div className="text-lg md:text-xl font-bold">Desa Bandarejo</div>
                <div className="text-sm md:text-base text-white/90">Kabupaten Lampung Selatan</div>
              </div>
            </Link>

            {/* Menu Desktop (md+) */}
            <ul className="hidden md:flex items-center gap-8 text-base font-semibold">
              <li><Link to="/" className="hover:opacity-90 transition-opacity">Home</Link></li>
              <li><Link to="/profil-desa" className="hover:opacity-90 transition-opacity">Profil Desa</Link></li>
              <li><Link to="/infografis" className="hover:opacity-90 transition-opacity">Infografis</Link></li>
              <li><Link to="/berita" className="hover:opacity-90 transition-opacity">Berita</Link></li>
              <li>
                <Link 
                  to="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md ring-1 ring-white/30 hover:bg-white/10 transition text-base"
                >
                  Login
                </Link>
              </li>
            </ul>

            {/* Tombol Hamburger (mobile) */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Toggle menu"
            >
              {/* ikon hamburger */}
              <svg 
                className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              
              {/* ikon close */}
              <svg 
                className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Mobile */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden ${
            isScrolled ? 'bg-[#2C7961]' : 'bg-[#2C7961]/95 backdrop-blur-md'
          } border-t border-white/10`}>
            <ul className="flex flex-col text-sm font-semibold py-2">
              <li><Link to="/" onClick={closeMobileMenu} className="block py-2 px-3 hover:bg-white/10 transition-colors">Home</Link></li>
              <li><Link to="/profil-desa" onClick={closeMobileMenu} className="block py-2 px-3 hover:bg-white/10 transition-colors">Profil Desa</Link></li>
              <li><Link to="/infografis" onClick={closeMobileMenu} className="block py-2 px-3 hover:bg-white/10 transition-colors">Infografis</Link></li>
              <li><Link to="/berita" onClick={closeMobileMenu} className="block py-2 px-3 hover:bg-white/10 transition-colors">Berita</Link></li>
              <li className="pt-1"><Link to="/login" onClick={closeMobileMenu} className="block py-2 px-3 hover:bg-white/10 transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
