import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, CornerDownRight } from 'lucide-react';
import RollingText from './RollingText';

const CONFIG = {
  bar: {
    width: 280,
    height: 55,
    bgColor: '#0c0c0e',
    bgColorHover: '#222',
    opacity: 0.9,
    blur: 14,
    bottomOffset: 34,
  },
  card: {
    width: 470,
    height: 560,
    bgColor: '#0c0c0e',
    opacity: 0.85,
    blur: 14,
    gapAboveBar: 14,
  },
  xButton: {
    size: 56,
    iconSize: 20,
    iconStroke: 1.5,
  },
  animation: {
    ease: [0.25, 1, 0.5, 1],
    morphDuration: 0.45,
    contentSlideDuration: 0.4,
    contentSlideDelay: 0.08,
    contentSlideDistance: -40,
    contentFadeOutDuration: 0.2,
    xRotateIn: -90,
    xRotateOut: 90,
    xDelay: 0.15,
    xDuration: 0.3,
    scrollTriggerDistance: 10,
    // --- Entrance Animation Controls ---
    entranceDelay1: 250,
    entranceDelay2: 650,
    entranceDelay3: 1250,
    entranceDuration: 0.5,
  },
  shadow: '0 8px 40px rgba(0,0,0,0.5)',
};

const ease = CONFIG.animation.ease;

const hexToRgba = (hex, alpha) => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.04
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.4, ease: ease }
  },
  exit: {
    opacity: 0,
    y: 10,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.2, ease: ease }
  }
};



const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState(0);
  const initialLoadRef = useRef(true);

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

    const handleScroll = () => {
      if (window.scrollY > CONFIG.animation.scrollTriggerDistance) {
        triggerEntrance();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    if (window.scrollY > CONFIG.animation.scrollTriggerDistance) {
      triggerEntrance();
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardBottom = CONFIG.bar.bottomOffset + CONFIG.bar.height + CONFIG.card.gapAboveBar;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[3px]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: CONFIG.card.height }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: CONFIG.animation.morphDuration, ease }}
            className="fixed left-1/2 -translate-x-1/2 z-50 overflow-hidden"
            style={{
              bottom: cardBottom,
              width: CONFIG.card.width,
              backgroundColor: hexToRgba(CONFIG.card.bgColor, CONFIG.card.opacity),
              backdropFilter: CONFIG.card.blur > 0 ? `blur(${CONFIG.card.blur}px)` : 'none',
              boxShadow: CONFIG.shadow,
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full flex flex-col px-10 pt-10 p-20 text-white"
            >
              <div className="flex-1">
                <motion.p variants={itemVariants} className="text-[10px] tracking-[0.2em] text-[#6b6b6b] mb-5 ml-4 font-semibold">MENU</motion.p>
                <ul className="text-[2.0rem] leading-tight space-y-0 font-light ml-4">
                  <motion.li variants={itemVariants} className="group cursor-pointer hover:text-[#6b6b6b] transition-colors duration-500"><RollingText text="About" /></motion.li>
                  <motion.li variants={itemVariants} className="group cursor-pointer hover:text-[#6b6b6b] transition-colors duration-500"><RollingText text="Features" /></motion.li>
                  <motion.li variants={itemVariants} className="group cursor-pointer hover:text-[#6b6b6b] transition-colors duration-500"><RollingText text="Pricing" /></motion.li>
                  <motion.li variants={itemVariants} className="group cursor-pointer hover:text-[#6b6b6b] transition-colors duration-500"><RollingText text="Multi-Branch" /></motion.li>
                  <motion.li variants={itemVariants} className="group cursor-pointer hover:text-[#6b6b6b] transition-colors duration-500"><RollingText text="AI Assistant" /></motion.li>
                </ul>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between text-[18px] text-[#6b6b6b] mt-5 ml-4 mr-7">
                  <div className="space-y-1">
                    <motion.p variants={itemVariants} className="cursor-pointer hover:text-white transition-colors duration-200">Contact</motion.p>
                    <motion.p variants={itemVariants} className="cursor-pointer hover:text-white transition-colors duration-200">Showroom</motion.p>
                  </div>
                  <div className="space-y-1 text-right">
                    <motion.p variants={itemVariants}>020 8156 7290</motion.p>
                    <motion.p variants={itemVariants} className="cursor-pointer hover:text-white transition-colors duration-200">sales@polaris.co</motion.p>
                  </div>
                </div>

                <button className="group mx-auto w-[80%] mt-15 border-1 border-white/5 bg-[#101012] hover:bg-white hover:text-black transition-all duration-500 py-4 text-[11px] font-semibold tracking-[0.15em] flex justify-center items-center gap-3">
                  <CornerDownRight size={15} strokeWidth={1.5} />
                  <RollingText text="GET A QUOTE" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 120, width: CONFIG.xButton.size, height: CONFIG.xButton.size }}
        animate={{
          opacity: entrancePhase > 0 ? 1 : 0,
          y: entrancePhase > 0 ? 0 : 120,
          width: isOpen ? CONFIG.xButton.size : (entrancePhase >= 2 ? CONFIG.bar.width : CONFIG.xButton.size),
          height: isOpen ? CONFIG.xButton.size : CONFIG.bar.height,
          backgroundColor: hexToRgba(CONFIG.bar.bgColor, CONFIG.bar.opacity)
        }}
        whileHover={{ backgroundColor: hexToRgba(CONFIG.bar.bgColorHover, CONFIG.bar.opacity) }}
        transition={{
          duration: initialLoadRef.current ? CONFIG.animation.entranceDuration : CONFIG.animation.morphDuration,
          ease,
          opacity: { duration: CONFIG.animation.entranceDuration, ease: "easeOut" },
          y: { duration: CONFIG.animation.entranceDuration * 1.2, ease }
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-1/2 -translate-x-1/2 z-50 overflow-hidden cursor-pointer"
        style={{
          bottom: CONFIG.bar.bottomOffset,
          backdropFilter: CONFIG.bar.blur > 0 ? `blur(${CONFIG.bar.blur}px)` : 'none',
          boxShadow: CONFIG.shadow,
        }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-0 flex items-center"
            >
              <motion.div
                className="absolute flex items-center justify-center w-8 h-8"
                animate={{
                  left: entrancePhase >= 3 ? 24 : "50%",
                  x: entrancePhase >= 3 ? 0 : "-50%",
                }}
                transition={{
                  duration: initialLoadRef.current ? CONFIG.animation.entranceDuration : CONFIG.animation.morphDuration,
                  ease
                }}
              >
                <Box size={26} strokeWidth={1.5} className="text-white" />
              </motion.div>

              <motion.span
                initial={false}
                animate={{
                  opacity: entrancePhase >= 3 ? 1 : 0,
                  y: entrancePhase >= 3 ? 0 : 10
                }}
                transition={{
                  duration: CONFIG.animation.entranceDuration,
                  ease
                }}
                className="absolute left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-[0.2em] text-white select-none"
              >
                HOME
              </motion.span>

              <motion.div
                initial={false}
                animate={{
                  opacity: entrancePhase >= 3 ? 1 : 0,
                  y: entrancePhase >= 3 ? 0 : 10
                }}
                transition={{
                  duration: CONFIG.animation.entranceDuration,
                  ease
                }}
                className="absolute right-6 flex items-center justify-center text-white"
              >
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="1.5" fill="currentColor" />
                  <rect y="6.25" width="22" height="1.5" fill="currentColor" />
                  <rect y="12.5" width="22" height="1.5" fill="currentColor" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg width={CONFIG.xButton.iconSize} height={CONFIG.xButton.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={CONFIG.xButton.iconStroke} strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default BottomNav;
