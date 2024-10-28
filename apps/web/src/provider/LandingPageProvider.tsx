import Navbar from '@/components/Navbar';
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
