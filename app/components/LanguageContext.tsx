"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  // Set default language based on URL hash or fallback to 'EN'
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (['EN', 'JP', 'HK'].includes(hash)) {
      setLanguage(hash);
    } else {
      window.location.hash = '#EN';
      setLanguage('EN');
    }
  }, []);

  // Update URL hash whenever the language changes
  useEffect(() => {
    if (language) {
      window.location.hash = `#${language}`;
    }
  }, [language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  console.log('LanguageProvider render:', { language });
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
