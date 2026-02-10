import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TABS = [
  {
    id: 1,
    label: "Getting Ready",
    title: (
      <>
        <span className="text-gray-400">Personalised</span>
        <br />
        <span className="text-gray-900">to your company needs</span>
      </>
    ),
    points: [
      "Quick start for simple set-ups",
      "Personalised project plans for complex technical requirements",
      "Designed for larger companies",
    ],
  },
  {
    id: 2,
    label: "Starting Off",
    title: (
      <>
        <span className="text-gray-400">Close collaboration</span>
        <br />
        <span className="text-gray-900">with your team</span>
      </>
    ),
    points: [
      "Dedicated contact persons",
      "Consulting on the best possible integration into your existing ecosystem",
      "Implementation of software customisations",
    ],
  },
  {
    id: 3,
    label: "Long-term Partnership",
    title: (
      <>
        <span className="text-gray-400">On your side for</span>
        <br />
        <span className="text-gray-900">long-term success</span>
      </>
    ),
    points: [
      "Pilot phase and company-wide launch",
      "Monitoring and check-ins for maximal adoption rates",
      "Up to 5x faster processes – long-term",
    ],
  },
];

export default function PartnerTabs() {
  const [active, setActive] = useState(0);

  const wrapRef = useRef(null);
  const tabBarRef = useRef(null);
  const pillRef = useRef(null);
  const tabBtnRefs = useRef([]);
  const cardRefs = useRef([]);

  const movePill = (index, immediate = false) => {
    const btn = tabBtnRefs.current[index];
    const bar = tabBarRef.current;
    const pill = pillRef.current;
    if (!btn || !bar || !pill) return;

    const btnRect = btn.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();

    const x = btnRect.left - barRect.left;
    const w = btnRect.width;
    const h = btnRect.height;

    gsap.to(pill, {
      x,
      width: w,
      height: h,
      duration: immediate ? 0 : 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  useLayoutEffect(() => {
    movePill(active, true);

    const onResize = () => movePill(active, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    movePill(active, false);

    const card = cardRefs.current[active];
    if (card) {
      gsap.fromTo(
        card,
        { y: 10, opacity: 0.85 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section ref={wrapRef} className="bg-[#fafafa] py-20 font-sans">
      <div className="w-[1480px] max-w-[1480px] mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] sm:text-[42px] lg:text-[54px] font-semibold leading-[1.2] text-black inter">
            <span className="text-gray-400">We are your partner</span>
            <br />
            <span className="text-gray-950">from the very beginning</span>
          </h2>

          <p className="mt-6 mx-auto max-w-[860px] text-[18px] leading-relaxed text-gray-700 inter">
            While small companies benefit from a fast and simple set-up, our team
            supports larger customers with more complex processes through a smooth
            project launch and long-term collaboration. We'll partner with you to
            consider the intricacies of your current ecosystem.
          </p>
        </div>

        {/* Tabs bar */}
        <div className="mt-[54px]">
          <div
            ref={tabBarRef}
            className="
              relative
              h-[50.64px]
              bg-[#E5E7EB]
              rounded-full
              px-[4px]
              flex items-center
              gap-0
            "
          >
            {/* Moving pill — now hugs the active button */}
            <div
              ref={pillRef}
              className="
                absolute left-0 top-[4px]
                bg-white
                rounded-full
                shadow-[0_2px_8px_rgba(0,0,0,0.10)]
                border border-black/5
                will-change-transform
                pointer-events-none
              "
              style={{ width: 0, height: 0, transform: "translateX(0px)" }}
            />

            {TABS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabBtnRefs.current[i] = el)}
                  onClick={() => setActive(i)}
                  className="
                    relative z-10
                    flex-1
                    h-[42.64px]
                    rounded-full
                    flex items-center justify-center
                    text-[15px]
                    font-medium
                    transition-colors duration-200
                    select-none
                    cursor-pointer
                  "
                  style={{
                    color: isActive ? "#111827" : "#6B7280",
                  }}
                >
                  <span className="inline-flex items-center gap-2.5">
                    {isActive && (
                      <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#43A346] flex-shrink-0">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                    <span className="whitespace-nowrap">{t.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14">
          <div className="flex gap-6 items-stretch">
            {TABS.map((t, i) => {
              const isActive = i === active;

              return (
                <div key={t.id} className="flex-1">
                  <div
                    ref={(el) => (cardRefs.current[i] = el)}
                    className="
                      rounded-[14px]
                      transition-all
                      duration-300
                    "
                    style={{
                      minHeight: "388.83px",
                      padding: "52px 36px",
                      opacity: isActive ? 1 : 0.4,
                      filter: isActive ? "none" : "grayscale(0.1)",
                      transform: isActive ? "translateY(0px)" : "translateY(4px)",
                      backgroundColor: isActive ? "#F3F4F6" : "#F9FAFB",
                      
                    }}
                  >
                    <h3
                      className="text-center text-[32px] leading-[1.2]  inter"
                      style={{
                        color: isActive ? undefined : "#9CA3AF",
                      }}
                    >
                      {t.title}
                    </h3>

                    <div className="mt-20 space-y-3">
                      {t.points.map((p, idx) => (
                        <div key={idx} className="flex items-start gap-3 inter">
                          <div
                            className="mt-[0px] w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 "
                            style={{
                              backgroundColor: isActive ? "#43A346" : "#D1D5DB",
                            }}
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          <p
                            className="text-[17px] leading-relaxed"
                            style={{
                              color: isActive ? "#374151" : "#9CA3AF",
                            }}
                          >
                            {p}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}