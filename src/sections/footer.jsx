// src/sections/FooterExact.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const FooterExact = ({ label = "JAEYI", year = 2025, pin = true }) => {
  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([wordRef.current, yearRef.current], { opacity: 1, yPercent: 0 });
        return;
      }

      // Start slightly lower, rise to final baseline while pinned
      gsap.set(wordRef.current, { yPercent: 12, opacity: 1, willChange: "transform" });
      gsap.set(yearRef.current, { opacity: 0, y: 8 });

      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",   // when footer enters
          end: "+=120%",         // keep pinned briefly
          scrub: true,
          pin,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      })
        .to(wordRef.current, { yPercent: 0 }, 0)
        .to(yearRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.1);
    }, rootRef);

    return () => ctx.revert();
  }, [pin]);

  return (
    <footer
      ref={rootRef}
      className="relative w-full overflow-hidden bg-white"
      aria-label="Site footer"
    >
      {/* © year bottom-left */}
      <div
        ref={yearRef}
        className="absolute left-6 bottom-6 text-[12px] sm:text-[13px] text-black select-none"
      >
        ©{year}
      </div>

      {/* Big wordmark, baseline anchored near the bottom */}
      <div className="relative w-full h-[72vh] md:h-[78vh]">
        <h2
          ref={wordRef}
          aria-hidden="true"
          className="
            absolute left-1/2 -translate-x-1/2 bottom-[-.05em] m-0
            select-none whitespace-nowrap text-black font-extrabold
            tracking-[-.02em] leading-[0.82]
            text-[26vw] md:text-[20vw] lg:text-[18vw] xl:text-[16vw]
          "
        >
          {label}
        </h2>
      </div>
    </footer>
  );
};

export default FooterExact;
