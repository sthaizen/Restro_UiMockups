import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import RollingText from '../components/RollingText';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {


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

      const slider = sliderRef.current;
      if (!slider) return;

      // Calculate how far to move the slider horizontally
      // We want to scroll from x: 0 to x: -(total width of slider - viewport width)
      const getScrollAmount = () => {
        let sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth);
      };

      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom 100%",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: true,
        invalidateOnRefresh: true,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      title: 'Seamless Point of Sale for Modern Dining',
      description: 'Our advanced POS systems operate at lightning speed to deliver seamless workflows and high-efficiency order management to help streamline your restaurant operations.',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1679151517714-4590e75af298?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Busy restaurant kitchen',
    },
    {
      type: 'text',
      category: 'Kitchen AI',
      title: 'Intelligent Routing and Kitchen Display Systems',
      description: 'We are developing advanced routing algorithms capable of organizing tickets instantly, reducing wait times and minimizing errors during peak dining hours.',
    },
    {
      type: 'image',
      src: 'https://plus.unsplash.com/premium_photo-1745946640161-01dda3002d48?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Guests dining at a table',
    },
    {
      type: 'text',
      category: 'Guest Experience',
      title: 'Frictionless Reservations and Table Management',
      description: 'The Polaris platform provides reliable, scalable tools for waitlist management and seating arrangements to maximize your floor capacity and delight your guests.',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1707378932907-7da5e5635629?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Restaurant inventory and bar',
    },
    {
      type: 'text',
      category: 'Inventory Sync',
      title: 'Automated Tracking for Food and Beverage',
      description: 'Advanced technology enables deep insights into stock levels, reducing food waste and optimizing ordering for your kitchen in real-time.',
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full h-[105vh] bg-[#1b1b1b] overflow-hidden flex flex-col justify-center">

      {/* Top Header Section */}
      <div ref={headerRef} className="absolute top-0 left-0 w-full px-8 md:px-16 lg:px-24 pt-16 flex flex-col md:flex-row justify-between items-start z-10">
        <div className="text-white mb-8 md:mb-0 header-left min-w-[280px]">
          <h2 className="text-[14px] font-normal leading-[1.4] font-['Inter',Arial,sans-serif]">
            <div className="typewriter-line-1">Modernizing Restaurant Operations</div>
            <div className="typewriter-line-2">Unlocking High-Efficiency Dining Systems</div>
          </h2>
        </div>
        <div className="text-white/90 text-[24px] md:text-[32px] max-w-[1000px] leading-[1.3] font-light font-['Geist',Arial,sans-serif] header-right">
          Together, these capabilities unlock transformative dining solutions across key areas, including front-of-house service, kitchen management, inventory tracking, and guest experience.
        </div>
      </div>

      {/* Scrolling Slider Container */}
      <div ref={sliderRef} className="flex h-[65vh] mt-40 px-8 md:px-16 lg:px-24 gap-6 items-center w-max will-change-transform">
        {cards.map((card, index) => {
          if (card.type === 'text') {
            return (
              <div
                key={index}
                className="w-[350px] md:w-[520px] h-full bg-[#524f4b] p-[40px] flex flex-col justify-between shrink-0 rounded-sm shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-[14px] h-[14px] rounded-full bg-[#d5e7ff]" />
                    <span className="text-[#FFFFFF] text-[18px] font-['Inter',Arial,sans-serif]">
                      {card.category}
                    </span>
                  </div>

                  <h3 className="text-[#FFFFFF] text-[32px] font-['Geist',Arial,sans-serif] font-light leading-tight mb-8">
                    {card.title}
                  </h3>

                  <p className="text-[#CFCDC9] text-[20px] leading-[1.6] font-['Inter',Arial,sans-serif] font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 relative">
                  {/* Base faint line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10"></div>

                  <a href="#" className="peer flex items-center gap-3 group text-[#FFFFFF] text-[16px] font-medium tracking-wide w-fit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                      <polyline points="15 10 20 15 15 20"></polyline>
                      <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                    </svg>
                    <RollingText text="Learn More" />
                  </a>

                  {/* Animated line expanding from left to right */}
                  <div className="absolute top-0 left-0 h-[1px] bg-white/60 w-0 transition-all duration-700 ease-out peer-hover:w-full pointer-events-none"></div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="w-[350px] md:w-[450px] h-full relative shrink-0 rounded-sm shadow-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
                />
                <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-700 ease-in-out group-hover:opacity-0" />

              </div>
            );
          }
        })}
      </div>

    </section>
  );
}
