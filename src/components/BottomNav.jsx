import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Box, CornerDownRight, ArrowUp } from 'lucide-react';
import RollingText from './RollingText';

const CONFIG = {
  bar: { width: 280, height: 55, bgColor: '#0c0c0e', bgColorHover: '#222', opacity: 0.9, blur: 14, bottomOffset: 34 },
  card: { width: 470, height: 560, bgColor: '#0c0c0e', opacity: 0.85, blur: 14, gapAboveBar: 14 },
  xButton: { size: 56, iconSize: 20, iconStroke: 1.5 },
  animation: {
    morphDuration: 0.75,
    scrollTriggerDistance: 10,
    bottomTriggerOffset: 30,
    entranceDelay1: 250,
    entranceDelay2: 650,
    entranceDelay3: 1250,
    entranceDuration: 0.5,
  },
  shadow: '0 8px 40px rgba(0,0,0,0.5)',
};

const hexToRgba = (hex, alpha) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const initialLoadRef = useRef(true);
  const isAtBottomRef = useRef(false);

  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonIconClosedRef = useRef(null);
  const buttonIconOpenedRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    const triggerEntrance = () => {
      if (initialLoadRef.current === true) {
        initialLoadRef.current = 'animating';
        setTimeout(() => setEntrancePhase(1), CONFIG.animation.entranceDelay1);
        setTimeout(() => setEntrancePhase(2), CONFIG.animation.entranceDelay2);
        setTimeout(() => {
          setEntrancePhase(3);
          setTimeout(() => { initialLoadRef.current = false; }, 600);
        }, CONFIG.animation.entranceDelay3);
      }
    };

    let entranceTriggered = window.scrollY > CONFIG.animation.scrollTriggerDistance;
    if (entranceTriggered) {
      triggerEntrance();
    }

    const handleScroll = () => {
      if (!entranceTriggered && window.scrollY > CONFIG.animation.scrollTriggerDistance) {
        triggerEntrance();
        entranceTriggered = true;
      }

      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - CONFIG.animation.bottomTriggerOffset;
      if (bottom !== isAtBottomRef.current) {
        isAtBottomRef.current = bottom;
        setIsAtBottom(bottom);
        if (bottom) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardBottom = CONFIG.bar.bottomOffset + CONFIG.bar.height + CONFIG.card.gapAboveBar;

  useGSAP(() => {
    if (isOpen && !isAtBottom) {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, display: 'block' });
    } else {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, display: 'none' });
    }

    if (isOpen) {
      gsap.to(cardRef.current, { height: CONFIG.card.height, opacity: 1, duration: CONFIG.animation.morphDuration, ease: "power3.out", display: 'block' });
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.4, stagger: 0.04, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(cardRef.current, { height: 0, opacity: 0, duration: CONFIG.animation.morphDuration, ease: "power3.out", display: 'none' });
    }
  }, [isOpen, isAtBottom]);

  useGSAP(() => {
    const isAnim = initialLoadRef.current;

    gsap.to(buttonRef.current, {
      opacity: entrancePhase > 0 ? 1 : 0,
      y: entrancePhase > 0 ? 0 : 120,
      width: isOpen ? CONFIG.xButton.size : (entrancePhase >= 2 ? CONFIG.bar.width : CONFIG.xButton.size),
      height: isOpen ? CONFIG.xButton.size : CONFIG.bar.height,
      duration: isAnim ? CONFIG.animation.entranceDuration : CONFIG.animation.morphDuration,
      ease: "power3.out"
    });

    if (!isOpen) {
      gsap.to(buttonIconOpenedRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(buttonIconClosedRef.current, { opacity: 1, y: 0, duration: 0.3, delay: 0.1 });

      const closedBox = buttonIconClosedRef.current.querySelector('.closed-box');
      const closedText = buttonIconClosedRef.current.querySelector('.closed-text');
      const closedLines = buttonIconClosedRef.current.querySelector('.closed-lines');

      if (closedBox) {
        gsap.to(closedBox, {
          left: entrancePhase >= 3 ? 24 : "50%",
          xPercent: entrancePhase >= 3 ? 0 : -50,
          duration: isAnim ? CONFIG.animation.entranceDuration : CONFIG.animation.morphDuration,
          ease: "power3.out"
        });
      }
      if (closedText) {
        gsap.to(closedText, {
          opacity: entrancePhase >= 3 ? 1 : 0,
          y: entrancePhase >= 3 ? 0 : 10,
          duration: CONFIG.animation.entranceDuration,
          ease: "power3.out"
        });
      }
      if (closedLines) {
        gsap.to(closedLines, {
          opacity: entrancePhase >= 3 ? 1 : 0,
          y: entrancePhase >= 3 ? 0 : 10,
          duration: CONFIG.animation.entranceDuration,
          ease: "power3.out"
        });
      }
    } else {
      gsap.to(buttonIconClosedRef.current, { opacity: 0, y: -20, duration: 0.2 });
      gsap.to(buttonIconOpenedRef.current, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    }
  }, [entrancePhase, isOpen]);

  return (
    <div ref={containerRef}>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[3px]"
        style={{ opacity: 0, display: 'none' }}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={cardRef}
        className="fixed left-1/2 -translate-x-1/2 z-50 overflow-hidden"
        style={{
          bottom: cardBottom,
          width: CONFIG.card.width,
          height: 0,
          opacity: 0,
          display: 'none',
          backgroundColor: hexToRgba(CONFIG.card.bgColor, CONFIG.card.opacity),
          backdropFilter: CONFIG.card.blur > 0 ? `blur(${CONFIG.card.blur}px)` : 'none',
          boxShadow: CONFIG.shadow,
        }}
      >
        <div ref={contentRef} className="h-full flex flex-col px-10 pt-10 p-20 text-white">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.2em] text-[#6b6b6b] mb-5 ml-4 font-semibold">MENU</p>
            <ul className="text-[2.0rem] leading-tight space-y-0 font-light ml-4 group/list">
              <li className="group cursor-pointer text-white group-hover/list:text-[#6b6b6b] hover:!text-white transition-colors duration-500"><RollingText text="About" /></li>
              <li className="group cursor-pointer text-white group-hover/list:text-[#6b6b6b] hover:!text-white transition-colors duration-500"><RollingText text="Features" /></li>
              <li className="group cursor-pointer text-white group-hover/list:text-[#6b6b6b] hover:!text-white transition-colors duration-500"><RollingText text="Pricing" /></li>
              <li className="group cursor-pointer text-white group-hover/list:text-[#6b6b6b] hover:!text-white transition-colors duration-500"><RollingText text="Multi-Branch" /></li>
              <li className="group cursor-pointer text-white group-hover/list:text-[#6b6b6b] hover:!text-white transition-colors duration-500"><RollingText text="AI Assistant" /></li>
            </ul>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between text-[18px] text-[#6b6b6b] mt-5 ml-4 mr-7">
              <div className="space-y-1">
                <p className="cursor-pointer hover:text-white transition-colors duration-200">Contact</p>
                <p className="cursor-pointer hover:text-white transition-colors duration-200">Showroom</p>
              </div>
              <div className="space-y-1 text-right">
                <p>980-0000000</p>
                <p className="cursor-pointer hover:text-white transition-colors duration-200">sales@restrohub.com.np</p>
              </div>
            </div>

            <button className="group mx-auto w-[80%] mt-15 border-1 border-white/5 bg-[#101012] hover:bg-white hover:text-black transition-all duration-500 py-4 text-[11px] font-semibold tracking-[0.15em] flex justify-center items-center gap-3">
              <CornerDownRight size={15} strokeWidth={1.5} />
              <RollingText text="GET A QUOTE" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={buttonRef}
        onClick={() => {
          if (isAtBottom) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsOpen(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 overflow-hidden cursor-pointer"
        style={{
          opacity: 0,
          y: 120,
          width: CONFIG.xButton.size,
          height: CONFIG.xButton.size,
          bottom: CONFIG.bar.bottomOffset,
          backgroundColor: hexToRgba(CONFIG.bar.bgColor, CONFIG.bar.opacity),
          backdropFilter: CONFIG.bar.blur > 0 ? `blur(${CONFIG.bar.blur}px)` : 'none',
          boxShadow: CONFIG.shadow,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = hexToRgba(CONFIG.bar.bgColorHover, CONFIG.bar.opacity);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = hexToRgba(CONFIG.bar.bgColor, CONFIG.bar.opacity);
        }}
      >
        <div
          ref={buttonIconClosedRef}
          className="absolute inset-0 flex items-center"
        >
          <div
            className="closed-box absolute flex items-center justify-center w-8 h-8"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            <Box size={26} strokeWidth={1.5} className="text-white" />
          </div>

          <span
            className="closed-text absolute left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-[0.2em] text-white select-none"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            HOME
          </span>

          <div
            className="closed-lines absolute right-6 flex items-center justify-center text-white"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="1.5" fill="currentColor" />
              <rect y="6.25" width="22" height="1.5" fill="currentColor" />
              <rect y="12.5" width="22" height="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div
          ref={buttonIconOpenedRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0, transform: "scale(0.5)" }}
        >
          {isAtBottom ? (
            <ArrowUp size={CONFIG.xButton.iconSize} strokeWidth={CONFIG.xButton.iconStroke} className="text-white" />
          ) : (
            <svg width={CONFIG.xButton.iconSize} height={CONFIG.xButton.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={CONFIG.xButton.iconStroke} strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
