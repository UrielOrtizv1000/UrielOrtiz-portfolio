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
  /* Address shown in the URL bar of the project's animated demo. */
  previewPath: string;
};

export const projects: { featured: Project[]; other: Project[] } = {
  featured: [
    {
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
      previewPath: "localhost:3000/d/resilience",
    },
    {
      id: "bookiaStore",
      name: "bookIA-store",
      tech: ["Angular", "Node.js", "MySQL"],
      github: "https://github.com/UrielOrtizv1000/bookIA-store",
      previewPath: "localhost:4200/catalogo",
    },
    {
      id: "ecommerceApi",
      name: "Ecommerce API — Team Tokioona",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL"],
      github: "https://github.com/UrielOrtizv1000/Ecommerce-API-EquipoTokioona",
      previewPath: "localhost:3000/api",
    },
  ],
  other: [
    {
      id: "nova",
      name: "NOVA",
      tech: ["Electron", "Cloudflare Tunnel"],
      github: "https://github.com/ejemplo/ejemplo",
      previewPath: "nova://chat",
    },
    {
      id: "intercambioMagico",
      name: "Intercambio Mágico",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "LocalStorage"],
      github: "https://github.com/UrielOrtizv1000/gift-exchange-web-app",
      previewPath: "localhost:5500/sorteo",
    },
    {
      id: "devprofile",
      name: "DevProfile",
      tech: ["React", "Vite", "Context API"],
      github: "https://github.com/UrielOrtizv1000/devprofile-cv-generator",
      previewPath: "localhost:5173/editor",
    },
  ],
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
    company: "Centro Alphabiotista de Corrección y Balanceo",
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
  { name: "ITIL 4 Foundation: Service Management", provider: "Udemy" },
  { name: "Microsoft Azure Administrator Associate (AZ-104)", provider: "Udemy" },
];
