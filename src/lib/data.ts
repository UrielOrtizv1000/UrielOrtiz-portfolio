export const profile = {
  name: "Uriel Ortiz",
  fullName: "Uriel Ezequiel Ortiz Rosales",
  version: "v1000",
  location: "Aguascalientes, Mexico",
  email: "urielortizrr@gmail.com",
  github: "https://github.com/UrielOrtizv1000",
  cvFiles: {
    en: "Uriel_Ortiz_Rosales_EN.pdf",
    es: "Uriel_Ortiz_Rosales.pdf",
  },
};

export type SkillCategory = {
  id: string;
  skillIds: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languagesFrontend",
    skillIds: ["html", "css", "javascript", "bootstrap", "localStorage"],
  },
  {
    id: "cloudTools",
    skillIds: [
      "azureFundamentals",
      "docker",
      "kubernetesFundamentals",
      "gitGithub",
      "itil",
      "aiAgents",
      "obsidian",
    ],
  },
  {
    id: "backendApis",
    skillIds: [
      "restApis",
      "httpEndpoints",
      "fastapiFundamentals",
      "technicalDocumentation",
    ],
  },
  {
    id: "processSupport",
    skillIds: [
      "requestManagement",
      "incidentManagement",
      "caseTracking",
      "sensitiveDataHandling",
      "documentation",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tech: string[];
  github: string;
  live?: string;
  inDevelopment?: boolean;
};

const resilenciaKubernetes: Project = {
  id: "resilenciaKubernetes",
  name: "Resilencia-Kubernetes",
  tech: [
    "Python",
    "FastAPI",
    "Docker",
    "Kubernetes",
    "Prometheus",
    "Grafana",
    "Jaeger",
    "OpenTelemetry",
  ],
  github: "https://github.com/AzaelFajardo/Resilencia-Kubernetes",
};

const rabit: Project = {
  id: "rabit",
  name: "RaBit",
  tech: ["Tauri 2", "React", "TypeScript", "SQLite"],
  github: "https://github.com/UrielOrtizv1000/RaBit",
};

const nova: Project = {
  id: "nova",
  name: "NOVA",
  tech: ["Tauri", "React", "NestJS", "Socket.IO", "WebRTC", "Cloudflare Tunnel"],
  github: "https://github.com/UrielOrtizv1000/NOVA-THE-NEW-STAR",
  inDevelopment: true,
};

const hardboard: Project = {
  id: "hardboard",
  name: "Hardboard",
  tech: ["HTML", "CSS", "JavaScript", "jsPDF", "docx", "GitHub Pages"],
  github: "https://github.com/UrielOrtizv1000/Hardboard",
  live: "https://hardboard.xyz",
};

const intercambioMagico: Project = {
  id: "intercambioMagico",
  name: "Intercambio Mágico",
  tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "LocalStorage"],
  github: "https://github.com/UrielOrtizv1000/gift-exchange-web-app",
};

const ecommerceApi: Project = {
  id: "ecommerceApi",
  name: "Ecommerce API — Team Tokioona",
  tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL"],
  github: "https://github.com/UrielOrtizv1000/Ecommerce-API-EquipoTokioona",
};

export const projects: { featured: Project[]; other: Project[] } = {
  featured: [rabit, nova, resilenciaKubernetes],
  other: [hardboard, intercambioMagico, ecommerceApi],
};

export type ExperienceItem = {
  id: string;
  company: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "teleperformance",
    company: "Teleperformance — Comcast",
  },
  {
    id: "alphabiotista",
    company: "Centro Alphabiotista",
  },
];

export type EducationItem = {
  id: string;
  school: string;
};

export const education: EducationItem[] = [
  {
    id: "uaa",
    school: "Universidad Autónoma de Aguascalientes",
  },
];

export const courses = [
  { name: "ITIL 4 Foundation", provider: "Udemy" },
  { name: "Azure Administrator (AZ-104)", provider: "Udemy" },
];
