import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { MaterialsSection } from "@/components/sections/materials-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <MaterialsSection />
        <HowItWorksSection />
        <GallerySection />
        <QuoteSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
