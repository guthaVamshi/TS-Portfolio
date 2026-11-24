import { useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Holographic foil card effect — the same physics as physical Pokemon holo cards.
 * - Rainbow prism shimmer layer that rotates with mouse UV coordinates
 * - Specular glare spot tracking the cursor
 * - 3D tilt via CSS perspective
 * - Badge/content floats at a higher Z plane for depth
 */
export default function HolographicCard({ children, className = "" }: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card || reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Rotation: max ±14°
    const rx = ((y - cy) / cy) * -14;
    const ry = ((x - cx) / cx) * 14;

    // UV 0-100 for shimmer positioning
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    card.style.setProperty("--holo-rx", `${rx}deg`);
    card.style.setProperty("--holo-ry", `${ry}deg`);
    card.style.setProperty("--holo-px", `${px}%`);
    card.style.setProperty("--holo-py", `${py}%`);
    card.style.setProperty("--holo-active", "1");
  }, [reduced]);

  const onMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--holo-rx", "0deg");
    card.style.setProperty("--holo-ry", "0deg");
    card.style.setProperty("--holo-active", "0");
  }, []);

  return (
    <div
      ref={ref}
      className={`holo-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        "--holo-rx": "0deg",
        "--holo-ry": "0deg",
        "--holo-px": "50%",
        "--holo-py": "50%",
        "--holo-active": "0",
      } as React.CSSProperties}
    >
      {/* Prism rainbow shimmer layer */}
      <div className="holo-shine" aria-hidden="true" />
      {/* Specular glare spot */}
      <div className="holo-glare" aria-hidden="true" />
      {/* Content */}
      {children}
    </div>
  );
}
