'use client'
import HorizontalPhones from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroPage from "@/components/Hero";
import NotificationForm from "@/components/NotificationForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import LandingPageProvider from "@/provider/LandingPageProvider";

export default function Home() {
  const handleSubscription = async (email: string): Promise<void> => {
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <LandingPageProvider>
      <HeroPage />
      <HorizontalPhones />
      <TestimonialCarousel />
      <NotificationForm onSubscribe={handleSubscription} />
      <Footer />
    </LandingPageProvider>
  );
}
