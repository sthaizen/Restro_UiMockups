import React, { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// DATA STREAM PATTERN CUSTOMIZATION
// ==========================================
// Tweak these variables to control exactly how the data stream looks and feels!
const STREAM_SETTINGS = {
  footerHeight: '750px',  // Custom height for the entire Footer component
  speedSeconds: 30,       // Animation speed (lower is faster)
  dotSize: 2,           // Radius of the dots
  opacity: 1.0,           // Opacity of the dots (0 to 1)
  patternWidth: 800,      // Width of the repeating pattern
  patternHeight: 60,      // Total height of the pattern area
};

// The exact placement of the dots (Morse Code style data stream)
// You can now add `r: 2` to make a specific dot big, or `r: 0.5` to make it small!
const DOT_CONFIG = [
  // Top Row (y: 10)
  { x: 20, y: 10, r: 0.5 }, { x: 35, y: 10 }, { x: 80, y: 10, r: 2 }, { x: 180, y: 10 }, { x: 195, y: 10 }, { x: 210, y: 10, r: 0.5 },
  { x: 320, y: 10 }, { x: 335, y: 10 }, { x: 410, y: 10, r: 2 }, { x: 490, y: 10 }, { x: 505, y: 10 }, { x: 600, y: 10, r: 0.5 },
  { x: 615, y: 10 }, { x: 630, y: 10 }, { x: 740, y: 10, r: 2 },

  // Middle Row (y: 30)
  { x: 50, y: 30 }, { x: 130, y: 30, r: 2 }, { x: 145, y: 30 }, { x: 250, y: 30, r: 0.5 }, { x: 265, y: 30 }, { x: 370, y: 30 },
  { x: 450, y: 30, r: 2 }, { x: 465, y: 30 }, { x: 550, y: 30 }, { x: 565, y: 30, r: 0.5 }, { x: 680, y: 30 }, { x: 770, y: 30, r: 2 }, { x: 785, y: 30 },

  // Bottom Row (y: 50)
  { x: 10, y: 50, r: 2 }, { x: 95, y: 50 }, { x: 110, y: 50, r: 0.5 }, { x: 125, y: 50 }, { x: 220, y: 50, r: 2 }, { x: 300, y: 50 },
  { x: 390, y: 50, r: 0.5 }, { x: 405, y: 50 }, { x: 520, y: 50 }, { x: 535, y: 50, r: 2 }, { x: 550, y: 50 }, { x: 640, y: 50, r: 0.5 },
  { x: 720, y: 50 }, { x: 735, y: 50 },
];

const DotPattern = () => {
  return (
    <svg width={STREAM_SETTINGS.patternWidth} height={STREAM_SETTINGS.patternHeight} xmlns="http://www.w3.org/2000/svg">
      {DOT_CONFIG.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={dot.r || STREAM_SETTINGS.dotSize}
          fill="#ffffff"
          opacity={STREAM_SETTINGS.opacity}
        />
      ))}
    </svg>
  );
};



const FooterLink = ({ text, href = "#" }) => (
  <a href={href} className="group relative flex items-center text-[13px] text-[#e0e0e0] font-medium hover:text-white w-fit py-1.5 transition-colors">
    <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-white opacity-0 transform scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
    <span className="transform transition-transform duration-300 group-hover:translate-x-4">
      {text}
    </span>
  </a>
);

const Footer = () => {
  const streamRef = useRef(null);

  useEffect(() => {
    // 1. Create the base infinite scrolling animation
    const scrollAnim = gsap.to(streamRef.current, {
      x: `-${STREAM_SETTINGS.patternWidth}px`,
      ease: "none",
      duration: STREAM_SETTINGS.speedSeconds,
      repeat: -1,
    });

    // 2. Setup ScrollTrigger to detect scroll velocity and speed up the animation
    let timeout;
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 0) {
          // Calculate a target time scale based on scroll speed.
          // Base scale is 1. Velocity of ~300px/s will yield ~2x speed.
          const targetScale = 1 + velocity / 300;

          // Smoothly ramp UP the speed
          gsap.to(scrollAnim, {
            timeScale: Math.min(targetScale, 15), // cap at 15x max speed
            duration: 0.15,
            ease: "power1.out",
            overwrite: true
          });

          // When scrolling stops (no updates), ramp DOWN back to normal speed
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            gsap.to(scrollAnim, {
              timeScale: 1,
              duration: 1.2,
              ease: "power3.out",
              overwrite: true
            });
          }, 50);
        }
      }
    });

    return () => {
      scrollAnim.kill();
      trigger.kill();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <footer
      className="w-full bg-black text-white flex flex-col justify-between pt-16 pb-12 md:pt-24 md:pb-16 px-8 md:px-16 lg:px-24 font-sans relative overflow-hidden"
      style={{ height: STREAM_SETTINGS.footerHeight }}
    >

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 z-10">

        {/* Left Side: Large Text */}
        <div className="lg:w-1/2">
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] font-[300] leading-[1.1] tracking-tight max-w-[380px]">
            Exquisite Fine Dining <br className="hidden md:block" />
            at Polaris Restaurant
          </h2>
        </div>

        {/* Right Side: Links */}
        <div className="w-full lg:w-1/2 flex justify-between lg:justify-end gap-8 md:gap-16 lg:gap-[120px]">

          {/* Column 1 */}
          <div className="flex flex-col gap-1.5">
            <FooterLink text="Our Story" />
            <FooterLink text="Menu" />
            <FooterLink text="Reservations" />
            <FooterLink text="Private Events" />
            <FooterLink text="Gift Cards" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-1.5">
            <FooterLink text="Our Chef" />
            <FooterLink text="Press" />
            <FooterLink text="Careers" />
            <FooterLink text="Contact Us" />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-1.5">
            <FooterLink text="Instagram" />
            <FooterLink text="Facebook" />
          </div>

        </div>
      </div>

      {/* Middle Dot Pattern Area */}
      <div className="flex-1 w-full min-h-[120px] md:min-h-[160px] flex items-center justify-center opacity-40 z-0 overflow-hidden">
        <style>{`
           .animated-data-stream {
             display: flex;
             width: max-content;
           }
         `}</style>
        <div
          className="w-full"
          style={{
            height: `${STREAM_SETTINGS.patternHeight}px`,
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <div ref={streamRef} className="animated-data-stream h-full">
            {/* Render multiple copies to guarantee a seamless loop on ultra-wide screens */}
            <DotPattern />
            <DotPattern />
            <DotPattern />
            <DotPattern />
            <DotPattern />
            <DotPattern />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 z-10">

        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="circleClip">
              <circle cx="20" cy="20" r="20" />
            </clipPath>
            <g clipPath="url(#circleClip)">
              <rect x="0" y="4" width="40" height="4" fill="white" />
              <rect x="0" y="12" width="40" height="4" fill="white" />
              <rect x="0" y="20" width="40" height="4" fill="white" />
              <rect x="0" y="28" width="40" height="4" fill="white" />
              <rect x="0" y="36" width="40" height="4" fill="white" />
            </g>
          </svg>
          <span className="text-[42px] font-semibold tracking-[-0.03em]">Polaris</span>
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col items-start gap-2.5 text-[12px] text-[#888888] font-medium tracking-wide">
          <div className="flex flex-wrap items-center gap-6">
            <p>© 2026 Polaris Restaurant. All rights reserved.</p>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
          <p className="flex items-center gap-1.5">
            Designed with <span className="text-[14px] leading-none text-white">✻</span> <span className="text-white font-semibold tracking-normal text-[13px]">zypsy</span>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
