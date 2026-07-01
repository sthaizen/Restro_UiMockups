import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    name: 'Mitsuo Shimofuji',
    role: 'Co-founder, President and CEO, Board of Directors of ZettaJoule',
    image: 'https://cdn.prod.website-files.com/695e44c5cda75248659e9817/6960e0cf1750ad1c151bdaae_Finis%20Southworth.webp', // Professional man in suit
  },
  {
    name: 'Jeffrey Harper',
    role: 'Co-founder, Chief Commercial Officer of ZettaJoule and President of ZROC',
    image: 'https://cdn.prod.website-files.com/695e44c5cda75248659e9817/6960e09d32fbceffd604fd3a_Rumina%20Velshi.webp', // Professional man in suit
  },
  {
    name: 'Rumina Velshi',
    role: 'Co-founder, Principal and Strategic Advisor to the CEO of ZettaJoule',
    image: 'https://cdn.prod.website-files.com/695e44c5cda75248659e9817/6960e065510a022897a20a30_Jeffrey%20Harper.webp', // Professional woman
  },
  {
    name: 'Kazuhiko Kunitomi, Ph.D.',
    role: 'Co-founder and Chief Nuclear Officer, ZettaJoule KK',
    image: 'https://cdn.prod.website-files.com/695e44c5cda75248659e9817/696f67bb0f912993aa049f98_Mitsuo%20Shimofuji.webp', // Professional man
  },
  {
    name: 'Finis Southworth, Ph.D.',
    role: 'Chief Technology Officer of ZettaJoule',
    image: 'https://cdn.prod.website-files.com/695e44c5cda75248659e9817/6960e1364b311125c171b7ba_Andrea%20Veil.webp', // Professional older man
  },
  {
    name: 'Andrea Vail',
    role: 'Senior Vice President-Regulatory Strategy of ZettaJoule',
    image: 'https://cdn.prod.website-files.com/695e44c5cda75248659e9817/6960e10589de1252039426cf_Kazuhiko%20Kunitomi.webp', // Professional woman
  },
];

const TEAM_DOT_SETTINGS = {
  containerTop: '120px',
  containerLeft: '0px',
  containerHeight: '60px',
  containerWidth: '100%',
  dotColor: '#3D5E86',
  baseDotSize: 2.7,
  opacity: 0.35,
  patternWidth: 800,
  patternHeight: 60,
  scrollDuration: 15, // seconds for one full loop
};

const CARD_DOT_CONFIG = [
  { x: 20, y: 10, r: 0.5 }, { x: 35, y: 10 }, { x: 80, y: 10, r: 2 }, { x: 180, y: 10 }, { x: 195, y: 10 }, { x: 210, y: 10, r: 0.5 },
  { x: 320, y: 10 }, { x: 335, y: 10 }, { x: 410, y: 10, r: 2 }, { x: 490, y: 10 }, { x: 505, y: 10 }, { x: 600, y: 10, r: 0.5 },
  { x: 615, y: 10 }, { x: 630, y: 10 }, { x: 740, y: 10, r: 2 },
  { x: 50, y: 30 }, { x: 130, y: 30, r: 2 }, { x: 145, y: 30 }, { x: 250, y: 30, r: 0.5 }, { x: 265, y: 30 }, { x: 370, y: 30 },
  { x: 450, y: 30, r: 2 }, { x: 465, y: 30 }, { x: 550, y: 30 }, { x: 565, y: 30, r: 0.5 }, { x: 680, y: 30 }, { x: 770, y: 30, r: 2 }, { x: 785, y: 30 },
  { x: 10, y: 50, r: 2 }, { x: 95, y: 50 }, { x: 110, y: 50, r: 0.5 }, { x: 125, y: 50 }, { x: 220, y: 50, r: 2 }, { x: 300, y: 50 },
  { x: 390, y: 50, r: 0.5 }, { x: 405, y: 50 }, { x: 520, y: 50 }, { x: 535, y: 50, r: 2 }, { x: 550, y: 50 }, { x: 640, y: 50, r: 0.5 },
  { x: 720, y: 50 }, { x: 735, y: 50 },
];

const CardDotPattern = () => (
  <svg width={TEAM_DOT_SETTINGS.patternWidth} height={TEAM_DOT_SETTINGS.patternHeight} xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <style>{`
      @keyframes cardDotPhaseAnim {
        0%, 100% { transform: translateX(0px) translateY(0px); opacity: 1; }
        33% { transform: translateX(2px) translateY(-1px); opacity: 0.4; }
        66% { transform: translateX(-1px) translateY(1px); opacity: 0.8; }
      }
    `}</style>
    {CARD_DOT_CONFIG.map((dot, index) => {
      const phaseDelay = -(dot.x * 0.07 + dot.y * 0.13);
      const phaseDuration = 3 + (dot.x % 4);

      return (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={dot.r || TEAM_DOT_SETTINGS.baseDotSize}
          fill={TEAM_DOT_SETTINGS.dotColor}
          style={{
            animation: `cardDotPhaseAnim ${phaseDuration}s ease-in-out infinite`,
            animationDelay: `${phaseDelay}s`,
          }}
        />
      );
    })}
  </svg>
);

export default function TeamSection() {
  const streamRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Scrubbed Reveal (Blur + Clip-path)
      if (headerRef.current) {
        const parts = gsap.utils.toArray('.gsap-header-part', headerRef.current);

        gsap.set(parts, {
          opacity: 0,
          y: 26,
          filter: "blur(0px)",
          clipPath: "inset(0 0 100% 0)",
          willChange: "transform, opacity, filter, clip-path",
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        });

        tl.to(parts, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          stagger: 0.2,
        });
      }

      gsap.from('.gsap-grid-item', {
        scrollTrigger: {
          trigger: '.gsap-grid-container',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
      });

      const scrollAnim = gsap.to(streamRef.current, {
        x: `-${TEAM_DOT_SETTINGS.patternWidth}px`,
        ease: "none",
        duration: TEAM_DOT_SETTINGS.scrollDuration,
        repeat: -1,
      });

      let targetTimeScale = 1;
      let currentTimeScale = 1;
      let isScrolling = false;
      let scrollTimeout;

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          if (velocity > 0) {
            isScrolling = true;
            const newTarget = 1 + velocity / 200;
            targetTimeScale = Math.min(newTarget, 20);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              isScrolling = false;
              targetTimeScale = 1;
            }, 50);
          }
        }
      });

      const updateTimeScale = () => {
        const lerpFactor = isScrolling ? 0.15 : 0.02;
        currentTimeScale += (targetTimeScale - currentTimeScale) * lerpFactor;
        if (scrollAnim) {
          scrollAnim.timeScale(currentTimeScale);
        }
      };

      gsap.ticker.add(updateTimeScale);

      return () => {
        gsap.ticker.remove(updateTimeScale);
        scrollAnim.kill();
        trigger.kill();
        clearTimeout(scrollTimeout);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-[#f1f5f8] px-6 md:px-12 lg:px-[60px] py-24 font-sans flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        {/* Header Area */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start gap-12 mb-[100px]">
          <div className="w-full md:w-1/4 pt-2 gsap-header-part">
            <h3 className="text-[#3D5E86] text-[14px] font-['Inter',_sans-serif] leading-[1.2]">
              Meet the International Team<br />
              Behind Our Technology
            </h3>
          </div>
          <div className="w-full md:w-[65%] flex flex-col">
            <p className="gsap-header-part text-[#3D5E86] text-[32px] font-['Geist',_sans-serif] font-light leading-[1.2] tracking-[-0.01em]">
              ZettaJoule brings together world-class experts in
            </p>
            <p className="gsap-header-part text-[#3D5E86] text-[32px] font-['Geist',_sans-serif] font-light leading-[1.2] tracking-[-0.01em]">
              nuclear engineering, large-scale project management,
            </p>
            <p className="gsap-header-part text-[#3D5E86] text-[32px] font-['Geist',_sans-serif] font-light leading-[1.2] tracking-[-0.01em]">
              and finance to provide clean energy solutions
            </p>
            <p className="gsap-header-part text-[#3D5E86] text-[32px] font-['Geist',_sans-serif] font-light leading-[1.2] tracking-[-0.01em]">
              for a wide range of industrial and technical operations.
            </p>
          </div>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 items-stretch gsap-grid-container">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="flex flex-col w-full h-full group cursor-pointer gsap-grid-item">
              <div className="w-full aspect-[332/464] overflow-hidden mb-[18px] bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className="text-[#1B1B1B] text-[14px] font-medium font-inter mb-1 leading-tight">
                  {member.name}
                </h4>
                <p className="text-[#524F4B] text-[14px] font-normal font-inter leading-[1.4]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}

          {/* Action Card (7th item, spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col w-full group cursor-pointer gsap-grid-item">
            <div className="w-full aspect-[680/464] bg-[#D3E7FF] p-8 flex flex-col justify-between hover:bg-[#c6dffb] transition-colors relative overflow-hidden">

              {/* Background Dots */}
              <div className="absolute pointer-events-none overflow-hidden"
                style={{
                  top: TEAM_DOT_SETTINGS.containerTop,
                  left: TEAM_DOT_SETTINGS.containerLeft,
                  width: TEAM_DOT_SETTINGS.containerWidth,
                  height: TEAM_DOT_SETTINGS.containerHeight,
                  opacity: TEAM_DOT_SETTINGS.opacity,
                  maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}>
                <style>{`
                  .team-animated-data-stream {
                    display: flex;
                    width: max-content;
                    height: 100%;
                  }
                `}</style>
                <div ref={streamRef} className="team-animated-data-stream">
                  <CardDotPattern />
                  <CardDotPattern />
                  <CardDotPattern />
                  <CardDotPattern />
                </div>
              </div>

              {/* Top icon */}
              <div className="text-[#3D5E86] mb-4">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="circleClipTeam">
                    <circle cx="20" cy="20" r="20" />
                  </clipPath>
                  <g clipPath="url(#circleClipTeam)">
                    <rect x="0" y="4" width="40" height="4" fill="currentColor" />
                    <rect x="0" y="12" width="40" height="4" fill="currentColor" />
                    <rect x="0" y="20" width="40" height="4" fill="currentColor" />
                    <rect x="0" y="28" width="40" height="4" fill="currentColor" />
                    <rect x="0" y="36" width="40" height="4" fill="currentColor" />
                  </g>
                </svg>
              </div>

              <div className="mt-auto w-full">
                <h3 className="text-[#3D5E86] text-[45px] font-light leading-tight mb-12 max-w-[480px]">
                  Learn more about the<br />
                  people behind ZettaJoule
                </h3>

                <div className="relative w-full pt-5">
                  {/* Base faint line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#3D5E86]/20"></div>

                  <div className="peer cursor-pointer flex items-center gap-3 text-[#3D5E86] text-[15px] font-medium transition-transform duration-300 hover:translate-x-2 w-fit">
                    <div className="flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <span>Meet the Full Team</span>
                  </div>

                  {/* Animated hover line */}
                  <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#3D5E86] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] peer-hover:scale-x-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
