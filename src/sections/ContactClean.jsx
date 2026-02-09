// src/sections/ContactPro.jsx
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CTAButton = ({ href = "#contact" }) => (
  <div data-anim="cta-wrap">
    <a
      href={href}
      className="group inline-flex items-stretch rounded-none shadow-sm focus:outline-none focus:ring-2 gap-0 focus:ring-black/20"
      data-anim="cta"
      aria-label="Schedule a call"
    >
      <span className="relative bg-black px-6 py-4 text-[14px] font-medium text-white transition-colors duration-300 group-hover:bg-[#333] overflow-hidden">
        <span className="absolute inset-0 -translate-x-full bg-[#333] transition-transform duration-300 group-hover:translate-x-0" />
        <span className="relative z-10">Schedule a call</span>
      </span>
      <span
        className="bg-black px-4 py-4 text-white border-l border-white/20 transition-all duration-300 group-hover:bg-[#333] group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  </div>
);

CTAButton.propTypes = {
  href: PropTypes.string,
};

const ContactPro = ({
  emailHref = "mailto:hello@example.com",
  whatsappHref = "https://wa.me/0000000000",
  instagramHref = "#",
  tiktokHref = "#",
  linkedinHref = "#",
  twitterHref = "#",
  ctaHref = "#contact",
  wordmark = "JAE YI",
  year = new Date().getFullYear(),
}) => {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const wordRef = useRef(null);
  const copyrightRef = useRef(null);
  const parallaxTriggerRef = useRef(null);

  // Safe reduced-motion checker (also reacts to OS changes)
  const mqlRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null
  );
  const prefersReduced = () => !!mqlRef.current?.matches;

  // Entrance timeline
  const { context: entranceCtx } = useGSAP(
    () => {
      if (!rootRef.current) return;

      if (prefersReduced()) {
        gsap.set(
          [
            labelRef.current,
            linksRef.current?.querySelectorAll("[data-anim='link']"),
            ctaRef.current,
            wordRef.current,
            copyrightRef.current,
            
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "transform,opacity" }
        );
        return;
      }

      // Initial states
      gsap.set(labelRef.current, { opacity: 0, y: 30 });
      gsap.set(linksRef.current?.querySelectorAll("[data-anim='link']"), {
        opacity: 0,
        y: 30,
      });
      gsap.set(ctaRef.current, { opacity: 0, x: 40 });
      gsap.set(wordRef.current, { opacity: 0, scale: 0.8, y: 50 });
      gsap.set(copyrightRef.current, { opacity: 0, y: 20 });

      // Timeline with ScrollTrigger
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(wordRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
        .to(
          linksRef.current?.querySelectorAll("[data-anim='link']"),
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.6"
        )
        .to(ctaRef.current, { opacity: 1, x: 0, duration: 0.8 }, "-=0.4")
        .to(
          copyrightRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        );
    },
    { scope: rootRef, dependencies: [] }
  );

  // Parallax on the wordmark
  const { context: parallaxCtx } = useGSAP(
    () => {
      if (prefersReduced() || !rootRef.current || !wordRef.current) return;

      parallaxTriggerRef.current = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(wordRef.current, { yPercent: self.progress * 15 });
        },
      });
    },
    { scope: rootRef, dependencies: [] }
  );

  // Respond to reduced-motion setting changes live
  useEffect(() => {
    const mql = mqlRef.current;
    if (!mql) return;
    const handler = () => {
      // Re-run contexts when user toggles reduced motion
      entranceCtx?.revert();
      parallaxCtx?.revert();
      // The useGSAP hooks will re-run automatically on next paint due to revert cleanup.
      // Force a micro-tick so React/GSAP can re-init:
      requestAnimationFrame(() => {});
    };
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [entranceCtx, parallaxCtx]);

  // Cleanup on unmount (kill specific parallax trigger; timelines are reverted by contexts)
  useEffect(() => {
    return () => {
      parallaxTriggerRef.current?.kill();
      parallaxTriggerRef.current = null;
    };
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative w-full min-h-screen text-black overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* CTA pinned to viewport top-right */}
      <div
        ref={ctaRef}
        className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10"
      >
        <CTAButton href={ctaHref} />
      </div>

      {/* Content padding */}
      <div className="pt-8 md:pt-12 lg:pt-16 px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24">
        {/* CONTACT label */}
        <div
          id="contact-heading"
          ref={labelRef}
          className="uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
        >
          [CONTACT]
        </div>

        {/* Links block — two skinny columns with a giant horizontal gap */}
        <div
          ref={linksRef}
          className="mt-10 md:mt-14 grid grid-cols-2 gap-y-6 gap-x-[28vw] text-[14px] font-medium leading-tight"
        >
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <a
              href={emailHref}
              data-anim="link"
              className="inline-block uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
              aria-label="Send an email"
            >
              EMAIL
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              data-anim="link"
              className="inline-block uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
              aria-label="Open WhatsApp"
            >
              WHATSAPP
            </a>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <a
              href={instagramHref}
              target="_blank"
              rel="noreferrer noopener"
              data-anim="link"
              className="inline-block uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
              aria-label="Open Instagram"
            >
              INSTAGRAM
            </a>
            <a
              href={tiktokHref}
              target="_blank"
              rel="noreferrer noopener"
              data-anim="link"
              className="inline-block uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
              aria-label="Open TikTok"
            >
              TIKTOK
            </a>
            <a
              href={linkedinHref}
              target="_blank"
              rel="noreferrer noopener"
              data-anim="link"
              className="inline-block uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
              aria-label="Open LinkedIn"
            >
              LINKEDIN
            </a>
            <a
              href={twitterHref}
              target="_blank"
              rel="noreferrer noopener"
              data-anim="link"
              className="inline-block uppercase hover:opacity-60 transition-opacity duration-300 will-change-transform"
              aria-label="Open X (formerly Twitter)"
            >
              X (TWITTER)
            </a>
          </div>
        </div>
      </div>

      {/* © bottom-left */}
      <div
        ref={copyrightRef}
        className="absolute left-8 md:left-10 lg:left-12 bottom-8 md:bottom-10 lg:bottom-12 text-[12px] font-medium"
        aria-label={`Copyright ${year}`}
      >
        ©{year}
      </div>

      {/* Giant wordmark bottom-right */}
      <div
        ref={wordRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-0.05em] bottom-[-0.15em] leading-[0.85] font-black uppercase tracking-[-0.02em] will-change-transform"
        style={{ fontSize: "clamp(100px, 18vw, 380px)", letterSpacing: "-0.02em" }}
      >
        {wordmark}
      </div>
    </section>
  );
};

ContactPro.propTypes = {
  emailHref: PropTypes.string,
  whatsappHref: PropTypes.string,
  instagramHref: PropTypes.string,
  tiktokHref: PropTypes.string,
  linkedinHref: PropTypes.string,
  twitterHref: PropTypes.string,
  ctaHref: PropTypes.string,
  wordmark: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ContactPro;
