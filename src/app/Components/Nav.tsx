"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from 'react-spring';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !(mobileMenuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navLinks = [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Projects', href: '#projects' },
    { text: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="text-xl font-bold text-gray-800 dark:text-white">
            HP<span className="text-blue-600 dark:text-blue-400">.</span>
          </a>
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(({ text, href }) => (
              <a
                key={text}
                href={href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium"
              >
                {text}
              </a>
            ))}
            <a
              href="/resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-md font-semibold transition-colors text-base shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu 
        isMobileMenuOpen={isMobileMenuOpen} 
        mobileMenuRef={mobileMenuRef} 
        closeMobileMenu={closeMobileMenu} 
        navLinks={navLinks} 
        toggleTheme={toggleTheme} 
        theme={theme} 
      />
    </nav>
  );
}

// New MobileMenu component for transitions
interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
  closeMobileMenu: () => void;
  navLinks: { text: string; href: string }[];
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  mobileMenuRef,
  closeMobileMenu,
  navLinks,
  toggleTheme,
  theme,
}) => {
  const transitions = useTransition(isMobileMenuOpen, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(100%)' },
    config: { tension: 250, friction: 30 },
  });

  const backdropTransitions = useTransition(isMobileMenuOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 250, friction: 30 },
  });

  return (
    <>
      {backdropTransitions((styles, item) =>
        item && (
          <animated.div
            style={styles}
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={closeMobileMenu}
          />
        )
      )}
      {transitions((styles, item) =>
        item && (
          <animated.div
            ref={mobileMenuRef}
            style={styles}
            className="md:hidden fixed inset-y-0 right-0 z-50 bg-white dark:bg-gray-900 w-4/5 max-w-xs h-full shadow-lg p-6 space-y-6 flex flex-col"
          >
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col space-y-4 mt-8 flex-grow">
              {navLinks.map(({ text, href }) => (
                <a
                  key={text}
                  href={href}
                  onClick={closeMobileMenu}
                  className="text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 text-lg font-medium"
                >
                  {text}
                </a>
              ))}
              {/* Theme Toggle Button for Mobile Menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 p-2 rounded-md text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325 5.232l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a
                href="/resume.docx"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-md font-semibold transition-colors text-base text-center shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Resume
              </a>
            </nav>
            <div className="mt-auto mb-4">
              {/* This is the 'N' icon at the bottom of the mobile menu */}
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-lg">
                N
              </div>
            </div>
          </animated.div>
        )
      )}
    </>
  );
};
