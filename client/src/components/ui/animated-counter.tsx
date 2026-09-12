import { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({ value, className, style }: AnimatedCounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  
  // Extract number and suffix (e.g., "4+", "20+", "5", "Macy's")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || targetNum === null) return;

    if (reduced) { setCount(targetNum); return; }
    let rafId = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * targetNum);
      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      } else {
        setCount(targetNum);
      }
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, targetNum, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {targetNum !== null ? `${count}${suffix}` : value}
    </span>
  );
}
