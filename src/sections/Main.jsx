import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import StickNav from "./StickNav";

// ─── Resume PDF Modal ──────────────────────────────────────────────────────────
const ResumeModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for alternative PDF view
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 })
      .fromTo(
        panelRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55 },
        "-=0.3"
      )
      .fromTo(
        closeRef.current,
        { opacity: 0, rotate: -90 },
        { opacity: 1, rotate: 0, duration: 0.35 },
        "-=0.2"
      );
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: onClose,
    });
    tl.to(panelRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.96,
      duration: 0.35,
    }).to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  const onBackdropClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={onBackdropClick}
      className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:pt-20"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.22)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        ref={panelRef}
        className="relative flex flex-col bg-white shadow-2xl w-full sm:w-auto"
        style={{
          width: "min(100vw, 860px)",
          height: isMobile ? "88dvh" : "min(92vh, 1100px)",
          borderRadius: isMobile ? "20px 20px 0 0" : "6px",
          overflow: "hidden",
        }}
      >
        {/* ── Mobile / Tablet Toolbar (always visible on small screens) ── */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-zinc-100"
          style={{ background: "#ffffff", minHeight: "52px", flexShrink: 0 }}
        >
          {/* Drag handle on mobile */}
          <div className="flex items-center gap-2 sm:hidden">
            <div className="w-8 h-1 rounded-full bg-zinc-300 mx-auto" />
          </div>

          <span className="hidden sm:block text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
            Resume
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <a
              href="/assets/backgrounds/Yathartha%20Shrestha.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wide
                         bg-black text-white rounded hover:bg-[#0d13d1] transition-colors duration-200"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>

            <button
              ref={closeRef}
              onClick={handleClose}
              aria-label="Close resume"
              className="flex items-center justify-center w-8 h-8 rounded text-zinc-400
                         hover:bg-zinc-100 hover:text-black transition-colors duration-150"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── PDF embed ── */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {isMobile ? (
            /*
             * On mobile, a raw iframe PDF is nearly unusable.
             * Instead, show a friendly prompt with the download CTA
             * and an object tag as a best-effort fallback.
             */
            <div className="flex flex-col items-center justify-center h-full gap-5 px-6 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                PDF preview isn't great on mobile. Download it for the best
                experience.
              </p>
              <a
                href="/assets/backgrounds/Yathartha%20Shrestha.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold
                           bg-black text-white rounded-lg hover:bg-[#0d13d1] transition-colors duration-200 w-full justify-center"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Résumé
              </a>

              <a
                href="/assets/backgrounds/Yathartha%20Shrestha.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 underline underline-offset-2"
              >
                Or open in browser tab
              </a>
            </div>
          ) : (
            /*
             * Desktop / tablet: original scrollbar-clipping iframe trick.
             */
            <iframe
              src="/assets/backgrounds/Yathartha%20Shrestha.pdf"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "calc(100% + 18px)",
                height: "calc(100% + 18px)",
                border: "none",
                display: "block",
              }}
              title="Yathartha Shrestha"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Reusable CTA Button ───────────────────────────────────────────────────────
const CTAButton = ({ layout = "default" }) => {
  /*
   * layout variants:
   *   "default"  — original desktop aside layout (mt-28, stacked meta + button)
   *   "mobile"   — compact, full-width-friendly layout for the hero mobile section
   */

  if (layout === "mobile") {
    return (
      <div className="mt-8 flex flex-col gap-3">
        <span
          className="text-[13px] text-zinc-500 cursor-default"
          data-anim="cta-meta"
          style={{ opacity: 0 }}
        >
          *Open to 2 projects
        </span>

        <div className="flex items-stretch gap-2" data-anim="cta" style={{ opacity: 0 }}>
          {/* Primary action — full-width on xs, auto on sm */}
          <a
            href="/assets/backgrounds/Yathartha%20Shrestha.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 sm:flex-none inline-flex items-stretch shadow-sm 
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 gap-1"
            aria-label="View credentials in new tab"
          >
            <span
              className="relative bg-black px-5 py-3.5 text-[15px] font-medium text-white 
                         transition-colors duration-300 overflow-hidden flex-1 text-center"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#0d13d1] transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative z-10">Credentials Inside</span>
            </span>
            <span
              className="bg-black px-4 py-3.5 text-white border-l border-white/20 
                         transition-all duration-300 group-hover:bg-[#0d13d1] group-hover:translate-x-1 flex items-center"
            >
              →
            </span>
          </a>
        </div>
      </div>
    );
  }

  // ── Default (desktop aside) ──────────────────────────────────────────────────
  return (
    <div className="mt-28">
      <span
        className="mb-2 block text-[16px] text-black cursor-default"
        data-anim="cta-meta"
        style={{ opacity: 0 }}
      >
        *Open to 2 projects
      </span>

      <a
        href="/assets/backgrounds/Yathartha%20Shrestha.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-stretch rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 gap-0.5 focus-visible:ring-black/20"
        data-anim="cta"
        style={{ opacity: 0 }}
        aria-label="View resume in new tab"
      >
        <span
          className="relative bg-black px-5 py-3 text-md font-medium text-white 
                    transition-colors duration-300 group-hover:bg-[#0d13d1] overflow-hidden"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#0d13d1] transition-transform duration-300 group-hover:translate-x-0" />
          <span className="relative z-10">Spoiler: I’m Good</span>
        </span>
        <span
          className="bg-black px-4 py-3 text-white border-l border-white/20 
                    transition-all duration-300 group-hover:bg-[#0d13d1] group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
};

// ─── Mobile Hero Card ──────────────────────────────────────────────────────────
/*
 * Shown only on < md. Replaces the cramped aside + scattered blurb approach
 * with a single well-composed card that groups identity, role chips, and CTA.
 */
const MobileHero = ({ blurbRef, mobileCtaRef }) => {
  return (
    <div
      className="md:hidden relative mx-auto w-full px-5 pt-[28vh] pb-10 flex flex-col"
      ref={mobileCtaRef}
    >
      {/* ── Role chips ─────────────────────────────────────────────────────── */}
      {/* <div className="flex flex-wrap gap-2 mb-5" data-anim="cta-meta">
        {["Web Design", "Frontend Dev", "React / Next.js"].map((chip) => (
          <span
            key={chip}
            className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase
                       border border-zinc-200 text-zinc-500 bg-white/80"
          >
            {chip}
          </span>
        ))}
      </div> */}

      {/* ── Main heading ───────────────────────────────────────────────────── */}
      <h1 className="font-semibold tracking-tight text-zinc-900 leading-[1.1] text-balance">
        <span className="block text-[11.5vw] sm:text-[9vw]" data-anim="cta" style={{ opacity: 0 }}>
          Web Designer
        </span>
        <span className="block text-[11.5vw] sm:text-[9vw]" data-anim="cta" style={{ opacity: 0 }}>
          &amp; Developer
        </span>
      </h1>

      {/* ── Sub-blurb ──────────────────────────────────────────────────────── */}
      <p
        className="mt-3 text-[15px] sm:text-[17px] text-zinc-500 text-pretty leading-relaxed"
        ref={blurbRef}
        data-anim="cta-meta"
        style={{ opacity: 0 }}
      >
        Crafting fast, beautiful websites for service&nbsp;&amp;&nbsp;software
        businesses.
      </p>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <CTAButton layout="mobile" />

      {/* ── Decorative divider ─────────────────────────────────────────────── */}
      {/* <div className="mt-10 flex items-center gap-3 opacity-30" aria-hidden="true">
        <div className="flex-1 h-px bg-zinc-300" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">
          Scroll
        </span>
        <div className="w-4 h-px bg-zinc-300" />
      </div> */}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Main = ({ showPhoto = true }) => {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const nameBgRef = useRef(null);
  const blurbRef = useRef(null);
  const asideRef = useRef(null);
  const mobileCtaRef = useRef(null);
  const photoRef = useRef(null);

  const titleLinesRef = useRef([]);
  titleLinesRef.current = [];

  const setTitleLineRef = (idx) => (el) => {
    if (el) titleLinesRef.current[idx] = el;
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(headerRef.current, { y: 0, opacity: 1, visibility: "visible" });
        gsap.set(
          [...(headerRef.current?.querySelectorAll("nav") || [])],
          { y: 0, opacity: 1 }
        );
        gsap.set(nameBgRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(titleLinesRef.current, {
          y: 0,
          opacity: 1,
          filter: "none",
        });
        gsap.set(blurbRef.current, { y: 0, opacity: 1 });
        gsap.set(
          [...(asideRef.current?.querySelectorAll("[data-anim]") || [])],
          { opacity: 1, x: 0 }
        );
        gsap.set(
          [...(mobileCtaRef.current?.querySelectorAll("[data-anim]") || [])],
          { opacity: 1, y: 0 }
        );
        gsap.set(photoRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          clearProps: "all",
        });
        return;
      }

      // Calculate group centering offsets
      let textOffset = 0;
      let photoOffset = -400;
      if (nameBgRef.current && photoRef.current) {
        const nameRect = nameBgRef.current.getBoundingClientRect();
        const photoRect = photoRef.current.getBoundingClientRect();
        const groupWidth = nameRect.width + 20 + photoRect.width;
        const groupLeftCentered = (window.innerWidth - groupWidth) / 2;
        textOffset = groupLeftCentered - nameRect.left;
        photoOffset = (groupLeftCentered + nameRect.width + 20) - photoRect.left;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const D = {
        header: 0.8,
        navStagger: 0.5,
        title: 0.4,
        blurb: 0.8,
        aside: 0.7,
        mobile: 0.7,
        photo: 0.9,
        bgIn: 0.9,
      };

      if (nameBgRef.current) {
        tl.fromTo(
          nameBgRef.current,
          { opacity: 0, scale: 0.96, y: 40, x: textOffset },
          { opacity: 1, scale: 1, y: 0, x: textOffset, duration: 1.6, ease: "power3.out" }
        );
      }

      if (photoRef.current) {
        gsap.set(photoRef.current, {
          opacity: 0,
          scale: 0.96,
          willChange: "transform, opacity",
        });
        tl.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.96, y: 40, x: photoOffset },
          { opacity: 1, scale: 1, y: 0, x: photoOffset, duration: 1.6, ease: "power3.out" },
          "<"
        );
      }

      if (nameBgRef.current || photoRef.current) {
        if (nameBgRef.current) {
          tl.to(
            nameBgRef.current,
            { x: 0, duration: 1.0, ease: "power3.inOut" },
            "-=0.6"
          );
        }
        if (photoRef.current) {
          tl.to(
            photoRef.current,
            { x: 0, duration: 1.0, ease: "power3.inOut" },
            "<"
          );
        }
      }

      // Header and Nav Items appear after separation
      const headerEl = document.querySelector("header");

      if (headerEl) {
        tl.fromTo(
          headerEl,
          { y: -8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: D.header, ease: "power3.out" },
          "-=0.7"
        );
      }

      // Desktop title lines animation
      gsap.matchMedia().add("(min-width: 768px)", () => {
        if (titleLinesRef.current.length) {
          tl.fromTo(
            titleLinesRef.current,
            {
              y: 36,
              opacity: 0,
              filter: "blur(1px)",
            },
            {
              y: 0,
              opacity: 1,
              filter: "none",
              duration: D.title,
              stagger: 0.15,
            },
            "-=0.6"
          );
        }
      });

      if (blurbRef.current) {
        tl.fromTo(
          blurbRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: D.blurb },
          "-=0.6"
        );
      }

      if (asideRef.current) {
        const asideChildren = asideRef.current.querySelectorAll("[data-anim]");
        if (asideChildren.length) {
          tl.fromTo(
            asideChildren,
            { x: 22, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: D.aside,
              stagger: 0.1,
            },
            "-=0.5"
          );
        }
      }

      if (mobileCtaRef.current) {
        const mobileChildren =
          mobileCtaRef.current.querySelectorAll("[data-anim]");
        if (mobileChildren.length) {
          tl.fromTo(
            mobileChildren,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: D.mobile,
              stagger: 0.1,
            },
            "-=0.5"
          );
        }
      }


    }, rootRef);

    return () => ctx.revert();
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        "#title-service5",
        { xPercent: 0 },
        {
          xPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: "#title-service5", scrub: true },
          overwrite: "auto",
          immediateRender: false,
        }
      );

      gsap.to("#title-servicel", {
        xPercent: 20,
        scrollTrigger: { trigger: "#title-servicel", scrub: true },
      });

      gsap.fromTo(
        "#title-service",
        { xPercent: 3 },
        {
          xPercent: -15,
          ease: "none",
          overwrite: "auto",
          immediateRender: false,
          scrollTrigger: {
            trigger: "#title-service",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#fafafa]"
      ref={rootRef}
    >
      <div className="relative min-h-[100svh] w-full z-10">

        {/* ════════════════════════════════════════════════════════════════════
            MOBILE / TABLET LAYOUT  (hidden on md+)
            A single, vertically-composed hero block. No aside, no duplicate
            floating elements — just a clean, scannable card reading order:
            chips → heading → sub-blurb → CTA → scroll hint
        ════════════════════════════════════════════════════════════════════ */}
        <MobileHero blurbRef={blurbRef} mobileCtaRef={mobileCtaRef} />

        {/* ════════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT  (hidden below md) — ZERO changes from original
        ════════════════════════════════════════════════════════════════════ */}
        <div className="hidden md:block relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-[22vh] sm:pt-[28vh] lg:pt-[33vh] lg:pl-[35vh]">
          <h1 className="font-semibold tracking-tight text-zinc-900 leading-tight text-balance">
            <span
              className="block will-change-transform text-[10.5vw] sm:text-[8vw] md:text-[40px] lg:text-[35px] cursor-default"
              ref={setTitleLineRef(0)}
              style={{ opacity: 0 }}
            >
              Web Designer
            </span>
            <span
              className="block will-change-transform text-[10.5vw] sm:text-[8vw] md:text-[40px] lg:text-[35px] cursor-default"
              ref={setTitleLineRef(1)}
              style={{ opacity: 0 }}
            >
              Frontend Developer
            </span>
          </h1>

          <p
            className="mt-2 cursor-default md:mt-3 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[23px] text-zinc-600 will-change-transform text-pretty"
            ref={blurbRef}
            style={{ opacity: 0 }}
          >
            For service and software businesses.
          </p>
        </div>

        {/* Desktop aside — UNCHANGED ─────────────────────────────────────── */}
        <aside
          className="absolute right-6 md:right-16 lg:right-24 top-[27vh] hidden md:flex flex-col items-start"
          ref={asideRef}
        >
          <CTAButton />
        </aside>

        {/* ── Background display name — responsive opacity on mobile ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-[2vw] bottom-[-5.8vw] font-normal leading-none tracking-[-.02em] text-black z-0 will-change-transform
                     opacity-[0.06] md:opacity-100"
          ref={nameBgRef}
          style={{ opacity: 0 }}
        >
          <span
            className="block text-[24vw] sm:text-[19vw] md:text-[18vw] lg:text-[17vw] xl:text-[16vw] 2xl:text-[18vw] mb-15"
            id="title-service"
          >
            STAY ZI
          </span>
        </div>

        {/* Desktop photo — UNCHANGED ──────────────────────────────────────── */}
        {showPhoto && (
          <div
            ref={photoRef}
            className="hidden md:block absolute right-6 md:right-10 lg:right-14 bottom-[10px] md:bottom-[14px] z-20"
            style={{ opacity: 0 }}
          >
            <div id="title-servicel">
              <div
                className="size-20 lg:size-28 xl:size-30 rounded-full overflow-hidden 
                           ring-1 ring-black/10 shadow-xl bg-white 
                           transform transition-all duration-500 ease-out 
                           origin-bottom-right hover:scale-150 cursor-pointer"
              >
                <img
                  src="/assets/backgrounds/avt2.png"
                  className="h-full w-full object-cover"
                  draggable={false}
                  alt="Profile"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile profile strip (sm and below) ─────────────────────────
            A minimal identity anchor at bottom of viewport —
            shows avatar + name so mobile users know whose portfolio this is.
        ─────────────────────────────────────────────────────────────────── */}
        {showPhoto && (
          <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5
                          bg-white/90 backdrop-blur-sm rounded-full px-3 py-2
                          shadow-[0_2px_16px_rgba(0,0,0,0.10)] border border-zinc-100">
            <div className="size-7 rounded-full overflow-hidden ring-1 ring-black/10 shrink-0">
              <img
                src="/assets/backgrounds/avt2.png"
                className="h-full w-full object-cover"
                draggable={false}
                alt="Profile"
              />
            </div>
            <span className="text-[12px] font-semibold text-zinc-800 tracking-wide whitespace-nowrap pr-1">
              Yathartha Shrestha
            </span>
            <span className="w-px h-3 bg-zinc-200" />
            <span className="flex items-center gap-1 text-[11px] text-zinc-400 pr-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Open
            </span>
          </div>
        )}

      </div>
    </section>
  );
};

export default Main;