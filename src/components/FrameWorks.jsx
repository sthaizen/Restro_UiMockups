import { OrbitingCircles } from "./OrbitingCircles";

export function FrameWorks() {
  const skills = [
    "auth0",
    "blazor",
    "cplusplus",
    "csharp",
    "css3",
    "dotnet",
    "dotnetcore",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "react",
    "sqlite",
    "tailwindcss",
    "vitejs",
    "wordpress",
  ];

  return (
    <div className="relative mx-auto h-[15rem] w-full max-w-[400px] flex flex-col items-center justify-center overflow-hidden">
      {/* Outer orbit */}
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>

      {/* Inner orbit */}
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {[...skills].reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="duration-200 rounded-sm hover:scale-110"
  />
);
