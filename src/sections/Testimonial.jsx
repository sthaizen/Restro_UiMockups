import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const quoteRef = useRef(null);
  const listRef = useRef(null);
  const barRef = useRef(null);
  const rowRefs = useRef([]);

  // Position the highlight bar under the active row
  const moveBar = (index, immediate = false) => {
    const row = rowRefs.current[index];
    if (!row || !barRef.current || !listRef.current) return;
    
    const bounds = row.getBoundingClientRect();
    const containerBounds = listRef.current.getBoundingClientRect();
    const y = bounds.top - containerBounds.top;
    const h = bounds.height;

    gsap.to(barRef.current, {
      y,
      height: h,
      duration: immediate ? 0 : 0.5,
      ease: "power3.out",
    });
  };

  // Animate quote change
  const swapQuote = (text) => {
    const q = quoteRef.current;
    if (!q) return;
    const tl = gsap.timeline();
    tl.to(q, { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.out" })
      .call(() => {
        q.textContent = text;
      })
      .to(q, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" });
  };

  // Initial mount animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from("[data-kicker]", { 
        y: 10, 
        autoAlpha: 0, 
        duration: 0.6, 
        ease: "power3.out" 
      });
      
      gsap.from("[data-quote-shell]", { 
        y: 20, 
        autoAlpha: 0, 
        duration: 0.8, 
        ease: "power3.out", 
        delay: 0.1 
      });
      
      gsap.from("[data-meta]", { 
        y: 12, 
        autoAlpha: 0, 
        duration: 0.6, 
        ease: "power3.out", 
        delay: 0.2 
      });

      // Animate rows
      if (rowRefs.current.length) {
        gsap.from(rowRefs.current, {
          y: 20,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            // Position bar after rows are visible
            moveBar(0, true);
          }
        });
      }

      // Scroll-based animations
      const shiftTargets = gsap.utils.toArray("[data-shift]");
      if (shiftTargets.length) {
        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const dir = self.direction === 1 ? 1 : -1;
            gsap.to(shiftTargets, {
              y: dir * 6,
              duration: 0.35,
              ease: "power2.out",
            });
          },
        });
      }

      if (barRef.current) {
        // Set initial bar visibility
        gsap.set(barRef.current, { autoAlpha: 1 });
        
        gsap.to(barRef.current, {
          scaleX: 1,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  // On active change: move bar + swap quote
  useEffect(() => {
    moveBar(active);
    swapQuote(`\u201C ${TESTIMONIALS[active].quote}`);
  }, [active]);

  // Reposition bar on resize
  useEffect(() => {
    const onResize = () => {
      if (rowRefs.current[active]) {
        moveBar(active, true);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <section ref={wrapRef} className="relative w-full bg-[#fafafa]">
      <div className="mx-auto max-w-full md:max-w-[1650px] grid grid-cols-12 gap-x-6 px-2 md:px-8 lg:pt-30 lg:pb-20 md:pt-30">
        {/* Left column: Kicker */}
        <div className="col-span-12 md:col-span-2">
          <div
            data-kicker
            className="pt-12 md:pt-36 text-[15px] tracking-widest text-black select-none roboto3"
          >
            [TESTIMONIALS]
          </div>
        </div>

        {/* Right column: Quote + Meta/Table */}
        <div className="col-span-12 md:col-span-10 px-0 sm:px-4 md:px-10 lg:ml-50" data-shift>
          {/* Quote */}
          <div data-quote-shell className="relative mt-10 md:mt-10">
            <div
              aria-live="polite"
              aria-atomic="true"
              ref={quoteRef}
              className="font-normal leading-[1.05] tracking-tight text-zinc-900 select-none text-left"
              style={{ fontSize: "clamp(30px, 6vw, 44px)" }}
            >
              {`\u201C ${TESTIMONIALS[0].quote}`}
            </div>
          </div>

          {/* Meta / table */}
          <div data-meta className="mt-12 md:mt-46">
            <div className="text-[10px] md:text-[14px] uppercase tracking-widest text-black">
              {TESTIMONIALS[active].tags.join(", ")}
            </div>

            {/* List */}
            <div ref={listRef} className="relative mt-4 border-t border-zinc-600">
              {/* Moving bar - positioned absolutely behind the list */}
              <div
                ref={barRef}
                aria-hidden="true"
                className="absolute left-0 top-0 w-full bg-black rounded-sm transition-opacity"
                style={{
                  height: 48,
                  transform: "translateY(0px)",
                  pointerEvents: "none",
                  willChange: "transform, height",
                }}
              />
              
              {/* Testimonial list */}
              <ul role="tablist" className="relative z-10 divide-y divide-zinc-600">
                {TESTIMONIALS.map((t, i) => {
                  const isActive = active === i;
                  return (
                    <li
                      key={t.name + i}
                      ref={(el) => {
                        rowRefs.current[i] = el;
                      }}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(i);
                        }
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setActive((i + 1) % TESTIMONIALS.length);
                        }
                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setActive((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                        }
                      }}
                      className={[
                        "grid grid-cols-12 items-center py-4 md:py-5 cursor-pointer select-none",
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-zinc-900",
                      ].join(" ")}
                      style={{ minHeight: 48 }}
                    >
                      <div className="col-span-5 md:col-span-3 pl-3 md:pl-4 text-xl md:text-[18px] font-normal roboto3">
                        {t.name}
                      </div>
                      <div className="col-span-5 md:col-span-7 text-sm md:text-[18px]">
                        {t.company}
                      </div>
                      <div className="col-span-2 md:col-span-2 pr-3 md:pr-4 text-right text-xs md:text-[18px]">
                        {t.industry}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="absolute left-6 bottom-6 h-12 w-12 border-l border-b border-black hidden md:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}