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
    description: "Developed Java 17 and Spring Boot services for catalog browsing, cart updates, checkout validation, order tracking, and customer account workflows, improving transaction stability by 30% during high-traffic retail periods. Enhanced React.js and TypeScript storefront screens with reusable UI patterns, product cards, cart views, checkout forms, and responsive layouts, reducing page interaction delays by 28%. Integrated RESTful APIs between frontend, inventory, order, customer profile, notification, and document workflow services, improving product availability and order status accuracy by 26%. Built AI-assisted product support logic using OpenAI API, Gemini API, and Spring Boot service layers to summarize customer queries, improve search relevance, and reduce support handoff effort by 23%. Secured customer account, order history, checkout, and service request workflows using Spring Security, OAuth2, JWT, Hibernate, and role-based access controls, reducing validation defects by 23%. Optimized PostgreSQL and SQL Server queries, indexes, joins, stored queries, and service-layer data access logic for catalog search, product filters, order modules, and customer service workflows, improving retrieval speed by 32%. Automated CI/CD deployment and test validation steps using Docker, GitHub Actions, AWS EC2, AWS S3, Git, GitHub, JUnit, Mockito, and Postman, cutting release preparation effort by 35%. Partnered with product owners, QA engineers, UX teams, architects, and business analysts during Agile planning, story refinement, defect triage, and production support, reducing requirement rework by 24%."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Software Development Engineer II",
    period: "Jun 2022 - Jul 2023",
    description: "Delivered full-stack utility platform features using Java, Spring Boot, React.js, Salesforce CRM, Apex, LWC, and REST APIs for account service, billing, and service request workflows, improving customer self-service completion by 34%. Designed integration logic between Java services, React.js interfaces, Salesforce objects, and custom REST APIs to synchronize account, billing, and case data, increasing workflow efficiency by 40%. Configured Lightning Web Components and Apex controllers for account service, case updates, customer interaction history, and CRM task workflows, reducing manual Salesforce updates by 31%. Reworked SQL Server schemas, indexes, backend queries, and service-layer data access logic for account and billing modules, reducing API load time by 40% across utility transactions. Improved React.js component rendering, form validation, routing behavior, and API error handling for service request screens, reducing frontend defects by 26% during QA validation. Coordinated with client stakeholders, QA engineers, and business analysts to clarify functional requirements, acceptance criteria, and integration rules, reducing requirement rework by 23%. Streamlined GitHub Actions pipelines for frontend, backend, and Salesforce changes with structured Git branching and release checks, reducing manual deployment dependency by 33%. Investigated API failures, Salesforce sync issues, billing data mismatches, and production defects using Postman, Git reviews, and debugging logs, improving platform reliability by 28%."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Software Development Engineer I",
    period: "Jul 2021 - Jun 2022",
    description: "Built MERN stack web modules using MongoDB, Express.js, React.js, and Node.js for user management, reporting dashboards, admin workflows, and role-based screens, improving feature delivery speed by 25% across sprint releases. Developed responsive frontend screens with React Hooks, JavaScript, HTML5, CSS3, Tailwind CSS, and Bootstrap, improving cross-device usability by 30% and reducing UI adjustment requests during QA review. Created Node.js and Express.js REST endpoints for CRUD operations, authentication flows, form submissions, and data exchange between React interfaces and MongoDB collections, reducing backend handling issues by 22%. Applied MongoDB schema updates, aggregation queries, filters, and indexing logic to improve application data retrieval accuracy by 27% across user, report, and admin-facing modules. Tested API endpoints, request payloads, response codes, and UI flows using Postman, Mocha, and Chai, reducing sprint-level QA defects by 20% before release handoff. Collaborated with senior developers during Agile ceremonies, pull request reviews, technical discussions, and defect walkthroughs, improving assigned task completion rate by 24% across web application deliverables. Refactored reusable React components, route handling, frontend validation logic, and shared utility functions, reducing duplicate code by 29% and improving maintainability for future enhancements. Maintained Git branching, code documentation, commit hygiene, and deployment handoff notes for frontend and backend changes, reducing release handoff issues by 21% across team deliverables."
  },
  {
    company: "Cognizant",
    logo: cog,
    position: "Software Engineer Intern",
    period: "Apr 2021 - Jun 2021",
    description: "Completed hands-on Java, J2EE, web development, Salesforce fundamentals, database concepts, and SDLC training, improving enterprise application readiness by 30% across internal assessments. Practiced object-oriented programming, collections, exception handling, reusable methods, and debugging techniques in Java, improving coding accuracy by 25% during assigned programming exercises. Built prototype web modules using Java, HTML5, CSS3, JavaScript, SQL, and backend validation logic, completing 4 functional demo workflows for internal mentor review. Learned Salesforce CRM concepts including Apex basics, data models, platform configuration, and application customization, improving CRM development understanding by 28% during guided exercises. Participated in QA reviews, code walkthroughs, and demo sessions with mentors to validate functionality, reducing application logic gaps by 22% before final internal review. Documented technical learnings, sample application behavior, issue fixes, and Git-based code changes, improving review clarity by 24% across internship deliverables."
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
    name: "AI-Assisted Retail Product Discovery Platform",
    description: "Built an AI-assisted product discovery feature using Spring Boot, OpenAI API, Gemini API, and PostgreSQL to summarize customer search intent and improve product match accuracy by 27%. Developed React.js and TypeScript search result components with API-driven filters, product cards, and relevance indicators, reducing product browsing friction by 24%. Deployed backend services on AWS EC2 with structured API logging and performance checks, improving search response consistency by 22% during high-traffic shopping sessions.",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=1000",
    category: "Web Development",
    technologies: ["Spring Boot", "OpenAI API", "Gemini API", "PostgreSQL", "React.js", "TypeScript", "AWS EC2"]
  },
  {
    name: "Insurance Claims Workflow Modernization",
    description: "Built claim intake and policy verification services using Spring Boot, Hibernate, and SQL Server to reduce manual claim review effort by 26% across servicing workflows. Developed secure React.js claim screens with Spring Security-backed REST APIs to improve member data access control and reduce validation issues by 23%. Added JUnit and Mockito test coverage for claim status, document tracking, and policy lookup flows, lowering release defects by 21% before production handoff.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932",
    category: "Web Development",
    technologies: ["Spring Boot", "Hibernate", "SQL Server", "React.js", "Spring Security", "REST APIs", "JUnit", "Mockito"]
  },
  {
    name: "Next Hire",
    description: "A job search Platform",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=1000",
    category: "Web Development",
    technologies: ["Node JS", "Express JS", "API", "Apex"],
  },
  {
    name: "Next Hire Salesforce",
    description: "A job search platform developed using Salesforce",
    image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=2070",
    category: "Salesforce",
    technologies: ["Salesforce", "Apex", "LWC"],
  },
  {
    name: "Weather",
    description: "Weather App",
    image: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?q=80&w=1974",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "API"],
  },
  {
    name: "COVID-19",
    description: "Build Based using API",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "API"]
  },
  {
    name: "Nike",
    description: "Website Based on Bootstrap, CSS",
    image: "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg",
    category: "Web Development",
    technologies: ["HTML", "CSS", "Bootstrap"]
  },
  {
    name: "WhatsApp Clone",
    description: "Build based on MERN stack",
    image: "https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/5e310f19b76b834dcb2ce77b_whatsapp-hero.png",
    category: "MERN Stack",
    technologies: ["MongoDB", "Express", "React", "Node.js"]
  }
];
