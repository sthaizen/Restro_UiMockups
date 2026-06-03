import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Newwork() {
  const projects = [
    {
      id: 1,
      tall: false,
      bgImage: "/assets/backgrounds/111.png",
      fgImage: "/assets/backgrounds/1.png",
      title: "Loops",
      description: "Software",
    },
    {
      id: 2,
      tall: false,
      bgImage: "/assets/backgrounds/22.png",
      fgImage: "/assets/backgrounds/2.png",
      title: "Neuro",
      description: "Software",
    },
    {
      id: 3,
      tall: true,
      bgImage: "/assets/backgrounds/33.png",
      fgImage: "/assets/backgrounds/33.png",
      title: "Clyric",
      description: "Software",
    },
    {
      id: 4,
      tall: true,
      bgImage: "/assets/backgrounds/cl.png",
      fgImage: "/assets/backgrounds/clr2.png",
      title: "Clyric",
      description: "Web-app",
    },
    {
      id: 5,
      tall: true,
      bgImage: "/assets/backgrounds/4.png",
      fgImage: "/assets/backgrounds/4.png",
      title: "Toe Heng",
      description: "Entertainment",
    },
    {
      id: 6,
      tall: false,
      bgImage: "/assets/backgrounds/Last.png",
      fgImage: "/assets/backgrounds/66.png",
      title: "Sand Peak",
      description: "Venture Capial",
    },
  ];

  const projectRefs = useRef([]);
  const h1Ref = useRef(null);
  const cursorRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const quickSetterX = useRef(null);
  const quickSetterY = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      projects.forEach((_, index) => {
        const el = projectRefs.current[index];
        if (!el) return;

        const fg = el.querySelector(".foreground");
        const bg = el.querySelector(".background");

        // Card reveal
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 100%",
              end: "top 40%",
              scrub: true,
            },
          }
        );

        // Background reveal with scale
        if (bg) {
          gsap.fromTo(
            bg,
            { opacity: 0, y: 25, scale: 1.15 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 70%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        }

        // Foreground reveal with scale
        if (fg) {
          gsap.fromTo(
            fg,
            { opacity: 0, y: 18, scale: 1.15 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "top 55%",
                scrub: true,
              },
            }
          );
        }
      });

      // ✅ Header reveal (scrubbed: works on scroll down + up)
      if (h1Ref.current) {
        const header = h1Ref.current;

        const topBlock = header.children?.[0];
        const bottomBlock = header.children?.[1];

        const label = topBlock?.querySelector("span"); // [WORK]
        const line1 = topBlock?.querySelector("div");  // first sentence line
        const line2 = bottomBlock;                     // second sentence line

        const parts = [label, line1, line2].filter(Boolean);

        // Initial states
        gsap.set(parts, {
          opacity: 0,
          y: 26,
          filter: "blur(5px)",
          clipPath: "inset(0 0 100% 0)",
          willChange: "transform, opacity, filter, clip-path",
        });

        // Scrubbed reveal timeline (scroll progress controls it)
        const tl = gsap.timeline({
          defaults: { ease: "none" }, // scrub feels best with no easing
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            end: "top 45%",
            scrub: 1, // ✅ smooth follow on scroll down/up
          },
        });

        // Reveal label first (slightly earlier)
        if (label) {
          tl.to(label, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: 0.35,
          });
        }

        // Reveal lines with a gentle stagger
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

        // Subtle parallax drift (also scrubbed both ways)
        gsap.to(header, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: header,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
}


      // Initialize GSAP quickTo for ultra-smooth cursor movement
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
    });

    return () => ctx.revert();
  }, []);

  // Optimized mouse follower effect using GSAP quickTo
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorVisible && quickSetterX.current && quickSetterY.current) {
        quickSetterX.current(e.clientX);
        quickSetterY.current(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorVisible]);

  const handleCardMouseEnter = () => {
    setCursorVisible(true);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleCardMouseLeave = () => {
    setCursorVisible(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 Inter">
      {/* Custom Cursor Follower */}
      <div
        ref={cursorRef}
        className="fixed top-12 left-18 pointer-events-none z-50 opacity-0"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div className="bg-black/60 text-white px-0.5 py-0.5 flex items-center gap-2 shadow-xl">
          {/* icon with square background */}
          <div className="w-7 h-7 bg-black/40 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform -rotate-360 -scale-x-100"
            >
              <path
                d="M20 4V5.4C20 8.76031 20 10.4405 19.346 11.7239C18.7708 12.8529 17.8529 13.7708 16.7239 14.346C15.4405 15 13.7603 15 10.4 15H4M4 15L9 10M4 15L9 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-[12px] font-medium tracking-wider pr-1.5">
            LIVE SITE{" "}
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto">
        {/* Header Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24 space-y-3">
          <h1
            ref={h1Ref}
            className="text-[32px] sm:text-[42px] lg:text-[64px] font-semibold leading-[1.2] text-black inter"
          >
            <div>
              <span className="text-base sm:text-lg lg:text-[16px] font-medium text-black inter3">
                [WORK]
              </span>
              <div className="text-left lg:text-right mb-1">
                I help service and software businesses
              </div>
            </div>
            <div className="text-left">
              create memorable, optimised website experiences as quickly as they
              need.
            </div>
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-x-6 sm:gap-x-8 lg:gap-x-7 gap-y-12 sm:gap-y-16 lg:gap-y-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex flex-col"
              ref={(el) => (projectRefs.current[index] = el)}
            >
              {/* Card */}
              <div
                className={`group relative overflow-hidden cursor-pointer bg-black flex items-center justify-center p-8 sm:p-10 lg:p-12 ${
                  project.tall
                    ? "min-h-[520px] lg:min-h-[677px]"
                    : "min-h-[400px] lg:min-h-[485px]"
                }`}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* Background */}
                <div
                  className="
                  absolute inset-0
                  transition-transform duration-700 ease-out
                  will-change-transform
                  group-hover:scale-[1.04]
                "
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.bgImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />

                  {/* Soft overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20 opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

                  {/* Foreground */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <img
                      src={project.fgImage}
                      alt={project.title}
                      className="
                      w-full h-full object-cover
                      opacity-0
                      transition-opacity duration-700 ease-out
                      group-hover:opacity-100
                      drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]
                    "
                    />
                  </div>
                </div>
              </div>

              {/* Title + Description */}
              <div className="mt-4 flex items-center gap-1 text-left">
                <span className="text-base sm:text-lg lg:text-[17px] font-semibold text-black">
                  {project.title}
                </span>
                <span className="text-base sm:text-lg lg:text-[17px] font-medium text-[#3D3D3D]">
                  -
                </span>
                <span className="text-base sm:text-lg lg:text-[17px] font-medium text-black/[0.28]">
                  {project.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
