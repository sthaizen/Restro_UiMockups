import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlueBar = ({ //blur cap
  width = '100%',
  height = '120px',
  animStart = 'top 60%',
  animDuration = 1,
  staggerSpeed = 0.09
}) => {
  const containerRef = useRef(null);
  const topSlicesRef = useRef([]);
  const bottomSlicesRef = useRef([]);
  const numSlices = 17;

  useGSAP(() => {
    gsap.set(topSlicesRef.current, { transformOrigin: 'right' });
    gsap.set(bottomSlicesRef.current, { transformOrigin: 'left' });

    gsap.fromTo(
      topSlicesRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: animDuration,
        ease: 'none',
        stagger: {
          each: staggerSpeed,
          from: 'end',
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: animStart,
          end: 'top 0%',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      bottomSlicesRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: animDuration,
        ease: 'none',
        stagger: {
          each: staggerSpeed,
          from: 'start',
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: animStart,
          end: 'top 0%',
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex flex-col w-full overflow-hidden bg-transparent"
      style={{ width, height }}
    >
      <div className="flex flex-1 w-full h-1/2">
        {Array.from({ length: numSlices }).map((_, i) => (
          <div
            key={`top-${i}`}
            ref={(el) => (topSlicesRef.current[i] = el)}
            className="flex-1 h-full bg-[#f1f5f8]"
            style={{ willChange: 'transform' }}
          />
        ))}
      </div>

      <div className="flex flex-1 w-full h-1/2">
        {Array.from({ length: numSlices }).map((_, i) => (
          <div
            key={`bottom-${i}`}
            ref={(el) => (bottomSlicesRef.current[i] = el)}
            className="flex-1 h-full bg-[#f1f5f8]"
            style={{ willChange: 'transform' }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlueBar;
