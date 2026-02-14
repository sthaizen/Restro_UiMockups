import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger outside the component
gsap.registerPlugin(ScrollTrigger);

const Anotherlets = () => {
  // Refs for main container and specific sections if needed for pinning
  const componentRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTextRef = useRef(null);
  const skillsRef = useRef(null);

  useLayoutEffect(() => {
    // Use gsap.context for proper cleanup in React Strict Mode
    let ctx = gsap.context(() => {

      // =========================================
      // 1. IMAGE PARALLAX SCALE EFFECT (The new addition)
      // =========================================
      // Select all containers specifically set up for this effect
      let imageContainers = gsap.utils.toArray(".image-parallax-container");

      imageContainers.forEach((container) => {
        let img = container.querySelector("img"); // Grab the image inside

        // Initial state: The image is larger than its container
        gsap.set(img, { scale: 1.3, transformOrigin: "center center" });

        // The Animation: Scale down to normal size while scrolling past it
        gsap.to(img, {
          scale: 1,
          ease: "none", // IMPORTANT: Linear ease for syncing with scroll
          scrollTrigger: {
            trigger: container,
            start: "top bottom", // Start when top of container hits bottom of viewport
            end: "bottom top",   // End when bottom of container leaves top of viewport
            scrub: true,         // Smoothly sync with scrollbar momentum
          }
        });
      });

      // =========================================
      // 2. HORIZONTAL SCROLL SECTION
      // =========================================
      // Calculate how far the text needs to move. 
      // We want it to move left by its own width minus the viewport width.
      const textWidth = horizontalTextRef.current.offsetWidth;
      const amountToScroll = textWidth - window.innerWidth;

      gsap.to(horizontalTextRef.current, {
        x: -amountToScroll, // Move left by this amount
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top top",
          end: `+=${amountToScroll + 500}`, // The duration of the pin depends on how wide the content is
          pin: true,
          scrub: 1, // Add a little friction (1s lag) for a smoother feel
          invalidateOnRefresh: true, // Recalculate on resize
        }
      });

      // =========================================
      // 3. STAGGERED SKILLS REVEAL
      // =========================================
      // Animate the container and title first
      gsap.from(skillsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      // Stagger the individual skill bars
      gsap.from(".skill-fill-bar", {
        width: 0,
        duration: 1.5,
        stagger: 0.2, // 0.2s delay between each bar starting
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 70%",
        }
      });

    }, componentRef); // Scope selector queries to this component

    return () => ctx.revert(); // Cleanup animation on unmount
  }, []);

  return (
    <div ref={componentRef} className="bg-[#0a0a0a] text-white overflow-x-hidden antialiased font-sans">
      
      {/* ---- Section 1: Horizontal Scroll Hero ---- */}
      <section ref={horizontalSectionRef} className="h-screen flex items-center overflow-hidden bg-black relative z-10">
        <div ref={horizontalTextRef} className="flex whitespace-nowrap px-[5vw]">
          {/* Using outline text utility defined in CSS below */}
          <h1 className="text-[18vw] leading-none font-black uppercase tracking-tighter outline-text mr-32">About</h1>
          <h1 className="text-[18vw] leading-none font-black uppercase tracking-tighter mr-32">Portfolio</h1>
          <h1 className="text-[18vw] leading-none font-black uppercase tracking-tighter outline-text mr-32">Services</h1>
          <h1 className="text-[18vw] leading-none font-black uppercase tracking-tighter">Contact</h1>
        </div>
      </section>

      {/* ---- Section 2: Introduction & Main Image Parallax ---- */}
      <section className="min-h-screen py-32 px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-[1600px] mx-auto">
        <div className="flex flex-col justify-center space-y-8 relative z-20">
          <span className="uppercase tracking-widest text-sm text-gray-500">Introduction</span>
          <h2 className="text-6xl md:text-8xl font-bold uppercase leading-[0.9]">Thomas <br/> Walker</h2>
          <p className="text-gray-400 text-xl md:text-2xl max-w-xl leading-relaxed">
            I design sleek, high-performance web experiences that help brands stand out in the digital landscape.
          </p>
          <div>
             <button className="rounded-full border-2 border-white px-10 py-4 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300">
                My Work
             </button>
          </div>
        </div>
        
        {/* THE IMAGE WITH THE PARALLAX EFFECT */}
        {/* Crucial: container needs overflow-hidden and a defined height/aspect ratio */}
        <div className="image-parallax-container rounded-[2rem] overflow-hidden relative h-[70vh] w-full z-10 grayscale">
          <img 
            src="https://images.unsplash.com/photo-1600603405959-6d623e92445c?auto=format&fit=crop&q=80&w=1200&h=1600" 
            alt="Portrait" 
            className="w-full h-full object-cover will-change-transform"
          />
        </div>
      </section>

       {/* ---- Interstitial Portfolio Section ---- */}
       <section className="py-32 px-10 max-w-[1600px] mx-auto space-y-32">
         {/* Project 1 */}
         <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
                 {/* Another Parallax Image */}
                 <div className="image-parallax-container rounded-[2rem] overflow-hidden relative aspect-[4/3] w-full grayscale hover:grayscale-0 transition-all duration-700">
                    <img 
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600" 
                        alt="Project 1" 
                        className="w-full h-full object-cover will-change-transform"
                    />
                </div>
            </div>
            <div className="md:col-span-2 space-y-6">
                <h3 className="text-4xl font-bold uppercase">Mantle</h3>
                <p className="text-gray-400 text-lg">A high-performance SaaS dashboard focusing on data visualization and user experience.</p>
                <div className="flex gap-4 pt-4">
                    <span className="px-4 py-2 rounded-full bg-[#222] text-xs uppercase text-gray-300">React</span>
                    <span className="px-4 py-2 rounded-full bg-[#222] text-xs uppercase text-gray-300">GSAP</span>
                </div>
            </div>
         </div>
       </section>


      {/* ---- Section 3: Skills Stagger Reveal ---- */}
      <section ref={skillsRef} className="py-40 px-10 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
            <span className="uppercase tracking-widest text-sm text-gray-500 mb-4 block">Expertise</span>
            <h3 className="text-5xl md:text-7xl font-bold mb-20 uppercase">My Skills</h3>
            
            <div className="space-y-12">
            {[
                { name: "Frontend Development", val: "95%" },
                { name: "UI/UX Design", val: "88%" },
                { name: "GSAP Animations", val: "92%" },
                { name: "React / Next.js", val: "90%" }
            ].map((skill, i) => (
                <div key={i} className="space-y-4">
                <div className="flex justify-between uppercase text-xl font-bold tracking-wider">
                    <span>{skill.name}</span>
                    <span>{skill.val}</span>
                </div>
                {/* The track */}
                <div className="h-[3px] bg-[#333] w-full relative overflow-hidden">
                    {/* The fill bar that gets animated */}
                    <div className="skill-fill-bar absolute top-0 left-0 h-full bg-white will-change-transform" style={{ width: skill.val }}></div>
                </div>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* CSS for the outline text effect */}
      <style jsx>{`
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.5);
          transition: all 0.3s ease;
        }
        .outline-text:hover {
            color: white;
             -webkit-text-stroke: 0px transparent;
        }
        /* Ensure smooth transforms for GSAP */
        .will-change-transform {
            will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default Anotherlets;