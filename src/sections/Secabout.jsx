import React, { useLayoutEffect, useRef } from "react";
import { ArrowRight, Instagram, Linkedin, Music4, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function AboutSection({
  photoSrc = "/avatar.jpg", // put an image at /public/avatar.jpg
  name = "Jae",
  realName = "家乐",
  pronunciation = "'jah luh'",
  headlineAfterName = "Now I'm tryna learn the business of design.",
}) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      tl.from("[data-fade]", { y: 24, opacity: 0, stagger: 0.06, clearProps: "all" });

      // Sub-blocks slide up on scroll
      gsap.utils.toArray("[data-st] ").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Image subtle parallax + scale
      const img = document.querySelector("[data-photo]");
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
              scrub: 0.5,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Top spacing */}
        <div className="h-8 sm:h-12" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(260px,420px)_1fr] lg:gap-16 xl:gap-24 items-start">
          {/* Left: Portrait */}
          <div className="w-full" data-fade>
            <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl bg-zinc-100 shadow-sm">
              <img
                src={photoSrc}
                alt="portrait"
                className="h-full w-full object-cover"
                data-photo
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="w-full">
            <div className="mb-5 text-[11px] tracking-widest text-zinc-600" data-fade>
              [ABOUT]
            </div>

            {/* Headline */}
            <h1
              className="leading-[1.05] text-zinc-900 font-medium tracking-[-0.02em] text-[10vw] sm:text-[8vw] lg:text-[64px] xl:text-[72px] 2xl:text-[84px]"
              data-fade
            >
              Hi, I'm {name}. Actually, my real name is
            </h1>

            <h2
              className="mt-1 leading-[1.05] text-zinc-900 font-medium tracking-[-0.02em] text-[10vw] sm:text-[8vw] lg:text-[64px] xl:text-[72px] 2xl:text-[84px]"
              data-fade
            >
              {realName} (<span className="italic">{pronunciation}</span>'). {headlineAfterName}
            </h2>

            {/* Small columns */}
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2" data-st>
              <div>
                <div className="mb-3 text-[12px] font-semibold tracking-widest text-zinc-800">
                  MY LIFE
                </div>
                <p className="text-[15px] leading-7 text-zinc-700">
                  I'm born in 2003. I live in Singapore. I'm a guy. I'm Chinese. I love ice cream. I hate mint. I'm dyslexic. I have scoliosis. I don't read. I'm cool.
                </p>
              </div>
              <div>
                <div className="mb-3 text-[12px] font-semibold tracking-widest text-zinc-800">
                  BUSINESS
                </div>
                <p className="text-[15px] leading-7 text-zinc-700">
                  I briefly read The Millionaire Fastlane when I was 19, and it made me hard. Then, I found design. The goal is to afford my girlfriend (and retire the people I love).
                </p>
              </div>
            </div>

            {/* Social row */}
            <div className="mt-10 flex flex-wrap items-center gap-4" data-st>
              <IconButton label="Instagram" Icon={Instagram} />
              <IconButton label="TikTok" Icon={Music4} />
              <IconButton label="LinkedIn" Icon={Linkedin} />
              <IconButton label="X" Icon={X} />
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-start md:justify-end" data-st>
              <a
                href="#call"
                className="group inline-flex items-center gap-6 rounded-xl border border-zinc-900 px-7 py-4 text-[15px] font-medium text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                <span>Schedule a call</span>
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-current transition group-hover:bg-white/10">
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-14 sm:h-20" />
      </div>
    </section>
  );
}

function IconButton({ Icon, label }) {
  return (
    <button
      aria-label={label}
      className="inline-grid h-12 w-12 place-items-center rounded-full border border-zinc-300 text-zinc-700 transition hover:scale-105 hover:border-zinc-900 hover:text-zinc-900"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
