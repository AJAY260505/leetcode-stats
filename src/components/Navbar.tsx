
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-background/80 border-b border-border/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative w-8 h-8 overflow-hidden">
            <div className="absolute inset-0 bg-primary rounded-md"></div>
            <div className="absolute inset-1 bg-background rounded-md flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight">LeetCode Stats</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-foreground md:hidden focus:outline-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-40 pt-20 px-6 animate-fade-in md:hidden">
          <div className="flex flex-col space-y-6 py-8">
            {links.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`text-lg font-medium py-2 border-b border-border animate-slide-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
