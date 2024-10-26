import Navbar from '@/components/Navbar';
import React from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

const LandingPageProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}  
    </div>
  );
};

export default LandingPageProvider;
