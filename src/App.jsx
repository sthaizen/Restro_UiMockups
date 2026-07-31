import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    let lenisInstance = null;
    let timer = null;

    const setupLenis = () => {
      lenisInstance = lenisRef.current?.lenis;
      if (lenisInstance) {
        lenisInstance.on('scroll', ScrollTrigger.update);
        ScrollTrigger.refresh();
      } else {
        timer = requestAnimationFrame(setupLenis);
      }
    };

    setupLenis();

    return () => {
      if (timer) cancelAnimationFrame(timer);
      if (lenisInstance) {
        lenisInstance.off('scroll', ScrollTrigger.update);
      }
    };
  }, []);

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
      autoRaf={true}
      options={{
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5
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