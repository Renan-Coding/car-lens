'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '/', label: 'Início' },
    { href: '/catalog', label: 'Catálogo' },
    { href: '/compare', label: 'Comparar' },
    { href: '/ai', label: 'IA Consultora' },
  ];

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent transition-all duration-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/carlens_logo.png" 
                  alt="CarLens Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full"
                />
              </div>
            </div>
            <span className="text-2xl font-orbitron font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              CarLens
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-text-secondary hover:text-blue-500 transition-colors duration-300 font-medium group"
              >
                <span className="flex items-center space-x-2">
                  <span>{item.label}</span>
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 group"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-blue-500 group-hover:bg-purple-500 transition-colors duration-300"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-blue-500 group-hover:bg-purple-500 transition-colors duration-300"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-blue-500 group-hover:bg-purple-500 transition-colors duration-300"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-dark-secondary/95 backdrop-blur-md border-t border-neon-blue/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-neon-blue hover:bg-dark-card/50 rounded-lg transition-all duration-300"
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="px-4 pt-2"
              >
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}