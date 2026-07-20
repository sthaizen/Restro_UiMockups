import React from 'react';

const CONFIG = {
  text: {
    title: (
      <>Build Your Restaurant<br />Website Free with RestroHub</>
    ),
    paragraph: "Through RestroHub's built-in website builder, restaurants can create a professional online presence with 12 layout blocks, 3 beautiful themes, and custom domain support — all at zero extra cost. Launch your menu, location, and booking page in minutes without any technical knowledge.",
    buttonText: "Start Building for Free",
  },
  slider: {
    speed: "30s", // Time to complete one full scroll
    images: [
      { id: 1, type: 'portrait', src: 'https://plus.unsplash.com/premium_photo-1670740967011-86730910a2e5?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 2, type: 'landscape', src: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 3, type: 'portrait', src: 'https://images.unsplash.com/photo-1651440204227-a9a5b9d19712?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 4, type: 'landscape', src: 'https://images.unsplash.com/photo-1484659619207-9165d119dafe?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 5, type: 'portrait', src: 'https://images.unsplash.com/photo-1636405188904-bc706f07aa37?q=80&w=654&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 4, type: 'landscape', src: 'https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ]
  }
};

const WebPreview = () => {
  return (
    <section className="bg-[white] py-16 md:py-24 w-full overflow-hidden bg-">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

          {/* Left Column - Title */}
          <div>
            <h2 className="text-[40px] md:text-[48px] font-light leading-tight text-black">
              {CONFIG.text.title}
            </h2>
          </div>

          {/* Right Column - Paragraph and Button */}
          <div className="flex flex-col justify-start pt-2">
            <p className="inter text-[16px] md:text-[18px] text-[#524F4B] leading-relaxed mb-8 max-w-[540px] ml-30">
              {CONFIG.text.paragraph}
            </p>

            <div className="flex items-start">
              <button className="flex items-center gap-2 group cursor-pointer ml-30">
                <div className="flex items-center justify-center bg-[#E5EFFF] text-[#1D2939] w-12 h-12 rounded transition-colors group-hover:bg-[#d0e0ff]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5v7a2 2 0 0 0 2 2h9" />
                    <path d="M16 10l4 4-4 4" />
                  </svg>
                </div>
                <div className="flex items-center justify-center border border-gray-300 px-6 h-12 rounded bg-white text-black inter font-medium text-[15px] transition-colors group-hover:bg-gray-50">
                  {CONFIG.text.buttonText}
                </div>

              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Auto Scrolling Slider */}
      <style>
        {`
          @keyframes slide-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          .animate-slide-infinite {
            animation: slide-infinite ${CONFIG.slider.speed} linear infinite;
            display: flex;
            width: max-content;
            will-change: transform;
            transform: translateZ(0);
          }
        `}
      </style>

      <div className="w-full relative overflow-hidden">
        <div className="animate-slide-infinite">
          {/* Set 1 */}
          <div className="flex gap-4 pr-4">
            {CONFIG.slider.images.map((img, idx) => (
              <div
                key={`set1-${idx}`}
                className={`flex-shrink-0 h-[300px] md:h-[464px] ${img.type === 'landscape' ? 'w-[440px] md:w-[680px]' : 'w-[215px] md:w-[332px]'}`}
              >
                <img
                  src={img.src}
                  alt="Gallery preview"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Set 2 (Duplicate for seamless loop) */}
          <div className="flex gap-4 pr-4">
            {CONFIG.slider.images.map((img, idx) => (
              <div
                key={`set2-${idx}`}
                className={`flex-shrink-0 h-[300px] md:h-[464px] ${img.type === 'landscape' ? 'w-[440px] md:w-[680px]' : 'w-[215px] md:w-[332px]'}`}
              >
                <img
                  src={img.src}
                  alt="Gallery preview duplicate"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebPreview;
