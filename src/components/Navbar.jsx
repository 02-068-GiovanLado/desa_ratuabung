import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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

  // Navbar transparan hanya di home page dengan glassmorphism
  const getNavbarBg = () => {
    if (!isHomePage) return 'bg-[#1E3A5F]/95 backdrop-blur-lg shadow-xl border border-white/10';
    return isScrolled ? 'bg-[#1E3A5F]/95 backdrop-blur-lg shadow-xl border border-white/10' : 'bg-white/5 backdrop-blur-sm border border-white/20';
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/profil-desa', label: 'Profil Desa', icon: '📋' },
    { path: '/infografis', label: 'Infografis', icon: '📊' },
    { path: '/listing', label: 'Listing', icon: '📝' },
    { path: '/infografis#idm', label: 'IDM', icon: '⭐' },
    { path: '/galeri', label: 'Galeri', icon: '📷' },
    { path: '/listing', label: 'Belanja', icon: '🛒' },
    { path: '/infografis#ppid', label: 'PPID', icon: '📄' },
  ];

  return (
    <>
      {/* Floating Navbar Container */}
      <div className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
        <nav className={`max-w-7xl mx-auto rounded-2xl text-white font-poppins transition-all duration-500 ${getNavbarBg()}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo + Nama di Kiri */}
              <Link to="/" className="flex items-center gap-3 shrink-0 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src="/images/Logo.png" 
                    alt="Logo Desa"
                    className="relative h-14 w-14 object-contain transform group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-lg md:text-xl font-bold">Desa Ratu Abung</div>
                  <div className="text-sm md:text-base text-white/90">Kabupaten Lampung Utara</div>
                </div>
              </Link>

              {/* Menu Desktop (md+) di Kanan dengan Icon & Underline */}
              <ul className="hidden md:flex items-center gap-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (item.path.includes('#') && location.pathname + location.hash === item.path);
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'hover:bg-white/10 text-white/90 hover:text-white'
                        }`}
                      >
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                        
                        {/* Animated Underline */}
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-white rounded-full transition-all duration-300 ${
                          isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                        }`}></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Tombol Hamburger (mobile) dengan Glass Effect */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Toggle menu"
              >
                {/* ikon hamburger */}
                <svg 
                  className={`h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 hidden' : 'rotate-0 opacity-100 block'}`}
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
                  className={`h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100 block' : '-rotate-90 opacity-0 hidden'}`}
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

            {/* Menu Mobile dengan Glassmorphism */}
            <div className={`overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } md:hidden`}>
              <div className="border-t border-white/10 mt-2">
                <ul className="flex flex-col text-sm font-medium py-2 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                      (item.path.includes('#') && location.pathname + location.hash === item.path);
                    
                    return (
                      <li key={item.path}>
                        <Link 
                          to={item.path} 
                          onClick={closeMobileMenu} 
                          className={`flex items-center gap-3 py-3 px-4 mx-2 rounded-lg transition-all duration-300 ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'hover:bg-white/10 text-white/90'
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer untuk halaman non-home agar konten tidak tertutup navbar */}
      {!isHomePage && <div className="h-20"></div>}
    </>
  );
};

export default Navbar;
