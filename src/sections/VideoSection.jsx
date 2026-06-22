import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const TRIGGER_ELEMENT = "video";
  const PIN_START_POSITION = "center 33%";
  // 3. Scroll distances (in percentages of viewport height)
  // How much scrolling is required to finish the video expansion?
  const EXPANSION_SCROLL_VH = 100;
  const HOLD_SCROLL_VH = 50;
  // =================================

  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const textContentRef = useRef(null);
  const videoPlaceholderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const targetTrigger = TRIGGER_ELEMENT === "video" ? videoPlaceholderRef.current : containerRef.current;

      const totalScrollVH = EXPANSION_SCROLL_VH + HOLD_SCROLL_VH;

      // 1. Standalone Text Animation (Time-based, NOT scrubbed)
      const textTl = gsap.timeline({ paused: true });
      const divider = textContentRef.current.querySelector('.divider-line');
      const leftPart = textContentRef.current.querySelector('.left-part');
      const rightPart = textContentRef.current.querySelector('.right-part');

      textTl.to(textContentRef.current, { opacity: 1, duration: 0.01 })
        .fromTo(divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" }
        )
        .fromTo(leftPart.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(rightPart.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" },
          "-=1.1"
        );

      let textPlayed = false;

      // 2. Main Scrubbed Timeline (Video Expansion Only)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetTrigger,
          start: PIN_START_POSITION,
          end: `+=${totalScrollVH}%`,
          pin: containerRef.current,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Calculate exactly when the video finishes expanding
            const threshold = EXPANSION_SCROLL_VH / totalScrollVH;

            // Trigger the standalone text animation when passing the threshold
            if (self.progress >= threshold && !textPlayed) {
              textPlayed = true;
              textTl.play();
            } else if (self.progress < threshold && textPlayed) {
              textPlayed = false;
              textTl.reverse(); // Smoothly reverse if the user scrolls back up
            }
          }
        }
      });

      tl.fromTo(videoWrapperRef.current, {
        top: () => {
          const p = videoPlaceholderRef.current;
          const c = containerRef.current;
          return p && c ? p.getBoundingClientRect().top - c.getBoundingClientRect().top : 0;
        },
        left: () => {
          const p = videoPlaceholderRef.current;
          const c = containerRef.current;
          return p && c ? p.getBoundingClientRect().left - c.getBoundingClientRect().left : 0;
        },
        width: () => {
          const p = videoPlaceholderRef.current;
          return p ? p.getBoundingClientRect().width : 0;
        },
        height: () => {
          const p = videoPlaceholderRef.current;
          return p ? p.getBoundingClientRect().height : 0;
        },
        borderRadius: "6px"
      }, {
        top: () => {
          const c = containerRef.current;
          return c ? -c.getBoundingClientRect().top : 0;
        },
        left: () => {
          const c = containerRef.current;
          return c ? -c.getBoundingClientRect().left : 0;
        },
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: EXPANSION_SCROLL_VH,
        ease: "power2.inOut"
      });

      // Add a dummy pad to guarantee the scrub timeline length is EXACTLY totalScrollVH
      tl.to({}, { duration: HOLD_SCROLL_VH });

      // 3. Intro Text Animation (Smooth Entrance)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        }
      })
        .fromTo(".reveal-header",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
        .fromTo(".reveal-p",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
          "-=0.9"
        )
        .fromTo(".reveal-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.9"
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white   px-6 md:px-16 lg:px-24 relative z-10 font-inter mb-[40vh]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 lg:gap-x-24">

        {/* ROW 1 */}
        {/* Left Column (Top) */}

        <div className="md:col-span-4">
          <h3 className="reveal-header opacity-0 text-[#000000] text-[16px] font-['inter',Arial,sans-serif] font-medium mt-2">
            The Name Reflects our Mission
          </h3>
        </div>

        {/* Right Column (Top) */}
        <div className="md:col-span-8 flex flex-col items-start">
          <p className="reveal-p opacity-0 text-[#4a4a4a] text-[32px] font-['Geist',Arial,sans-serif] font-light leading-snug mb-8 tracking-tight">
            Modern dining establishments face a fast-paced environment where managing menus, optimizing table turn times, and keeping transactions seamless are keys to survival and growth.
          </p>

          <div className="group flex items-center gap-1">
            <a href="#" className="relative flex items-center justify-center bg-[#dbe8f8] w-[46px] h-[46px] rounded-[3px] overflow-hidden transition-all duration-300">
              <span className="absolute inset-0 bg-[#688ad0] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#2b4b6b] relative z-10 group-hover:text-white">
                <path d="M6 4v8a2 2 0 0 0 2 2h10" />
                <polyline points="14 10 18 14 14 18" />
              </svg>
            </a>
            <a href="#" className="relative flex items-center justify-center border-1 border-[#e5e5e5] h-[46px] px-6 rounded-[3px] overflow-hidden transition-all duration-300 group-hover:border-[#6e8acf]">
              <span className="absolute inset-0 bg-[#688ad0] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-[14px] font-normal text-gray-900 font-['Inter',Arial,sans-serif] group-hover:text-white">
                Discover Our Story
              </span>
            </a>
          </div>
        </div>

        {/* ROW 2 */}
        {/* Left Column (Bottom) */}
        <div className="md:col-span-4">
          <p className="reveal-p opacity-0 text-[#524F4B] text-[23px] font-['Geist',Arial,sans-serif] font-normal leading-[1.4]">
            Our platform, Polaris, is designed to align every aspect of your restaurant operations, bringing effortless control to kitchens and management alike.
          </p>
        </div>

        {/* Right Column (Bottom: Video Placeholder) */}
        <div className="md:col-span-8">
          <div ref={videoPlaceholderRef} id="video-placeholder" className="w-full aspect-[16/9] opacity-0" />
        </div>

      </div>

      {/* Fullscreen capable video wrapper */}
      <div
        ref={videoWrapperRef}
        className="absolute z-10 overflow-hidden bg-gray-100 shadow-sm"
        style={{ willChange: 'width, height, top, left, transform' }}
      >
        <video
          src="/assets/backgrounds/vid.webm"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay Darkening */}
        {/* <div ref={overlayRef} className="absolute inset-0 bg-black/60 opacity-0 pointer-events-none" /> */}

        {/* Overlay Text */}
        <div ref={textContentRef} className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-32 opacity-0 pointer-events-none">
          <div className="divider-line w-full h-[1px] bg-white/40 mb-4 origin-center" />

          <div className="w-full flex justify-between items-start text-white">
            <div className="left-part flex flex-col">
              <span className="reveal-text block text-lg md:text-[27px] font-medium tracking-wide mb-1">Polaris</span>
              <span className="reveal-text block text-md md:text-[22px] font-light opacity-90">/ pəˈlɛərɪs /</span>
            </div>

            <div className="right-part flex flex-col text-right">
              <span className="reveal-text block text-lg md:text-[27px] font-light mb-1">The guiding star for modern dining,</span>
              <span className="reveal-text block text-md md:text-[12px] font-light opacity-90">elevating efficiency, service, and control.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
