import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef(null);
  const quickSetterX = useRef(null);
  const quickSetterY = useRef(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const modalVideoRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      if (modalVideoRef.current) modalVideoRef.current.pause();
    }, 500);
  };

  useEffect(() => {
    if (cursorRef.current) {
      quickSetterX.current = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      quickSetterY.current = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  const cursorOffsetX = 70;
  const cursorOffsetY = 55;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorVisible && quickSetterX.current && quickSetterY.current) {
        quickSetterX.current(e.clientX + cursorOffsetX);
        quickSetterY.current(e.clientY + cursorOffsetY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorVisible]);

  const handleVideoMouseEnter = () => {
    setCursorVisible(true);
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        scale: 1,
        opacity: 1,
      });
    }
  };

  const handleVideoMouseLeave = () => {
    setCursorVisible(false);
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        scale: 1,
        opacity: 0,
      });
    }
  };

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

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      setCurrentTime(modalVideoRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play();
      setIsPlaying(true);
    }
  }, [isModalOpen]);

  useGSAP(() => {
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

          return `inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px)`;
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
        clipPath: "inset(0px 0px 0px 0px)",
        duration: 100,
        ease: "none"
      }, 0);

      tl.to(leftTextRef.current, {
        x: -TEXT_PARALLAX_X,
        duration: 100,
        ease: "none"
      }, 0);

      tl.to(rightTextRef.current, {
        x: TEXT_PARALLAX_X,
        duration: 100,
        ease: "none"
      }, 0);

      tl.fromTo(".divider-line",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 100,
          ease: "none"
        }, 0
      );

      tl.fromTo(overlayRef.current, {
        opacity: 0
      }, {
        opacity: OVERLAY_MAX_OPACITY,
        duration: 50,
        ease: "none"
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

  }, { scope: containerRef });

  return (
    <div className="bg-[#1b1b1b] w-full pt-[40px] mb-20">
      <div
        className="h-[1px] bg-white/20 mb-5 mx-auto"
        style={{ width: `${LINE_WIDTH_PX}px`, maxWidth: '100%' }}
      />

      <div className="w-full relative z-20 px-4 md:px-8 lg:px-12 pb-8">
        <h2 className="text-[#ffffff] font-mono text-[11px] sm:text-[13px] lg:text-[14.87px] tracking-[0.15em] uppercase font-bold select-none text-left inter ml-5">
          ◆ LIVE DEMO
        </h2>
      </div>

      <section ref={containerRef} className="relative z-10 font-inter h-screen w-full flex flex-col">
        <div className="flex-1 w-full flex items-center justify-center relative z-20 px-[24px] md:px-[64px] lg:px-[96px] pointer-events-none">

          <div
            className="relative w-full max-w-[1400px] flex items-center pointer-events-none"
            style={{ transform: `translateY(${CONTENT_OFFSET_Y}px)` }}
          >
            <div className="w-full flex justify-center" style={{ transform: `translateY(${VIDEO_OFFSET_Y}px)` }}>
              <div ref={videoPlaceholderRef} className="w-[65%] aspect-[16/9] opacity-0" />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 w-[1600px] max-w-[100vw] top-1/2 -translate-y-[95px] z-20 pointer-events-none px-[24px]">
              <div className="divider-line w-full h-[1px] bg-white/40 origin-center" style={{ willChange: 'transform, opacity' }} />
            </div>

            <div
              ref={leftTextRef}
              className="absolute left-0 w-[45%] pointer-events-none z-30 top-1/2 -translate-y-1/2"
              style={{ marginTop: `${TEXT_LEFT_OFFSET_Y}px`, willChange: 'transform, opacity' }}
            >

              <h1 className="text-white text-[32px] md:text-[42px] lg:text-[44px] leading-[1.1] font-light font-['Geist',Arial,sans-serif] tracking-tight drop-shadow-md">
                Where smart technology<br />and hospitality connect.
              </h1>
            </div>

            <div
              ref={rightTextRef}
              className="absolute right-0 w-[30%] flex flex-col items-end text-right pointer-events-auto z-30 top-1/2 -translate-y-1/2"
              style={{ marginTop: `${TEXT_RIGHT_OFFSET_Y}px`, willChange: 'transform, opacity' }}
            >

              <h3 className="text-white uppercase text-[11px] md:text-[12px] tracking-[0.15em] font-bold mb-2">
                HEAD OFFICE
              </h3>
              <p className="text-white/80 text-[13px] md:text-[15px] leading-[1.5] max-w-[220px] mb-8 font-light">
                RestroHub Pvt. Ltd., Tinkune<br />Kathmandu 44600, Nepal
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
                <RollingText text="WATCH DEMO" />
              </button>
            </div>

          </div>
        </div>

        <div
          ref={videoWrapperRef}
          className="absolute z-10 overflow-hidden bg-black shadow-lg cursor-pointer"
          style={{ willChange: 'clip-path, transform', transform: 'translateZ(0)' }}
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
          onClick={openModal}
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

      {/* Custom Mouse Cursor following specifications */}
      {/* <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div className="bg-[#FFFFFF1A] border border-white/10 backdrop-blur-lg text-white px-7 py-3 flex items-center justify-center font-bold text-[12px] tracking-[0.2em] select-none uppercase font-satoshi">
          PLAY
        </div>
      </div> */}

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-[100] bg-[#1a1a1a] flex flex-col font-inter transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Video */}
          <video
            ref={modalVideoRef}
            src="/assets/backgrounds/vid.webm"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Top Right Close */}
          <div className="absolute top-8 right-8 z-10">
            <button
              onClick={closeModal}
              className="w-12 h-12 border border-white/20 bg-[#2c2c2c] flex items-center justify-center text-white transition-colors hover:bg-[#2a2c2e]"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 w-full z-10">
            <div className="mx-8 mb-20 relative">
              <div className="w-full h-[1px] bg-white/20 mb-6" />
              <div className="flex justify-between items-center text-white text-[11px] font-bold tracking-[0.15em] uppercase">
                <div className="flex items-center gap-12">
                  <button onClick={togglePlay} className="hover:text-white/70 transition-colors w-12 text-left">
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <span className="w-12 text-center ml-350">{formatTime(currentTime)}</span>
                </div>
                <button onClick={toggleMute} className="hover:text-white/70 transition-colors">
                  {isMuted ? 'UNMUTE' : 'MUTE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
