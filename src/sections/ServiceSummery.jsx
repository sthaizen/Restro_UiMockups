import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

const ServiceSummery = () => {
    useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#title-service-1", {
    xPercent: 10,
    scrollTrigger: {
      trigger: "#title-service-1",
      scrub: true,
    },
  });

  gsap.to("#title-service-2", {
    xPercent: -15,
    scrollTrigger: {
      trigger: "#title-service-2",
      scrub: true,
    },
  });

  gsap.to("#title-service-3", {
    xPercent: 20,
    scrollTrigger: {
      trigger: "#title-service-3",
      scrub: true,
    },
  });

  gsap.to("#title-service-4", {
    xPercent: -20,
    scrollTrigger: {
      trigger: "#title-service-4",
      scrub: true,
    },
  });
});

    
    
  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive ">
        <div id="title-service-1">
            <p>
                Figma/Framer 
            </p>
        </div>
        <div id="title-service-2" className="flex items-center justify-center gap-3 translate-x-16">
            <p className="font-semibold">
                JavaScript
            </p>
            <div className="w-10 h-1 md:w-32 bg-gold"/>
            <p>React</p>
            <div className="w-10 h-1 md:w-32 bg-gold"/>
            <p>Express</p>
        </div>
        <div 
        id="title-service-3"
        className="flex items-center justify-center gap-3 -translate-x-48">
        <p>MongoDB</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p className="italic">Frontends</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>Tailwind</p>
      </div>

      <div id="title-service-4" className="translate-x-48">
        <p>GSAP</p>
      </div>
      

        
    </section>
  )
}

export default ServiceSummery