// ============================================================
// portfolio.ts — Single source of truth for all portfolio content
// Edit this file to update the site. Components only read from here.
// ============================================================

export const identity = {
  fullName: "Anuj Kumar Panday M",
  initials: "AP",
  shortName: "Anuj.",
  title: "Software Engineer | Data Science & AI",
  location: "Chennai, Tamil Nadu, India",
  phone: "9363361891",
  email: "pandayanuj535@gmail.com",
  linkedin: "https://www.linkedin.com/in/anuj-kumar-panday-03879437a/",
  github: "https://github.com/ItsmeAnuj11",
  githubHandle: "ItsmeAnuj11",
  resumePath: "/resume/Anuj_Kumar_Panday_Resume.pdf",
  heroImage: "/character/hero.png",
  openToOpportunities: true,
  statusLabel: "Open to opportunities",
} as const;

export const typingRoles = [
  "Software Engineer",
  "Data Science & AI Enthusiast",
  "Aspiring Data Analyst",
  "Hackathon Winner (2nd Rank)",
] as const;

export const tagline =
  "Transforming data into actionable insights and building AI-powered solutions.";

export const summary =
  "Computer Science (Data Science & AI) undergraduate skilled in Python, SQL, Power BI, and AWS. Experienced in developing AI-powered solutions, analytics dashboards, and cloud applications through projects and hackathons. Passionate about transforming data into actionable insights with a strong dream to excel in Data Analytics.";

// ── Stats ─────────────────────────────────────────────────────────
export const stats = [
  { label: "CGPA", value: "8.52", suffix: "/ 10", icon: "📊" },
  { label: "Hackathon Rank", value: "2nd", suffix: "", icon: "🏆" },
  { label: "Major Projects", value: "2", suffix: "+", icon: "🚀" },
  { label: "Internship", value: "1", suffix: "", icon: "💼" },
] as const;

// ── Skills ─────────────────────────────────────────────────────────
export const skillCategories = [
  {
    id: "programming",
    label: "Programming",
    icon: "💻",
    color: "violet",
    skills: ["Python", "HTML", "CSS"],
  },
  {
    id: "bi",
    label: "Business Intelligence & Reporting",
    icon: "📊",
    color: "teal",
    skills: ["Power BI", "IBM Cognos BI"],
  },
  {
    id: "databases",
    label: "Databases & Tools",
    icon: "🗄️",
    color: "violet",
    skills: ["MySQL", "MongoDB", "Supabase", "GitHub", "Docker"],
  },
  {
    id: "ai",
    label: "AI & Emerging Technologies",
    icon: "🤖",
    color: "teal",
    skills: [
      "IBM Watson AI Studio",
      "NLP Fundamentals",
      "Predictive Analytics",
      "AI-Powered Solution Development",
      "Prompting",
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: "☁️",
    color: "violet",
    skills: ["AWS"],
  },
  {
    id: "query",
    label: "Query Language",
    icon: "🔍",
    color: "teal",
    skills: ["SQL"],
  },
] as const;

// ── Projects ──────────────────────────────────────────────────────
export const projects = [
  {
    id: "railcar",
    title: "Railcar",
    subtitle: "AI Powered Railway Management System",
    description:
      "Developed an AI-powered railway management platform integrating passenger management, train scheduling, and real-time monitoring to improve operational efficiency.",
    bullets: [
      "Developed an AI-powered railway management platform to improve operational efficiency with intelligent automation and real-time monitoring.",
    ],
    tags: ["AI", "Analytics", "Automation", "Transportation", "Scalable Systems"],
    github: "https://github.com/ItsmeAnuj11/RAILWAY",
    demo: null,
    featured: true,
    gradient: "from-violet-600 to-purple-800",
  },
  {
    id: "campusflow",
    title: "Campus Flow",
    subtitle: "Sharing and Borrowing Platform",
    description:
      "Developed a campus marketplace platform enabling students to buy, sell, lend, borrow, and order food within a verified college ecosystem.",
    bullets: [
      "Developed a verified campus marketplace platform enabling students to buy, sell, lend, borrow, and order food with real-time updates.",
    ],
    tags: ["Marketplace", "Authentication", "Real-time", "AI Analytics", "Supabase"],
    github: "https://github.com/ItsmeAnuj11",
    demo: null,
    featured: true,
    gradient: "from-teal-500 to-cyan-700",
  },
  {
    id: "pandeyji",
    title: "Pandeyji",
    subtitle: "Pill Verify System",
    description: "A pill verification system to ensure medication authenticity and safety.",
    bullets: ["Developed a system to verify pills and ensure authenticity."],
    tags: ["TypeScript", "Verification", "Healthcare"],
    github: "https://github.com/ItsmeAnuj11/Pandeyji",
    demo: null,
    featured: false,
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "tidex",
    title: "Tidex",
    subtitle: "Web Application",
    description: "A web application built with TypeScript.",
    bullets: ["Built a complete web application with interactive features."],
    tags: ["TypeScript", "Web"],
    github: "https://github.com/ItsmeAnuj11/tidex",
    demo: "https://tidex.vercel.app",
    featured: false,
    gradient: "from-emerald-500 to-green-700",
  },
  {
    id: "dtrade",
    title: "D-Trade-Capital",
    subtitle: "Trading Platform Interface",
    description: "A project focused on trading interfaces and capital management.",
    bullets: ["Developed interactive trading UI components."],
    tags: ["TypeScript", "Finance"],
    github: "https://github.com/ItsmeAnuj11/D-Trade-Capital",
    demo: null,
    featured: false,
    gradient: "from-orange-500 to-red-700",
  },
  {
    id: "naari",
    title: "Naari",
    subtitle: "Women Empowerment Platform",
    description: "A platform dedicated to women empowerment and safety.",
    bullets: ["Built features to support and empower women."],
    tags: ["TypeScript", "Social Good"],
    github: "https://github.com/ItsmeAnuj11/Naari",
    demo: null,
    featured: false,
    gradient: "from-pink-500 to-rose-700",
  },
  {
    id: "miniproject",
    title: "Mini Project",
    subtitle: "JavaScript Application",
    description: "A lightweight application demonstrating core JavaScript concepts.",
    bullets: ["Implemented core application logic using JavaScript."],
    tags: ["JavaScript"],
    github: "https://github.com/ItsmeAnuj11/mini-project",
    demo: null,
    featured: false,
    gradient: "from-yellow-500 to-amber-700",
  },
  {
    id: "anujpanday",
    title: "AnujPanday",
    subtitle: "Personal Repository",
    description: "Personal codebase and utilities.",
    bullets: ["Maintained personal code and scripts."],
    tags: ["TypeScript"],
    github: "https://github.com/ItsmeAnuj11/AnujPanday",
    demo: null,
    featured: false,
    gradient: "from-gray-500 to-slate-700",
  },
] as const;

// ── Certificates ──────────────────────────────────────────────────
export const certificates = [
  {
    id: "cert1",
    title: "Add Certificate Title 1 Here",
    issuer: "Add Issuer Here (e.g. IBM, AWS)",
    date: "2024",
    link: "https://www.linkedin.com/in/anuj-kumar-panday-03879437a/",
  },
  {
    id: "cert2",
    title: "Add Certificate Title 2 Here",
    issuer: "Add Issuer Here",
    date: "2023",
    link: "https://www.linkedin.com/in/anuj-kumar-panday-03879437a/",
  },
  {
    id: "cert3",
    title: "Add Certificate Title 3 Here",
    issuer: "Add Issuer Here",
    date: "2023",
    link: "https://www.linkedin.com/in/anuj-kumar-panday-03879437a/",
  }
] as const;

// ── Experience ────────────────────────────────────────────────────
export const experiences = [
  {
    id: "dtrade",
    role: "Software Developer Intern",
    company: "D Trade Capital",
    companyUrl: "https://github.com/ItsmeAnuj11/D-Trade-Capital",
    duration: "24 February 2026 – 31 May 2026",
    bullets: [
      "Developed and enhanced software interfaces and application features, focusing on usability, functionality, and responsive design.",
      "Collaborated on data-driven development tasks, working with application logic and technical solutions to support project requirements.",
    ],
    current: false,
  },
] as const;

// ── Education ─────────────────────────────────────────────────────
export const education = [
  {
    id: "mgr",
    institution: "Dr. M.G.R. University",
    location: "Chennai",
    degree: "B.Tech CSE (Data Science & AI)",
    duration: "2023 – 2027",
    cgpa: 8.52,
    cgpaMax: 10,
    current: true,
  },
  {
    id: "sjt",
    institution: "SJT Surana Jain Vidyalaya",
    location: "Chennai, Tamil Nadu",
    degree: "Higher Secondary Education",
    duration: "2021 – 2023",
    cgpa: null,
    cgpaMax: null,
    current: false,
  },
  {
    id: "bcs",
    institution: "BCS Jain Matriculation School",
    location: "Chennai, Tamil Nadu",
    degree: "Secondary Education (10th)",
    duration: "2020 – 2021",
    cgpa: null,
    cgpaMax: null,
    current: false,
  },
] as const;

// ── Activities ────────────────────────────────────────────────────
export const activities = [
  {
    id: "hackathon-win",
    title: "Hackathon – 2nd Rank 🏆",
    description:
      "Secured 2nd Rank in a Hackathon by developing and presenting an innovative technology solution under tight deadlines.",
    highlight: true,
    icon: "trophy",
  },
  {
    id: "hackathons",
    title: "Multiple Hackathons",
    description:
      "Participated in multiple hackathons, building AI and web-based solutions under tight deadlines.",
    highlight: false,
    icon: "zap",
  },
  {
    id: "workshops",
    title: "Workshops & Coding Challenges",
    description:
      "Participated in technical workshops, coding challenges, and professional development programs to enhance programming and problem-solving skills.",
    highlight: false,
    icon: "code",
  },
] as const;

// ── Navbar links ──────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Activities", href: "#activities" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
] as const;

// ── SEO ────────────────────────────────────────────────────────────
export const seo = {
  title: "Anuj Kumar Panday M | Software Engineer, Data Science & AI",
  description:
    "Portfolio of Anuj Kumar Panday M, Software Engineer skilled in Python, SQL, Power BI, AWS and AI-powered solutions.",
  url: "https://anuj-portfolio.vercel.app",
  image: "/og-image.png",
} as const;
