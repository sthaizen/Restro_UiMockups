import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { FrameWorks } from "../components/FrameWorks";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  
   const  grid2Container = useRef();
    const text = `Passionate about intuitive design I craft
     responsive, user-friendly apps from
     concept to deployment`;

      useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    // Cards entrance animation
    gsap.fromTo(".grid-card", 
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#cards",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Card hover animations
    const cards = document.querySelectorAll('.grid-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

  }, []);






  return (
    <section id="about" className="min-h-screen  bg-[#fafafa] text-white rounded-b-4xl pb-28">
      {/* <h2 className="text-heading pl-20 ">About Me</h2>  */}
       {/* <AnimatedHeaderSection
        subTitle={"Crafted with vision, Engineered for growth"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />  */}


      <div>
      <div id="cards" className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-8 scale-90 transition-all">
         {/* card 1 */}
      <div className="grid-card flex items-end grid-default-color11 grid-1 relative">

        <spline-viewer 
          url="https://prod.spline.design/aIu8ufxpZlVb9MK5/scene.splinecode"
          class="absolute w-full h-full md:scale-[2] lg:scale-[1.5]">
        </spline-viewer>

        <div className="z-10 relative">
          <p className="headtext">Heyy I'm Yathartha Shrestha</p>
          <p className="subtext">
            I believe in coding with purpose turning ideas into digital experiences 
            that are clean, responsive, and meaningful.
          </p>
        </div>
      </div>






        {/* carld 2 */}
        <div className="grid-card grid-default-color grid-2 ">
        <div ref={grid2Container}
          className="flex items-center justify-center w-full h-full">
          <p className="flex items-end text-3xl sm:text-4xl md:text-5xl text-gray-00 font-normal ">
            CODE IS CRAFT
          </p>
          
          {/* Cards hidden on mobile (below md breakpoint) */}
          <div className="hidden md:block">
            <Card 
              style={{ rotate: "5deg", top: "10%", left: "20%" }}
              text="GSAP"
              contaionerRef={grid2Container}/>

            <Card 
              style={{ rotate: "10deg", top: "70%", left: "35%" }}
              text="SOLID"
              contaionerRef={grid2Container}/>

            <Card 
              style={{ rotate: "30deg", bottom: "10%", left: "75%" }}
              text="DESIGN PATTERN"
              contaionerRef={grid2Container}/>

            <Card 
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="DESIGN NORMS"
              contaionerRef={grid2Container}/>

            <Card 
              style={{ rotate: "20deg", top: "10%", left: "70%" }}
              text="SRP"
              contaionerRef={grid2Container}/>
          </div>

          {/* <Card 
          style={{ rotate: "20deg", top: "10%", left: "48%" }}
            image={"assets/logos/visualstudiocode.svg"}
            contaionerRef={grid2Container}/>

          <Card 
            style={{ rotate: "30deg", top: "50%", left: "50%" }}
            image={"assets/logos/css3.svg"}
            contaionerRef={grid2Container}/>

          <Card 
            style={{ rotate: "-45deg", top: "70%", left: "25%" }}
            image={"assets/logos/react.svg"}
            contaionerRef={grid2Container}/>

          <Card 
          style={{ rotate: "-45deg", top: "5%", left: "10%" }}
            image={"assets/logos/tailwindcss.svg"}
            contaionerRef={grid2Container}/> */}
        </div>
      </div>




        {/* card 3 */}
        <div className="grid-card  flex items-end grid-black-color grid-3 ">
           <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%] ">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in Nepal, and open to remote work worldwide
            </p>
          </div>
         
         
          </div>
           <figure className="absolute left-[60%] top-[0%]">
              <Globe />
          </figure>
        </div>




        {/* card 4  */}
        <div className="grid-card grid-special-color grid-4 ">
            <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
            
          </div>

        </div>




        {/* card 5 */}
        <div class="grid-card grid-default-color12 grid-5">
          <div class="relative z-10 w-[50%] space-y-4">
        
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js"></script>
            {/* <spline-viewer
              url="https://prod.spline.design/k7qMue10TAM71vOr/scene.splinecode"
              class="pointer-events-auto absolute scale-[1.75] -right-[9rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.3] pl-100 pb-40 pr-60"
              aria-label="Interactive Tech Arsenal 3D scene"
            ></spline-viewer> */}

            <p class="headText text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              ⚡ Tech Arsenal
            </p>
            <p class="subtext text-gray-300 leading-relaxed text-3xl">
              Crafting scalable and high-performance solutions with a mix of modern
              <span class="font-semibold text-white">languages, frameworks,</span>
              and <span class="font-semibold text-white">engineering tools</span>.
              Every project is powered by clean architecture, design principles,
              and future-ready practices.
            </p>
          </div>
        </div>
 
        
        </div>

      </div>
    </section>
  )
}

export default About;