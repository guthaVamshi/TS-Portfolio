import { useRef, useEffect } from "react";

const ITEMS = [
  "Java 17", "Spring Boot", "React.js", "TypeScript", "PostgreSQL",
  "Salesforce CRM", "Apex", "LWC", "AWS EC2", "Docker",
  "GitHub Actions", "OpenAI API", "Microservices", "REST APIs",
  "Node.js", "MongoDB", "JUnit", "Spring Security", "Redis",
  "OAuth2", "Hibernate", "Tailwind CSS", "Next.js", "Gemini API",
];

function Dot() {
  return <span className="ticker-dot" aria-hidden="true">◆</span>;
}

export default function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let rafId = 0;
    const speed = 0.6;

    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      x -= speed;
      if (Math.abs(x) >= totalWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const double = [...ITEMS, ...ITEMS];

  return (
    <div
      className="ticker-wrapper"
      aria-label="Technologies I work with"
      aria-hidden="true"
    >
      <div className="ticker-track" ref={trackRef}>
        {double.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
