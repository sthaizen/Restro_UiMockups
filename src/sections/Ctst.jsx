// src/sections/Contact.jsx
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/* ----------------------- Tiny inline animation helpers ---------------------- */

const FadeInUp = ({ children, className = "", delay = 0, y = 16 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -20% 0px" }}
    transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
  >
    {children}
  </motion.div>
);

const StaggerChildren = ({
  children,
  className = "",
  itemOffset = 0.06,
  baseDelay = 0,
}) => {
  const items = React.Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <FadeInUp key={i} delay={baseDelay + i * itemOffset}>
          {child}
        </FadeInUp>
      ))}
    </div>
  );
};

const ParallaxWordmark = ({ text, sectionRef, dir }) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const wmScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.0, 1.1]);
  const wmOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.7]
  );
  const wmY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const wmRotate = dir === "down" ? 0.15 : dir === "up" ? -0.15 : 0;

  return (
    <div className="flex justify-center">
      <motion.span
        aria-hidden="true"
        className="block leading-none tracking-tight text-black pt-40 pl-100 select-none
                   text-[18vw] md:text-[12vw] lg:text-[14vw] xl:text-[21vw] font-normal
                   motion-reduce:transform-none motion-reduce:transition-none"
        style={{ scale: wmScale, opacity: wmOpacity, y: wmY, rotate: wmRotate }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        {text}
      </motion.span>
    </div>
  );
};

const CornerCopyright = ({ sectionRef, year = 2025, className = "" }) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <motion.div
      className={
        className ||
        "absolute left-[5vw] bottom-9 text-[14px] text-black select-none"
      }
      style={{ y, opacity }}
    >
      ©{year}
    </motion.div>
  );
};



const CTAButton = ({ href = "#contact" }) => (
  <a
    href={href}
    className="group inline-flex items-stretch rounded-md shadow-sm focus:outline-none focus:ring-2 gap-0.5 focus:ring-black/20"
  >
    <span className="relative bg-black px-5 py-3 text-md font-medium text-white transition-colors duration-300 group-hover:bg-[#0d13d1] overflow-hidden">
      <span className="absolute inset-0 -translate-x-full bg-[#0d13d1] transition-transform duration-300 group-hover:translate-x-0" />
      <span className="relative z-10">Schedule a call</span>
    </span>
    <span className="bg-black px-4 py-3 text-white border-l border-white/20 transition-all duration-300 group-hover:bg-[#0d13d1] group-hover:translate-x-1">
      →
    </span>
  </a>
);


const Contact = ({
  email = "mailto:you@example.com",
  whatsapp = "https://wa.me/15551234567",
  instagram = "https://www.instagram.com/rc_2555/",
  github = "https://github.com/sthaizen",
  linkedin = "https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/",
  twitter = "https://x.com/sthaaizen",
  ctaHref = "#contact",
}) => {
  const sectionRef = useRef(null);

  // one-time scroll direction tracker (for subtle tilt on wordmark)
  const { scrollY } = useScroll();
  const [dir, setDir] = useState("down");
  const [last, setLast] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setDir(latest > last ? "down" : "up");
    setLast(latest);
  });

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-20 lg:py-1 bg-[#fafafa] scroll-mt-24">
      <div className="mx-auto w-full px-[5vw] lg:px-[4vw] pt-1 md:pt-25">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10">
          {/* Left: label */}
          <FadeInUp>
            <h2 className="text-[15px] tracking-widest font-normal text-black select-none">
              [CONTACT]
            </h2>
          </FadeInUp>

          {/* Middle: links */}
          <FadeInUp>
            <StaggerChildren className="grid grid-cols-2 gap-y-6 gap-x-20" itemOffset={0.08}>
              <div className="space-y-4">
                <a href={email} className="block text-sm font-medium hover:opacity-60">
                  EMAIL
                </a>
                <a href={whatsapp} className="block text-sm hover:opacity-60">
                  WHATSAPP
                </a>
              </div>

              <div className="space-y-4">
                <a href={instagram} className="block text-sm hover:opacity-60">
                  INSTAGRAM
                </a>
                <a href={github} className="block text-sm hover:opacity-60">
                  GITHUB
                </a>
                <a href={linkedin} className="block text-sm hover:opacity-60">
                  LINKEDIN
                </a>
                <a href={twitter} className="block text-sm hover:opacity-60">
                  X (TWITTER)
                </a>
              </div>
            </StaggerChildren>
          </FadeInUp>

          {/* Right: CTA */}
          <FadeInUp className="flex md:justify-end">
            <CTAButton href={ctaHref} />
          </FadeInUp>
        </div>
      </div>


      <motion.footer
        className="relative mt-20 w-full hidden lg:block"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <CornerCopyright sectionRef={sectionRef} year={2025} />
        <ParallaxWordmark text="STAY ZI" sectionRef={sectionRef} dir={dir} />
      </motion.footer>
    </section>
  );
};

export default Contact;
