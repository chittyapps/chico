import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import DashboardPreview from "@/components/dashboard-preview";
import Pricing from "@/components/pricing";
import ROICalculator from "@/components/roi-calculator";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Pricing />
      <ROICalculator />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
