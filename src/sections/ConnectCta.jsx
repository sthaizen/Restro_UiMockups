import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  text: {
    highlight: 'Connect With Us.',
    body: ' Our team is here to provide information on our advanced technology and performance capabilities.',
  },
  cta: 'Contact Our Team',
  images: {
    img1: {
      src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0',
      alt: 'Aerial view of a terraced mine',
    },
    img2: {
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0',
      alt: 'Aerial view of a cargo ship on the ocean',
    },
  },
  grid: {
    heightMobile: '420px',
    heightDesktop: '640px',
    gapMobile: '12px',
    gapDesktop: '24px',
    columns: '1fr 1fr',
  },
  img1: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '900px',
    height: '740px',
  },
  img2: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '700px',
    height: '740px',
  },
  parallax: {
    img1: { yPercent: 8, scrub: 1.2 },
    img2: { yPercent: 12, scrub: 1.5 },
  },
};

const ConnectCta = () => {
  const sectionRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const img1WrapRef = useRef(null);
  const img1Ref = useRef(null);
  const img2WrapRef = useRef(null);
  const img2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        iconRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      );

      tl.fromTo(
        [img1WrapRef.current, img2WrapRef.current],
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.15, ease: 'power4.inOut' },
        '-=0.8'
      );

      tl.fromTo(
        [img1Ref.current, img2Ref.current],
        { scale: 1.15 },
        { scale: 1, duration: 1.6, stagger: 0.15, ease: 'power2.out' },
        '<'
      );

      gsap.to(img1Ref.current, {
        yPercent: CONFIG.parallax.img1.yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: CONFIG.parallax.img1.scrub,
        },
      });

      gsap.to(img2Ref.current, {
        yPercent: CONFIG.parallax.img2.yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: CONFIG.parallax.img2.scrub,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1b1b1b] overflow-hidden font-sans"
    >
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

        <div className="flex flex-col justify-between h-full min-h-[400px] lg:min-h-[580px] py-4">

          <div ref={iconRef} className="text-[#d3e7ff] opacity-80">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          <div ref={textRef} className="my-12 lg:my-0">
            <h2
              className="font-light leading-[1.35] tracking-[-0.015em] max-w-[460px]"
              style={{ fontSize: 'clamp(26px, 3.2vw, 36px)' }}
            >
              <span className="text-[#f4f4f4]">{CONFIG.text.highlight}</span>
              <span className="text-[#888888]">{CONFIG.text.body}</span>
            </h2>
          </div>

          <div ref={ctaRef}>
            <button className="flex items-center gap-2 group cursor-pointer">
              <div className="flex items-center justify-center bg-[#E5EFFF] text-[#1D2939] w-12 h-12 rounded transition-colors group-hover:bg-[#d0e0ff]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5v7a2 2 0 0 0 2 2h9" />
                  <path d="M16 10l4 4-4 4" />
                </svg>
              </div>
              <div className="flex items-center justify-center border border-gray-300 px-6 h-12 rounded bg-white text-black font-medium text-[15px] transition-colors group-hover:bg-gray-50">
                {CONFIG.cta}
              </div>
            </button>
          </div>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: CONFIG.grid.columns,
            gap: CONFIG.grid.gapMobile,
            height: CONFIG.grid.heightMobile,
          }}
          className="lg:!gap-[var(--img-gap-lg)] lg:!h-[var(--img-h-lg)]"
          ref={el => {
            if (el) {
              el.style.setProperty('--img-gap-lg', CONFIG.grid.gapDesktop);
              el.style.setProperty('--img-h-lg', CONFIG.grid.heightDesktop);
            }
          }}
        >
          <div
            ref={img1WrapRef}
            className="relative"
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            <img
              ref={img1Ref}
              src={CONFIG.images.img1.src}
              alt={CONFIG.images.img1.alt}
              style={{
                width: CONFIG.img1.width,
                height: CONFIG.img1.height,
                objectFit: CONFIG.img1.objectFit,
                objectPosition: CONFIG.img1.objectPosition,
                transformOrigin: 'center center',
                display: 'block',
              }}
            />
          </div>

          <div
            ref={img2WrapRef}
            className="relative"
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            <img
              ref={img2Ref}
              src={CONFIG.images.img2.src}
              alt={CONFIG.images.img2.alt}
              style={{
                width: CONFIG.img2.width,
                height: CONFIG.img2.height,
                objectFit: CONFIG.img2.objectFit,
                objectPosition: CONFIG.img2.objectPosition,
                transformOrigin: 'center center',
                display: 'block',
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConnectCta;