/**
 * ============================================================
 *  EDIT ME — all personal content for the portfolio lives here.
 * ============================================================
 */

export const profile = {
  firstName: "Meena",
  fullName: "Meena Ulaganathan",
  title: "B.Tech Information Technology Graduate",
  subtitle: "Aspiring Software / Backend Developer",
  summary:
    "I build reliable, well-structured backend systems and clean web interfaces. My focus is on Java, SQL and core computer-science fundamentals, paired with modern web tooling like React.",
  location: "India",
  email: "meena@example.com", // <-- replace with your email
  // Social links — replace with your real profiles
  socials: {
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
  },
  // Resume file: drop your PDF at public/resume/ and update the path below.
  resumePath: "/resume/Meena-Resume.pdf",
  resumeFileName: "Meena-Resume.pdf",
};

export const highlights = [
  {
    title: "Backend Mindset",
    body: "Designing data models, writing SQL queries and structuring application logic that scales cleanly.",
  },
  {
    title: "Strong Fundamentals",
    body: "Object-oriented programming, data structures and algorithmic problem solving in Java and C.",
  },
  {
    title: "Modern Web",
    body: "Building responsive, accessible interfaces with HTML, CSS, JavaScript and React.js.",
  },
  {
    title: "Always Learning",
    body: "Exploring AI-assisted products, APIs and developer tooling through hands-on projects.",
  },
];

export const skillGroups = [
  { category: "Programming", items: ["Java", "C"] },
  { category: "Database", items: ["SQL", "MySQL"] },
  { category: "Web", items: ["HTML5", "CSS3", "JavaScript"] },
  { category: "Development", items: ["React.js", "REST APIs"] },
  { category: "Tools", items: ["Git", "GitHub", "VS Code"] },
  {
    category: "Concepts",
    items: ["OOP", "Data Structures", "Backend Development"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  /** Add a URL to reveal the "View Project" button. Leave empty to hide it. */
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Hotel Management System",
    tagline: "Console application · C",
    description:
      "A structured management system built in C for handling day-to-day hotel operations, from guest records to room availability and billing.",
    tech: ["C", "File Handling", "Data Structures"],
    features: [
      "Guest record creation, search and updates",
      "Room booking, check-in and check-out flow",
      "Billing summary generation",
      "Persistent records using file storage",
    ],
  },
  {
    title: "AI-Powered Expense Tracker",
    tagline: "Smart personal finance app",
    description:
      "An expense tracking application that records spending and uses AI to categorise transactions automatically and surface spending insights.",
    tech: ["JavaScript", "React.js", "SQL", "AI APIs"],
    features: [
      "Add, edit and track daily expenses",
      "AI-assisted automatic category detection",
      "Monthly summaries and spending breakdown",
      "Budget alerts and trend insights",
    ],
  },
  {
    title: "AI-Based Intelligent System for Skill Gap Identification",
    tagline: "Machine learning · Career analytics",
    description:
      "An intelligent career analysis solution that compares a user's current skill profile against the requirements of a target role and reports the exact gaps to close.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    features: [
      "Skill profile extraction from user input",
      "Role-requirement matching model",
      "Ranked skill-gap report",
      "Learning recommendations per missing skill",
    ],
  },
];

export const education = [
  {
    period: "2021 — 2025", // <-- editable
    degree: "B.Tech, Information Technology",
    institution: "Your College / University Name", // <-- editable placeholder
    detail:
      "Core coursework in programming, data structures, databases, operating systems, computer networks and software engineering.",
  },
  {
    period: "2019 — 2021", // <-- editable
    degree: "Higher Secondary Education",
    institution: "Your School Name", // <-- editable placeholder
    detail: "Computer Science stream with mathematics and physics.",
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
