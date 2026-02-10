import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import StickNav from "./StickNav";

// ─── Resume PDF Modal ──────────────────────────────────────────────────────────
const ResumeModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);
  const closeRef   = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 })
      .fromTo(panelRef.current, { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55 }, "-=0.3")
      .fromTo(closeRef.current, { opacity: 0, rotate: -90 }, { opacity: 1, rotate: 0, duration: 0.35 }, "-=0.2");
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.in" }, onComplete: onClose });
    tl.to(panelRef.current, { y: 50, opacity: 0, scale: 0.96, duration: 0.35 })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  const onBackdropClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={onBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center pt-20"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.22)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        ref={panelRef}
        className="relative flex flex-col bg-white shadow-2xl"
        style={{
          width: "min(92vw, 860px)",
          height: "min(92vh, 1100px)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {/* ── Toolbar ── */}
        {/* <div
          className="flex items-center justify-between px-2 py-2.5 border-b border-zinc-200"
          style={{ background: "#ffffff", minHeight: "44px", flexShrink: 0 }}
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
             
          </span>

          <div className="flex items-center gap-2 ">
            <a
              href="/assets/backgrounds/Resume1.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wide
                         bg-black text-white rounded hover:bg-[#0d13d1] transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>

            <button
              ref={closeRef}
              onClick={handleClose}
              aria-label="Close resume"
              className="flex items-center justify-center w-7 h-7 rounded text-zinc-400
                         hover:bg-zinc-100 hover:text-black transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div> */}

        {/* ── PDF embed ─────────────────────────────────────────────────────────
            The iframe is sized 18px beyond its clipping container on the right
            and bottom. The parent overflow:hidden slices those edges off —
            which is exactly where the browser draws the scrollbar rails.
            Result: zero scrollbars visible, full PDF content accessible.
        ──────────────────────────────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <iframe
            src="/assets/backgrounds/Resume1.pdf"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "calc(100% + 18px)",
              height: "calc(100% + 18px)",
              border: "none",
              display: "block",
            }}
            title="Yathartha Shrestha "
          />
        </div>

      </div>
    </div>
  );
};

// ─── Reusable CTA Button ───────────────────────────────────────────────────────
const CTAButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mt-28">
        <span
          className="mb-2 block text-[16px] text-black cursor-default"
          data-anim="cta-meta"
        >
          *Open to 2 projects
        </span>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="group inline-flex items-stretch rounded-md shadow-sm focus:outline-none focus:ring-2 gap-0.5 focus:ring-black/20"
          data-anim="cta"
        >
          <span
            className="relative bg-black px-5 py-3 text-md font-medium text-white 
                      transition-colors duration-300 group-hover:bg-[#0d13d1] overflow-hidden"
          >
            <span
              className="absolute inset-0 -translate-x-full bg-[#0d13d1] transition-transform duration-300 group-hover:translate-x-0"
            />
            <span className="relative z-10">Schedule a call</span>
          </span>
          <span
            className="bg-black px-4 py-3 text-white border-l border-white/20 
                      transition-all duration-300 group-hover:bg-[#0d13d1] group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>

      {modalOpen && <ResumeModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

// ─── Main (unchanged from original) ──────────────────────────────────────────
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
        gsap.set(headerRef.current, { y: 0, opacity: 1 });
        gsap.set([...(headerRef.current?.querySelectorAll("nav") || [])], { y: 0, opacity: 1 });
        gsap.set(nameBgRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(titleLinesRef.current, { y: 0, opacity: 1, filter: "none" });
        gsap.set(blurbRef.current, { y: 0, opacity: 1 });
        gsap.set([...(asideRef.current?.querySelectorAll("[data-anim]") || [])], { opacity: 1, x: 0 });
        gsap.set([...(mobileCtaRef.current?.querySelectorAll("[data-anim]") || [])], { opacity: 1, y: 0 });
        gsap.set(photoRef.current, { opacity: 1, scale: 1, y: 0, clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const D = {
        header: 1.2,
        navStagger: 0.8,
        title: 0.6,
        blurb: 1.2,
        aside: 1.0,
        mobile: 1.0,
        photo: 0.6,
        bgIn: 1.6,
      };

      tl.from(headerRef.current, { y: -22, opacity: 0, duration: D.header });

      gsap.matchMedia().add("(min-width: 768px)", () => {
        const navItems = headerRef.current?.querySelectorAll("nav") || [];
        if (navItems.length) {
          tl.from(navItems, { y: -14, opacity: 0, duration: D.navStagger, stagger: 0.15 }, "-=0.8");
        }
      });

      if (nameBgRef.current) {
        tl.fromTo(
          nameBgRef.current,
          { opacity: 0, scale: 0.94, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: D.bgIn },
          "-=0.6"
        );
        gsap.to(nameBgRef.current, { y: 10, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }

      if (titleLinesRef.current.length) {
        tl.from(
          titleLinesRef.current,
          { y: 36, opacity: 0, filter: "blur(1px)", duration: D.title, stagger: 0.22 },
          "-=1.0"
        );
      }

      if (blurbRef.current) {
        tl.from(blurbRef.current, { y: 18, opacity: 0, duration: D.blurb }, "-=1.0");
      }

      if (asideRef.current) {
        const asideChildren = asideRef.current.querySelectorAll("[data-anim]");
        if (asideChildren.length) {
          tl.from(asideChildren, { x: 22, opacity: 0, duration: D.aside, stagger: 0.16 }, "-=0.9");
        }
      }

      if (mobileCtaRef.current) {
        const mobileChildren = mobileCtaRef.current.querySelectorAll("[data-anim]");
        if (mobileChildren.length) {
          tl.from(mobileChildren, { y: 16, opacity: 0, duration: D.mobile, stagger: 0.16 }, "-=0.9");
        }
      }

      if (photoRef.current) {
        gsap.set(photoRef.current, { opacity: 0, scale: 0.96, willChange: "transform, opacity" });
        tl.to(photoRef.current, { opacity: 1, scale: 1, duration: D.photo, overwrite: "auto" }, "-=0.6");
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      "#title-service5",
      { xPercent: 0 },
      { xPercent: 10, ease: "none", scrollTrigger: { trigger: "#title-service5", scrub: true }, overwrite: "auto", immediateRender: false }
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
        scrollTrigger: { trigger: "#title-service", scrub: true, invalidateOnRefresh: true },
      }
    );
  }, { scope: rootRef });

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#fafafa]"
      ref={rootRef}
    >
      <div className="relative min-h-[100svh] w-full z-10">
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-[22vh] sm:pt-[28vh] lg:pt-[33vh] lg:pl-[35vh]">
          <h1 className="font-semibold tracking-tight text-zinc-900 leading-tight text-balance">
            <span
              className="block will-change-transform text-[10.5vw] sm:text-[8vw] md:text-[40px] lg:text-[35px] cursor-default"
              ref={setTitleLineRef(0)}
            >
              Web Designer
            </span>
            <span
              className="block will-change-transform text-[10.5vw] sm:text-[8vw] md:text-[40px] lg:text-[35px] cursor-default"
              ref={setTitleLineRef(1)}
            >
              Frontend Developer
            </span>
          </h1>

          <p
            className="mt-2 cursor-default md:mt-3 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[23px] text-zinc-600 will-change-transform text-pretty"
            ref={blurbRef}
          >
            For service and software businesses.
          </p>

          <div className="mt-6 md:hidden" ref={mobileCtaRef}>
            <CTAButton />
          </div>
        </div>

        <aside
          className="absolute right-6 md:right-16 lg:right-24 top-[27vh] hidden md:flex flex-col items-start"
          ref={asideRef}
        >
          <CTAButton />
        </aside>

        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-[3vw] bottom-[-4vw] font-normal leading-none tracking-[-.02em] text-black z-0 will-change-transform"
          ref={nameBgRef}
        >
          <span
            className="block text-[24vw] sm:text-[19vw] md:text-[18vw] lg:text-[17vw] xl:text-[16vw] 2xl:text-[19vw] mb-15"
            id="title-service"
          >
            STAY ZI
          </span>
        </div>

        {showPhoto && (
          <div
            ref={photoRef}
            className="hidden md:block absolute right-6 md:right-10 lg:right-14 bottom-6 md:bottom-8 z-20"
            id="title-servicel"
          >
            <div
              className="size-20 lg:size-28 xl:size-30 rounded-full overflow-hidden 
                         ring-1 ring-black/10 shadow-xl bg-white 
                         transform transition-all duration-500 ease-out 
                         origin-bottom-right hover:scale-150 cursor-pointer"
            >
              <img
                src="/assets/projects/bla.png"
                className="h-full w-full object-cover"
                draggable={false}
                alt="Profile"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Main;