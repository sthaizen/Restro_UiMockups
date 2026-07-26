import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
import RollingText from "../components/RollingText";

export default function Newwork() {

  const h1Ref = useRef(null);
  const overviewImgRef = useRef(null);
  const bottomLeftImgRef = useRef(null);
  const middleImgRef = useRef(null);
  const bottomRightImgRef = useRef(null);

  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef(null);
  const quickSetterX = useRef(null);
  const quickSetterY = useRef(null);

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

  // Offset controls in pixels relative to the mouse cursor
  const cursorOffsetX = 70;
  const cursorOffsetY = 55;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorVisible && quickSetterX.current && quickSetterY.current) {
        quickSetterX.current(e.clientX + cursorOffsetX);
        quickSetterY.current(e.clientY + cursorOffsetY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorVisible]);

  const handleCardMouseEnter = () => {
    setCursorVisible(true);
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        scale: 1,
        opacity: 1,
      });
    }
  };

  const handleCardMouseLeave = () => {
    setCursorVisible(false);
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        scale: 1,
        opacity: 0,
      });
    }
  };

  useGSAP(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Header reveal (scrubbed: works on scroll down + up)
    if (h1Ref.current) {
      const header = h1Ref.current;

      const topBlock = header.children?.[0];
      const bottomBlock = header.children?.[1];

      const label = topBlock?.querySelector("span");
      const line1 = topBlock?.querySelector("div");
      const line2 = bottomBlock;

      const parts = [label, line1, line2].filter(Boolean);

      // Initial states
      gsap.set(parts, {
        opacity: 0,
        y: 26,
        filter: "blur(5px)",
        clipPath: "inset(0 0 100% 0)",
        willChange: "transform, opacity, filter, clip-path",
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      });

      if (label) {
        tl.to(label, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)",
          duration: 0.35,
        });
      }

      tl.to(
        [line1, line2].filter(Boolean),
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)",
          duration: 0.65,
          stagger: 0.12,
        },
        label ? 0.1 : 0
      );

      gsap.to(header, {
        y: -18,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: header,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
    // Parallax scroll for the bottom 3 staggered images
    if (bottomLeftImgRef.current) {
      gsap.to(bottomLeftImgRef.current, {
        y: 100,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: bottomLeftImgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }

    if (middleImgRef.current) {
      gsap.to(middleImgRef.current, {
        y: -80,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: middleImgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }

    if (bottomRightImgRef.current) {
      gsap.to(bottomRightImgRef.current, {
        y: -200,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: bottomRightImgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <div id="work" className="min-h-screen bg-[#ffffff] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 Inter scroll-mt-24">

      <div className="w-full mx-auto">

        {/* NEW Header Section */}
        <div className="mb-20 sm:mb-24 lg:mb-32 flex flex-col items-center justify-center text-center">
          <h1
            ref={h1Ref}
            className="text-[32px] sm:text-[42px] lg:text-[56px] font-bold leading-[1.3] text-[#212325] inter max-w-[1000px]"
          >
            {/* Top Block */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-[14.87px] font-normal uppercase tracking-[0.15em] text-[#212325] mb-8 sm:mb-10 block font-mono">
                ◆ ABOUT POLARIS
              </span>
              <div className="font-medium">
                We empower restaurants with smart POS, AI tools, and total control.
              </div>
            </div>

            {/* Bottom Block */}
            <div className="font-medium">
              Trusted by 500+ owners who demand speed, accuracy, and results.
            </div>
          </h1>

          {/* Call to Action Button */}
          <button className="group mt-10 sm:mt-12 bg-black text-white text-[12px] sm:text-[13px] font-medium tracking-wider uppercase px-8 py-4 flex items-center justify-center gap-3 hover:bg-[#222] transition-colors duration-500">
            <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
              <svg
                width="16"
                height="16"
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
                width="16"
                height="16"
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
            <RollingText text="WHO WE ARE" />
          </button>
        </div>

        {/* PLATFORM OVERVIEW SECTION */}
        <div className="w-full h-[1px] bg-black/10 my-16 sm:my-5" />

        <div className="mb-24 sm:mb-32 lg:mb-40">
          {/* Monospace label */}
          <h2 className="text-[#212325] font-mono text-[11px] sm:text-[13px] lg:text-[14.87px] tracking-[0.15em] uppercase font-bold select-none mb-12 sm:mb-16 text-left pl-4 sm:pl-8 inter">
            ◆ PLATFORM OVERVIEW
          </h2>

          {/* Two-column layout for top overview */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between px-4 sm:px-8">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:translate-x-[170px] overflow-hidden">
              <div
                ref={overviewImgRef}
                className="group relative w-full max-w-[440px] aspect-[451/556] overflow-hidden shadow-sm cursor-pointer"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <img
                  src="/assets/mockups/main2.jpg"
                  alt="Platform Overview Interior"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
                />
              </div>
            </div>

            {/* Right column: Info & Button */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pl-32">
              <p className="text-[19.1px] leading-[1.4] text-[#212325] mb-10 font-normal font-sans max-w-[320px] tracking-tight">
                Our <strong className="font-bold text-black">Polaris platform</strong> delivers smart POS, kitchen displays, QR ordering, and AI-powered operations. Made for restaurants that want speed, clarity, and control.
              </p>
              <button className="group mt-10 sm:mt-0 bg-black text-white text-[12px] sm:text-[13px] font-medium tracking-wider uppercase px-8 py-4 flex items-center justify-center gap-3 hover:bg-[#222] transition-colors duration-500">
                <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
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
                    width="16"
                    height="16"
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
                <RollingText text="Product Overview" />
              </button>
            </div>
          </div>

          {/* Staggered bottom images row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-12 items-start mt-20 sm:mt-32 px-4 sm:px-12 lg:px-24">
            {/* Left Bottom Image (Low position) */}
            <div ref={bottomLeftImgRef} className="flex justify-center pt-[15%] lg:pt-[25%] lg:translate-x-[-120px] lg:translate-y-[0px] will-change-transform">
              <div
                className="group relative w-full max-w-[384px] aspect-[384/473] overflow-hidden shadow-sm cursor-pointer will-change-transform"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <img
                  src="/assets/mockups/left.jpg"
                  alt="Restaurant Seating"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
                />
              </div>
            </div>

            {/* Middle Bottom Image (Medium position) */}
            <div ref={middleImgRef} className="flex justify-center pt-[5%] lg:pt-[10%] lg:translate-x-[120px] lg:translate-y-[50px] will-change-transform">
              <div
                className="group relative w-full max-w-[316px] aspect-[316/390] overflow-hidden shadow-sm cursor-pointer will-change-transform"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <img
                  src="/assets/mockups/middle.jpg"
                  alt="Cozy Table Set"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
                />
              </div>
            </div>


            {/* Right Bottom Image (High position) */}
            <div ref={bottomRightImgRef} className="flex justify-center lg:translate-x-[60px] lg:translate-y-[-90px] will-change-transform">
              <div
                className="group relative w-full max-w-[376px] aspect-[316/390] overflow-hidden shadow-sm cursor-pointer will-change-transform"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <img
                  src="/assets/mockups/Main.jpg"
                  alt="Cafe Bar Counter"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Custom Mouse Cursor following specifications */}
      {/* <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div className="bg-[#111111] border border-white/10 text-white px-4 py-2.5 flex items-center justify-center text-[11px] font-semibold tracking-[0.2em] select-none uppercase shadow-xl">
          VIEW
        </div>
      </div> */}


    </div>
  );
}