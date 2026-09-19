import { Code2, Database, Layers3, Workflow } from "lucide-react";

// A decorative system diagram; all labels repeat technologies in the introduction.
export default function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <div className="orbit-grid" />
      <div className="orbit-halo" />
      <div className="orbit-ring orbit-ring-outer"><span /></div>
      <div className="orbit-ring orbit-ring-inner"><span /></div>
      <svg className="orbit-connections" viewBox="0 0 440 440" fill="none">
        <path d="M220 220H100V100M220 220H350V145M220 220H95V320M220 220H325V355" />
        <path className="orbit-signal" d="M100 100V220H350V145M95 320V220H325V355" />
      </svg>
      <div className="orbit-core"><Code2 size={44} strokeWidth={1.2} /><span>VG<span>.</span></span></div>
      <div className="orbit-node orbit-java"><Layers3 size={18} /><span>Java 17</span><i /></div>
      <div className="orbit-node orbit-react"><Code2 size={18} /><span>React</span><i /></div>
      <div className="orbit-node orbit-spring"><Workflow size={18} /><span>Spring Boot</span><i /></div>
      <div className="orbit-node orbit-salesforce"><Database size={18} /><span>Salesforce</span><i /></div>
      <span className="orbit-coordinate orbit-coordinate-top">&lt; / &gt;</span>
      <span className="orbit-coordinate orbit-coordinate-bottom">+ + +</span>
    </div>
  );
}
