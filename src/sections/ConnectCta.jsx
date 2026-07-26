import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import RollingText from '../components/RollingText';
import Footer from './Footer';

const CONFIG = {
  text: {
    highlight: 'Dine With Us.',
    body: ' Our culinary team is here to provide an unforgettable fine dining experience at Polaris.',
  },
  cta: 'Reserve a Table',

  animation: {
    img1ScrollYPx: 50,
    img2ScrollYPx: -50,


    scaleAnimationStart: "0% 0%",

    scaleAnimationEnd: "bottom top",
  },

  contentLayout: {
    justifyContent: 'center',
  },
  headingLayout: {
    marginTopPx: 220,
    marginBottomPx: 48,
    marginLeftPx: 0,
    marginRightPx: 0,
  },
  buttonLayout: {
    marginTopPx: 140,
    marginBottomPx: 0,
    marginLeftPx: 0,
    marginRightPx: 0,
  },
  images: {
    img1: {
      src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0',
      alt: 'Food close-up shot',
      widthPx: 400,
      heightPx: 520,
    },
    img2: {
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0',
      alt: 'Restaurant ambiance',
      widthPx: 460,
      heightPx: 720,
    },
  },
  layout: {
    leftColumnWidthPx: 420,
    rightColumnWidthPx: 520,
    totalHeightPx: 720,
    gapPx: 12,
  }
};

const ConnectCta = ({ text = CONFIG.text, cta = CONFIG.cta, images = CONFIG.images, layout = CONFIG.layout, contentLayout = CONFIG.contentLayout, headingLayout = CONFIG.headingLayout, buttonLayout = CONFIG.buttonLayout, animation = CONFIG.animation }) => {
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(570);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    const updateDimensions = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
      if (typeof window !== 'undefined') {
        setWindowHeight(window.innerHeight);
      }
    };
    
    setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useGSAP(() => {
    if (img1Ref.current) {
      gsap.to(img1Ref.current, {
        y: animation.img1ScrollYPx,
        ease: "none",
        scrollTrigger: {
          trigger: img1Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    if (img2Ref.current) {
      gsap.to(img2Ref.current, {
        y: animation.img2ScrollYPx,
        ease: "none",
        scrollTrigger: {
          trigger: img2Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 0.97,
        borderRadius: "32px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: animation.scaleAnimationStart,
          end: animation.scaleAnimationEnd,
          scrub: true,
        }
      });
    }
  }, { scope: containerRef, dependencies: [animation] });

  // If the footer is taller than the user's screen, we must disable the parallax reveal.
  // Otherwise, the sticky logic will pin it in a way that physically cuts off the top or bottom forever!
  const isRevealEnabled = footerHeight <= windowHeight;

  return (
    <div className="relative w-full bg-black">
      {/* The content that rolls over the footer */}
      <section 
        ref={containerRef} 
        className="relative z-20 w-full bg-[#1b1b1b] overflow-hidden font-sans text-white origin-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ marginBottom: isRevealEnabled ? `-${footerHeight}px` : '0px' }}
      >
        <div className="w-full max-w-[1860px] mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

          <div
            className="flex flex-col h-full min-h-[400px] py-4"
            style={{ justifyContent: contentLayout.justifyContent }}
          >

            <div className="text-[#d3e7ff] opacity-80">
            </div>


            <div
              style={{
                marginTop: headingLayout.marginTopPx,
                marginBottom: headingLayout.marginBottomPx,
                marginLeft: headingLayout.marginLeftPx,
                marginRight: headingLayout.marginRightPx
              }}
            >
              <h2 className="font-light leading-[1.35] tracking-[-0.015em] max-w-[480px] text-[32px] md:text-[px]">
                <span className="text-[#f4f4f4]">{text.highlight}</span>
                <span className="text-[#888888]">{text.body}</span>
              </h2>
            </div>

            <div
              style={{
                marginTop: buttonLayout.marginTopPx,
                marginBottom: buttonLayout.marginBottomPx,
                marginLeft: buttonLayout.marginLeftPx,
                marginRight: buttonLayout.marginRightPx
              }}
            >
              <button className="flex items-center gap-3 group cursor-pointer">
                <div className="relative overflow-hidden flex items-center justify-center bg-[#dceaff] text-black w-12 h-12 rounded-sm z-0 transition-colors duration-[150ms] group-hover:text-white">
                  <div className="absolute inset-0 bg-[#688ad0] origin-left scale-x-0 transition-transform duration-[150ms] ease-out group-hover:scale-x-100 z-[-1]"></div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <path d="M9 5v7a2 2 0 0 0 2 2h9" />
                    <path d="M16 10l4 4-4 4" />
                  </svg>
                </div>
                <div className="relative overflow-hidden flex items-center justify-center border border-[#444] px-6 h-12 rounded-sm bg-transparent text-[#f4f4f4] font-medium text-[15px] z-0 transition-colors duration-[250ms] delay-[100ms] group-hover:text-white group-hover:border-[#688ad0]">
                  <div className="absolute inset-0 bg-[#688ad0] origin-left scale-x-0 transition-transform duration-[250ms] delay-[100ms] ease-out group-hover:scale-x-100 z-[-1]"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <RollingText text={cta} />
                  </div>
                </div>
              </button>
            </div>

          </div>

          <div
            className="flex flex-row items-start w-full"
            style={{ height: layout.totalHeightPx, gap: layout.gapPx }}
          >
            <div
              className="flex flex-col items-center justify-center flex-shrink-0"
              style={{ width: layout.leftColumnWidthPx, height: layout.totalHeightPx }}
            >
              <div
                ref={img1Ref}
                className="overflow-hidden"
                style={{ width: images.img1.widthPx, height: images.img1.heightPx }}
              >
                <img
                  src={images.img1.src}
                  alt={images.img1.alt}
                  className="w-full h-full object-cover object-center block"
                />
              </div>
            </div>

            <div
              ref={img2Ref}
              className="flex-shrink-0 overflow-hidden"
              style={{ width: images.img2.widthPx, height: images.img2.heightPx }}
            >
              <img
                src={images.img2.src}
                alt={images.img2.alt}
                className="w-full h-full object-cover object-center block"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Footer Parallax Container - Natively handles scroll using sticky! */}
      <div 
        className={`footer-outer relative z-10 w-full bg-black ${!isRevealEnabled ? 'flex' : ''}`}
        style={{ height: isRevealEnabled ? `${footerHeight * 2}px` : 'auto' }}
      >
        <div 
          className={`footer-inner w-full ${isRevealEnabled ? 'sticky' : 'relative'}`}
          style={isRevealEnabled ? { height: `${footerHeight}px`, top: `calc(100vh - ${footerHeight}px)` } : {}}
        >
          <div ref={footerRef} className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectCta;