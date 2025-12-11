
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Ecosystem from './pages/Ecosystem';
import Rules from './pages/Rules';
import Store from './pages/Store';
import Contact from './pages/Contact';
import Minutes from './pages/Minutes';
import Tides from './pages/Tides';
import ChatBot from './components/ChatBot';

/**
 * Utility component that scrolls the window to the top whenever the route changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Ecosystem', path: '/ecosystem' },
    { name: 'Tides', path: '/tides' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ];

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10 max-w-[1400px] mx-auto w-full">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-9 text-primary transition-transform group-hover:rotate-12">
              <span className="material-symbols-outlined text-4xl">sailing</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Point Lookout F.C.</h2>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">North Stradbroke Island</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link to="/store" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 size-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/membership"
                className="rounded-full bg-secondary dark:bg-white text-white dark:text-secondary h-10 px-6 flex items-center justify-center text-sm font-bold hover:opacity-90 transition-all shadow-md"
              >
                Join Club
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 animate-fade-in shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-bold ${location.pathname === link.path ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/membership"
                className="mt-4 w-full bg-primary text-white h-12 flex items-center justify-center rounded-xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Join the Club
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/store" element={<Store addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/minutes" element={<Minutes />} />
          <Route path="/tides" element={<Tides />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white">
              <span className="material-symbols-outlined text-primary text-3xl">sailing</span>
              <span className="font-bold text-xl uppercase tracking-wider">PLFC</span>
            </div>
            <p className="text-sm leading-relaxed">
              Promoting sustainable fishing, community engagement, and the preservation of North Stradbroke's marine heritage since 1975.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Explore</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/ecosystem" className="hover:text-primary transition-colors">Quandamooka Ecosystem</Link></li>
              <li><Link to="/rules" className="hover:text-primary transition-colors">Club Rules</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Resources</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/minutes" className="hover:text-primary transition-colors">Meeting Minutes</Link></li>
              <li><Link to="/store" className="hover:text-primary transition-colors">Merch Store</Link></li>
              <li><Link to="/tides" className="hover:text-primary transition-colors">Tide Times</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Connect</h5>
            <div className="flex gap-4">
              <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="font-bold">Fb</span>
              </a>
              <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="font-bold">Ig</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-slate-800 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2024 Point Lookout Fishing Club Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:underline">Contact Us</Link>
            <Link to="/membership" className="hover:underline">Join Now</Link>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;
