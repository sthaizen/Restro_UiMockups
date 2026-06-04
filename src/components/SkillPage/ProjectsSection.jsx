import React from "react";
import { ExternalLink, GitBranch } from "lucide-react";

const tagLogos = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "ASP.NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Machine Learning": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
};

function ProjectCard({ title, category, description, tags, demoUrl, codeUrl, backendUrl }) {
  return (
    <div className="p-6 flex flex-col h-full justify-between space-y-4 rounded-2xl bg-[#0f0f10] border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 group">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl font-bold text-white leading-snug tracking-wide font-satoshi">{title}</h3>
          <div className="flex items-center gap-2">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 hover:bg-neutral-800/80"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 hover:bg-neutral-800/80"
              >
                <GitBranch className="w-4 h-4" />
              </a>
            )}
            {backendUrl && (
              <a
                href={backendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 hover:bg-neutral-800/80"
              >
                <GitBranch className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Category Tag */}
        <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-wider font-satoshi">
          {category}
        </p>

        {/* Description */}
        <p className="text-neutral-400 text-sm leading-relaxed font-satoshi">
          {description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        {tags.map((tag, idx) => {
          const logo = tagLogos[tag];
          return (
            <span
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131315]/80 border border-[#222225] text-xs font-semibold text-neutral-300 tracking-wide font-satoshi"
            >
              {logo && (
                <img
                  src={logo}
                  alt={tag}
                  className="w-3.5 h-3.5 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <span>{tag}</span>
            </span>
          );
        })}
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
      demoUrl: "https://drukairholidays.com",
      codeUrl: null,
    },
    {
      title: "Scholars Base",
      category: "SAAS PLATFORM",
      description: "One stop platform for universities of USA with ML based university recommendations.",
      tags: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Machine Learning"],
      demoUrl: "https://scholarsbase.com",
      codeUrl: "https://github.com",
      backendUrl: "https://github.com",
    },
    {
      title: "Sewa Printing Press",
      category: "WEB APPLICATION",
      description: "Full stack web solution for Sewa Printing Press.",
      tags: ["React", "Django", "PostgreSQL", "Tailwind CSS", "Git"],
      demoUrl: "https://sewaprinting.com",
      codeUrl: null,
    },
    {
      title: "FireEmblem",
      category: "WEB APPLICATION",
      description: "Book e-commerce platform for a library.",
      tags: ["React", "ASP.NET", "PostgreSQL", "Tailwind CSS", "Git"],
      demoUrl: null,
      codeUrl: "https://github.com",
    },
  ];

  return (
    <div className="flex flex-col gap-8 mt-10">
      <h2 className="text-4xl md:text-5xl font-extralight mb-12 leading-tight tracking-tight text-white font-satoshi">
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
            backendUrl={project.backendUrl}
          />
        ))}
      </div>
    </div>
  );
}
