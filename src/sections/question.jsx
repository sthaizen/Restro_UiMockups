import React, { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Questions() {
  // Data – tweak copy to your needs
 const items = [
  {
    q: "How much will my website cost (in Nepal)?",
    a: "Pricing depends on scope, design complexity, number of pages, animations, and integrations (forms, CMS, payments, etc.). Most projects I handle in Nepal start around NPR 40,000 for a clean landing page and can go up to NPR 3,00,000+ for larger multi-page builds. After reviewing your requirements, I’ll provide a clear fixed quote with deliverables and timeline.",
  },
  {
    q: "How long will it take to complete?",
    a: "Timelines depend on scope and how quickly content is provided. A landing page usually takes 3–7 days, a standard multi-page site takes 1–3 weeks, and more complex builds can take 4–8 weeks. I’ll share a realistic schedule (milestones + review dates) before we start.",
  },
  
  {
    q: "What exactly is included in the project?",
    a: "Every project includes responsive design (mobile/tablet/desktop), clean UI implementation, basic on-page SEO setup, performance best practices, and deployment support. If your project needs extras like CMS, advanced animations, integrations, or additional pages, I’ll list them clearly in the proposal so there are no surprises.",
  },
  {
    q: "What do you need from me to get started?",
    a: "I’ll send a short questionnaire to understand your goals, audience, and style preferences. I’ll also need your branding assets (logo, colors, fonts) and website content (text/images). If you don’t have content ready, I can guide you with a simple content checklist and structure.",
  },
  {
    q: "How do revisions and feedback work?",
    a: "I share progress in clear milestones (e.g., first build → review → refinement → final). Most projects include a set number of revision rounds, which we agree on upfront. This keeps the timeline predictable and ensures you stay in control of the final result.",
  },
  
  
  {
    q: "Do you offer support after the website is delivered?",
    a: "Yes. I provide post-launch support for bug fixes and small adjustments for a short period after delivery. If you want ongoing updates, new features, or regular maintenance, we can set up a monthly support plan.",
  },
];


  const [open, setOpen] = useState(null);
  const contentRefs = useRef([]);
  const rowRefs = useRef([]);
  const iconRefs = useRef([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const addToRefs = (refArr, el) => {
    if (el && !refArr.current.includes(el)) refArr.current.push(el);
  };

  useLayoutEffect(() => {
    // Clean up refs to match current items length
    contentRefs.current = contentRefs.current.slice(0, items.length);
    rowRefs.current = rowRefs.current.slice(0, items.length);
    iconRefs.current = iconRefs.current.slice(0, items.length);

    const ctx = gsap.context(() => {
      // Initialize all panels as collapsed
      contentRefs.current.forEach((el) => {
        if (el) {
          gsap.set(el, { height: 0, opacity: 0, display: "none" });
        }
      });

      // Initialize all icons as plus (+)
      iconRefs.current.forEach((wrap) => {
        if (wrap && wrap.children.length === 2) {
          const [h, v] = wrap.children;
          gsap.set(wrap, { rotation: 0 });
          gsap.set(h, { rotation: 0 });
          gsap.set(v, { rotation: 0, opacity: 1 });
        }
      });

      // Data-st animations
      gsap.utils.toArray("[data-st]").forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Section fade-in
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // Heading animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      // FAQ rows stagger animation
      if (rowRefs.current.length > 0) {
        gsap.from(rowRefs.current, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current || rowRefs.current[0],
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  const toggle = (idx) => {
    if (open === idx) {
      collapse(idx);
      setOpen(null);
    } else {
      if (open !== null) collapse(open);
      expand(idx);
      setOpen(idx);
    }
  };

  const expand = (idx) => {
    const el = contentRefs.current[idx];
    const icon = iconRefs.current[idx];
    
    if (!el || !icon || icon.children.length !== 2) return;
    
    const [h, v] = icon.children;

    // Clear any existing inline styles and measure target height
    gsap.set(el, { clearProps: "all" });
    gsap.set(el, { display: "block", height: "auto", opacity: 1 });
    const hTarget = el.offsetHeight;
    
    // Animate content panel
    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height: hTarget,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => gsap.set(el, { height: "auto" }),
      }
    );

    // Rotate the icon wrapper 90 degrees
    gsap.to(icon, { rotation: 90, duration: 0.3, ease: "power2.out" });

    // Animate plus → X (horizontal stays, vertical rotates 90deg to cross it)
    gsap.to(h, { rotation: 45, duration: 0.3, ease: "power2.out" });
    gsap.to(v, { rotation: 45, duration: 0.3, ease: "power2.out" });
  };

  const collapse = (idx) => {
    const el = contentRefs.current[idx];
    const icon = iconRefs.current[idx];
    
    if (!el || !icon || icon.children.length !== 2) return;
    
    const [h, v] = icon.children;

    // Animate content panel
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => gsap.set(el, { display: "none" }),
    });

    // Reset icon wrapper rotation
    gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" });

    // Animate X → plus (reset both bars to original position)
    gsap.to(h, { rotation: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(v, { rotation: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#fafafa]">
      <div className="mx-auto lg:px-[7vw] px-6 md:px-10 py-14 md:py-20 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12 lg:gap-x-20 lg:pt-30">
        <div className="pb-[22px] pt-[12px] md:pt-[40px] text-[15px] tracking-widest text-black">
          [FAQS]
        </div>

        {/* Main content */}
        <div>
          <h2
            ref={headingRef}
            className="text-[30px] md:text-4xl lg:text-[46px] leading-[1.05] font-normal tracking-tight text-zinc-900 mb-8 md:mb-10 data-st"
          >
            Frequently asked questions
          </h2>

          <div className="flex flex-col gap-5 lg:pt-5">
            {items.map((item, idx) => (
              <article
                key={idx}
                ref={(el) => addToRefs(rowRefs, el)}
                className="rounded-sm overflow-hidden bg-white/0"
              >
                {/* Header row */}
                <button
                  onClick={() => toggle(idx)}
                  className={`faq-button w-full flex items-center justify-between rounded-sm bg-[#efefef] hover:bg-[#e5e5e5] duration-300 ease-out transition-colors px-6 py-6 text-left cursor-pointer ${
                    open === idx ? "is-open" : ""
                  }`}
                >
                  <span className="text-[18px] md:text-[20px] font-medium text-zinc-900">
                    {item.q}
                  </span>

                  {/* Plus / X icon (2 bars) */}
                  <span
                    aria-hidden="true"
                    ref={(el) => addToRefs(iconRefs, el)}
                    className="relative h-5 w-5 shrink-0 icon-wrapper"
                  >
                    <i className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 block" />
                    <i className="absolute left-1/2 top-1/2 h-5 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-zinc-900 block" />
                  </span>
                </button>

                {/* Animated answer panel */}
                <div 
                  className="px-6 overflow-hidden" 
                  ref={(el) => addToRefs(contentRefs, el)}
                >
                  <div className="border-t border-black/10 my-3" />
                  <p className="pb-6 text-[16px] md:text-[18px] text-zinc-800 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}