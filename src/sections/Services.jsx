import React, { useRef } from 'react'
import AnimatedHeaderSection from '../components/AnimatedHeaderSection'
import { servicesData } from '../constants'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { div } from 'framer-motion/client'

const Services = () => {
    const text = "i build secure, highperformance, fullstack apps \n with smoothUX to drive growth not \nheadaches."
    const serviceRefs = useRef([])
    const isDesktop = useMediaQuery({minWidth: "48rem"}) 
    useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
 
    return (
    <section id="services" className='min-h-screen bg-black rounded-t-4xl'>
        <AnimatedHeaderSection 
        subTitle={"Behind the scene, beyond the screen"} 
        title={"Service"} 
        text={text} 
        textColor={"text-white"}
        withScrollTrigger ={true}
        />
        
        {servicesData.map((service, index)=>(
            <div ref={(el)=>(serviceRefs.current[index] = el)} key = {index} 
            className='sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 top-0'
            style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >

                    <div className='flex item-center justify-between gap-4 font-light'>
                        <div className='flex flex-col gap-6'>
                            <h2 className='text-4xl lg:text-5xl'>
                                {service.title}
                                <div className=''>

                                </div>
                            
                              
                        

                            </h2>
                            <p className='text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty'>
                                {service.description}
                            </p>

                            <div className='flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80'>
                                {service.items.map((item, itemIndex) =>(
                                    <div key={`item-${index}-${itemIndex}`}> 
                                    <h3 className='flex'>
                                        <span className='mr-12 text-lg text-white/30'>0{itemIndex + 1}</span>
                                        {item.title}
                                        
                                    </h3>
                                    {/* <h4 className='flex'>
                                        <span className='mr-12 text-[20px]  text-white/40  pl-15 pt-2'>
                                          {item.description}
                                        </span>
                                        
                                    </h4> */}

                                    {itemIndex <service.items.length -1 && (
                                         <div className='w-full h-px my-2 bg-white/30'/>
                                    )}

                                   


                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
            </div>
        ))}

    </section>
    
  )
}

export default Services