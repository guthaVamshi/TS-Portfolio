import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "project" | "contact" | "click";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId = 0;
    let isVisible = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getMode = (target: EventTarget | null): CursorMode => {
      const el = target as HTMLElement;
      if (!el) return "default";
      if (el.closest(".project-card, .project-open")) return "project";
      if (el.closest("#contact, .contact-card")) return "contact";
      if (el.closest("a, button, [role='button'], .cursor-pointer")) return "link";
      return "default";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      setMode(getMode(e.target));
    };

    const onMouseLeave = () => {
      isVisible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onMouseDown = (e: MouseEvent) => {
      ring.classList.add("cursor-clicking");
      setRipples(prev => [...prev.slice(-4), { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => ring.classList.remove("cursor-clicking");

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ringX = lerp(ringX, mouseX, 0.14);
      ringY = lerp(ringY, mouseY, 0.14);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (ripples.length === 0) return;
    const t = setTimeout(() => setRipples(p => p.slice(1)), 700);
    return () => clearTimeout(t);
  }, [ripples]);

  if (typeof window !== "undefined" && (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches)) {
    return null;
  }

  const isExpanded = mode === "project" || mode === "contact" || mode === "link";
  const label = mode === "project" ? "VIEW" : mode === "contact" ? "SEND" : "";

  return (
    <>
      {/* Morphing cursor ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        data-mode={mode}
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        {label && <span ref={labelRef} className="cursor-label">{label}</span>}
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* Click ripples */}
      {ripples.map(rip => (
        <div
          key={rip.id}
          className="cursor-ripple"
          style={{ left: rip.x, top: rip.y }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
