import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';

// Active Section Imports
import Main from './sections/Main';
import Footer from "./sections/Footer";
import TeamSection from "./sections/TeamSection";
import BlueBar from "./sections/BlueBar";
import Ctst from './sections/Ctst';
import Questions from './sections/question';
import ContactSummery from './sections/ContactSummery';
import Newwork from './sections/Newwork';
import HorizontalScroll from './sections/HorizontalScroll';
import VideoSection from './sections/VideoSection';
import VideoSection2 from './sections/VideoSection2';
import Anotherabt from './sections/Anotherabt';
import RestroAi from './sections/RestroAi';
import MorphComp from './sections/MorphComp';
import FeatureGrid from './sections/FeatureGrid';
import BentoGrid from './sections/BentoGrid';
import NewsSection from './sections/NewsSection';
import WebPreview from './sections/WebPreview';
import ConnectCta from './sections/ConnectCta';
import SkillPage from './components/SkillPage/SkillPage';
import BottomNav from './components/BottomNav';
import HeatCapabilities from './sections/HeatCapabilities';

const Home = () => {
  const location = useLocation();
  const lenisRef = useRef();

  // Sync GSAP ticker with Lenis to prevent scroll jitter on pinned elements
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    // VERY IMPORTANT: Tell GSAP ScrollTrigger to update every time Lenis scrolls.
    // Without this, GSAP animations will lag behind the smooth scroll.
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Prevents GSAP from skipping frames, crucial for smooth scroll

    return () => {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
      }
      gsap.ticker.remove(update);
    };
  }, []);

  // Use Lenis for smooth anchor link scrolling instead of native browser scroll
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      const lenis = lenisRef.current?.lenis;
      
      if (el) {
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(el, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }
  }, [location.hash]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.08,           // Perfect balance: 0.05 is too heavy, 0.1 is too fast
        smoothWheel: true,    // Enable smooth scrolling for mouse wheels
        wheelMultiplier: 1,   // Keep 1:1 wheel speed to feel natural
        touchMultiplier: 2    // Better feel on mobile/trackpads
      }}
      className='relative w-full min-h-screen'
    >

      <div className="sticky top-0 z-0 w-full  pointer-events-auto">
        <Main />
      </div>

      <div className="relative z-10 bg-[#ffffff] shadow-[0_-10px_50px_rgba(0,0,0,0.12)] ">
        <Newwork />
        <VideoSection2 />
        <HeatCapabilities />
        <HorizontalScroll />
        <MorphComp />
        <BlueBar />
        <TeamSection />
        <FeatureGrid />
        {/* <NewsSection /> */}
        {/* <RestroAi /> */}
        <WebPreview />
        <ConnectCta />

      </div>

      <BottomNav />

    </ReactLenis>

  );
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skill" element={<SkillPage />} />
    </Routes>
  );
}

export default App;