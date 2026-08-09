import React, { createContext, useContext, useState, useEffect } from 'react';

const CommandPaletteContext = createContext(null);

export const CommandPaletteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, openPalette, closePalette }}>
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPalette = () => useContext(CommandPaletteContext);
