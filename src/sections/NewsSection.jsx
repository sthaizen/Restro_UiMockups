import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  parallax: {
    yPercentChange: 10,
    scrubSpeed: 1,
  },
  lines: {
    vertical: {
      color: "#cfcdc9",
      thickness: "1.5px",
    },
    horizontal: {
      color: "#cfcdc9",
      thickness: "1px",
    }
  },
  images: {
    width: "426px",
    height: "450px",
  },
  content: {
    header: {
      tag: "Restro Management",
      title: (
        <>Leveraging AI to Reduce Costs<br className="hidden md:block" /> and Accelerate Service</>
      ),
      description: "We are harnessing artificial intelligence and real-time data tracking to reduce costs and accelerate the delivery of exceptional dining experiences by maximizing operational efficiency and minimizing human errors."
    },
    cards: [
      {
        id: 1,
        imageSrc: "https://images.unsplash.com/photo-1628626794407-be88168a4fd2?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Real-Time Order Tracking",
        description: "We have the ability to sync kitchen and front-of-house data in real time - ensuring that orders and modifications align perfectly with guest requests, reducing the risk of costly mistakes and service delays."
      },
      {
        id: 2,
        imageSrc: "https://images.unsplash.com/photo-1636405189493-181ecf851006?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Streamlined Inventory",
        description: "We use smart tools to analyze complex multi-source ingredient data to improve supply chain management and reduce stock miscalculations – resulting in significant time and cost savings."
      },
      {
        id: 3,
        imageSrc: "https://plus.unsplash.com/premium_photo-1740654580691-a9d48e8ce51c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Predictive Staffing",
        description: "Once your restaurant is operational, AI predictive analytics will analyze historical foot traffic to anticipate busy periods, optimize shifts and schedule staff more accurately than possible using conventional methods."
      }
    ]
  }
};

const NewsSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".news-animate-header", {
        y: 20,
        opacity: 0.8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".news-animate-header",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Image Parallax Animation
      const images = gsap.utils.toArray('.news-parallax-image');
      images.forEach((img) => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-16 md:py-24 px-4 sm:px-8 w-full">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Top Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 mb-16 md:mb-20 md:-mx-8 news-animate-header">
          <div className="md:px-8 mb-8 md:mb-0">
            <h3 className="inter font-medium text-[14px] text-black">
              {CONFIG.content.header.tag}
            </h3>
          </div>
          <div className="md:col-span-2 md:px-8 md:-ml-12 lg:-ml-30">
            <h2 className="text-[40px] md:text-[48px] font-light leading-tight text-black mb-6 inter">
              {CONFIG.content.header.title}
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#524F4B] leading-relaxed max-w-[800px]">
              {CONFIG.content.header.description}
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <style>
          {`
            .custom-dividers {
              border-bottom: ${CONFIG.lines.horizontal.thickness} solid ${CONFIG.lines.horizontal.color};
            }
            @media (min-width: 768px) {
              .custom-dividers > *:not(:first-child) {
                border-left: ${CONFIG.lines.vertical.thickness} solid ${CONFIG.lines.vertical.color};
                border-top: none;
              }
            }
            @media (max-width: 767px) {
              .custom-dividers > *:not(:first-child) {
                border-top: ${CONFIG.lines.horizontal.thickness} solid ${CONFIG.lines.horizontal.color};
                border-left: none;
              }
            }
          `}
        </style>
        <div className="custom-dividers grid grid-cols-1 md:grid-cols-3 md:-mx-8">
          {CONFIG.content.cards.map((card, index) => (
            <div
              key={card.id}
              className={`flex flex-col md:px-8 ${index === 0 ? 'pb-12 md:pb-16 pt-8 md:pt-0' :
                index === 1 ? 'py-12 md:pt-0 md:pb-16' :
                  'pt-12 md:pt-0 pb-12 md:pb-16'
                }`}
            >
              <div
                className="mb-8 relative overflow-hidden group cursor-pointer"
                style={{
                  width: CONFIG.images.width,
                  height: CONFIG.images.height,
                  maxWidth: "100%"
                }}
              >
                <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%]">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="news-parallax-image absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1]"
                  />
                </div>
              </div>
              <h4 className="inter font-medium text-[21px] text-black mb-4">
                {card.title}
              </h4>
              <p className="inter text-[18px] text-[#524F4B] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
