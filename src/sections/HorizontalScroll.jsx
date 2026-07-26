import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import RollingText from '../components/RollingText';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const CONFIG = {
  parallax: {
    yPercentChange: 10,
    scrubSpeed: true,
  }
};

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const headerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

      tl.from(".typewriter-line-1", {
        text: "",
        duration: 0.5,
        ease: "none"
      }).from(".typewriter-line-2", {
        text: "",
        duration: 0.6,
        ease: "none"
      }, "+=0.1"); // slight delay between lines

      gsap.fromTo(".header-right",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      const images = gsap.utils.toArray('.horizontal-parallax-image');
      images.forEach((img) => {
        // Entrance Parallax (animates as component enters)
        gsap.fromTo(img,
          { yPercent: -CONFIG.parallax.yPercentChange },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: CONFIG.parallax.scrubSpeed,
            }
          }
        );
      });

  }, { scope: containerRef });

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    // Check initial state
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth * 0.4;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Content Data
  const cards = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1707378932907-7da5e5635629?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Elegant restaurant interior',
    },
    {
      type: 'text',
      category: 'Smart POS',
      title: 'Advanced Point of Sale with Split Bills & Credits',
      description: 'Our POS handles split bills, partial payments, customer credit, discounts, and tips — all in one seamless interface built for the speed of Nepal\'s busiest restaurants.',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1679151517714-4590e75af298?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Busy restaurant kitchen',
    },
    {
      type: 'text',
      category: 'Kitchen Display',
      title: 'Smart KDS with Station Routing & Urgency Timers',
      description: 'Orders are automatically routed to the right kitchen station with urgency-based timers, reducing wait times and eliminating ticket chaos during peak dining hours.',
    },
    {
      type: 'image',
      src: 'https://plus.unsplash.com/premium_photo-1745946640161-01dda3002d48?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Guests dining at a table',
    },
    {
      type: 'text',
      category: 'QR Ordering',
      title: 'Contactless Table Ordering via QR Code Tokens',
      description: 'Customers scan table-specific QR tokens to browse your menu and place orders directly — no app downloads required. Reduces staff workload and speeds up service.',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1707378932907-7da5e5635629?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Restaurant inventory and bar',
    },
    {
      type: 'text',
      category: 'Inventory Sync',
      title: 'Auto Stock Deduction & Low-Level Alerts',
      description: 'Track every ingredient in real-time with automatic deduction on each order. Get instant low-stock alerts so you never run out during a rush.',
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-24 bg-[#1b1b1b] overflow-hidden flex flex-col justify-center">

      {/* Top Header Section */}
      <div ref={headerRef} className="w-full px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start z-10 mb-12 gap-8">
        <div className="text-white mb-8 md:mb-0 header-left min-w-[280px]">
          <h2 className="text-[14px] font-normal leading-[1.4] font-['Inter',Arial,sans-serif]">
            <div className="typewriter-line-1">Modernizing Restaurant Operations</div>
            <div className="typewriter-line-2">Unlocking Smarter Dining with Polaris</div>
          </h2>
        </div>

        <div className="flex flex-col gap-8 md:items-start w-full max-w-[1000px]">
          <div className="text-white/90 text-[24px] md:text-[32px] leading-[1.3] font-light font-sans header-right text-left">
            Together, these capabilities unlock transformative dining solutions across key areas, including point of sale, kitchen routing, inventory tracking, and AI-powered assistance.
          </div>
        </div>
      </div>

      {/* Scrolling Slider Container Wrapper */}
      <div className="relative w-full">

        {/* Left Navigation Button */}
        <div className={`absolute top-1/2 left-8 md:left-16 lg:left-24 -translate-y-1/2 z-30 transition-opacity duration-300 pointer-events-none ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => slide('left')}
            className="group w-[48px] h-[48px] bg-[#d3e7ff] text-black hover:text-white flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[#688ad0] translate-x-full transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 z-0"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Right Navigation Button */}
        <div className={`absolute top-1/2 right-8 md:right-16 lg:right-24 -translate-y-1/2 z-30 transition-opacity duration-300 pointer-events-none ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => slide('right')}
            className="group w-[48px] h-[48px] bg-[#d3e7ff] text-black hover:text-white flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[#688ad0] -translate-x-full transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 z-0"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scrolling Slider Container */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex h-[65vh] px-8 md:px-16 lg:px-24 gap-6 items-center w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-20 mt-15"
        >
          {cards.map((card, index) => {
            if (card.type === 'text') {
              return (
                <div
                  key={index}
                  className="w-[350px] md:w-[520px] h-full bg-[#524f4b] p-[40px] flex flex-col justify-between shrink-0 rounded-sm shadow-xl font-sans"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-12">
                      <div className="w-[14px] h-[14px] rounded-full bg-[#d5e7ff]" />
                      <span className="text-[#FFFFFF] text-[18px]">
                        {card.category}
                      </span>
                    </div>

                    <h3 className="text-[#FFFFFF] text-[32px] font-light leading-[1.2] mb-6">
                      {card.title}
                    </h3>

                    <p className="text-[#CFCDC9] text-[20px] leading-[1.2] font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 relative">
                    {/* Base faint line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10"></div>

                    <a href="#" className="peer flex items-center gap-3 group text-[#FFFFFF] text-[16px] font-medium tracking-wide w-fit">
                      <div className="flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span>Learn More</span>
                    </a>

                    {/* Animated hover line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] peer-hover:scale-x-100"></div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="w-[350px] md:w-[450px] h-full relative shrink-0 rounded-sm shadow-xl overflow-hidden group cursor-pointer"
                >
                  <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%]">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="horizontal-parallax-image absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1] will-change-transform"
                      style={{ transform: 'translateZ(0)' }}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

    </section>
  );
}
