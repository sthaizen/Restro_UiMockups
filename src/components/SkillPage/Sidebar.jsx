import React, { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Download, Copy, Check } from "lucide-react";

export default function Sidebar() {
  const name = "Yathartha Shrestha";
  const role = "Full Stack Developer";
  const bio = "Building real products for real clients. Passionate about creating scalable solutions that make a difference.";
  const avatarUrl = "https://api.dicebear.com/7.x/notionists/svg?seed=Yathartha&backgroundColor=ffffff";

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("yatharthastha234@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full lg:sticky lg:top-4 flex flex-col font-satoshi text-zinc-400 pl-6 mt-30">

      {/* Profile Header - mb-12 maps to the 48px margin in screenshot */}
      <div className="mb-12 flex flex-col gap-5">
        {/* Avatar - rounded-lg and ~62px size */}
        <img
          src={avatarUrl}
          alt={name}
          className="w-20 h-20 rounded-lg object-cover bg-white"
        />

        <div>
          <h2 className="text-2xl font-medium text-white tracking-tight">{name}</h2>
          <p className="text-zinc-400 text-sm mt-2">{role}</p>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed">{bio}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-500 font-medium">Available for work</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col gap-3 w-full mb-8">
        {/* Resume button with dark border (matches Email button style) */}
        <a
          href="/Yathartha_Shrestha_Resume.pdf"
          download="Yathartha_Shrestha_Resume.pdf"
          className="group flex items-center justify-between w-full py-3.5 px-4 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl text-white font-medium text-sm transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            Resume
          </span>
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </a>

        {/* Email button: click-to-copy implementation */}
        <button
          onClick={handleCopyEmail}
          className="group flex items-center justify-between w-full py-3.5 px-4 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl text-white font-medium text-sm transition-colors cursor-pointer text-left"
        >
          <span className="flex items-center gap-3">
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 transition-colors" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            )}
            {copied ? "Email Copied!" : "Email"}
          </span>
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Social / Contact Links - border-t border-zinc-800 pt-8 maps to screenshot */}
      <div className="border-t border-zinc-800 pt-8 flex flex-col gap-3 w-full">
        {/* GitHub */}
        <a
          href="https://github.com/sthaizen"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2 text-zinc-400 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">GitHub</p>
              <p className="text-xs text-zinc-500 mt-0.5">@sthaizen</p>
            </div>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2 text-zinc-400 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-4">
            <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">LinkedIn</p>
              <p className="text-xs text-zinc-500 mt-0.5">Professional Profile</p>
            </div>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:yatharthastha234@gmail.com"
          className="group flex items-center justify-between py-2 text-zinc-400 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">Email</p>
              <p className="text-xs text-zinc-500 mt-0.5">Get in touch</p>
            </div>
          </div>
        </a>
      </div>

    </div>
  );
}