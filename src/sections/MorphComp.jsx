import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RollingText from '../components/RollingText';

gsap.registerPlugin(ScrollTrigger);

// Configuration controls to easily adjust sizes, positions, and content
const controls = {
  // Layout Controls
  container: {
    maxWidth: "1500px",
    gapDesktop: "48px",
    gapMobile: "64px",
    backgroundColor: "#ffffff",
  },

  // Text Column Layout Controls
  textLayout: {
    translateX: "0px", // adjust to move all text left/right
    translateY: "-20px", // adjust to move all text up/down
    marginLeft: "0px", // extra margin if needed
    padding: "50px", // extra padding if needed
  },

  // Text Controls
  title: {
    text: "24/7 All-in-One Restaurant\nManagement Platform",
    fontSizeDesktop: "50px",
    fontSizeMobile: "40px",
    color: "#000000",
    width: "100%",
    maxWidth: "100%",
    marginBottom: "48px",
  },
  paragraph1: {
    text: "We provide restaurant owners with a comprehensive suite of digital tools, including smart POS, QR ordering, kitchen display systems, and AI-powered analytics.",
    fontSize: "15px",
    color: "#524F4B",
    width: "70%",
    maxWidth: "420px",
    marginBottom: "24px",
  },
  paragraph2: {
    text: "Through our all-in-one platform, we handle the technical complexities of your daily operations, empowering your team to focus on delivering exceptional dining experiences across Nepal.",
    fontSize: "15px",
    color: "#524F4B",
    width: "70%",
    maxWidth: "420px",
    marginBottom: "48px",
  },

  // Button Controls
  button: {
    text: "START FREE TRIAL",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    hoverBackgroundColor: "#222222",
  },

  // Image Controls
  image: {
    src: "/assets/backgrounds/Detail.png",
    alt: "Isometric illustration of a complex industrial facility",
    maxWidth: "1000px",
    width: "130%",
    scale: 1.08, // scale > 1 zooms in, < 1 zooms out
    translateX: "0px", // positive moves right, negative moves left
    translateY: "-20px", // positive moves down, negative moves up
    opacity: 1,
  }
};


export default function MorphComp() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!textRef.current || !imageRef.current) return;
      const textElements = textRef.current.children;

      gsap.fromTo(textElements,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Pin the section so RestroAi can scroll over it, but don't dim or change it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // Pin for one viewport height
        pin: true,
        pinSpacing: false // This allows the next section (RestroAi) to scroll OVER this one
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-12 lg:px-24"
      style={{ backgroundColor: controls.container.backgroundColor }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .morph-left-col {
            padding: 0px !important;
            transform: none !important;
          }
          .morph-title {
            margin-bottom: 24px !important;
          }
          .morph-p1 {
            margin-top: 0px !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 16px !important;
          }
          .morph-p2 {
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 32px !important;
          }
          .morph-img-wrapper {
            justify-content: center !important;
            margin-top: 24px !important;
          }
          .morph-img {
            width: 100% !important;
            max-width: 100% !important;
            transform: none !important;
          }
        }
      `}</style>
      <div
        className="w-full flex flex-col lg:flex-row items-center"
        style={{
          maxWidth: controls.container.maxWidth,
          gap: `clamp(${controls.container.gapDesktop}, 5vw, ${controls.container.gapMobile})`
        }}
      >

        {/* Left Column - Text & Button */}
        <div
          ref={textRef}
          className="morph-left-col w-full lg:w-[45%] flex flex-col items-start text-left shrink-0 relative z-10"
          style={{
            transform: `translate(${controls.textLayout.translateX}, ${controls.textLayout.translateY})`,
            marginLeft: controls.textLayout.marginLeft,
            padding: controls.textLayout.padding
          }}
        >
          <h2
            className="morph-title font-sans font-light leading-tight whitespace-pre-line"
            style={{
              color: controls.title.color,
              fontSize: `clamp(${controls.title.fontSizeMobile}, 4vw, ${controls.title.fontSizeDesktop})`,
              width: controls.title.width,
              maxWidth: controls.title.maxWidth,
              marginBottom: controls.title.marginBottom
            }}
          >
            {controls.title.text}
          </h2>

          <p
            className="morph-p1 font-inter leading-[1.4] mt-75"
            style={{
              color: controls.paragraph1.color,
              fontSize: controls.paragraph1.fontSize,
              width: controls.paragraph1.width,
              maxWidth: controls.paragraph1.maxWidth,
              marginBottom: controls.paragraph1.marginBottom
            }}
          >
            {controls.paragraph1.text}
          </p>

          <p
            className="morph-p2 font-inter leading-[1.4]"
            style={{
              color: controls.paragraph2.color,
              fontSize: controls.paragraph2.fontSize,
              width: controls.paragraph2.width,
              maxWidth: controls.paragraph2.maxWidth,
              marginBottom: controls.paragraph2.marginBottom
            }}
          >
            {controls.paragraph2.text}
          </p>

          <button
            className="group text-[12px] sm:text-[13px] font-medium tracking-wider uppercase px-8 py-4 flex items-center justify-center gap-3 transition-colors duration-500"
            style={{
              backgroundColor: controls.button.backgroundColor,
              color: controls.button.textColor
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = controls.button.hoverBackgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = controls.button.backgroundColor}
          >
            <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center shrink-0">
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
            <RollingText text={controls.button.text} />
          </button>
        </div>

        {/* Right Column - Image */}
        <div className="morph-img-wrapper w-full lg:w-[60%] flex items-center justify-end">
          <img
            ref={imageRef}
            src={controls.image.src}
            alt={controls.image.alt}
            className="morph-img h-auto object-contain"
            style={{
              width: controls.image.width,
              maxWidth: controls.image.maxWidth,
              opacity: controls.image.opacity,
              transform: `translate(${controls.image.translateX}, ${controls.image.translateY}) scale(${controls.image.scale})`,
            }}
          />
        </div>

      </div>
    </div>
  );
}

