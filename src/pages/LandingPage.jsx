import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItGoesSection from "../components/landing/HowItGoesSection";
import ExploreListingsSection from "../components/landing/ExploreListingsSection";
import CTABanner from "../components/landing/CTABanner";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItGoesSection />
        <ExploreListingsSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
