import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TechSection from "./TechSection";
import TimelineSection from "./TimelineSection";
import ProjectsSection from "./ProjectsSection";
import FooterSection from "./FooterSection";

export default function SkillPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackHome = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen lg:h-screen w-screen bg-black text-neutral-100 font-satoshi relative overflow-x-hidden lg:overflow-hidden flex flex-col lg:flex-row p-0">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neutral-900/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neutral-900/40 blur-[120px] pointer-events-none" />

      {/* Left Column: Fixed Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[520px] h-auto lg:h-full bg-black border-r border-neutral-900/40 p-8 shrink-0 overflow-hidden flex flex-col gap-8 z-10"
      >
        <Sidebar />
      </motion.div>

      {/* Right Column: Scrollable Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:h-full lg:overflow-y-auto p-8 md:p-12 lg:p-16 bg-black flex-1 z-10"
      >
        <div className="max-w-[980px] w-full flex flex-col gap-16">
          {/* Tech & Languages Section */}
          <section id="languages">
            <TechSection />
          </section>

          {/* Experience & Education Section */}
          <section id="timeline">
            <TimelineSection />
          </section>

          {/* Featured Projects Grid */}
          <section id="projects">
            <ProjectsSection />
          </section>

          {/* Let's Work Together Footer */}
          <section id="contact-me">
            <FooterSection />
          </section>
        </div>
      </motion.div>
    </div>
  );
}
