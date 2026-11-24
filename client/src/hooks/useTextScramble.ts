import { useCallback, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

export function useTextScramble() {
  const rafRef = useRef<number>(0);

  const scramble = useCallback((el: HTMLElement, finalText: string, duration = 700) => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const length = finalText.length;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      let output = "";
      for (let i = 0; i < length; i++) {
        const charRevealAt = i / length;
        if (progress >= charRevealAt + 0.1) {
          output += finalText[i];
        } else if (progress >= charRevealAt) {
          output += `<span class="text-scramble-glyph">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`;
        } else {
          output += `<span class="text-scramble-glyph">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`;
        }
      }
      el.innerHTML = output;
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        el.textContent = finalText;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { scramble };
}
