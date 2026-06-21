import React, { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Active Section Imports
import Main from './sections/Main';
import Ctst from './sections/Ctst';
import Questions from './sections/question';
import ContactSummery from './sections/ContactSummery';
import Newwork from './sections/Newwork';
import Anotherabt from './sections/Anotherabt';
import SkillPage from './components/SkillPage/SkillPage';

const Home = () => {
  const location = useLocation();

  // Replaced window.location with React Router's useLocation hook
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location.hash]);

  return (
    <ReactLenis root className='relative w-screen min-h-screen'>

      {/* FIX 1: Removed 'fixed h-full' wrapper. 
        Main now sits naturally in the document flow, allowing it to dictate its own height.
      */}
      <div className="sticky top-0 z-0 w-full  pointer-events-auto">
        <Main />
      </div>


      <div className="relative z-10 bg-[#fafafa] shadow-[0_-10px_50px_rgba(0,0,0,0.12)]">
        <Newwork />
        <Anotherabt />
        <Questions />
        <ContactSummery />
        <Ctst />
      </div>

    </ReactLenis>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skill" element={<SkillPage />} />
    </Routes>
  );
}

export default App;