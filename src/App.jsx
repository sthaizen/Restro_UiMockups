import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { Routes, Route } from 'react-router-dom'

// Active Section Imports
import Main from './sections/Main'
import Ctst from './sections/Ctst'
import Questions from './sections/question'
import ContactSummery from './sections/ContactSummery'
import Newwork from './sections/Newwork'
import StickNav from './sections/StickNav'
import Anotherabt from './sections/Anotherabt'
import SkillPage from './components/SkillPage/SkillPage'

const Home = () => {
  const coverSectionRef = useRef(null)

  // Track scroll progress relative to the 'Newwork' entry
  const { scrollYProgress } = useScroll({
    target: coverSectionRef,
    offset: ["start end", "start start"]
  })

  // Animation values
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

      <div className='sticky top-0 z-0 h-screen w-full overflow-hidden'>
        <motion.div
          style={{ filter, scale, opacity }}
          className='h-full w-full flex flex-col justify-center items-center'
        >
          <Main />
        </motion.div>
      </div>

      <motion.div
        className='fixed inset-0 z-[5] pointer-events-none'
        style={{ opacity: bgDarkOpacity, backgroundColor: '#0b0b0b' }}
      />

      {/* Put this section above overlay */}
      <div ref={coverSectionRef} className='relative z-20 bg-white'>
        <Newwork />
        <Anotherabt />
        <Questions /> 
        <ContactSummery /> 
        <Ctst />
      </div>

    </ReactLenis>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skill" element={<SkillPage />} />
    </Routes>
  )
}

export default App
