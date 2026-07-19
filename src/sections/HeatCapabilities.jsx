import React, { useState, useRef, useEffect } from 'react';
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
  { labelPrefix: 'Restro Hub', labelSuffix: 'Wood-Fired Oven', text: 'Up to 950 °C', temp: 950, isMain: true },
  { labelPrefix: 'Commercial', labelSuffix: 'Gas Range', text: '750 °C', temp: 750, isMain: false },
  { labelPrefix: 'Industrial', labelSuffix: 'Deep Fryer', text: '650 °C', temp: 650, isMain: false },
  { labelPrefix: 'Salamander', labelSuffix: 'Broiler', text: '550 °C', temp: 550, isMain: false },
  { labelPrefix: 'Sous Vide', labelSuffix: 'Water Bath', text: '300 °C', temp: 300, isMain: false },
];

const HeatCapabilities = ({
  className = '',
  containerClassName = '',
  mainBarGap = 10,
  floatingBarRowHeight = 50,
  chartHeight = 430,
  containerWidth = '83%',
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
  gridLineColor = '#303030',
  intermediateGridLineColor = '#5a5a5a66',
  gridLineStyle = 'dashed',
  axisLineColor = '#5a5a5aff',
  axisTickColor = '#5a5a5aff',
  intermediateTickColor = '#5a5a5a80',
  axisTextColor = '#ffffff',
  style,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState('cities');
  const maxTemp = 1200;
  
  const containerRef = useRef(null);
  const activeTabLineRef = useRef(null);
  const floatingContainerRef = useRef(null);
  const tabRefs = useRef({});
  const tabWrapperRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    // Top text stagger
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

    // Main Bars Entrance
    gsap.utils.toArray('.main-bar-row').forEach((rowEl, idx) => {
       const fill = rowEl.querySelector('.main-bar-fill');
       const text = rowEl.querySelector('.main-bar-text');

       if (fill) {
           gsap.fromTo(fill, 
             { width: 0 }, 
             { 
                 width: fill.dataset.width, 
                 duration: 1, 
                 ease: "easeOut",
                 scrollTrigger: {
                     trigger: rowEl,
                     start: 'top 95%',
                     once: true
                 }
             }
           );
       }
       if (text) {
           gsap.fromTo(text, 
               { opacity: 0, x: -10 },
               {
                   opacity: 1, x: 0,
                   duration: 0.6,
                   delay: 0.3 + idx * 0.1,
                   ease: "easeOut",
                   scrollTrigger: {
                     trigger: rowEl,
                     start: 'top 95%',
                     once: true
                 }
               }
           );
       }
    });

  }, { scope: containerRef });

  // Handle Tab Switch
  useEffect(() => {
    // Move Underline
    const tabEl = tabRefs.current[activeTab];
    if (tabEl && activeTabLineRef.current && tabWrapperRef.current) {
        const relativeLeft = tabEl.offsetLeft;
        
        gsap.to(activeTabLineRef.current, {
            left: relativeLeft,
            width: tabEl.getBoundingClientRect().width,
            duration: 0.4,
            ease: 'power3.out',
        });
    }

    // Animate Floating Bars IN
    if (floatingContainerRef.current) {
        // First kill any existing animations to prevent conflicts
        gsap.killTweensOf(floatingContainerRef.current);
        gsap.killTweensOf(floatingContainerRef.current.querySelectorAll('.floating-fill, .floating-text'));

        // Reset the container state for the entrance
        gsap.set(floatingContainerRef.current, { opacity: 0, y: 5 });

        const tl = gsap.timeline();
        
        tl.to(floatingContainerRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'easeOut' });

        const floatingItems = floatingContainerRef.current.querySelectorAll('.floating-item');
        floatingItems.forEach((item, idx) => {
             const fill = item.querySelector('.floating-fill');
             const text = item.querySelector('.floating-text');
             
             if (fill && text) {
                 gsap.fromTo(fill, 
                     { width: 0, opacity: 0 }, 
                     { width: fill.dataset.width, opacity: 1, duration: 0.6, ease: 'easeOut' }, 
                     0.1 + (idx * 0.1) // relative to the timeline start, offset by idx
                 );
                 gsap.fromTo(text, 
                     { opacity: 0, y: 8 }, 
                     { opacity: 1, y: 0, duration: 0.5, ease: 'easeOut' }, 
                     0.4 + (idx * 0.1)
                 );
             }
        });
    }

  }, [activeTab]);

  const handleTabClick = contextSafe((tabId) => {
      if (tabId === activeTab) return;
      
      // Animate out current
      if (floatingContainerRef.current) {
          gsap.to(floatingContainerRef.current, {
              opacity: 0,
              y: -5,
              duration: 0.2,
              ease: 'easeOut',
              onComplete: () => {
                  setActiveTab(tabId);
              }
          });
      } else {
          setActiveTab(tabId);
      }
  });


  const getLeft = (val) => `${(val / maxTemp) * 100}%`;
  const getWidth = (start, end) => `${((end - start) / maxTemp) * 100}%`;

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-[#1b1b1b] text-white py-20 font-sans overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      <div
        className={`mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-8 ${containerClassName}`}
        style={{ width: containerWidth }}
      >
        <h2 className="gsap-text-anim text-[48px] text-[#ffffff] font-light leading-tight">
          Unmatched <br /> Culinary Heat
        </h2>
        <p className="gsap-text-anim text-[#ffffff] max-w-lg text-[18px] leading-relaxed">
          Our custom Restro Hub wood-fired ovens are designed to operate at temperatures up to 950 °C, which is approximately 600 °C higher than conventional ovens, providing the perfect sear for our signature dishes.
        </p>
      </div>

      <div
        className={`mx-auto ${containerClassName}`}
        style={{ width: containerWidth }}
      >
        <div ref={tabWrapperRef} className="relative flex space-x-8 mb-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2a2a2a]"></div>
          
          <div ref={activeTabLineRef} className="absolute bottom-0 h-[3px]" style={{ backgroundColor: primaryColor, left: 0, width: 0 }} />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => tabRefs.current[tab.id] = el}
              onClick={() => handleTabClick(tab.id)}
              className={`pb-3 whitespace-nowrap transition-colors relative z-10 ${activeTab === tab.id ? 'text-white' : 'text-[#888888] hover:text-gray-300'
                }`}
              style={{ fontSize: primaryTextSize }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full pt-8 pb-12">
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ backgroundColor: axisLineColor }}></div>
            {Array.from({ length: 25 }, (_, i) => i * 50).map((temp) => {
              const isMain = temp % 100 === 0;
              return (
                <div key={temp} className="relative h-full flex flex-col items-center" style={{ width: 0 }}>
                  <div
                    className="absolute inset-y-0 w-px border-r"
                    style={{
                      borderColor: isMain ? gridLineColor : intermediateGridLineColor,
                      borderStyle: gridLineStyle,
                    }}
                  ></div>
                  <div
                    className="absolute bottom-0 translate-y-full w-px"
                    style={{
                      backgroundColor: isMain ? axisTickColor : intermediateTickColor,
                      height: isMain ? '6px' : '1px',
                    }}
                  ></div>
                  {isMain && (
                    <span
                      className="absolute bottom-0 mt-[6px] text-[13px] whitespace-nowrap"
                      style={{
                        color: axisTextColor,
                        left: '0px',
                        transform: 'translate(-50%, 200%)'
                      }}
                    >
                      {temp} °C
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative z-10 flex flex-col w-full" style={{ height: `${chartHeight}px` }}>
            <div className="relative h-[130px] w-full mb-6">
              <div ref={floatingContainerRef} className="absolute inset-0">
                  {floatingBarsData[activeTab]?.map((bar, idx) => (
                    <div key={idx} className="absolute inset-0 floating-item">
                      <div
                        className={`floating-fill absolute h-[40px] border border-dashed backdrop-blur-sm
                          ${bar.fadeRight ? 'border-r-0 rounded-l-[4px]' : 'rounded-[4px]'}
                        `}
                        data-width={getWidth(bar.start, bar.end)}
                        style={{
                          backgroundColor: floatingBoxBg,
                          borderColor: floatingBoxBorder,
                          left: getLeft(bar.start),
                          top: `${bar.row * floatingBarRowHeight + 10}px`,
                          width: 0,
                          opacity: 0,
                          maskImage: bar.fadeRight ? 'linear-gradient(to right, black 80%, transparent 100%)' : 'none',
                          WebkitMaskImage: bar.fadeRight ? 'linear-gradient(to right, black 80%, transparent 100%)' : 'none',
                        }}
                      />

                      <div
                        className={`floating-text absolute h-[40px] flex flex-col justify-center whitespace-nowrap`}
                        style={{
                          top: `${bar.row * floatingBarRowHeight + 10}px`,
                          left: bar.textPos === 'right' ? `calc(${getLeft(bar.end)} + 16px)` : undefined,
                          right: bar.textPos === 'left' ? `calc(100% - ${getLeft(bar.start)} + 16px)` : undefined,
                          alignItems: bar.textPos === 'left' ? 'flex-end' : 'flex-start',
                          opacity: 0,
                          transform: 'translateY(8px)'
                        }}
                      >
                        <span className="leading-snug font-medium" style={{ color: titleColor, fontSize: primaryTextSize }}>{bar.label}</span>
                        <span className="leading-snug" style={{ color: subTitleColor, fontSize: secondaryTextSize }}>{bar.tempRange}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="relative flex flex-col justify-end flex-grow pb-[1px]" style={{ gap: `${mainBarGap}px` }}>
              {mainBars.map((bar, idx) => (
                <div key={idx} className="main-bar-row relative h-[42px] flex items-center w-full group">
                  {bar.isMain ? (
                    <div
                      className="main-bar-fill absolute h-full flex items-center px-4 rounded-r-[2px] overflow-hidden whitespace-nowrap z-20"
                      data-width={getLeft(bar.temp)}
                      style={{ backgroundColor: primaryColor, width: 0 }}
                    >
                      <div
                        className="main-bar-text flex items-center gap-[6px]"
                        style={{ opacity: 0, transform: 'translateX(-10px)' }}
                      >
                        <span style={{ color: titleColor, fontSize: primaryTextSize }}>
                          <span className="font-bold">{bar.labelPrefix}</span>
                          {bar.labelSuffix && <span className="font-normal ml-[3px]">{bar.labelSuffix}</span>}
                        </span>
                        <span className="ml-1" style={{ color: titleColor, opacity: 0.8, fontSize: primaryTextSize }}>{bar.text}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute left-0 h-full w-full z-10">
                      <div
                        className="main-bar-fill absolute h-full rounded-r-[2px]"
                        data-width={getLeft(bar.temp)}
                        style={{ backgroundColor: secondaryBarBg, width: 0 }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: primaryColor }} />
                      </div>
                      <div
                        className="main-bar-text absolute left-0 flex items-center h-full px-4 whitespace-nowrap z-10 pointer-events-none"
                        style={{ opacity: 0, transform: 'translateX(-10px)' }}
                      >
                        <span style={{ color: mainBarTitleColor, fontSize: primaryTextSize }}>
                          {bar.labelPrefix}
                          {bar.labelSuffix && <span className="ml-[3px]">{bar.labelSuffix}</span>}
                        </span>
                        <span className="ml-2" style={{ color: mainBarSubColor, fontSize: primaryTextSize }}>{bar.text}</span>
                      </div>
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
