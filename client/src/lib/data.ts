export type ProjectCategory = 'Web Development' | 'Salesforce' | 'MERN Stack';
import salesforce from "../images/Salesforce.webp"
import cg from "../images/CGI.png"
import cog from "../images/COG.png"
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
  link: string;
}

export const skills: Skill[] = [
  {
    name: "Spring Boot",
    icon: "fa fa-leaf",
    level: 90
  },
  {
    name: "SALESFORCE",
    icon: "fab fa-salesforce",
    level: 90
  },
  {
    name: "React JS",
    icon: "fab fa-react",
    level: 90
  },
  {
    name: "Rest API",
    icon: "fa fa-laptop-code",
    level: 85
  },
  {
    name: "Node JS",
    icon: "fab fa-node-js",
    level: 90
  },
  {
    name: "JAVASCRIPT",
    icon: "fab fa-js",
    level: 80
  },
  {
    name: "BOOTSTRAP",
    icon: "fab fa-bootstrap",
    level: 85
  },
  {
    name: "SQL",
    icon: "fas fa-database",
    level: 75
  },
  {
    name: "CORE JAVA",
    icon: "fab fa-java",
    level: 80
  },
  {
    name: "SOFTWARE TESTING",
    icon: "fas fa-vial",
    level: 75
  },
  {
    name: "HTML",
    icon: "fab fa-html5",
    level: 90
  },
  
];

export const education: Education[] = [
  {
    institution: "Sacred Heart University",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Sacred_Heart_University_seal.svg/1200px-Sacred_Heart_University_seal.svg.png",
    degree: "Masters in Computer Science",
    period: "August 2023 - December 2024",
    description: "Completed my Masters degree with focus on advanced technologies and software engineering principles."
  },
  {
    institution: "Lovely Professional University",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png",
    degree: "Bachelor's in Computer Science",
    period: "August 2018 - May 2022",
    description: "Completed my undergraduate studies with a focus on computer science fundamentals and software development."
  }
];

export const experience: Experience[] = [
  {
    company: "One Community",
    logo: "https://onecommunityglobal.org/wp-content/uploads/2019/12/HD-Circular-Logo-300x300-1.jpg",
    position: "Full Stack Developer",
    period: "Mar 2025 - Present",
    description: "Designed and implemented robust REST & SOAP APIs.Improved API response time by 40% by optimizing database queries. Built responsive, mobile-first UIs using Tailwind CSS and Bootstrap. Collaborated with business stakeholders for feature delivery under agile sprints.Conducted end-to-end API testing using Postman, Mocha, and Chai."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Full Stack Developer - 2",
    period: "April 2023 - August 2023",
    description: "Designed and implemented robust REST & SOAP APIs.Improved API response time by 40% by optimizing database queries. Built responsive, mobile-first UIs using Tailwind CSS and Bootstrap. Collaborated with business stakeholders for feature delivery under agile sprints.Conducted end-to-end API testing using Postman, Mocha, and Chai."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Full Stack Developer - 1",
    period: "July 2022 - March 2023",
    description: "Delivered full-stack features for an energy utility project serving 1000s of users. Integrated Salesforce CRM with real-time data sync into React + Node apps. Improved deployment turnaround using GitHub Actions for automation. Boosted app stability by 20% through debugging and backend improvements."
  },
  {
    company: "CG Infinity",
    logo: cg,
    position: "Intern",
    period: "July 2021 - July 2022",
    description: "Completed full-stack training in web & Salesforce development. Built & deployed two complete apps (WhatsApp clone & COVID tracker). Worked in agile teams, attended client demos, and participated in QA reviews. Promoted to consultant based on performance and project readiness."
  },
  {
    company: "Cognizant",
    logo: cog,
    position: "Digital Nurture",
    period: "Mar 2021 - June 2021",
    description: "Trained on multiple tech like Front End Web development, Testing, Java, Dot Net Etc."
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
    logo:   pd1,
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
    name: "Next Hire",
    description: "A job search Platform",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=1000",
    category: "Web Development",
    technologies: ["Node JS","Express JS","API","Apex"],
    link: "https://github.com/guthaVamshi/Next-Hire"
  },
  {
    name: "Next Hire Salesforce",
    description: "A job search platform developed using Salesfore",
    image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=2070",
    category: "Salesforce",
    technologies: ["Salesforce", "Apex", "LWC"],
    link: "https://github.com/guthaVamshi/Next-Hire--Salesforce"
  },
  {
    name: "Weather",
    description: "Weather App",
    image: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?q=80&w=1974",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "API"],
    link: "https://guthavamshi.github.io/weather/"
  },
  {
    name: "COVID-19",
    description: "Build Based using API",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "API"],
    link: "https://covid19org.netlify.app/"
  },
  {
    name: "Nike",
    description: "Website Based on Bootstrap, CSS",
    image: "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg",
    category: "Web Development",
    technologies: ["HTML", "CSS", "Bootstrap"],
    link: "https://nike-shoewebsite.netlify.app/"
  },
  {
    name: "WhatsApp Clone",
    description: "Build based on MERN stack",
    image: "https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/5e310f19b76b834dcb2ce77b_whatsapp-hero.png",
    category: "MERN Stack",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/guthaVamshi/whatsApp-Clone---Merne"
  }
];
