import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all"; // Ensure GSAP is installed correctly

const Hero = () => {
  const headerRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const statsRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(headerRef.current, { opacity: 0, y: -30, duration: 1, delay: 0.5 })
      .from(ctaButtonRef.current, { opacity: 0, y: 20, duration: 1 }, "-=0.5")
      .from(statsRef.current, { opacity: 0, y: 30, duration: 1 }, "-=0.5")
      .from(bgImageRef.current, { opacity: 0, duration: 1, delay: 1 });
  }, []);

  return (
    <section
      className="relative min-h-screen w-full bg-gray-100 text-white"
      style={{
        backgroundImage: `url('https://path-to-your-image.jpg')`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      ref={bgImageRef}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"></div> {/* Dark overlay */}
      <div className="relative z-10 px-6 sm:px-12 py-20 text-center">
        {/* Header Text */}
        <h1
          className="font-bold text-4xl sm:text-5xl md:text-6xl"
          ref={headerRef}
        >
          The Most Stable & Powerful Linux Web Hosting Platform
        </h1>
        <p
          className="mt-4 text-xl sm:text-2xl md:text-3xl"
          ref={ctaButtonRef}
        >
          Experience the flexibility and reliability of our elastic web hosting platform, designed to scale effortlessly with your growing needs.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-black text-white text-lg py-3 px-8 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Explore now
          </a>
        </div>

        {/* Stats Section */}
        <div
          className="mt-16 flex justify-center gap-16 text-lg sm:text-xl md:text-2xl"
          ref={statsRef}
        >
          <div>
            <h3 className="font-semibold">10+</h3>
            <p>Satisfied Clients</p>
          </div>
          <div>
            <h3 className="font-semibold">5+</h3>
            <p>Years of Experience</p>
          </div>
          <div>
            <h3 className="font-semibold">22+</h3>
            <p>Websites Hosted</p>
          </div>
          <div>
            <h3 className="font-semibold">99%</h3>
            <p>Uptime Guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
