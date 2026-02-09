import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import ReactLenis from 'lenis/react'

// Section Imports
import Navbar from './sections/Navbar'
import ServiceSummery from './sections/ServiceSummery'
import Services from './sections/Services'
import About from './sections/About'
import Works from './sections/Works'
import ContactSummery from './sections/ContactSummery'
import Contact from './sections/Contact'
import Main from './sections/Main'
import Ctst from './sections/Ctst'
import Questions from './sections/question'
import Testimonial from './sections/Testimonial'
import AboutSection from './sections/Newabout'
import Newwork from './sections/Newwork'
import Projects from './sections/Projects'
import StickNav from './sections/StickNav'

const App = () => {
  const coverSectionRef = useRef(null)

  // Track scroll progress relative to the 'Newwork' entry
  const { scrollYProgress } = useScroll({
    target: coverSectionRef,
    offset: ["start end", "start start"]
  })

  // Your existing animations (keep)
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const filter = useMotionTemplate`brightness(${brightness})`


const bgDarkOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 0.7])

  return (
    <ReactLenis root className='relative w-screen min-h-screen'>

      <div className='fixed top-0 left-0 w-full z-[100] '>
        <StickNav />
      </div>

      <div className='relative z-10'>
        <Main />
      </div>

      <div className='sticky top-0 z-0 h-screen w-full overflow-hidden'>
        <motion.div
          style={{ filter, scale, opacity }}
          className='h-full w-full flex flex-col justify-center items-center'
        >
          <ServiceSummery />
        </motion.div>
      </div>

     
      <motion.div
        className='fixed inset-0 z-[5] pointer-events-none'
        style={{ opacity: bgDarkOpacity, backgroundColor: '#0b0b0b' }}
      />

      {/* Put this section above overlay */}
      <div ref={coverSectionRef} className='relative z-20 bg-white'>
        <Newwork />
        <AboutSection />
        <Testimonial />
        <Questions />
        <ContactSummery />
        <Ctst />
      </div>

    </ReactLenis>
  )
}

export default App
