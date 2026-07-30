export type ProjectCategory = 'Web Development' | 'Salesforce' | 'MERN Stack';
import salesforce from "../images/Salesforce.webp"
import cg from "../images/CGI.png"
import cog from "../images/COG.png"
import macys from "../images/Macys.png"
import Admin from "../images/Admin.png"
import pd1 from "../images/Pd1.png"
import AIAssociate from "../images/AIAssociate.png"
import Associate from "../images/Associate.png"
import MCAdmin from "../images/MCAdmin.png"
import integrationHub from "../images/integration-hub.png"
import retailAi from "../images/retail-ai.png"
import insuranceClaims from "../images/insurance-claims.png"
import nextHire from "../images/next-hire.png"
import weatherApp from "../images/weather-app.png"
import covidDashboard from "../images/covid-dashboard.png"
import moneyfind from "../images/moneyfind.png"

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface Education {
  institution: string;
  logo: string;
  degree: string;
  period: string;
  description: string;
}

export interface Experience {
  company: string;
  logo: string;
  position: string;
  period: string;
  description: string;
}

export interface Certification {
  provider: string;
  name: string;
  logo?: string;
  date: string;
  link?: string;
  isComingSoon?: boolean;
  description?: string;
}

export interface Project {
  name: string;
  description: string;
  image: string;
  category: ProjectCategory;
  technologies: string[];
  status?: 'completed' | 'in-progress';
  synergy?: string;
}

export const skills: Skill[] = [
  {
    name: "Java 17",
    icon: "fab fa-java",
    level: 90
  },
  {
    name: "Spring Boot",
    icon: "fa fa-leaf",
    level: 90
  },
  {
    name: "Spring Security",
    icon: "fas fa-shield-alt",
    level: 85
  },
  {
    name: "RESTful APIs",
    icon: "fas fa-laptop-code",
    level: 85
  },
  {
    name: "Node.js",
    icon: "fab fa-node-js",
    level: 90
  },
  {
    name: "Express.js",
    icon: "fas fa-server",
    level: 80
  },
  {
    name: "J2EE",
    icon: "fas fa-project-diagram",
    level: 80
  },
  {
    name: "Hibernate",
    icon: "fas fa-network-wired",
    level: 80
  },
  {
    name: "React.js",
    icon: "fab fa-react",
    level: 90
  },
  {
    name: "TypeScript",
    icon: "fab fa-js",
    level: 85
  },
  {
    name: "JavaScript",
    icon: "fab fa-js",
    level: 80
  },
  {
    name: "Next.js",
    icon: "fas fa-globe",
    level: 75
  },
  {
    name: "Tailwind CSS",
    icon: "fab fa-css3-alt",
    level: 80
  },
  {
    name: "HTML5 & CSS3",
    icon: "fab fa-html5",
    level: 90
  },
  {
    name: "PostgreSQL",
    icon: "fas fa-database",
    level: 85
  },
  {
    name: "SQL Server",
    icon: "fas fa-database",
    level: 80
  },
  {
    name: "MongoDB",
    icon: "fas fa-database",
    level: 80
  },
  {
    name: "AWS (EC2, S3)",
    icon: "fab fa-aws",
    level: 80
  },
  {
    name: "Docker",
    icon: "fab fa-docker",
    level: 80
  },
  {
    name: "GitHub Actions",
    icon: "fab fa-github",
    level: 80
  },
  {
    name: "JUnit",
    icon: "fas fa-vial",
    level: 85
  },
  {
    name: "Mockito",
    icon: "fas fa-vial",
    level: 80
  },
  {
    name: "Postman",
    icon: "fas fa-paper-plane",
    level: 80
  },
  {
    name: "Jest & Mocha",
    icon: "fas fa-flask",
    level: 75
  },
  {
    name: "OpenAI & Gemini APIs",
    icon: "fas fa-robot",
    level: 85
  },
  {
    name: "AI-Assisted Dev",
    icon: "fas fa-magic",
    level: 90
  },
  {
    name: "Salesforce CRM",
    icon: "fab fa-salesforce",
    level: 85
  },
  {
    name: "Apex",
    icon: "fab fa-salesforce",
    level: 85
  },
  {
    name: "LWC",
    icon: "fab fa-salesforce",
    level: 85
  },
  {
    name: "Salesforce Integration",
    icon: "fab fa-salesforce",
    level: 85
  }
];

export const education: Education[] = [
  {
    institution: "Sacred Heart University",
    logo: "https://images.credly.com/images/6dfcf719-4f7b-42ab-9bca-268464afc1e6/69bfcc305e3eb9075648a37b17483d65.png",
    degree: "Master of Science in Computer Science",
    period: "August 2023 - December 2024",
    description: "Completed my Masters degree with focus on advanced technologies and software engineering principles."
  },
  {
    institution: "Lovely Professional University",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    period: "August 2018 - May 2022",
    description: "Completed my undergraduate studies with a focus on computer science fundamentals and software development."
  }
];

export const experience: Experience[] = [
  {
    company: "Macy's",
    logo: macys,
    position: "Full Stack Java Developer",
    period: "Feb 2025 - Present",
    description: "Developed high-throughput Java 17 and Spring Boot microservices for cart, checkout, and order tracking workflows. Built responsive React.js and TypeScript storefront views, reducing page delays by 28%. Implemented AI-driven query filters and Spring Security authentication workflows. Optimized PostgreSQL data retrieval routines, achieving a 32% performance boost."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Software Development Engineer II",
    period: "Jun 2022 - Jul 2023",
    description: "Engineered full-stack utility tools using React, Spring Boot, and Salesforce CRM features. Configured Salesforce LWC elements and Apex controllers for Billing and Case service modules. Overhauled database index structures and API logic, reducing load times by 40%. Automated release deployment sequences using custom GitHub Actions pipelines."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Software Development Engineer I",
    period: "Jul 2021 - Jun 2022",
    description: "Engineered web portals using MongoDB, Express, React, and Node (MERN) stack frameworks. Formed RESTful backend controllers and endpoints using Node.js and Express. Designed responsive web interface elements with HTML5, CSS3, JavaScript, and Tailwind CSS. Maintained unit test setups utilizing Postman, Mocha, and Chai assertion engines."
  },
  {
    company: "Cognizant",
    logo: cog,
    position: "Software Engineer Intern",
    period: "Apr 2021 - Jun 2021",
    description: "Received SDLC training across J2EE, Salesforce platforms, and relational databases. Prototyped prototype applications in Java, HTML, CSS, JavaScript, and SQL systems. Participated in mentor reviews, code walkthroughs, and technical presentations."
  }
];

export const certifications: Certification[] = [
  {
    provider: "Salesforce",
    name: "Administrator",
    logo: Admin,
    date: "Nov 2024"
  },
  {
    provider: "Salesforce",
    name: "Platform Developer - 1",
    logo: pd1,
    date: "Oct 2024"
  },
  {
    provider: "Salesforce",
    name: "AI Associate",
    logo: AIAssociate,
    date: "Sep 2024"
  },
  {
    provider: "Salesforce",
    name: "Associate",
    logo: Associate,
    date: "May 2023"
  },
  {
    provider: "Salesforce",
    name: "Marketing Cloud Administrator",
    logo: MCAdmin,
    date: "Jan 2023"
  },
  {
    provider: "Coursera",
    name: "Javascript",
    logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png?auto=format%2Ccompress&dpr=1",
    date: "April 2022"
  },
  {
    provider: "Simplilearn",
    name: "React JS",
    logo: "https://m.media-amazon.com/images/I/41aPSdaShQL.png",
    date: "May 2021"
  },
  {
    provider: "",
    name: "Comming Up",
    logo: "",
    date: "",
    isComingSoon: true,
  },
];

export const projects: Project[] = [
  {
    name: "Integration Hub",
    description: "An automation platform combining Zapier's visual workflow builder, Postman's API environment, and n8n's visual node logic. Built to automate data synchronization between Salesforce, Slack, Gmail, Stripe, OpenAI, and GitHub, resolving complex API data fragmentation.",
    image: integrationHub,
    category: "Salesforce",
    technologies: ["Salesforce API", "Apex", "OpenAI API", "REST APIs", "React.js", "Node.js", "n8n", "Postman"],
    status: "in-progress",
    synergy: "Core showcase of integration architecture. Leverages custom Apex triggers, LWC interfaces, RESTful web services, and AI assistants developed across my other portfolio applications."
  },
  {
    name: "AI-Assisted Retail Product Discovery Platform",
    description: "Built an AI-assisted product discovery feature using Spring Boot, OpenAI API, Gemini API, and PostgreSQL to summarize customer search intent and improve product match accuracy by 27%. Developed React.js and TypeScript search result components with API-driven filters, product cards, and relevance indicators, reducing product browsing friction by 24%. Deployed backend services on AWS EC2 with structured API logging and performance checks, improving search response consistency by 22% during high-traffic shopping sessions.",
    image: retailAi,
    category: "Web Development",
    technologies: ["Spring Boot", "OpenAI API", "Gemini API", "PostgreSQL", "React.js", "TypeScript", "AWS EC2"],
    status: "completed",
    synergy: "Integrates OpenAI & Gemini APIs for workflow intelligence, providing direct architectural patterns for the AI automation nodes within Integration Hub."
  },
  {
    name: "MoneyFind",
    description: "A transaction tracking application designed to differentiate credit card expenses. Solves double-counting by identifying daily transactions made on credit cards and reconciling them with end-of-month payments.",
    image: moneyfind,
    category: "Web Development",
    technologies: ["PostgreSQL", "Spring Boot", "TypeScript", "Express.js", "REST APIs"],
    status: "completed",
    synergy: "Combines Spring Boot services with Express.js endpoints and PostgreSQL schemas, mirroring the multi-framework architecture integrated in Integration Hub."
  },
  {
    name: "Insurance Claims Workflow Modernization",
    description: "Built claim intake and policy verification services using Spring Boot, Hibernate, and SQL Server to reduce manual claim review effort by 26% across servicing workflows. Developed secure React.js claim screens with Spring Security-backed REST APIs to improve member data access control and reduce validation issues by 23%. Added JUnit and Mockito test coverage for claim status, document tracking, and policy lookup flows, lowering release defects by 21% before production handoff.",
    image: insuranceClaims,
    category: "Web Development",
    technologies: ["Spring Boot", "Hibernate", "SQL Server", "React.js", "Spring Security", "REST APIs", "JUnit", "Mockito"],
    status: "completed"
  },
  {
    name: "Next Hire",
    description: "A job search Platform",
    image: nextHire,
    category: "Web Development",
    technologies: ["Node JS", "Express JS", "API", "Apex"],
    status: "completed"
  },
  {
    name: "Next Hire Salesforce",
    description: "A job search platform developed using Salesforce",
    image: nextHire,
    category: "Salesforce",
    technologies: ["Salesforce", "Apex", "LWC"],
    status: "completed",
    synergy: "Configured Apex controllers and LWC workflow layouts, matching the custom Salesforce triggers integrated into Integration Hub."
  },
  {
    name: "Weather",
    description: "Weather App",
    image: weatherApp,
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "API"],
    status: "completed"
  },
  {
    name: "COVID-19",
    description: "Build Based using API",
    image: covidDashboard,
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "API"],
    status: "completed"
  },
  {
    name: "Nike",
    description: "Website Based on Bootstrap, CSS",
    image: "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg",
    category: "Web Development",
    technologies: ["HTML", "CSS", "Bootstrap"],
    status: "completed"
  },
  {
    name: "WhatsApp Clone",
    description: "Build based on MERN stack",
    image: "https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/5e310f19b76b834dcb2ce77b_whatsapp-hero.png",
    category: "MERN Stack",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    status: "completed"
  }
];
