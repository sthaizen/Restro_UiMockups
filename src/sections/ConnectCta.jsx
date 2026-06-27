import React from 'react';

const CONFIG = {
  text: {
    highlight: 'Connect With Us.',
    body: ' Our team is here to provide information on our advanced technology and performance capabilities.',
  },
  cta: 'Contact Our Team',

  contentLayout: {
    justifyContent: 'center',
    headingMarginTopPx: 120,
    headingMarginBottomPx: 48,
    headingMarginLeftPx: 0,
    buttonMarginTopPx: 10,
    buttonMarginBottomPx: 0,
    buttonMarginLeftPx: 0,
  },
  images: {
    img1: {
      src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=820&auto=format&fit=crop&ixlib=rb-4.1.0',
      alt: 'Food close-up shot',
      widthPx: 400,
      heightPx: 520,
    },
    img2: {
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0',
      alt: 'Restaurant ambiance',
      widthPx: 460,
      heightPx: 720,
    },
  },
  layout: {
    leftColumnWidthPx: 420,
    rightColumnWidthPx: 520,
    totalHeightPx: 720,
    gapPx: 12,
  }
};

const ConnectCta = ({ text = CONFIG.text, cta = CONFIG.cta, images = CONFIG.images, layout = CONFIG.layout, contentLayout = CONFIG.contentLayout }) => {
  return (
    <section className="w-full bg-[#1b1b1b] overflow-hidden font-sans text-white">
      <div className="w-full max-w-[1860px] mx-auto px-8 md:px-16 lg:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

        <div
          className="flex flex-col h-full min-h-[400px] py-4"
          style={{ justifyContent: contentLayout.justifyContent }}
        >

          <div className="text-[#d3e7ff] opacity-80">
          </div>

          <div
            style={{
              marginTop: contentLayout.headingMarginTopPx,
              marginBottom: contentLayout.headingMarginBottomPx,
              marginLeft: contentLayout.headingMarginLeftPx
            }}
          >
            <h2 className="font-light leading-[1.35] tracking-[-0.015em] max-w-[480px] text-[32px] md:text-[40px]">
              <span className="text-[#f4f4f4]">{text.highlight}</span>
              <span className="text-[#888888]">{text.body}</span>
            </h2>
          </div>

          <div
            style={{
              marginTop: contentLayout.buttonMarginTopPx,
              marginBottom: contentLayout.buttonMarginBottomPx,
              marginLeft: contentLayout.buttonMarginLeftPx
            }}
          >
            <button className="flex items-stretch group cursor-pointer">
              <div className="flex items-center justify-center bg-[#E5EFFF] text-[#1D2939] w-12 h-12 rounded-l transition-colors group-hover:bg-[#d0e0ff]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5v7a2 2 0 0 0 2 2h9" />
                  <path d="M16 10l4 4-4 4" />
                </svg>
              </div>
              <div className="flex items-center justify-center border border-l-0 border-gray-700 px-6 h-12 rounded-r bg-transparent text-[#f4f4f4] font-medium text-[15px] transition-colors group-hover:bg-white/5">
                {cta}
              </div>
            </button>
          </div>

        </div>

        <div
          className="flex flex-row items-start w-full"
          style={{ height: layout.totalHeightPx, gap: layout.gapPx }}
        >

          <div
            className="flex flex-col items-center justify-center flex-shrink-0"
            style={{ width: layout.leftColumnWidthPx, height: layout.totalHeightPx }}
          >
            <div
              className="overflow-hidden"
              style={{ width: images.img1.widthPx, height: images.img1.heightPx }}
            >
              <img
                src={images.img1.src}
                alt={images.img1.alt}
                className="w-full h-full object-cover object-center block"
              />
            </div>
          </div>

          <div
            className="flex-shrink-0 overflow-hidden"
            style={{ width: images.img2.widthPx, height: images.img2.heightPx }}
          >
            <img
              src={images.img2.src}
              alt={images.img2.alt}
              className="w-full h-full object-cover object-center block"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default ConnectCta;