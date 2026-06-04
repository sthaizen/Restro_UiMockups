import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    id: 1,
    feature: "Design that passes the “damn” test",
    image: "/assets/backgrounds/lol.png",
    topBg: "#f3f4f6",
    bottomBg: "#ffffff",
    imgMaxW: "100%",
    imgMaxH: "100%",
    imgPadding: "0px",
    cardRadius: "14px",
    caption: (
      <>
        Clean, modern interfaces that feel premium — the kind that earns trust before anyone even reads the headline. And yes… I <strong>will notice the 1px misalignment</strong>. No, I <strong>won’t ignore it</strong>.
      </>
    ),
  },
  {
    id: 2,
    feature: "Development that doesn’t fall apart later",
    image: "/assets/backgrounds/kk.png",
    topBg: "#f6f6f6",
    bottomBg: "#ffffff",
    imgMaxW: "100%",
    imgMaxH: "100%",
    imgPadding: "0px",
    cardRadius: "14px",
    caption: (
      <>
        I build what I design: <strong>fast, responsive, and smooth</strong>. No “works on my laptop” energy — just <strong>clean code</strong>, sensible structure, and pages that behave on every screen like they were raised properly.
      </>
    ),
  },
  {
    id: 3,
    feature: "AI speed… with human taste",
    image: "/assets/backgrounds/kkk.png",
    topBg: "#f3f4f6",
    bottomBg: "#ffffff",
    imgMaxW: "100%",
    imgMaxH: "100%",
    imgPadding: "0px",
    cardRadius: "14px",
    caption: (
      <>
        Yes, I use AI — <strong>like a power tool, not a personality</strong>. It helps with research, drafts, and cleanup. The vibe, flow, and final polish? <strong>That’s all human (me)</strong>.
      </>
    ),
  },
];

const CirculaScrollSection = () => {
  const lenis = useLenis();
  const containerRef = useRef(null);

  const handleContactScroll = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#contact", { offset: -90, duration: 1.2 });
    } else {
      const target = document.querySelector("#contact");
      if (target) {
        const yOffset = -90;
        const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };
  const stepRefs = useRef([]);
  const checkRefs = useRef([]);
  const titleWrapRef = useRef(null);
  const titleLineRefs = useRef([]);
  const cardRefs = useRef([]);

  // Mobile intro block refs
  const mobileIntroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      // -----------------------------------
      // Right-side indicator activation (desktop only)
      // -----------------------------------
      function activateStep(index) {
        checkRefs.current.forEach((el, i) => {
          if (!el) return;
          const isCurrent = i === index;
          const dot = el.querySelector(".check-dot");
          const label = el.querySelector(".check-label");

          gsap.to(dot, {
            backgroundColor: isCurrent ? "#43a346" : "#b2b2b2",
            scale: isCurrent ? 1.1 : 1,
            duration: 0.25,
            overwrite: "auto",
          });

          gsap.to(label, {
            color: isCurrent ? "#000" : "#9ca3af",
            duration: 0.25,
            overwrite: "auto",
          });
        });
      }

      if (!isMobile) {
        stepRefs.current.forEach((triggerEl, i) => {
          if (!triggerEl) return;
          ScrollTrigger.create({
            trigger: triggerEl,
            start: "top 40%",
            end: "bottom 40%",
            onEnter: () => activateStep(i),
            onEnterBack: () => activateStep(i),
          });
        });
        activateStep(0);
      }

      // -----------------------------------
      // Title animation (all breakpoints)
      // -----------------------------------
      if (titleWrapRef.current) {
        const fallbackLines = Array.from(
          titleWrapRef.current.querySelectorAll("h2 span.block")
        );
        const lines =
          titleLineRefs.current.filter(Boolean).length >= 2
            ? titleLineRefs.current.filter(Boolean)
            : fallbackLines;

        gsap.set(lines, {
          opacity: 0,
          y: 34,
          rotateX: 8,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
          filter: "blur(5px)",
          willChange: "transform, opacity, filter",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleWrapRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.8,
          },
        });

        tl.to(lines, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          stagger: 0.12,
          duration: 1,
        });

        tl.to(
          lines,
          {
            y: -2,
            ease: "sine.out",
            stagger: 0.08,
            duration: 0.6,
          },
          ">-0.25"
        );
      }

      // -----------------------------------
      // Mobile intro block fade-in
      // -----------------------------------
      if (isMobile && mobileIntroRef.current) {
        gsap.fromTo(
          mobileIntroRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileIntroRef.current,
              start: "top 82%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // -----------------------------------
      // Card animations
      // -----------------------------------
      cardRefs.current.forEach((card) => {
        if (!card) return;

        // Enter animation — same on all breakpoints
        gsap.fromTo(
          card,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Scroll-past fade+scale — desktop only (cards overlap in sticky layout)
        if (!isMobile) {
          gsap.set(card, { willChange: "transform, opacity" });

          gsap.fromTo(
            card,
            { opacity: 1, scale: 1 },
            {
              opacity: 0,
              scale: 0.9,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: "top 35%",
                end: "bottom 10%",
                scrub: true,
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-[#fafafa] font-sans py-20 scroll-mt-24">
      <div className="max-w-[1480px] mx-auto px-6">

        {/* ─── Title Block (all breakpoints) ─── */}
        <div className="mb-10 lg:mb-16" ref={titleWrapRef}>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[54px] font-semibold leading-[1.2] text-black inter">
            <span
              ref={(el) => (titleLineRefs.current[0] = el)}
              className="block text-gray-400"
            >
              Crafted with design instincts + AI precision
            </span>
            <span
              ref={(el) => (titleLineRefs.current[1] = el)}
              className="block text-gray-900"
            >
              Handcrafted websites — with soul and serious polish.
            </span>
          </h2>
        </div>

        {/* ─── Mobile / Tablet Intro Block (hidden on lg+) ─── */}
        {/*
          On mobile, the sticky sidebar would never be seen — it just scrolls out of view.
          Instead we surface the key copy + CTA above the cards as a clean, scannable intro.
          The dot-indicator checklist is removed on mobile: it relies on scroll-sticky context
          to be meaningful; without it the list is just redundant text already in the captions.
        */}
        <div
          ref={mobileIntroRef}
          className="lg:hidden mb-10"
        >
          <p className="text-[17px] sm:text-[19px] text-[#333333] leading-relaxed mb-6">
            I build websites that load fast, look clean, and quietly convince people to trust you. AI is my assistant. I’m the one saying ‘no’ to ugly buttons and weird spacing
          </p>
          <button onClick={handleContactScroll} className="w-full bg-[#f3f4f6] active:bg-[#e5e7eb] text-gray-900 py-4 px-6 rounded-2xl transition-colors text-[16px] sm:text-[17px] font-medium cursor-pointer">
            Let’s build something slick
          </button>
        </div>

        {/* ─── Two-column layout (desktop) / Single-column (mobile+tablet) ─── */}
        <div className="flex flex-col lg:flex-row gap-22 items-start">

          {/* LEFT — feature cards */}
          <div className="w-full lg:w-[715px] flex-shrink-0 space-y-8 sm:space-y-10 lg:space-y-14">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[i] = el)}
              >
                {/* Step number pill — mobile only, gives positional context */}
                {/* <div className="lg:hidden flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#43a346] text-white text-[12px] font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-[13px] font-semibold text-[#43a346] uppercase tracking-wide">
                    {step.feature}
                  </span>
                </div> */}

                {/* Entire Card */}
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="overflow-hidden border border-gray-100 shadow-sm"
                  style={{ borderRadius: step.cardRadius }}
                >
                  {/* Media */}
                  <div
                    className="w-full aspect-[4/3] sm:aspect-[715/496] flex items-center justify-center"
                    style={{
                      backgroundColor: step.topBg,
                      padding: step.imgPadding,
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.feature}
                      loading="lazy"
                      style={{
                        maxWidth: step.imgMaxW,
                        maxHeight: step.imgMaxH,
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Caption */}
                  <div
                    className="py-7 px-5 sm:py-10 sm:px-8 lg:py-[49px] lg:px-[45px]"
                    style={{ backgroundColor: step.bottomBg }}
                  >
                    <p className="text-[15px] sm:text-[17px] lg:text-[19px] leading-relaxed text-black/90">
                      {step.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — sticky sidebar (desktop only) */}
          {/*
            Hidden on mobile/tablet via CSS. The sticky panel depends on the page
            having enough scroll height alongside the left column — on small screens
            that relationship breaks and the panel offers no navigational value.
          */}
          <div className="hidden lg:block flex-1 lg:sticky lg:top-62 py-4">
            <p className="text-[21px] text-[#222222] leading-relaxed mb-8">
              I build websites that load fast, look clean, and quietly convince people to trust you. AI is my assistant. I’m the one saying ‘no’ to ugly buttons and weird spacing
            </p>

            <button onClick={handleContactScroll} className="w-full bg-[#f3f4f6] hover:bg-[#e5e7eb] text-gray-900 py-4 px-6 rounded-2xl mb-10 transition-colors text-[17px] cursor-pointer">
              Let’s build something slick
            </button>

            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  ref={(el) => (checkRefs.current[i] = el)}
                  className="flex items-center gap-4"
                >
                  <div className="check-dot w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center transition-all">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="check-label text-[19px] text-gray-400 transition-colors">
                    {step.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CirculaScrollSection;