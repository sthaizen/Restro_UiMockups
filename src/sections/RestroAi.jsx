import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  parallax: {
    // Distance values: positive moves down (slower scroll), negative moves up (faster scroll)
    videoYOffset: 100,
    videoScrub: 1,         // Smoothness: higher number = more buttery lag

    titleYOffset: -80,
    titleScrub: 1,

    cardYOffset: -80,
    cardScrub: 1.5,
  }
};

export default function RestroAi() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Refs for Parallax (Wrappers)
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  // Refs for Entrance Animations (Inner content)
  const titleContentRef = useRef(null);
  const cardContentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animations (Scrubbed overlap transition)
      gsap.fromTo([titleContentRef.current, cardContentRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", 
            end: "top 40%",      // Finishes earlier for a faster animation speed
            scrub: 0.5          // Tighter scrub for a smoother, less laggy feel
          }
        }
      );

      // 2. Parallax Animations (Scrubbed on scroll)
      gsap.to(videoRef.current, {
        y: CONFIG.parallax.videoYOffset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: CONFIG.parallax.videoScrub,
        }
      });

      // Parallax for Title (Moves up faster)
      gsap.to(titleRef.current, {
        y: CONFIG.parallax.titleYOffset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: CONFIG.parallax.titleScrub,
        }
      });

      // Parallax for Info Card (Moves up at a medium speed)
      gsap.to(cardRef.current, {
        y: CONFIG.parallax.cardYOffset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: CONFIG.parallax.cardScrub,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#f1f5f9] flex items-center justify-center overflow-hidden font-sans">

      {/* Background Video Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <video
          ref={videoRef}
          src="/assets/backgrounds/Particles.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-[900px] h-[900px] object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto min-h-screen px-8 md:px-16 lg:px-24">

        {/* Top Left Title */}
        <div ref={titleRef} className="pt-24 md:pt-32 ">
          <h2
            ref={titleContentRef}
            className="text-[#000000]/70 text-[40px] md:text-[60px] leading-[1.1] font-['Geist',Arial,sans-serif] font-light tracking-tight max-w-[900px] antialiased"
          >
            The Most Advanced<br />
            Restro Hub AI
          </h2>
        </div>

        {/* Bottom Right Info Card */}
        <div ref={cardRef} className="absolute bottom-16 right-8 md:right-16 lg:right-24">
          <div ref={cardContentRef} className="bg-[#000000] w-[448px] max-w-[90vw] p-[24px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[10px] h-[10px] rounded-full bg-[#D1E0F3]" />
              <span className="text-[#CFCDC9] text-[18px] font-['Inter',Arial,sans-serif] font-normal tracking-wide">
                Restro Hub AI Engine
              </span>
            </div>

            <p className="text-[#CFCDC9] text-[16px] leading-[1.3] font-['Inter',Arial,sans-serif] font-normal">
              Restro Hub AI is our proprietary artificial intelligence designed to analyze real-time dining metrics, predict customer flow, and automate complex inventory decisions. Capable of processing thousands of data points simultaneously, Restro Hub AI acts as the operational brain for modern, high-volume restaurants.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
