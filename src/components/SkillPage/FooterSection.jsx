import React from "react";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

export default function FooterSection() {
  const email = "yatharthastha234@gmail.com";
  const location = "Kathmandu, Nepal";

  return (
    <div className="flex flex-col gap-8 mt-14 pt-10 border-t border-neutral-900">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight font-satoshi">
          Let's Work Together
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed mt-4 max-w-xl font-satoshi">
          I'm always interested in new opportunities and exciting projects. Whether you have a specific idea or just want to connect, I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
        {/* Get in Touch */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest font-satoshi">
            Get in Touch
          </h4>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm font-satoshi"
            >
              <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{email}</span>
            </a>
            <div className="flex items-center gap-3 text-neutral-400 text-sm font-satoshi">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Follow Me */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest font-satoshi">
            Follow Me
          </h4>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/sthaizen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm font-satoshi"
            >
              <Github className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-sm font-satoshi"
            >
              <Linkedin className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
