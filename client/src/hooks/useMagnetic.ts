import { useEffect, useRef } from "react";

interface MagneticOptions {
  strength?: number;
  range?: number;
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.35, range = 80 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(mx * mx + my * my);
      if (dist < range) {
        tx = mx * strength;
        ty = my * strength;
      } else {
        tx = 0;
        ty = 0;
      }
    };

    const onMouseLeave = () => {
      tx = 0;
      ty = 0;
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      cx = lerp(cx, tx, 0.12);
      cy = lerp(cy, ty, 0.12);
      el.style.transform = `translate(${cx}px, ${cy}px)`;
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.style.transform = "";
    };
  }, [strength, range]);

  return ref;
}
