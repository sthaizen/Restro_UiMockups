import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Sidebar from "./Sidebar";
import TechSection from "./TechSection";
import TimelineSection from "./TimelineSection";
import FooterSection from "./FooterSection";

gsap.registerPlugin(ScrollTrigger);

export default function SkillPage() {
  // Scroll to top on mount & initialize Lenis smooth scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("dark-scrollbar");

    let lenis;
    let tickerCallback;

    if (window.innerWidth >= 1024) {
      const scroller = document.querySelector(".skill-page-scroller");
      if (scroller) {
        lenis = new Lenis({
          wrapper: scroller,
          content: scroller.firstElementChild,
          smoothWheel: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Update ScrollTrigger on scroll
        lenis.on("scroll", ScrollTrigger.update);

        // Add Lenis to GSAP ticker
        tickerCallback = (time) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
      }
    }

    return () => {
      if (lenis) lenis.destroy();
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      document.documentElement.classList.remove("dark-scrollbar");
    };
  }, []);

  const leftColRef = React.useRef(null);
  const rightColRef = React.useRef(null);

  useGSAP(() => {
    gsap.fromTo(leftColRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );
    gsap.fromTo(rightColRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen lg:h-screen w-screen bg-black text-neutral-100 font-satoshi relative overflow-x-hidden lg:overflow-hidden flex flex-col lg:flex-row p-0">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neutral-900/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neutral-900/40 blur-[120px] pointer-events-none" />

      {/* Left Column: Fixed Sidebar */}
      <div
        ref={leftColRef}
        className="w-full lg:w-[520px] h-auto lg:h-full bg-black border-r border-neutral-900/40 p-8 shrink-0 overflow-hidden flex flex-col gap-8 z-10"
      >
        <Sidebar />
      </div>

      {/* Right Column: Scrollable Content */}
      <div
        ref={rightColRef}
        className="w-full lg:h-full lg:overflow-y-auto p-8 md:p-12 lg:p-16 bg-black flex-1 z-10 skill-page-scroller"
      >
        <div className="max-w-[980px] w-full flex flex-col gap-16">
          {/* Tech & Languages Section */}
          <section id="languages">
            <TechSection />
          </section>

          {/* Experience & Education Section */}
          <section id="timeline">
            <TimelineSection />
          </section>



          {/* Let's Work Together Footer */}
          <section id="contact-me">
            <FooterSection />
          </section>
        </div>
      </div>
    </div>
  );
}
