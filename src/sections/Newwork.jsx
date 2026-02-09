import React, { useEffect, useRef } from "react";
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
      fgImage: "/assets/backgrounds/333.png",
      title: "Nova",
      description: "Software",
    },
    {
      id: 4,
      tall: true,
      bgImage: "/assets/backgrounds/5.png",
      fgImage: "/assets/backgrounds/44.png",
      title: "OptixAI",
      description: "Software",
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

      // Header reveal
      if (h1Ref.current) {
        gsap.fromTo(
          h1Ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: h1Ref.current,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 Inter">
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