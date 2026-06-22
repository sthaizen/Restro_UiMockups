import React from 'react';

const RollingText = ({ text }) => (
  <span className="relative overflow-hidden inline-block">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[120%]">
      {text}
    </span>
    <span className="absolute inset-0 translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" aria-hidden="true">
      {text}
    </span>
  </span>
);

export default RollingText;
