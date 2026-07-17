import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  parallax: {
    yPercentChange: 10,
    scrubSpeed: true,
  }
};

const FeaturesGrid = () => {
  const componentRoot = useRef(null);
  const images = {
    img1: "https://cdn.prod.website-files.com/65e82de5fac5e8a0bf813f65/66c7e15462b676dbe1997ad6_About_Image_01-p-1600.avif",
    img2: "https://cdn.prod.website-files.com/65e82de5fac5e8a0bf813f65/66c7e15481581a4d5f29ade7_About_Image_02.avif",
    img3: "https://cdn.prod.website-files.com/65e82de5fac5e8a0bf813f65/66c7e154fff376e4c93fd03f_About_Image_03.avif"
  };

  useGSAP(() => {
      // 1. Header Animation
      gsap.from(".animate-header", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".animate-header",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // 2. Bento Grid Row-wise Animation
      ["grid-row-1", "grid-row-2", "grid-row-3"].forEach((rowClass) => {
        gsap.from(`.${rowClass}`, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: `.${rowClass}`,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. Image Parallax Animation
      const parallaxImages = gsap.utils.toArray('.feature-parallax-image');
      parallaxImages.forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -CONFIG.parallax.yPercentChange },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: componentRoot.current,
              start: "top bottom",
              end: "bottom top",
              scrub: CONFIG.parallax.scrubSpeed,
            }
          }
        );
      });
  }, { scope: componentRoot });

  return (
    <section ref={componentRoot} className="relative z-20 w-full bg-[#ffffff] flex justify-center py-20">
      <div className="w-full max-w-[1500px] px-6 md:px-12 flex flex-col">

        {/* Header Section */}
        <div className="mb-16 md:mb-24 max-w-4xl ml-0 lg:ml-24 animate-header">
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-light leading-[1.1] tracking-tight">
            <span className="text-[#888888] block">Turning chaos into perfect harmony.</span>
            <span className="text-[#111111] font-normal block mt-2">So efficient, every second counts.</span>
          </h2>
          <p className="mt-8 text-[#666666] text-[14px] md:text-[16px] max-w-[600px] leading-relaxed">
            This allows every restaurant team to focus on delivering exceptional guest experiences with greater impact, leading to better service and increased profitability.
          </p>
        </div>

        {/* Bento Grid Section */}
        <div className="grid-container grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">

          {/* Row 1 */}
          <div className="grid-item grid-row-1 rounded-[12px] overflow-hidden h-[400px] md:h-[500px] relative group cursor-pointer">
            <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%]">
              <img src={images.img1} alt="Man smiling at tablet" className="feature-parallax-image absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
            </div>
          </div>
          <div className="grid-item grid-row-1 bg-[#f9fafb] rounded-[12px] p-10 md:p-16 flex flex-col justify-between h-[400px] md:h-[500px]">
            <h3 className="text-[28px] md:text-[36px] text-[#111111] font-light leading-tight max-w-[85%]">
              Nothing drives success like real-time data
            </h3>
            <p className="text-[#666666] text-[14px] md:text-[15px] leading-relaxed max-w-[95%]">
              Nobody wants to run a restaurant blindly and it's frustrating to manage inventory without smart alerts. Unstructured management is exactly that: time consuming and nerve wracking. About time to change this.
            </p>
          </div>

          {/* Row 2 */}
          <div className="grid-item grid-row-2 bg-[#f9fafb] rounded-[12px] p-10 md:p-16 flex flex-col justify-between h-[400px] md:h-[500px] order-last md:order-none">
            <h3 className="text-[28px] md:text-[36px] text-[#111111] font-light leading-tight max-w-[85%]">
              We help restaurants operate smarter and serve with confidence
            </h3>
            <p className="text-[#666666] text-[14px] md:text-[15px] leading-relaxed max-w-[95%]">
              This way restaurant owners are transforming their workflows and gaining full control across all their daily operations.
            </p>
          </div>
          <div className="grid-item grid-row-2 rounded-[12px] overflow-hidden h-[400px] md:h-[500px] relative group cursor-pointer">
            <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%]">
              <img src={images.img2} alt="Two coworkers reviewing tablet" className="feature-parallax-image absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid-item grid-row-3 rounded-[12px] overflow-hidden h-[400px] md:h-[500px] relative group cursor-pointer">
            <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%]">
              <img src={images.img3} alt="Person typing on laptop" className="feature-parallax-image absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
            </div>
          </div>
          <div className="grid-item grid-row-3 bg-[#f9fafb] rounded-[12px] p-10 md:p-16 flex flex-col justify-between h-[400px] md:h-[500px]">
            <h3 className="text-[28px] md:text-[36px] text-[#111111] font-light leading-tight max-w-[90%] flex flex-wrap items-center gap-x-3">
              With
              <span className="w-[18px] h-[18px] bg-[#111111] rounded-full inline-block shrink-0 relative top-[2px]"></span>
              Restro, teams will streamline their service globally
            </h3>
            <p className="text-[#666666] text-[14px] md:text-[15px] leading-relaxed max-w-[95%]">
              By leveraging new technologies, artificial intelligence and seamless omnichannel experiences we will redefine restaurant management for good.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;