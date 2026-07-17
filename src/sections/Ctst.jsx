import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FadeInUp = ({ children, className = "", delay = 0, y = 16 }) => {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0, y: y }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 120%", 
          once: true
        }
      }
    );
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
};

const StaggerChildren = ({
  children,
  className = "",
  itemOffset = 0.06,
  baseDelay = 0,
}) => {
  const items = React.Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <FadeInUp key={i} delay={baseDelay + i * itemOffset}>
          {child}
        </FadeInUp>
      ))}
    </div>
  );
};

const ParallaxWordmark = ({ text, sectionRef, dir }) => {
  const wordRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(wordRef.current,
      { scale: 0.9, opacity: 0, y: 40 },
      {
        scale: 1.1, opacity: 1, y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <div className="flex justify-center">
      <span
        ref={wordRef}
        aria-hidden="true"
        className="block leading-none tracking-tight text-black pt-40 pl-100 select-none
                   text-[18vw] md:text-[12vw] lg:text-[14vw] xl:text-[21vw] font-normal"
      >
        {text}
      </span>
    </div>
  );
};

const CornerCopyright = ({ sectionRef, year = 2025, className = "" }) => {
  const crRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(crRef.current,
      { opacity: 0, y: 8 },
      {
        opacity: 1, y: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <div
      ref={crRef}
      className={
        className ||
        "absolute left-[5vw] bottom-9 text-[14px] text-black select-none"
      }
    >
      ©{year}
    </div>
  );
};

const CTAButton = ({ href = "#contact" }) => (
  <a
    href={href}
    className="group inline-flex items-stretch rounded-md shadow-sm focus:outline-none focus:ring-2 gap-0.5 focus:ring-black/20"
  >
    <span className="relative bg-black px-5 py-3 text-md font-medium text-white transition-colors duration-300 group-hover:bg-[#0d13d1] overflow-hidden">
      <span className="absolute inset-0 -translate-x-full bg-[#0d13d1] transition-transform duration-300 group-hover:translate-x-0" />
      <span className="relative z-10">Schedule a call</span>
    </span>
    <span className="bg-black px-4 py-3 text-white border-l border-white/20 transition-all duration-300 group-hover:bg-[#0d13d1] group-hover:translate-x-1">
      →
    </span>
  </a>
);

const Contact = ({
  email = "mailto:you@example.com",
  whatsapp = "https://wa.me/15551234567",
  instagram = "https://www.instagram.com/rc_2555/",
  github = "https://github.com/sthaizen",
  linkedin = "https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/",
  twitter = "https://x.com/sthaaizen",
  ctaHref = "#contact",
}) => {
  const sectionRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
      gsap.fromTo(footerRef.current, 
        { opacity: 0, y: 24 }, 
        { 
          opacity: 1, y: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          }
        }
      );
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-20 lg:py-1 bg-[#fafafa] scroll-mt-24">
      <div className="mx-auto w-full px-[5vw] lg:px-[4vw] pt-1 md:pt-25">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10">
          <FadeInUp>
            <h2 className="text-[15px] tracking-widest font-normal text-black select-none">
              [CONTACT]
            </h2>
          </FadeInUp>
          <FadeInUp>
            <StaggerChildren className="grid grid-cols-2 gap-y-6 gap-x-20" itemOffset={0.08}>
              <div className="space-y-4">
                <a href={email} className="block text-sm font-medium hover:opacity-60">
                  EMAIL
                </a>
                <a href={whatsapp} className="block text-sm hover:opacity-60">
                  WHATSAPP
                </a>
              </div>
              <div className="space-y-4">
                <a href={instagram} className="block text-sm hover:opacity-60">
                  INSTAGRAM
                </a>
                <a href={github} className="block text-sm hover:opacity-60">
                  GITHUB
                </a>
                <a href={linkedin} className="block text-sm hover:opacity-60">
                  LINKEDIN
                </a>
                <a href={twitter} className="block text-sm hover:opacity-60">
                  X (TWITTER)
                </a>
              </div>
            </StaggerChildren>
          </FadeInUp>
          <FadeInUp className="flex md:justify-end">
            <CTAButton href={ctaHref} />
          </FadeInUp>
        </div>
      </div>

      <footer
        ref={footerRef}
        className="relative mt-20 w-full hidden lg:block"
      >
        <CornerCopyright sectionRef={sectionRef} year={2026} />
        <ParallaxWordmark text="STAY ZI" sectionRef={sectionRef} dir="down" />
      </footer>
    </section>
  );
};

export default Contact;
