import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RollingText from '../components/RollingText';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection2() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoPlaceholderRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const overlayRef = useRef(null);

  const CONTENT_OFFSET_Y = 0;

  const LINE_WIDTH_PX = 1600;
  const VIDEO_OFFSET_Y = 0;
  const TEXT_LEFT_OFFSET_Y = 0;
  const TEXT_RIGHT_OFFSET_Y = 0;

  const TEXT_PARALLAX_X = 80;

  const PIN_START_POSITION = "7% 7%";

  const TOTAL_PIN_SCROLL_DISTANCE = 200;

  // Video Overlay Controls
  const OVERLAY_COLOR = "#212325";
  const OVERLAY_MAX_OPACITY = 0;
  const OVERLAY_BLUR_PX = 0;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const targetTrigger = videoPlaceholderRef.current;

      gsap.fromTo(videoWrapperRef.current,
        { scale: 1 },
        {
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: PIN_START_POSITION,
            scrub: true,
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: PIN_START_POSITION,
          end: `+=${TOTAL_PIN_SCROLL_DISTANCE}%`,
          pin: containerRef.current,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.fromTo(videoWrapperRef.current, {
        top: () => {
          const p = videoPlaceholderRef.current;
          const c = containerRef.current;
          if (!p || !c) return 0;
          const pRect = p.getBoundingClientRect();
          const cRect = c.getBoundingClientRect();
          const offsetTop = pRect.top - cRect.top;
          return offsetTop + p.offsetHeight / 2 - window.innerHeight * 0.50;
        },
        left: 0,
        width: "100%",
        height: "100vh",
        clipPath: () => {
          const p = videoPlaceholderRef.current;
          const c = containerRef.current;
          if (!p || !c) return "inset(0px)";

          const pRect = p.getBoundingClientRect();
          const cRect = c.getBoundingClientRect();

          const offsetTop = pRect.top - cRect.top;
          const offsetLeft = pRect.left - cRect.left;
          const wrapperTop = offsetTop + p.offsetHeight / 2 - window.innerHeight * 0.50;

          const insetTop = offsetTop - wrapperTop;
          const insetLeft = offsetLeft;
          const insetBottom = window.innerHeight - (insetTop + p.offsetHeight);
          const insetRight = cRect.width - (insetLeft + p.offsetWidth);

          return `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px round 6px)`;
        }
      }, {
        top: () => {
          const p = videoPlaceholderRef.current;
          const c = containerRef.current;
          if (!p || !c) return 0;
          const pRect = p.getBoundingClientRect();
          const cRect = c.getBoundingClientRect();
          const offsetTop = pRect.top - cRect.top;
          return offsetTop + p.offsetHeight / 2 - window.innerHeight * 0.50;
        },
        left: 0,
        width: "100%",
        height: "100vh",
        clipPath: "inset(0px 0px 0px 0px round 0px)",
        duration: 100,
        ease: "power2.inOut"
      }, 0);

      tl.to(leftTextRef.current, {
        x: -TEXT_PARALLAX_X,
        duration: 100,
        ease: "power2.inOut"
      }, 0);

      tl.to(rightTextRef.current, {
        x: TEXT_PARALLAX_X,
        duration: 100,
        ease: "power2.inOut"
      }, 0);

      tl.fromTo(".divider-line",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 100,
          ease: "power2.inOut"
        }, 0
      );

      tl.fromTo(overlayRef.current, {
        opacity: 0
      }, {
        opacity: OVERLAY_MAX_OPACITY,
        duration: 50,
        ease: "power2.inOut"
      }, 50);

      const leftElements = gsap.utils.toArray(leftTextRef.current.children);
      const rightElements = gsap.utils.toArray(rightTextRef.current.children);

      gsap.fromTo([...leftElements, ...rightElements],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#1b1b1b] w-full pt-[40px] mb-20">
      <div
        className="h-[1px] bg-white/20 mb-5 mx-auto"
        style={{ width: `${LINE_WIDTH_PX}px`, maxWidth: '100%' }}
      />

      <div className="w-full relative z-20 px-4 md:px-8 lg:px-12 pb-8">
        <h2 className="text-[#ffffff] font-mono text-[11px] sm:text-[13px] lg:text-[14.87px] tracking-[0.15em] uppercase font-bold select-none text-left inter ml-5">
          ◆ SHOWROOM
        </h2>
      </div>

      <section ref={containerRef} className="relative z-10 font-inter h-screen w-full flex flex-col">
        <div className="flex-1 w-full flex items-center justify-center relative z-20 px-[24px] md:px-[64px] lg:px-[96px]">

          <div
            className="relative w-full max-w-[1400px] flex items-center"
            style={{ transform: `translateY(${CONTENT_OFFSET_Y}px)` }}
          >
            <div className="w-full flex justify-center" style={{ transform: `translateY(${VIDEO_OFFSET_Y}px)` }}>
              <div ref={videoPlaceholderRef} className="w-[65%] aspect-[16/9] opacity-0" />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 w-[1600px] max-w-[100vw] top-1/2 -translate-y-[95px] z-20 pointer-events-none px-[24px]">
              <div className="divider-line w-full h-[1px] bg-white/40 origin-center" />
            </div>

            <div
              ref={leftTextRef}
              className="absolute left-0 w-[45%] pointer-events-none z-30 top-1/2 -translate-y-1/2"
              style={{ marginTop: `${TEXT_LEFT_OFFSET_Y}px` }}
            >

              <h1 className="text-white text-[32px] md:text-[42px] lg:text-[44px] leading-[1.1] font-light font-['Geist',Arial,sans-serif] tracking-tight drop-shadow-md">
                A place where precision<br />and creativity connect.
              </h1>
            </div>

            <div
              ref={rightTextRef}
              className="absolute right-0 w-[30%] flex flex-col items-end text-right pointer-events-auto z-30 top-1/2 -translate-y-1/2"
              style={{ marginTop: `${TEXT_RIGHT_OFFSET_Y}px` }}
            >

              <h3 className="text-white uppercase text-[11px] md:text-[12px] tracking-[0.15em] font-bold mb-2">
                ADDRESS
              </h3>
              <p className="text-white/80 text-[13px] md:text-[15px] leading-[1.5] max-w-[220px] mb-8 font-light">
                Orbital 25 Business Park, Unit<br />Watford WD18 9DA, UK
              </p>

              <button className="flex items-center justify-center gap-3 bg-[#ffffff1a] hover:bg-[#ffffff33] transition-colors duration-300 backdrop-blur-sm px-6 py-3  text-white uppercase text-[12px] tracking-wider font-medium group ">
                <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute transition-transform duration-500 ease-out group-hover:translate-x-[150%]"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute -translate-x-[150%] transition-transform duration-500 ease-out group-hover:translate-x-0"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>
                <RollingText text="SHOWROOM" />
              </button>
            </div>

          </div>
        </div>

        <div
          ref={videoWrapperRef}
          className="absolute z-10 overflow-hidden bg-black shadow-lg"
          style={{ willChange: 'clip-path, transform', transform: 'translateZ(0)' }}
        >
          <video
            src="/assets/backgrounds/vid.webm"
            className="w-full h-full object-cover opacity-70"
            autoPlay
            loop
            muted
            playsInline
          />
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none opacity-0"
            style={{
              backgroundColor: OVERLAY_COLOR,
              backdropFilter: `blur(${OVERLAY_BLUR_PX}px)`
            }}
          />
        </div>
      </section>
    </div>
  );
}
