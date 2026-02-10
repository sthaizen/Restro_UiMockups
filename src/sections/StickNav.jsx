import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  forwardRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Navigation links
const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "Resume" },
  { href: "#contact", label: "About" },
];

// Register plugin safely (avoids SSR issues)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StickNav = forwardRef(function StickNav(props, ref) {
  const { className = "", ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  // Local refs
  const headerEl = useRef(null);
  const desktopLinks = useRef([]);
  const menuEl = useRef(null);
  const mobileLinks = useRef([]);

  const mobileTl = useRef(null);


  // Merge forwarded ref + local ref
  const setHeaderRef = (node) => {
    headerEl.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  // Intro animation
  useLayoutEffect(() => {
    if (!headerEl.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerEl.current, {
        y: -18,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(desktopLinks.current.filter(Boolean), {
         y: -18,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",

      });
    }, headerEl);

    return () => ctx.revert();
  }, []);



  // Mobile menu timeline (create once)
  useLayoutEffect(() => {
    if (!menuEl.current) return;

    const ctx = gsap.context(() => {
      gsap.set(menuEl.current, { height: 0, autoAlpha: 0, y: -8 });
      menuEl.current.style.pointerEvents = "none";

      mobileTl.current = gsap
        .timeline({ paused: true })
        .to(menuEl.current, {
          height: "auto",
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          onStart: () => (menuEl.current.style.pointerEvents = "auto"),
          onReverseComplete: () => (menuEl.current.style.pointerEvents = "none"),
        })
        .from(
          mobileLinks.current.filter(Boolean),
          {
            y: -6,
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.15"
        );
    }, menuEl);

    return () => ctx.revert();
  }, []);

  // Play / reverse mobile menu animation
  useEffect(() => {
    if (!mobileTl.current) return;
    if (mobileOpen) mobileTl.current.play();
    else mobileTl.current.reverse();
  }, [mobileOpen]);

  return (
    <header
      ref={setHeaderRef}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 md:py-5
        bg-[#fafafa]/80 backdrop-blur supports-[backdrop-filter]:bg-[#fafafa]/90
        will-change-transform ${className}`}
      {...rest}
    >
      <div className="font-AlexBrush font-bold text-[18px] tracking-wide text-zinc-900 ml-1 md:ml-7 uppercase">
        Stay  
      </div>

      {/* Desktop Nav */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-[2.5rem] text-[13px] font-semibold"
      >
        {navLinks.map(({ href, label }, i) => (
          <a
            key={href}
            href={href}
            ref={(el) => {
              if (el) desktopLinks.current[i] = el;
            }}
            className="text-black/70 hover:text-[#ffca6e] transition-all duration-500"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          type="button"
          className="inline-flex flex-col justify-center items-center w-9 h-9 space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu (GSAP animated) */}
      <div
        id="mobile-nav"
        ref={menuEl}
        className="absolute left-0 right-0 top-full md:hidden overflow-hidden
          bg-[#fafafa]/95 backdrop-blur border-t border-black/5"
      >
        <nav className="flex flex-col px-6 py-5 gap-4 text-[13px] font-semibold">
          {navLinks.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              ref={(el) => {
                if (el) mobileLinks.current[i] = el;
              }}
              onClick={() => setMobileOpen(false)}
              className="text-black/70 hover:text-[#ffca6e] transition-all duration-500"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
});

StickNav.displayName = "StickNav";
export default StickNav;
