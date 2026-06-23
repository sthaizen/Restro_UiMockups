import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: 'cities', label: 'Cities & Infrastructure' },
  { id: 'materials', label: 'Materials & Manufacturing' },
  { id: 'fuels', label: 'Fuels & Upstream' },
  { id: 'hydrogen', label: 'H₂ Hydrogen' }
];

const floatingBarsData = {
  cities: [
    { label: 'District heating', tempRange: '100 °C - 250 °C', start: 100, end: 250, row: 0, textPos: 'right' },
    { label: 'Seawater Desalination', tempRange: '100 °C - 200 °C', start: 100, end: 200, row: 1, textPos: 'right' }
  ],
  materials: [
    { label: 'Pulp & Paper Production', tempRange: '150 °C - 400 °C', start: 150, end: 400, row: 1, textPos: 'right' },
    { label: 'Iron & Steel Production', tempRange: '1000 °C - ≥ 2200 °C', start: 1000, end: 1250, row: 0, fadeRight: true, textPos: 'left' },
    { label: 'Lime & Cement Manufacture', tempRange: '1200 °C - ≥ 2200 °C', start: 1200, end: 1280, row: 1, fadeRight: true, textPos: 'left' }
  ],
  fuels: [
    { label: 'Heavy Oil Recovery', tempRange: '300 °C - 500 °C', start: 300, end: 500, row: 0, textPos: 'right' }
  ],
  hydrogen: [
    { label: 'High-Temp Electrolysis', tempRange: '700 °C - 900 °C', start: 700, end: 900, row: 0, textPos: 'right' }
  ]
};

const mainBars = [
  { labelPrefix: 'ZettaJoule', labelSuffix: 'Reactor', text: 'Up to 950 °C', temp: 950, isMain: true },
  { labelPrefix: 'High-Temp Gas-Cooled', labelSuffix: 'Reactor', text: '750 °C', temp: 750, isMain: false },
  { labelPrefix: 'Molten Salt', labelSuffix: 'Reactor', text: '650 °C', temp: 650, isMain: false },
  { labelPrefix: 'Liquid Metal', labelSuffix: 'Reactor', text: '550 °C', temp: 550, isMain: false },
  { labelPrefix: 'Light Water', labelSuffix: 'Reactor', text: '300 °C', temp: 300, isMain: false },
];

const HeatCapabilities = ({
  className = '',
  containerClassName = '',
  mainBarGap = 10,
  floatingBarRowHeight = 50,
  chartHeight = 480,

  // Customization controls
  containerWidth = '85%',
  primaryColor = '#688ad0',
  secondaryBarBg = '#242424',
  floatingBoxBg = '#2a313f',
  floatingBoxBorder = '#688ad0',
  primaryTextSize = '16px',
  secondaryTextSize = '13px',
  titleColor = '#ffffff',
  subTitleColor = '#ffffff',
  mainBarTitleColor = '#ffffff',
  mainBarSubColor = '#ffffff',

  style,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState('cities');
  const maxTemp = 1200;
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.gsap-text-anim', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  const getLeft = (val) => `${(val / maxTemp) * 100}%`;
  const getWidth = (start, end) => `${((end - start) / maxTemp) * 100}%`;

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#1b1b1b] text-white py-20 font-sans overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      {/* Header */}
      <div 
        className={`mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-8 ${containerClassName}`}
        style={{ width: containerWidth }}
      >
        <h2 className="gsap-text-anim text-[48px] text-[#ffffff] font-light leading-tight">
          Unmatched <br /> Heat Capabilities
        </h2>
        <p className="gsap-text-anim text-[#ffffff] max-w-lg text-[18px] leading-relaxed">
          Our ZJ advanced SMR will be designed to operate at temperatures up to 950 °C, which is approximately 600 °C higher than conventional water-cooled reactors, while also providing reliable power.
        </p>
      </div>

      <div 
        className={`mx-auto ${containerClassName}`}
        style={{ width: containerWidth }}
      >
        {/* Tabs */}
        <div className="relative flex space-x-8 mb-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2a2a2a]"></div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 whitespace-nowrap transition-colors relative z-10 ${activeTab === tab.id ? 'text-white' : 'text-[#888888] hover:text-gray-300'
                }`}
              style={{ fontSize: primaryTextSize }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute left-0 right-0 bottom-0 h-[3px]"
                  style={{ backgroundColor: primaryColor }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="relative w-full pt-8 pb-12">
          {/* Grid Lines & X-Axis */}
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#333333]"></div>
            {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((temp) => (
              <div key={temp} className="relative h-full flex flex-col items-center" style={{ width: 0 }}>
                {/* Dashed vertical line */}
                <div className="absolute inset-y-0 w-px border-r border-dashed border-[#303030]"></div>
                {/* Small solid tick below axis */}
                <div className="absolute bottom-0 translate-y-full w-px h-[6px] bg-[#444444]"></div>
                <span className="absolute bottom-0 translate-y-[200%] mt-[6px] text-[11px] text-[#888888] whitespace-nowrap">
                  {temp} °C
                </span>
              </div>
            ))}
          </div>

          {/* Chart Content Container */}
          <div className="relative z-10 flex flex-col w-full" style={{ height: `${chartHeight}px` }}>
            {/* Floating Bars Area (Top half) */}
            <div className="relative h-[130px] w-full mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {floatingBarsData[activeTab]?.map((bar, idx) => (
                    <div key={idx} className="absolute inset-0">
                      {/* Dashed Box */}
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: getWidth(bar.start, bar.end), opacity: 1 }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                        className={`absolute h-[40px] border border-dashed backdrop-blur-sm
                          ${bar.fadeRight ? 'border-r-0 rounded-l-[4px]' : 'rounded-[4px]'}
                        `}
                        style={{
                          backgroundColor: floatingBoxBg,
                          borderColor: floatingBoxBorder,
                          left: getLeft(bar.start),
                          top: `${bar.row * floatingBarRowHeight + 10}px`,
                          maskImage: bar.fadeRight ? 'linear-gradient(to right, black 80%, transparent 100%)' : 'none',
                          WebkitMaskImage: bar.fadeRight ? 'linear-gradient(to right, black 80%, transparent 100%)' : 'none',
                        }}
                      />

                      {/* Text */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1, ease: "easeOut" }}
                        className={`absolute h-[40px] flex flex-col justify-center whitespace-nowrap`}
                        style={{
                          top: `${bar.row * floatingBarRowHeight + 10}px`,
                          left: bar.textPos === 'right' ? `calc(${getLeft(bar.end)} + 16px)` : undefined,
                          right: bar.textPos === 'left' ? `calc(100% - ${getLeft(bar.start)} + 16px)` : undefined,
                          alignItems: bar.textPos === 'left' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <span className="leading-snug font-medium" style={{ color: titleColor, fontSize: primaryTextSize }}>{bar.label}</span>
                        <span className="leading-snug" style={{ color: subTitleColor, fontSize: secondaryTextSize }}>{bar.tempRange}</span>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Main Bars Area (Bottom half) */}
            <div className="relative flex flex-col justify-end flex-grow pb-[1px]" style={{ gap: `${mainBarGap}px` }}>
              {mainBars.map((bar, idx) => (
                <div key={idx} className="relative h-[42px] flex items-center w-full group">
                  {bar.isMain ? (
                    // Highlighted Main Bar
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: getLeft(bar.temp) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute h-full flex items-center px-4 rounded-r-[2px] overflow-hidden whitespace-nowrap z-20"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                        className="flex items-center gap-[6px]"
                      >
                        <span style={{ color: titleColor, fontSize: primaryTextSize }}>
                          <span className="font-bold">{bar.labelPrefix}</span>
                          {bar.labelSuffix && <span className="font-normal ml-[3px]">{bar.labelSuffix}</span>}
                        </span>
                        <span className="ml-1" style={{ color: titleColor, opacity: 0.8, fontSize: primaryTextSize }}>{bar.text}</span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Regular Bars
                    <div className="absolute left-0 h-full w-full z-10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: getLeft(bar.temp) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute h-full rounded-r-[2px]"
                        style={{ backgroundColor: secondaryBarBg }}
                      >
                        {/* Vertical tick marker at the very end of the bar */}
                        <div className="absolute right-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: primaryColor }} />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                        className="absolute left-0 flex items-center h-full px-4 whitespace-nowrap z-10 pointer-events-none"
                      >
                        <span style={{ color: mainBarTitleColor, fontSize: primaryTextSize }}>
                          {bar.labelPrefix}
                          {bar.labelSuffix && <span className="ml-[3px]">{bar.labelSuffix}</span>}
                        </span>
                        <span className="ml-2" style={{ color: mainBarSubColor, fontSize: primaryTextSize }}>{bar.text}</span>
                      </motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeatCapabilities;
