import React from 'react';

const FooterLink = ({ text, href = "#" }) => (
  <a href={href} className="group relative flex items-center text-[13px] text-[#e0e0e0] font-medium hover:text-white w-fit py-1.5 transition-colors">
    <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-white opacity-0 transform scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"></span>
    <span className="transform transition-transform duration-300 group-hover:translate-x-4">
      {text}
    </span>
  </a>
);

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white flex flex-col justify-between pt-16 pb-12 md:pt-24 md:pb-16 px-8 md:px-16 lg:px-24 font-sans relative overflow-hidden">
      
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 z-10">
        
        {/* Left Side: Large Text */}
        <div className="lg:w-1/2">
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] font-[300] leading-[1.1] tracking-tight max-w-[380px]">
            Proven Advanced <br className="hidden md:block" />
            Nuclear Technology
          </h2>
        </div>

        {/* Right Side: Links */}
        <div className="w-full lg:w-1/2 flex justify-between lg:justify-end gap-8 md:gap-16 lg:gap-[120px]">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-1.5">
            <FooterLink text="Company" />
            <FooterLink text="Technology" />
            <FooterLink text="Solutions" />
            <FooterLink text="Our Edge" />
            <FooterLink text="Investors" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-1.5">
            <FooterLink text="Our Team" />
            <FooterLink text="News" />
            <FooterLink text="Careers" />
            <FooterLink text="Contact Us" />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-1.5">
            <FooterLink text="LinkedIn" />
            <FooterLink text="Follow Us on X" />
          </div>

        </div>
      </div>

      {/* Middle Dot Pattern Area */}
      <div className="flex-1 w-full min-h-[120px] md:min-h-[160px] flex items-center justify-center opacity-40 z-0">
         <style>{`
           @keyframes scrollPattern {
             0% { background-position: 0px 0px; }
             100% { background-position: -400px 0px; }
           }
           .animated-dots {
             background-image: url("data:image/svg+xml,%3Csvg width='400' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Row 1 --%3E%3Ccircle cx='20' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='30' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='90' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='150' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='160' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='170' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='230' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='240' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='310' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='370' cy='15' r='1' fill='%23fff'/%3E%3Ccircle cx='380' cy='15' r='1' fill='%23fff'/%3E%3C!-- Row 2 --%3E%3Ccircle cx='50' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='60' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='120' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='200' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='210' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='280' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='290' cy='30' r='1' fill='%23fff'/%3E%3Ccircle cx='340' cy='30' r='1' fill='%23fff'/%3E%3C!-- Row 3 --%3E%3Ccircle cx='10' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='70' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='80' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='130' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='140' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='180' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='250' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='260' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='320' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='330' cy='45' r='1' fill='%23fff'/%3E%3Ccircle cx='390' cy='45' r='1' fill='%23fff'/%3E%3C/svg%3E");
             background-repeat: repeat-x;
             animation: scrollPattern 20s linear infinite;
           }
         `}</style>
         <div 
            className="w-full h-[60px] animated-dots" 
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
         ></div>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 z-10">
        
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="circleClip">
              <circle cx="20" cy="20" r="20" />
            </clipPath>
            <g clipPath="url(#circleClip)">
              <rect x="0" y="4" width="40" height="4" fill="white" />
              <rect x="0" y="12" width="40" height="4" fill="white" />
              <rect x="0" y="20" width="40" height="4" fill="white" />
              <rect x="0" y="28" width="40" height="4" fill="white" />
              <rect x="0" y="36" width="40" height="4" fill="white" />
            </g>
          </svg>
          <span className="text-[32px] font-semibold tracking-[-0.03em]">ZettaJoule</span>
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col items-start gap-2.5 text-[12px] text-[#888888] font-medium tracking-wide">
          <div className="flex flex-wrap items-center gap-6">
            <p>© 2026 ZettaJoule. All rights reserved.</p>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
          <p className="flex items-center gap-1.5">
            Designed with <span className="text-[14px] leading-none text-white">✻</span> <span className="text-white font-semibold tracking-normal text-[13px]">zypsy</span>
          </p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
