import React from "react";

// Helper component for each tech pill
function TechPill({ name, logoUrl, customIcon }) {
  return (
    <div className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-[12px] bg-[#040612] border border-[#12141a] hover:border-neutral-700/80 transition-colors duration-300 text-neutral-200">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="w-[16px] h-[16px] object-contain"
          onError={(e) => {
            // Hide image if it fails to load and fallback to text
            e.target.style.display = "none";
          }}
        />
      ) : (
        customIcon
      )}
      <span className="text-[14px] font-light text-white font-satoshi">{name}</span>
    </div>
  );
}

// Inline SVGs for tech that is not in devicon or needs custom styles
const VercelIcon = (
  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 76 65" fill="none">
    <path d="M37.5273 0L75.0546 65H0L37.5273 0Z" />
  </svg>
);

const OpenAIIcon = (
  <svg className="w-3.5 h-3.5 stroke-neutral-200 fill-none" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 019 9M12 3a9 9 0 00-9 9M12 21a9 9 0 019-9M12 21a9 9 0 00-9 9" />
  </svg>
);

const ClerkIcon = (
  <svg className="w-3.5 h-3.5 fill-neutral-200" viewBox="0 0 24 24">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
  </svg>
);

const PWAIcon = (
  <svg className="w-3.5 h-3.5 stroke-neutral-200 fill-none" viewBox="0 0 24 24" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

const MLIcon = (
  <svg className="w-3.5 h-3.5 stroke-neutral-200 fill-none" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const RenderIcon = (
  <svg className="w-3.5 h-3.5 fill-neutral-200" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
  </svg>
);

export default function TechSection() {
  const languages = [
    { name: "JavaScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TypeScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "C#", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  ];

  const frontend = [
    { name: "React", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" },
    { name: "Tailwind CSS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Redux", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "CSS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "PWA", customIcon: PWAIcon },
  ];

  const backend = [
    { name: "Django", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "ASP.NET", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
    { name: "Supabase", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    { name: "Clerk", customIcon: ClerkIcon },
    { name: "Node.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  ];

  const database = [
    { name: "PostgreSQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Oracle", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
  ];

  const misc = [
    { name: "Git", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Machine Learning", customIcon: MLIcon },
    { name: "Figma", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "AWS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Vercel", customIcon: VercelIcon },
    { name: "Render", customIcon: RenderIcon },
    { name: "OpenAI", customIcon: OpenAIIcon },
  ];

  return (
    <div className="flex flex-col gap-7">

      {/* Intro Hook */}
      <div className="shiny-text text-[30px] sm:text-[36px] lg:text-[50px] font-extralight mt-[20px] mb-[30px] leading-tight text-[#B5B5B5A4] font-satoshi">
        Just a Full Stack Developer finding purpose.
      </div>

      {/* Languages Section */}
      <div className="w-full mt-1">
        <h3 className="text-[30px] font-light mb-[16px] text-gray-200 tracking-tight font-satoshi">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <TechPill key={index} name={lang.name} logoUrl={lang.logoUrl} />
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="flex flex-col gap-6 mt-2">
        <h3 className="text-[30px] font-light  text-gray-200 tracking-tight font-satoshi">Technologies</h3>

        {/* Frontend */}
        <div className="flex flex-col">
          <h4 className="text-white font-medium text-[18px] capitalize tracking-tight mb-[8px] font-satoshi">Frontend</h4>
          <div className="flex flex-wrap gap-2">
            {frontend.map((tech, index) => (
              <TechPill key={index} name={tech.name} logoUrl={tech.logoUrl} customIcon={tech.customIcon} />
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="flex flex-col ">
          <h4 className="text-white font-medium text-[18px] capitalize tracking-tight mb-[8px] font-satoshi">Backend</h4>
          <div className="flex flex-wrap gap-2">
            {backend.map((tech, index) => (
              <TechPill key={index} name={tech.name} logoUrl={tech.logoUrl} customIcon={tech.customIcon} />
            ))}
          </div>
        </div>

        {/* Database */}
        <div className="flex flex-col ">
          <h4 className="text-white font-medium text-[18px] capitalize tracking-tight mb-[8px] font-satoshi">Database</h4>
          <div className="flex flex-wrap gap-2">
            {database.map((tech, index) => (
              <TechPill key={index} name={tech.name} logoUrl={tech.logoUrl} customIcon={tech.customIcon} />
            ))}
          </div>
        </div>

        {/* Miscellaneous */}
        <div className="flex flex-col ">
          <h4 className="text-white font-medium text-[18px] capitalize tracking-tight mb-[8px] font-satoshi">Miscellaneous</h4>
          <div className="flex flex-wrap gap-2">
            {misc.map((tech, index) => (
              <TechPill key={index} name={tech.name} logoUrl={tech.logoUrl} customIcon={tech.customIcon} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
