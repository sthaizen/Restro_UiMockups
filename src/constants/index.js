// index.js



export const TESTIMONIALS = [
  {
    quote:
      "The UI was clean, consistent, and delivered with strong attention to detail. Communication was professional throughout.",
    tags: ["FRONTEND DEVELOPMENT", "UI IMPLEMENTATION"],
    name: "Prerna Shrestha",
    company: "WoodCraft Varnish",
    industry: "Home Services",
  },
  {
    quote:
      "The website looked premium and performed smoothly across devices. The build improved user experience and helped strengthen our online presence.",
    tags: ["FRONTEND DEVELOPMENT", "RESPONSIVE DESIGN", "PERFORMANCE"],
    name: "Suman Gurung",
    company: "Ideate Nepal",
    industry: "Events",
  },
  {
    quote:
      "Working together was efficient and stress-free. He was flexible with timelines, quick with updates, and delivered a polished frontend that matched the design perfectly.",
    tags: ["FRONTEND DEVELOPMENT", "PIXEL-PERFECT BUILD", "UX POLISH"],
    name: "Jeevan Khadka",
    company: "Lucid Marketing Studio",
    industry: "Marketing",
  },
  {
    quote:
      "Very responsive and reliable. The final delivery was high-quality, well-structured, and completed on time with excellent attention to detail.",
    tags: ["FRONTEND DEVELOPMENT", "CLEAN CODE", "QUALITY DELIVERY"],
    name: "Aarav Koirala",
    company: "Fyve Creatives",
    industry: "Marketing",
  },
];



export const servicesData = [

  {
    title: "Frontend Development",
    description:
      "I build responsive, user-friendly interfaces with clean code and modern frameworks. My focus is on creating intuitive designs and interactive experiences that users enjoy.",
    items: [
      {
        title: "UI/UX Implementation",
        description: "- HTML, CSS, Tailwind CSS, Figma Prototypes",
      },
      {
        title: "Interactive Web Apps",
        description: "- React, JavaScript, Dynamic DOM Updates",
      },
      {
        title: "Responsive Design",
        description: "- Cross-browser compatibility, Mobile-first approach",
      },
    ],
  },
  {
    title: "Backend & Database ",
    description:
      "From academic projects, I have experience designing backends and working with relational and non-relational databases, ensuring data integrity and secure transactions.",
    items: [
      {
        title: "Java Backend Development",
        description: "- Java, JSP, Servlets, MVC Architecture",
      },
      {
        title: "Database Management",
        description: "- MySQL, MongoDB, SQL Queries, Data Modeling",
      },
      {
        title: "API Integration",
        description: "- REST APIs, OpenWeatherMap API, JSON handling",
      },
    ],
  },
  // {
  //   title: "Data Analytics & Machine Learning",
  //   description:
  //     "I analyze datasets and apply machine learning concepts to extract insights and build meaningful solutions, supported by AWS Academy certifications.",
  //   items: [
  //     {
  //       title: "Data Analysis",
  //       description: "- Python, Pandas, NumPy, Matplotlib, Seaborn",
  //     },
  //     {
  //       title: "Machine Learning Foundations",
  //       description: "- Supervised/Unsupervised basics, AWS ML Academy",
  //     },
  //     {
  //       title: "Cloud-based ML",
  //       description: "- AWS ML for NLP, AWS Data Engineering",
  //     },
  //   ],
  // },
  // {
  //   title: "Cloud & Software Engineering Skills",
  //   description:
  //     "I am trained in cloud foundations and software engineering simulations, applying industry practices to deploy and manage applications.",
  //   items: [
  //     {
  //       title: "Cloud Platforms",
  //       description: "- AWS Academy Cloud Foundations",
  //     },
  //     {
  //       title: "Software Engineering Practices",
  //       description: "- Accenture Job Simulation – Agile, SDLC, Git/GitHub",
  //     },
  //     {
  //       title: "Data Analytics Simulation",
  //       description: "- Deloitte Job Simulation – Business insights from data",
  //     },
  //   ],
  // },
];

export const projects = [
  {
    id: 1,
    name: "ZapList-Task Journal",
    description:
      "- ZapList is a feature-rich, modernTask Journal and productivity web app built with React, TailwindCSS, and Material UI icons.",
    href: "https://zaplist-eight.vercel.app/",
    image: "/assets/projects/Zaplist.png",
    bgImage: "/assets/backgrounds/bas1.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },     
    ],
  },
  {
    id: 2,
    name: "AuraTimes-Luxury Time Exchange",
    description:
      "- Dynamic e-commerce watch reselling platform using Java, JSP, and Servlets with MVC architecture, featuring secure login, encryption, session management, role-based access, and full CRUD operations.",
    href: "https://github.com/sthaizen/AuraTimes.git",
    image: "/assets/projects/AuraTime.png",
    bgImage: "/assets/backgrounds/bas2.jpg",
    frameworks: [
      { id: 1, name: "Html" },
      { id: 2, name: "Css" },
      { id: 3, name: "Java" },
      { id: 4, name: "Rest API" },
      { id: 5, name: "My SQL" },
    ],
  },
  {
    id: 3,
    name: "Urban-Complaint-Analytics-using-NYC-311-Data",
    description:
      "- Analyzed a large-scale NYC 311 Service Requests dataset to extract insights on citizen complaints using data cleaning, preparation, and exploratory analysis techniques.",
    href: "https://github.com/sthaizen/Urban-Complaint-Analytics-using-NYC-311-Data.git",
    image: "/assets/projects/data2.png",
    bgImage: "/assets/backgrounds/bas4.jpg",
    frameworks: [
      { id: 1, name: "NumPy" },
      { id: 2, name: "Pandas" },
      { id: 3, name: "Python" },
    ],
  },
  {
    id: 4,
    name: "Inventory Management System",
    description:
      "- Designed and developed the user interface for an Inventory Management System with intuitive layouts for managing products, stock, orders, and users.",
    href: "",
    image: "/assets/projects/Trans.png",
    bgImage: "/assets/backgrounds/bas3.jpg",
    frameworks: [
      { id: 1, name: "React.Js" },
      { id: 2, name: "next.js" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "Framer" },
    ],
  },
  {
    id: 5,
    name: "Spherule-Traveling Platform",
    description:
      "- Designed and developed the user interface for a Travel Platform with interactive pages for browsing destinations, booking options, and user profiles.",
    href: "",
    image: "/assets/projects/Travel.png",
    bgImage: "/assets/backgrounds/bla7.jpg",
    frameworks: [
      { id: 1, name: "Figma" },
      { id: 2, name: "Adobe illustrator" },
      { id: 3, name: "Adobe photoshop"}
      
    ],
  },
  {
    id: 6,
    name: "PrintWave-PaperTrail Market",
    description:
      "- Created a Printer Selling Website featuring a clean UI, product listings, shopping cart, and seamless order process for an easy online buying experience.",
    href: "",
    image: "/assets/projects/printwave.png",
    bgImage: "/assets/backgrounds/bla8.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
    ],
  },
];
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/rc_2555/?hl=en" },
  {
    name: "Youtube",
    href: "https://www.youtube.com/watch?v=xxVA9m73dmU&t=0s",
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/yathartha-shrestha-2a5a87371/" },
  { name: "GitHub", href: "https://github.com/sthaizen" },
];


export const myProjects = [
  {
    id: 1,
    title: "ZapList-Task Journal",
    description:
      "- ZapList is a feature-rich, modernTask Journal and productivity web app built with React, TailwindCSS, and Material UI icons.",
    subDescription: [
      "Built a scalable application with ASP.NET Core MVC, integrating global platforms like Amazon for domestic delivery.",
      "Implemented secure authentication and database management using ASP.NET Core Identity and Entity Framework Core.",
      "Designed a responsive frontend with Tailwind CSS, enhancing user experience.",
      "Added payment systems, localization, and product filtering for functionality improvements.",
    ],
    href: "https://zaplist-eight.vercel.app/",
    logo: "",
    image: "/assets/projects/Zaplist.png",
    tags: [
      {
        id: 1,
        name: "C#",
        path: "/assets/logos/csharp.svg",
      },
      {
        id: 2,
        name: ".Net",
        path: "/assets/logos/dotnet.svg",
      },
      {
        id: 3,
        name: "Ef Core",
        path: "/assets/logos/efcore.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Authentication & Authorization System",
    description:
      "A secure authentication and authorization system using Auth0 for seamless user management.",
    subDescription: [
      "Integrated Auth0 for authentication, supporting OAuth, JWT, and multi-factor authentication.",
      "Implemented role-based access control (RBAC) for fine-grained user permissions.",
      "Developed a React-based frontend with Tailwind CSS for a sleek user experience.",
      "Connected to a secure SQLite database for user data storage.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/AuraTime.png",
    tags: [
      {
        id: 1,
        name: "Auth0",
        path: "/assets/logos/auth0.svg",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "SQLite",
        path: "/assets/logos/sqlite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Blazor Web App",
    description:
      "A modern, interactive web application built with Blazor WebAssembly and .NET Core.",
    subDescription: [
      "Developed a fully interactive Single Page Application (SPA) using Blazor WebAssembly.",
      "Implemented API interactions using .NET Core for a robust backend.",
      "Designed responsive UI components with Tailwind CSS for an enhanced UX.",
      "Integrated SQLite for efficient client-side database storage.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/blazor-app.jpg",
    tags: [
      {
        id: 1,
        name: "Blazor",
        path: "/assets/logos/blazor.svg",
      },
      {
        id: 2,
        name: ".NET Core",
        path: "/assets/logos/dotnetcore.svg",
      },
      {
        id: 3,
        name: "SQLite",
        path: "/assets/logos/sqlite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 4,
    title: "C++ Game Engine",
    description:
      "A lightweight C++ game engine designed for 2D and 3D game development.",
    subDescription: [
      "Built a powerful rendering engine using OpenGL and C++.",
      "Developed a physics engine with collision detection and particle effects.",
      "Implemented a scripting system for easy game customization.",
      "Optimized performance with multi-threading and efficient memory management.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      {
        id: 1,
        name: "C++",
        path: "/assets/logos/cplusplus.svg",
      },
      {
        id: 2,
        name: "C#",
        path: "/assets/logos/csharp.svg",
      },
      {
        id: 3,
        name: "Git",
        path: "/assets/logos/git.svg",
      },
      {
        id: 4,
        name: "Microsoft",
        path: "/assets/logos/microsoft.svg",
      },
    ],
  },
  {
    id: 5,
    title: "WordPress Custom Theme",
    description:
      "A fully customizable WordPress theme optimized for performance and SEO.",
    subDescription: [
      "Developed a responsive WordPress theme using HTML5, CSS3, and JavaScript.",
      "Integrated Tailwind CSS for modern styling and UI enhancements.",
      "Optimized SEO and page speed using Vite.js for fast builds.",
      "Implemented custom widgets and plugin compatibility for extended functionality.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/wordpress-theme.jpg",
    tags: [
      {
        id: 1,
        name: "WordPress",
        path: "/assets/logos/wordpress.svg",
      },
      {
        id: 2,
        name: "HTML5",
        path: "/assets/logos/html5.svg",
      },
      {
        id: 3,
        name: "CSS3",
        path: "/assets/logos/css3.svg",
      },
      {
        id: 4,
        name: "Vite.js",
        path: "/assets/logos/vitejs.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Online Learning Platform",
    description:
      "A web application that allows users to enroll in courses, watch video lectures, and take quizzes.",
    subDescription: [
      "Built using Blazor WebAssembly for a seamless SPA experience.",
      "Implemented video streaming with Azure Media Services.",
      "Added a quiz system with dynamic question generation and real-time grading.",
      "Integrated Stripe API for secure payment processing.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/elearning.jpg",
    tags: [
      {
        id: 1,
        name: "Blazor",
        path: "/assets/logos/blazor.svg",
      },
      {
        id: 2,
        name: "Azure",
        path: "/assets/logos/azure.svg",
      },
      {
        id: 3,
        name: "Stripe",
        path: "/assets/logos/stripe.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
];