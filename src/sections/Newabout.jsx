import React, { useLayoutEffect, useRef } from "react";
import { Instagram, Linkedin, Github, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection({
  photoSrc = "/assets/a.png",
  name = "Stay",
  realName = "Yathartha",
  pronunciation = "Shrestha",
  headlineAfterName = "Now I'm tryna learn the Full Stack Development.",
  href = "#call",
}) {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro: fade + slight rise for headline pieces
      gsap.from("[data-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        clearProps: "all",
      });

      // Scroll-in for content blocks
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

      // Subtle parallax/scale on portrait image
      const img = root.current?.querySelector("[data-photo]");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.06 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // Icon pop-in stagger (runs for both rows)
      const icons = gsap.utils.toArray("[data-icon]");
      if (icons.length) {
        gsap.from(icons, {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // CTA nudge in
      const cta = root.current?.querySelector("[data-cta]");
      if (cta) {
        gsap.from(cta, {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full bg-[#fafafa]">
      <div className="mx-auto max-w-[1580px] px-5 sm:px-6 lg:px-8 pt-40">
        {/* Top spacing */}
        <div className="h-8 sm:h-12" />

        <div className="grid items-start grid-cols-1 gap-10 lg:grid-cols-[minmax(380px,380px)_1fr] lg:gap-16 xl:gap-34">
          {/* Image (mobile: bottom, desktop: left) */}
          <div className="w-full order-2 lg:order-1" data-fade>
            <div className="aspect-[9/14] w-full overflow-hidden rounded-[28px] bg-zinc-100 shadow-sm will-change-transform">
              <img
                src={photoSrc}
                alt="Portrait"
                className="h-full w-full object-cover"
                loading="lazy"
                data-photo
              />
            </div>
          </div>

          {/* Text block (mobile: top, desktop: right) */}
          <div className="w-full order-1 lg:order-2">
            {/* Tag */}
            <div
              className="mb-4 text-[14px] tracking-widest text-black font-semibold"
              data-fade
            >
              [ABOUT]
            </div>

            {/* Headline */}
            <h1
              className="text-zinc-900 font-medium tracking-[-0.02em] leading-[1.06] text-[8vw] sm:text-[6vw] lg:text-[64px] xl:text-[46px] text-right"
              data-fade
            >
              {/* Small screens */}
              <span className="block lg:hidden">
                {`Hi, I'm ${name}. Actually, My real name happens to be `}
              </span>

              {/* Large screens */}
              <span className="hidden lg:block">
                {`Hi, I'm ${name}. Actually, my real name is `}
              </span>
            </h1>

            <h2
              className="mt-1 text-zinc-900 font-medium tracking-[-0.02em] leading-[1.06] text-[8vw] sm:text-[8vw] lg:text-[64px] xl:text-[46px]"
              data-st
            >
              {realName} <span className="italic">({pronunciation})</span>.{" "}
              {headlineAfterName}
            </h2>

            {/* Body columns */}
            <div
              className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:ml-60"
              data-st
            >
              {/* Column: MY LIFE */}
              <div>
                <div className="mb-3 text-[16px] font-bold text-black">
                  MY LIFE
                </div>
                <p className="text-[16px] leading-5 text-zinc-700 max-w-prose">
                  I'm born in 2005. I live in Nepal. I'm a guy. I'm Asian. I
                  love ice cream. I hate mint. I'm dyslexic. I don't read. I'm
                  cool.
                </p>

                {/* Mobile-only Social Row (below MY LIFE) */}
                <div className="mt-6 flex flex-wrap items-center gap-4 md:hidden">
                  <IconButton
                    label="Instagram"
                    Icon={Instagram}
                    href="https://www.instagram.com/rc_2555/"
                  />
                  <IconButton
                    label="Github"
                    Icon={Github}
                    href="https://github.com/sthaizen"
                  />
                  <IconButton
                    label="LinkedIn"
                    Icon={Linkedin}
                    href="https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/"
                  />
                  <IconButton
                    label="X"
                    Icon={X}
                    href="https://x.com/sthaaizen"
                  />
                </div>
              </div>

              {/* Column: BUSINESS */}
              <div>
                <div className="mb-3 text-[16px] font-bold text-zinc-800">
                  BUSINESS
                </div>
                <p className="text-[16px] leading-5 text-zinc-700 max-w-prose text-left">
                  I briefly read The Millionaire Fastlane when I was 18, and it
                  made me hard. Then, I found design. The goal is to afford
                  freedom (and retire the people I love).
                </p>
              </div>
            </div>

            {/* Social Row (desktop/tablet only) */}
            <div
              className="mt-10 hidden md:flex flex-wrap items-center gap-4 lg:ml-58"
              data-st
            >
              <IconButton
                label="Instagram"
                Icon={Instagram}
                href="https://www.instagram.com/rc_2555/"
              />
              <IconButton
                label="Github"
                Icon={Github}
                href="https://github.com/sthaizen"
              />
              <IconButton
                label="LinkedIn"
                Icon={Linkedin}
                href="https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/"
              />
              <IconButton label="X" Icon={X} href="https://x.com/sthaaizen" />
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-start md:justify-end" data-cta data-st>
              <CtaButton href={href} />
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-14 sm:h-20" />
      </div>
    </section>
  );
}

function IconButton({ label, Icon, href = "#" }) {
  return (
    <a
      aria-label={label}
      title={label}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      data-icon
      className="inline-grid h-12 w-12 place-items-center rounded-full border border-zinc-300 transition-all duration-500 text-zinc-700 transform-gpu hover:scale-105 hover:border-zinc-900 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/0"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

function CtaButton({ href }) {
  return (
    <a
      href={href}
      className="group inline-flex items-stretch rounded-md shadow-sm focus:outline-none focus:ring-2 gap-0.5 focus:ring-black/20"
    >
      <span className="relative bg-black px-5 py-3 text-md font-medium text-white transition-colors duration-300 group-hover:bg-[#0d13d1] overflow-hidden">
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[#0d13d1] transition-transform duration-300 group-hover:translate-x-0" />
        <span className="relative z-10">Schedule a call</span>
      </span>
      <span className="bg-black w-[44px] flex items-center justify-center py-3 text-white border-l border-white/20 transition-transform duration-300 group-hover:bg-[#0d13d1]">
        <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
      </span>
    </a>
  );
}
