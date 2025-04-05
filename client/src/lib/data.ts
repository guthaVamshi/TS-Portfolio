export type ProjectCategory = 'Web Development' | 'Salesforce' | 'MERN Stack';

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
    name: "SALESFORCE",
    icon: "fab fa-salesforce",
    level: 90
  },
  {
    name: "CSS",
    icon: "fab fa-css3-alt",
    level: 85
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
  }
];

export const education: Education[] = [
  {
    institution: "Sacred Heart University",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Sacred_Heart_University_seal.svg/1200px-Sacred_Heart_University_seal.svg.png",
    degree: "Masters in Computer Science",
    period: "August 2023 - December 2024",
    description: "Currently pursuing my Masters degree with focus on advanced technologies and software engineering principles."
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
    company: "CG Infinity",
    logo: "https://vamshigutha.netlify.app/CGI.png",
    position: "SDE - 2",
    period: "April 2023 - August 2023",
    description: "Working on cutting edge technologies to solve business problems on a daily basis."
  },
  {
    company: "CG Infinity",
    logo: "https://vamshigutha.netlify.app/CGI.png",
    position: "SDE - 1",
    period: "July 2022 - March 2023",
    description: "Working on cutting-edge technologies to solve business problems on a daily basis."
  },
  {
    company: "CG Infinity",
    logo: "https://vamshigutha.netlify.app/CGI.png",
    position: "Intern",
    period: "July 2021 - July 2022",
    description: "Trained on multiple tech like Salesforce, Java, Dot Net Etc. Learned a lot about work, life and people."
  },
  {
    company: "Cognizant",
    logo: "https://vamshigutha.netlify.app/COG.png",
    position: "Digital Nurture",
    period: "Mar 2021 - June 2021",
    description: "Trained on multiple tech like Front End Web development, Testing, Java, Dot Net Etc."
  }
];

export const certifications: Certification[] = [
  {
    provider: "Salesforce",
    name: "Administrator",
    logo: "https://vamshigutha.netlify.app/Admin.png",
    date: "Nov 2024"
  },
  {
    provider: "Salesforce",
    name: "Platform Developer - 1",
    logo: "https://vamshigutha.netlify.app/Pd1.png",
    date: "Oct 2024"
  },
  {
    provider: "Salesforce",
    name: "AI Associate",
    logo: "https://vamshigutha.netlify.app/AIAssociate.png",
    date: "Sep 2024"
  },
  {
    provider: "Salesforce",
    name: "Associate",
    logo: "https://vamshigutha.netlify.app/Associate.png",
    date: "May 2023"
  },
  {
    provider: "Salesforce",
    name: "Marketing Cloud Administrator",
    logo: "https://vamshigutha.netlify.app/MCAdmin.png",
    date: "Jan 2023"
  },
  {
    provider: "Coming Up",
    name: "Future Certification",
    isComingSoon: true,
    description: "Working on Projects, haven't started preparing for any new Certifications"
  }
];

export const projects: Project[] = [
  {
    name: "Next Hire",
    description: "A job search Platform",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=1000",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB"],
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
    image: "https://images.unsplash.com/photo-1539695356420-fe2317e27f4b?q=80&w=1974",
    category: "Web Development",
    technologies: ["HTML", "CSS", "Bootstrap"],
    link: "https://nike-shoewebsite.netlify.app/"
  },
  {
    name: "WhatsApp Clone",
    description: "Build based on MERN stack",
    image: "https://images.unsplash.com/photo-1636697792267-89de09a6febe?q=80&w=2070",
    category: "MERN Stack",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/guthaVamshi/whatsApp-Clone---Merne"
  }
];
