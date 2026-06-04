import React from "react";
import { ArrowUpRight, Github } from "lucide-react";

function ProjectCard({ title, category, description, tags, demoUrl, codeUrl }) {
  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#0f0f10] border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 group">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white leading-snug tracking-wide font-satoshi">{title}</h3>
          <div className="flex items-center gap-3">
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Category Tag */}
        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 font-satoshi">
          {category}
        </p>

        {/* Description */}
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-satoshi">
          {description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] font-semibold text-neutral-400 tracking-wide font-satoshi"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const projects = [
    {
      title: "Drukair Holidays",
      category: "WEB APPLICATION",
      description: "Full-stack travel, trip and booking solution for Drukair Holidays Singapore.",
      tags: ["React", "ASP.NET", "Tailwind CSS", "Git"],
      demoUrl: "https://drukairholidays.com", // placeholder/real if any
      codeUrl: "https://github.com",
    },
    {
      title: "Scholars Base",
      category: "SAAS PLATFORM",
      description: "One stop platform for universities of USA with ML based university recommendations.",
      tags: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Machine Learning"],
      demoUrl: "https://scholarsbase.com",
      codeUrl: "https://github.com",
    },
    {
      title: "Sewa Printing Press",
      category: "WEB APPLICATION",
      description: "Full stack web solution for Sewa Printing Press.",
      tags: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Git"],
      demoUrl: "https://sewaprinting.com",
      codeUrl: "https://github.com",
    },
    {
      title: "FireEmblem",
      category: "WEB APPLICATION",
      description: "Book e-commerce platform for a library.",
      tags: ["React", "ASP.NET", "PostgreSQL", "Tailwind CSS", "Git"],
      demoUrl: "https://fireemblem-library.com",
      codeUrl: "https://github.com",
    },
  ];

  return (
    <div className="flex flex-col gap-8 mt-10">
      <h2 className="text-3xl font-bold text-white tracking-tight leading-tight font-satoshi">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            category={project.category}
            description={project.description}
            tags={project.tags}
            demoUrl={project.demoUrl}
            codeUrl={project.codeUrl}
          />
        ))}
      </div>
    </div>
  );
}
