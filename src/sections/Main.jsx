import React, { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useSubscription = () => {
  return { tier: 'free' };
};

const logos = [
  { name: 'Cyric', type: 'text' },
  { name: 'Students', type: 'icon-text' },
  { name: 'Candidates', type: 'icon-text' },
  { name: 'Mentors', type: 'text' },
  { name: 'Bootcamps', type: 'stacked-text' },
  { name: 'Recruiters', type: 'dots-text' },
];

const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const rightContentRef = useRef(null);
  const bgImageRef = useRef(null);
  const brightOverlayRef = useRef(null);
  const bottomLabelsRef = useRef(null);

  const { tier } = useSubscription();

  // Marquee Refs
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const logoSectionRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      loadTl.to(brightOverlayRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      }, 0)
        .fromTo(bgImageRef.current,
          { scale: 1.3, filter: 'brightness(1.2)' },
          { scale: 1, filter: 'brightness(1)', duration: 1.5, ease: 'power3.out' },
          0
        )
        .call(() => setIsLoaded(true), null, "-=1.1")
        .fromTo(contentRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          "-=1.1"
        )
        .fromTo(rightContentRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          "-=1.0"
        )
        .fromTo(bottomLabelsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
          "-=1.1"
        )
        ;

      // Scroll-triggered reveal for the logo/marquee section
      // Pull it up faster and make it complete earlier in the scroll, keeping opacity at 0
      gsap.fromTo(logoSectionRef.current,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: -180,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '85% top',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(bgImageRef.current,
        { yPercent: 0 },
        {
          yPercent: -30,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      // Main content scrolls up to the top half of the screen but remains visible (opacity 1)
      [contentRef, rightContentRef].forEach((ref) => {
        gsap.to(ref.current, {
          yPercent: -400,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });

      // Bottom labels fade out as the logo section scrolls up to avoid overlap
      gsap.to(bottomLabelsRef.current, {
        yPercent: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '30% top',
          scrub: 1,
        }
      });

      gsap.to(track1Ref.current, {
        xPercent: -40,
        repeat: -1,
        duration: 45,
        ease: 'none',
      });

      gsap.fromTo(track2Ref.current,
        { xPercent: -50 },
        { xPercent: 0, repeat: -1, duration: 45, ease: 'none' }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const renderLogo = (logo, index) => (
    <div
      key={index}
      className="flex-shrink-0 flex items-center justify-center transition-colors hover:bg-[#FFFFFF33] backdrop-blur-sm rounded-xl"
      style={{
        width: '248.1px',
        height: '115.78px',
        background: '#FFFFFF26',
        padding: '26.4644px',
      }}
    >
      {logo.type === 'text' && (
        <span className="text-white font-bold text-2xl tracking-wide uppercase">{logo.name}</span>
      )}
      {logo.type === 'icon-text' && (
        <div className="flex items-center gap-3 text-white font-semibold text-xl">
          <div className="w-5 h-5 rounded-full bg-[#D1D5DB]" />
          {logo.name}
        </div>
      )}
      {logo.type === 'stacked-text' && (
        <div className="text-white font-medium text-sm leading-tight text-center">
          steinmeier<br />
          <span className="text-[#9CA3AF]">consulting</span>
        </div>
      )}
      {logo.type === 'dots-text' && (
        <div className="flex flex-col items-center gap-1.5 text-white font-semibold text-sm">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          Securitas
        </div>
      )}
    </div>
  );

  return (
    <div
      id="hero"
      ref={heroRef}
      className="relative flex flex-col justify-between w-full min-h-screen bg-[#0A0B0E] font-amiamie overflow-hidden"
    >
      <div ref={brightOverlayRef} className="absolute inset-0 bg-white z-50 pointer-events-none"></div>

      {/* Background Image Fix */}
      <div className="absolute inset-0 w-full h-[100vh] z-0 pointer-events-none overflow-hidden">
        <img
          ref={bgImageRef}
          src="/assets/backgrounds/Bgvideo.webp"
          alt="Background"
          className="w-full h-auto min-w-full opacity-80 origin-center"
        />
        <div className="absolute inset-0 bg-[#0A0B0E]/15 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E]/60 via-transparent to-[#0A0B0E]/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent z-10"></div>
      </div>

      {/* Main Grid Container matching Image 1 layout */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-20 flex-1 pb-16 pt-[67vh]">

        {/* Left Column: Bottom-Left Title and Subtitle */}
        <div ref={contentRef} className="flex flex-col items-start text-left w-full lg:w-[60%]">
          <h1 className="text-white font-medium font-inter tracking-tight leading-[1.0] mb-4 text-[72px] sm:text-[96px] md:text-[120px] lg:text-[150px] opacity-0 select-none">
            Polaris
          </h1>
          <p className="text-white/90 font-light font-inter text-[18px] sm:text-[22px] md:text-[24px] opacity-0 select-none">
            Browse the web like it has a horizon.
          </p>
        </div>

        {/* Right Column: Bottom-Right Paragraph & Button */}
        <div className="flex flex-col items-start text-left w-full lg:w-[35%] max-w-[400px]">

          <div ref={rightContentRef} className="flex flex-col items-start w-full text-left">
            {/* Decorative horizontal line matching Image 1 */}
            <div className="w-full h-[1px] bg-white/20 mb-6 opacity-0" />

            <p className="text-white/80 leading-relaxed font-light font-inter text-[14px] sm:text-[15px] md:text-[16px] mb-8 opacity-0">
              A calm AI browser concept for finding signal, tracing ideas, and moving through knowledge with spatial clarity.
            </p>

            <div className="opacity-0">
              <button
                className="inline-flex items-center justify-center bg-white text-[#0A0B0E] font-medium font-inter rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-lg px-8 py-3 text-[15px]"
              >
                Open Polaris
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Very bottom labels matching Image 1 */}
      <div
        ref={bottomLabelsRef}
        className="relative z-20 w-full max-w-[1720px] mx-auto px-8 md:px-16 pb-4 flex justify-between items-center text-[10px] tracking-[0.2em] text-white/40 uppercase font-inter"
      >
        <div className="opacity-0">NEURAL CLOUD MAP</div>
        <div className="opacity-0">DESIGN.MD / AMBIENT EXPLORER</div>
      </div>

      <div
        className="relative z-20 w-full bg-black/0"
        style={{ paddingBottom: '115.78px' }}
      >
        <div ref={logoSectionRef} className="logo-section-content mt-7 opacity-0">
          <p
            className="text-center text-white font-light opacity-80"
            style={{ fontSize: '16px', marginBottom: '40px' }}
          >
            Thousands of learners are preparing with Clyric
          </p>

          <div className="w-full mb-[16px] relative flex justify-start overflow-hidden">
            <div className="absolute top-0 left-0 w-[15vw] h-full bg-gradient-to-r from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[15vw] h-full bg-gradient-to-l from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>

            <div ref={track1Ref} className="flex gap-[16px] w-max items-center pr-[16px]">
              {marqueeLogos.map((logo, index) => renderLogo(logo, index))}
            </div>
          </div>

          <div className="w-full relative flex justify-start overflow-hidden">
            <div className="absolute top-0 left-0 w-[15vw] h-full bg-gradient-to-r from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[15vw] h-full bg-gradient-to-l from-[#0A0B0E] to-transparent z-10 pointer-events-none"></div>

            <div ref={track2Ref} className="flex gap-[16px] w-max items-center pr-[16px] ml-[-132px]">
              {marqueeLogos.map((logo, index) => renderLogo(logo, index))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;