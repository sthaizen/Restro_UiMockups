import React from "react";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

export default function FooterSection() {
  const email = "yatharthastha234@gmail.com";
  const location = "Kathmandu, Nepal";

  return (
    <div className="flex flex-col mt-[2px] pb-[20px]">
      {/* Title */}
      <h2 className="text-[40px] font-extralight text-white tracking-tight leading-tight font-satoshi mb-[32px]">
        Let's Work Together
      </h2>

      {/* Content Container what ht ehell is going on you*/}
      <div className="space-y-8">
        {/* Paragraph */}
        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed font-light mb-[32px] font-satoshi">
          I'm always interested in new opportunities and exciting projects. Whether you have a specific idea or just want to connect, I'd love to hear from you.
        </p>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
          {/* Get in Touch */}
          <div>
            <h3 className="text-2xl font-light text-white mb-6 tracking-tight font-satoshi">
              Get in Touch
            </h3>
            <div className="flex flex-col">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-[12px] mb-[16px] last:mb-0 text-zinc-400 hover:text-white transition-colors text-sm font-satoshi group"
              >
                <Mail className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[16px] font-light">{email}</span>
              </a>
              <div className="flex items-center gap-[12px] mb-[16px] last:mb-0 text-zinc-400 text-sm font-satoshi">
                <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
                <span className="text-[16px] font-light">{location}</span>
              </div>
            </div>
          </div>

          {/* Follow Me  */}
          <div>
            <h3 className="text-2xl font-light text-white mb-6 tracking-tight font-satoshi">
              Follow Me
            </h3>
            <div className="flex flex-col">
              <a
                href="https://github.com/sthaizen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[12px] mb-[16px] last:mb-0 text-zinc-400 hover:text-white transition-colors text-sm font-satoshi group"
              >
                <Github className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[16px] font-light">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[12px] mb-[16px] last:mb-0 text-zinc-400 hover:text-white transition-colors text-sm font-satoshi group"
              >
                <Linkedin className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[16px] font-light">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
