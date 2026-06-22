import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, CornerDownRight } from 'lucide-react';

const CONFIG = {
  // ----- Collapsed Bar -----
  bar: {
    width: 300,               // px — width of the collapsed bar
    height: 55,               // px — height of the collapsed bar
    bgColor: '#0c0c0e',       // background color
    bgColorHover: '#222',     // hover background color
    opacity: 0.8,               // 0–1  — bar opacity
    blur: 14,                  // px — backdrop blur (0 = off)
    bottomOffset: 24,
  },

  // ----- Expanded Card -----
  card: {
    width: 440,               // px — width of the expanded menu card
    height: 560,              // px — height of the expanded menu card
    bgColor: '#0c0c0e',       // background color
    opacity: 0.8,              // 0–1  — card opacity (lowered for transparency)
    blur: 14,                 // px — backdrop blur (glassmorphism effect)
    gapAboveBar: 24,          // px — space between card bottom and bar top
  },

  // ----- X Close Button (bar morphs into this) -----
  xButton: {
    size: 56,                 // px — width & height of the X square
    iconSize: 20,             // px — size of the X icon SVG
    iconStroke: 1.5,          // stroke width of X icon
  },

  // ----- Animation -----
  animation: {
    ease: [0.25, 1, 0.5, 1],          // cubic-bezier easing curve
    morphDuration: 0.45,               // seconds — bar↔X morph + card expand
    contentSlideDuration: 0.4,         // seconds — inner content slide animation
    contentSlideDelay: 0.08,           // seconds — delay before content starts sliding
    contentSlideDistance: -40,         // px — how far content slides from (negative = from above)
    contentFadeOutDuration: 0.2,       // seconds — collapsed content fade out speed
    xRotateIn: -90,                    // degrees — X icon entrance rotation
    xRotateOut: 90,                    // degrees — X icon exit rotation
    xDelay: 0.15,                      // seconds — X icon appearance delay
    xDuration: 0.3,                    // seconds — X icon animation duration
  },

  // ----- Shadow -----
  shadow: '0 8px 40px rgba(0,0,0,0.5)',  // box-shadow for both bar and card
};
// ============================================================

const ease = CONFIG.animation.ease;

const hexToRgba = (hex, alpha) => {
  // Ensure we have a valid 6 character hex
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Computed: card bottom = bar bottomOffset + bar height + gap
  const cardBottom = CONFIG.bar.bottomOffset + CONFIG.bar.height + CONFIG.card.gapAboveBar;

  return (
    <>
      {/* ======= EXPANDED CARD — appears above the bar ======= */}
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
            {/* Inner content — slides down from above */}
            <motion.div
              initial={{ opacity: 0, y: CONFIG.animation.contentSlideDistance }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: CONFIG.animation.contentSlideDistance }}
              transition={{ duration: CONFIG.animation.contentSlideDuration, delay: CONFIG.animation.contentSlideDelay, ease }}
              className="h-full flex flex-col px-10 pt-10 p-20 text-white"
            >
              {/* Nav Links */}
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.2em] text-[#6b6b6b] mb-5  ml-4 font-semibold">MENU</p>
                <ul className="text-[2.0rem] leading-tight space-y-2 font-light ml-4">
                  <li className="cursor-pointer hover:text-[#6b6b6b] transition-colors duration-200">About</li>
                  <li className="cursor-pointer hover:text-[#6b6b6b] transition-colors duration-200">Collection</li>
                  <li className="cursor-pointer hover:text-[#6b6b6b] transition-colors duration-200">Projects</li>
                  <li className="cursor-pointer hover:text-[#6b6b6b] transition-colors duration-200">Approach</li>
                  <li className="cursor-pointer hover:text-[#6b6b6b] transition-colors duration-200">Contact</li>
                </ul>
              </div>

              {/* Footer Info */}
              <div className="mt-auto ">
                <div className="flex justify-between text-[18px] text-[#6b6b6b] mt-5 ml-4 mr-7">
                  <div className="space-y-1">
                    <p className="cursor-pointer hover:text-white transition-colors duration-200">News</p>
                    <p className="cursor-pointer hover:text-white transition-colors duration-200">Showroom</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p>020 8156 7290</p>
                    <p className="cursor-pointer hover:text-white transition-colors duration-200">sales@fluid.glass</p>
                  </div>
                </div>

                <button className="mx-auto w-[80%] mt-20 bg-[#101012] hover:bg-white hover:text-black transition-all duration-300 py-4 text-[11px] font-semibold tracking-[0.15em] flex justify-center items-center gap-3 ">
                  <CornerDownRight size={15} strokeWidth={1.5} />
                  GET A QUOTE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======= BAR / X BUTTON — morphs between the two states ======= */}
      <motion.div
        initial={false}
        animate={{
          width: isOpen ? CONFIG.xButton.size : CONFIG.bar.width,
          height: isOpen ? CONFIG.xButton.size : CONFIG.bar.height,
          backgroundColor: hexToRgba(CONFIG.bar.bgColor, CONFIG.bar.opacity)
        }}
        whileHover={{ backgroundColor: hexToRgba(CONFIG.bar.bgColorHover, CONFIG.bar.opacity) }}
        transition={{ duration: CONFIG.animation.morphDuration, ease }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-1/2 -translate-x-1/2 z-50 overflow-hidden cursor-pointer"
        style={{
          bottom: CONFIG.bar.bottomOffset,
          backdropFilter: CONFIG.bar.blur > 0 ? `blur(${CONFIG.bar.blur}px)` : 'none',
          boxShadow: CONFIG.shadow,
        }}
      >
        {/* Collapsed bar content (logo, HOME, hamburger) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: CONFIG.animation.contentFadeOutDuration }}
              className="absolute inset-0 flex items-center justify-between px-6"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Box size={26} strokeWidth={1.5} className="text-white" />
              </div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white select-none">HOME</span>
              <div className="w-7 flex flex-col justify-center items-end gap-[5px]">
                <div className="w-full h-[1.5px] bg-white" />
                <div className="w-full h-[1.5px] bg-white" />
                <div className="w-full h-[1.5px] bg-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* X icon when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, rotate: CONFIG.animation.xRotateIn }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: CONFIG.animation.xRotateOut }}
              transition={{ duration: CONFIG.animation.xDuration, delay: CONFIG.animation.xDelay, ease }}
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
