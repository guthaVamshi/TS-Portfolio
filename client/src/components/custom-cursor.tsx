import { useEffect, useRef } from "react";

/**
 * Lightweight custom cursor — uses direct DOM transforms instead of
 * setState so it never triggers React re-renders.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX  = -100;
    let ringY  = -100;
    let rafId  = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows exactly — no lag
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    };

    // Ring lags behind via RAF lerp — smooth without setState
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      ring.style.transform = `translate(${ringX - 12}px, ${ringY - 12}px)`;
    };
    rafId = requestAnimationFrame(animate);

    // Change ring style on links/buttons
    const onEnter = () => ring.classList.add("cursor-link");
    const onLeave = () => ring.classList.remove("cursor-link");

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Delegate to document — catches dynamically added elements
    document.addEventListener("mouseover", (e) => {
      if ((e.target as HTMLElement)?.closest("a, button")) onEnter();
    });
    document.addEventListener("mouseout", (e) => {
      if ((e.target as HTMLElement)?.closest("a, button")) onLeave();
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="hidden lg:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary pointer-events-none z-[9999] transition-[width,height,border-color] duration-150 [&.cursor-link]:w-9 [&.cursor-link]:h-9 [&.cursor-link]:border-purple-500"
        style={{ willChange: "transform" }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="hidden lg:block fixed top-0 left-0 w-[6px] h-[6px] bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
