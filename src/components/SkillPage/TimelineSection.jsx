import React from "react";

// Helper component for each timeline item
function TimelineItem({ title, subtitle, date, description, bullets, logoText, logoBg, logoUrl }) {
  return (
    <div className="relative pl-10 pb-12 last:pb-4 group">
      {/* Timeline Line */}
      <div className="absolute left-[9px] top-2 bottom-0 w-[2px] bg-neutral-800/80 group-last:hidden" />

      {/* Timeline Dot */}
      <div className="absolute left-[5px] top-2.5 w-[10px] h-[10px] rounded-full bg-white border border-neutral-900 z-10 transition-transform group-hover:scale-125 duration-300" />

      <div className="flex flex-col gap-4">
        {/* Header content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* Logo box */}
            <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-neutral-800 bg-neutral-950 font-bold text-sm tracking-wide ${logoBg} text-white shrink-0`}>
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
                <span>{logoText}</span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
              <p className="text-neutral-400 text-sm">{subtitle}</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-neutral-400 font-semibold self-start sm:self-center font-satoshi tracking-wide">
            {date}
          </span>
        </div>

        {/* Details */}
        {description && (
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl font-satoshi">
            {description}
          </p>
        )}

        {bullets && bullets.length > 0 && (
          <ul className="list-none space-y-2 max-w-2xl">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="text-neutral-500 text-sm leading-relaxed flex items-start gap-2 font-satoshi">
                <span className="text-neutral-600 mt-1.5 shrink-0">•</span>
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
      logoText: "FL",
      logoBg: "bg-gradient-to-tr from-amber-600 to-orange-500",
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
      logoText: "IC",
      logoBg: "bg-gradient-to-tr from-blue-700 to-cyan-500",
      description: "Represented student concerns and facilitated communication between student body and college academic board.",
    },
    {
      title: "Full Stack Intern",
      subtitle: "Octacore Solutions Pvt Ltd, Jamal, Kathmandu",
      date: "Mar 2024 - Sep 2024",
      logoText: "OS",
      logoBg: "bg-gradient-to-tr from-purple-700 to-pink-500",
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
      date: "Nov 2022 - Jun 2025",
      logoText: "IC",
      logoBg: "bg-gradient-to-tr from-blue-700 to-cyan-500",
    },
    {
      title: "School Leaving Certificate",
      subtitle: "Uniglobe SS/College, Kamaladi, Kathmandu",
      date: "Jul 2020 - Jun 2022",
      logoText: "UG",
      logoBg: "bg-gradient-to-tr from-emerald-600 to-teal-500",
    },
  ];

  return (
    <div className="flex flex-col gap-14 mt-10">
      
      {/* Experience */}
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight font-satoshi">Experience</h2>
        <div className="mt-4">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              title={exp.title}
              subtitle={exp.subtitle}
              date={exp.date}
              description={exp.description}
              bullets={exp.bullets}
              logoText={exp.logoText}
              logoBg={exp.logoBg}
            />
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight font-satoshi">Education</h2>
        <div className="mt-4">
          {education.map((edu, index) => (
            <TimelineItem
              key={index}
              title={edu.title}
              subtitle={edu.subtitle}
              date={edu.date}
              logoText={edu.logoText}
              logoBg={edu.logoBg}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
