import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Only on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onMouseDown = (e: MouseEvent) => {
      ring.classList.add("cursor-click");
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const onMouseUp = () => {
      ring.classList.remove("cursor-click");
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ringX = lerp(ringX, mouseX, 0.2);
      ringY = lerp(ringY, mouseY, 0.2);
      ring.style.transform = `translate3d(${ringX - 14}px, ${ringY - 14}px, 0)`;
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => ring.classList.add("cursor-link");
    const onLeave = () => ring.classList.remove("cursor-link");

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest("a, button, [role='button'], input, textarea, .card, .skill-tag, .cursor-pointer")) {
        onEnter();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest("a, button, [role='button'], input, textarea, .card, .skill-tag, .cursor-pointer")) {
        onLeave();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Auto clean ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (typeof window !== "undefined" && (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches)) {
    return null;
  }

  return (
    <>
      {/* Trailing luminous ring */}
      <div
        ref={ringRef}
        className="hidden lg:block fixed top-0 left-0 w-7 h-7 rounded-full border border-purple-400/60 pointer-events-none z-[99999] opacity-0 transition-[width,height,border-color,background-color,transform] duration-150 backdrop-blur-[0.5px] [&.cursor-link]:w-12 [&.cursor-link]:h-12 [&.cursor-link]:border-purple-300 [&.cursor-link]:bg-purple-500/15 [&.cursor-click]:scale-75"
        style={{ willChange: "transform, opacity" }}
      />
      {/* Center pinpoint */}
      <div
        ref={dotRef}
        className="hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-indigo-300 rounded-full pointer-events-none z-[99999] opacity-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Click ripple animations */}
      {ripples.map((rip) => (
        <div
          key={rip.id}
          className="hidden lg:block fixed pointer-events-none z-[99998] rounded-full border border-purple-400/50 animate-cursor-ping"
          style={{
            left: rip.x - 20,
            top: rip.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}
    </>
  );
}
