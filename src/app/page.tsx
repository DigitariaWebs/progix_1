import AboutUsSection from '@/components/sections/AboutUsSection';
import BlogSection from '@/components/sections/BlogSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import ClientLogosSection from '@/components/sections/ClientLogosSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import HeroSection from '@/components/sections/HeroSection';
import Image from 'next/image';
import Link from 'next/link';
import TeamSection from '@/components/sections/TeamSection';
import SectionFadeBg from '@/components/SectionFadeBg';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaButton from '../components/sections/CtaButtonSection';
import Footer from '../components/layout/Footer';
import ScrollVelocity from '@/components/ScrollVelocity';
import ServicesSection2 from '@/components/sections/ServicesSection2';

export default function Home() {
  return (
    <div className="landing-page font-montserrat relative overflow-x-hidden">
      {/* Navbar removed per user request; StaggeredMenu is global */}
      {/* Menu global géré par GlobalMenu dans layout */}
      {/* This is your branch's hero section */}
      <HeroSection />

      {/* Client Logos Section */}
      <ClientLogosSection />

      <ServicesSection2 />

      {/* Expertise Section (horizontal) */}
      <ExpertiseSection />

      {/* About Section */}
      <AboutUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* ScrollVelocity separator + Team wrapped together for dark transition */}
      <SectionFadeBg threshold={0.35}>
        <div className="py-8 overflow-hidden">
          <ScrollVelocity
            texts={['NOTRE ÉQUIPE', 'NOTRE ÉQUIPE']}
            velocity={90}
            className=""
            parallaxStyle={{ padding: '0.5rem 0' }}
            scrollerStyle={{ gap: '2rem' }}
          />
        </div>
      </SectionFadeBg>
      <TeamSection />

      <BlogSection />

      <CtaButton />

      <Footer />
      {/* Rest of your landing page content */}
    </div>
  );
}
