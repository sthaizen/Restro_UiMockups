import React from "react";

// Inline SVGs for company/academic branding
const FreelanceIcon = (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="42" stroke="url(#silverGradient)" strokeWidth="3" />
    <circle cx="50" cy="50" r="34" stroke="url(#silverGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
    <defs>
      <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#666666" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
    </defs>
  </svg>
);

const OctacoreIcon = (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="2" />
    <path d="M 50 10 A 40 40 0 0 1 85 30 L 68 40 A 20 20 0 0 0 50 30 Z" fill="#1d4ed8" />
    <path d="M 85 30 A 40 40 0 0 1 90 70 L 73 60 A 20 20 0 0 0 70 40 Z" fill="#2563eb" />
    <path d="M 90 70 A 40 40 0 0 1 50 90 L 50 70 A 20 20 0 0 0 68 60 Z" fill="#3b82f6" />
    <path d="M 50 90 A 40 40 0 0 1 15 70 L 32 60 A 20 20 0 0 0 50 70 Z" fill="#60a5fa" />
    <path d="M 15 70 A 40 40 0 0 1 10 30 L 27 40 A 20 20 0 0 0 30 60 Z" fill="#93c5fd" />
    <path d="M 10 30 A 40 40 0 0 1 50 10 L 50 30 A 20 20 0 0 0 27 40 Z" fill="#1e40af" />
    <polygon points="50,38 60,44 60,56 50,62 40,56 40,44" fill="#ffffff" />
  </svg>
);

const EducationIcon = (
  <svg className="w-full h-full stroke-neutral-400 fill-none p-2.5" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-4c0-1 1-2 2-2h4c1 0 2 1 2 2v4" />
  </svg>
);

// Helper component for each timeline item
function TimelineItem({ title, subtitle, date, description, bullets, customIcon, logoUrl }) {
  return (
    <div className="relative pl-[50px] pb-[32px] group">
      {/* Timeline Line */}
      <div className="absolute left-[9px] top-[5px] bottom-[22px] w-[1px] bg-[#1f2938]" />

      {/* Timeline Dot */}
      <span className="absolute left-[3px] top-[20px] flex h-[12px] w-[12px] z-10 ">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-[12px] w-[12px] bg-white transition-transform group-hover:scale-125 duration-300"></span>
      </span>
      <div className="flex flex-col gap-[1px]">
        {/* Header content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-[14px] gap-[16px]">
          <div className="flex items-center gap-[12px]">
            {/* Logo box */}
            <div className="w-[68px] h-[68px] rounded-full overflow-hidden flex items-center justify-center border border-[#12141a] bg-[#040612] shrink-0">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={subtitle}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                customIcon
              )}
            </div>
            <div>
              <h3 className="text-[20px] font-semibold text-white mb-[2px] tracking-relax font-satoshi">{title}</h3>
              <p className="text-neutral-400 text-[14px] font-satoshi">{subtitle}</p>
            </div>
          </div>
          <span className="text-[14px] font-light bg-[#040712] border border-[#111726] px-[16px] py-[6px] rounded-full text-gray-400 font-satoshi self-start sm:self-center">
            {date}
          </span>
        </div>

        {/* Details */}
        {description && (
          <p className="text-gray-300 mb-[12px] leading-relaxed font-light text-[14px] sm:text-[16px] max-w-[800px] font-satoshi">
            {description}
          </p>
        )}

        {bullets && bullets.length > 0 && (
          <ul className="list-none flex flex-col gap-[9px] max-w-[800px]">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="text-[#959ba9] leading-relaxed text-[14px] font-light flex items-start gap-[8px] font-satoshi">
                <span className="text-[#959ba9] mt-[-2px] text-[25px] shrink-0 leading-none">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const experiences = [
    {
      title: "Freelance Full Stack Developer",
      subtitle: "Self-Employed, Remote",
      date: "Jul 2025 - Present",
      customIcon: FreelanceIcon,
      description: "Currently providing full-stack development services to multiple clients, focusing on building scalable systems, enhancing user experiences, and maintaining reliable backend operations.",
      bullets: [
        "Designing and developing responsive and intuitive user interfaces based on client requirements.",
        "Building and maintaining scalable backend systems to support business growth.",
        "Architecting modular and maintainable application structures for long-term performance.",
        "Collaborating with clients to define goals, gather feedback, and refine product features.",
      ],
    },
    {
      title: "Student Academic Representative",
      subtitle: "Islington College, Kamal Marg, Kathmandu",
      date: "Oct 2024 - May 2025",
      logoUrl: "https://islington.edu.np/wp-content/uploads/2023/04/Islington-Logo-1.png",
    },
    {
      title: "Full Stack Intern",
      subtitle: "Octacore Solutions Pvt Ltd, Jamal, Kathmandu",
      date: "Mar 2024 - Sep 2024",
      customIcon: FreelanceIcon,
      description: "Worked on various projects to create interactive user interfaces, modify backend functionalities, and integrate APIs with the frontend for a seamless user experience.",
      bullets: [
        "Developed pixel-perfect, responsive user interfaces for 3+ client projects.",
        "Built and integrated backend APIs and wrote custom logic to enhance application functionality.",
        "Collaborated with the development team to streamline backend logic and improve performance.",
      ],
    },
  ];

  const education = [
    {
      title: "BSc (Hons) Computing",
      subtitle: "Islington College, Kamal Marg, Kathmandu",
      date: "Nov 2023 - Jun 2026",
      logoUrl: "https://islington.edu.np/wp-content/uploads/2023/04/Islington-Logo-1.png",
    },
    {
      title: "School Leaving Certificate",
      subtitle: "Bishnu Memorial Collage , Kamaladi, Kathmandu",
      date: "Jul 2021 - Jun 2023",
      customIcon: FreelanceIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-[56px] mt-[10px]">

      {/* Experience */}
      <div className="flex flex-col">
        <h2 className="text-[40px] font-extralight mb-[48px] leading-normal tracking-normal text-white font-satoshi">Experience</h2>
        <div>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              title={exp.title}
              subtitle={exp.subtitle}
              date={exp.date}
              description={exp.description}
              bullets={exp.bullets}
              customIcon={exp.customIcon}
              logoUrl={exp.logoUrl}
            />
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col">
        <h2 className="text-[40px] font-extralight mb-[48px] leading-normal tracking-normal text-white font-satoshi">Education</h2>
        <div>
          {education.map((edu, index) => (
            <TimelineItem
              key={index}
              title={edu.title}
              subtitle={edu.subtitle}
              date={edu.date}
              customIcon={edu.customIcon}
              logoUrl={edu.logoUrl}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
