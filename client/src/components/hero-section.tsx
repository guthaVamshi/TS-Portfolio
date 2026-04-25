import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from '../Files/Vamshi_SFDC.pdf';
import { useEffect, useRef, useCallback } from "react";

// ─── Apple 50-year rainbow palette ──────────────────────────────────────────
const APPLE_COLORS: [number, number, number][] = [
  [0, 100, 55],  // Red
  [21, 100, 52],  // Orange
  [51, 100, 50],  // Yellow
  [134, 100, 38],  // Green
  [211, 100, 50],  // Blue
  [271, 100, 60],  // Purple
  [330, 100, 60],  // Pink
  [185, 100, 42],  // Teal
];

const LIFETIME_MS = 5200;  // 5+ second fade
const MAX_RIPPLES = 80;    // hard cap — keeps GPU happy
const BLOBS_PER_PT = 2;     // overlapping blobs per cursor point
const SPAWN_MIN_MS = 55;    // max ~18 spawns/sec regardless of cursor speed
const SPAWN_MIN_PX = 10;    // min distance threshold (px)
const TARGET_FPS = 36;    // skip frames above this to save CPU
const FRAME_BUDGET = 1000 / TARGET_FPS;

interface Ripple {
  x: number;
  y: number;
  maxRadius: number;
  born: number;
  colorIdx: number;
  colorBlend: number;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const colorIdxRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rectRef = useRef<DOMRect | null>(null);     // cached bounding rect
  const visibleRef = useRef<boolean>(true);            // IntersectionObserver flag

  // ─── Spawn ripple ─────────────────────────────────────────────────────────
  const spawnRipple = useCallback((x: number, y: number) => {
    const now = performance.now();

    // Time-gate: don't spawn faster than SPAWN_MIN_MS
    if (now - lastSpawnRef.current < SPAWN_MIN_MS) return;
    lastSpawnRef.current = now;

    // Palette walk
    colorIdxRef.current = (colorIdxRef.current + 1) % APPLE_COLORS.length;

    const arr = ripplesRef.current;

    for (let i = 0; i < BLOBS_PER_PT; i++) {
      // If at cap, recycle the oldest slot instead of push
      const ripple: Ripple = {
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        maxRadius: 130 + Math.random() * 90,
        born: now,
        colorIdx: (colorIdxRef.current + i) % APPLE_COLORS.length,
        colorBlend: Math.random(),
      };
      if (arr.length >= MAX_RIPPLES) {
        arr.shift();           // drop oldest — O(n) but n=80, negligible
      }
      arr.push(ripple);
    }
  }, []);

  // ─── Draw loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // desynchronized = browser can paint canvas independently of main thread
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Size canvas at CSS pixel resolution (no DPR upscale needed for this blur effect)
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      rectRef.current = null; // invalidate cached rect on resize
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause rendering when section is off-screen
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    const draw = (ts: number) => {
      animFrameRef.current = requestAnimationFrame(draw);

      // Frame-rate cap: skip if we're ahead of budget
      if (ts - lastFrameRef.current < FRAME_BUDGET) return;
      lastFrameRef.current = ts;

      // Don't paint when off-screen
      if (!visibleRef.current) return;

      // Skip frame entirely when no live ripples
      const arr = ripplesRef.current;
      if (arr.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      const now = ts;        // reuse raf timestamp instead of calling performance.now()
      let alive = 0;

      for (let i = 0; i < arr.length; i++) {
        const r = arr[i];
        const age = now - r.born;
        if (age >= LIFETIME_MS) continue;

        const t = age / LIFETIME_MS;

        // Ease-out cubic expansion
        const radius = Math.max(1, (1 - Math.pow(1 - t, 3)) * r.maxRadius);

        // Hold → cosine fade
        let alpha: number;
        if (t < 0.40) {
          alpha = 0.70;
        } else {
          const ft = (t - 0.40) / 0.60;
          alpha = 0.70 * 0.5 * (1 + Math.cos(Math.PI * ft));
        }
        if (alpha < 0.005) continue;

        // Colour interpolation between two adjacent Apple palette entries
        const [h1, s1, l1] = APPLE_COLORS[r.colorIdx];
        const [h2, s2, l2] = APPLE_COLORS[(r.colorIdx + 1) % APPLE_COLORS.length];
        const cb = r.colorBlend;
        const h = h1 + (h2 - h1) * cb;
        const s = s1 + (s2 - s1) * cb;
        const l = l1 + (l2 - l1) * cb;

        // 3 gradient stops (reduced from 4) — still looks rich
        const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, radius);
        g.addColorStop(0, `hsla(${h},${s}%,${l}%,${alpha})`);
        g.addColorStop(0.5, `hsla(${(h + 90) % 360},${s}%,${l + 6}%,${alpha * 0.55})`);
        g.addColorStop(1, `hsla(${h},${s}%,${l}%,0)`);

        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        arr[alive++] = r;      // compact in-place — no new array allocation
      }

      // Trim expired entries without allocating a new array
      arr.length = alive;

      ctx.globalCompositeOperation = "source-over";
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // ─── Mouse tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pre-cache rect; invalidated on resize
    rectRef.current = section.getBoundingClientRect();
    const refreshRect = () => { rectRef.current = section.getBoundingClientRect(); };
    window.addEventListener("resize", refreshRect, { passive: true });

    const onMove = (e: MouseEvent) => {
      const rect = rectRef.current ?? section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Bounding check — skip if outside section
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      // Distance gate
      const last = lastMouseRef.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (dx * dx + dy * dy < SPAWN_MIN_PX * SPAWN_MIN_PX) return;
      }
      lastMouseRef.current = { x, y };
      spawnRipple(x, y);
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", refreshRect);
    };
  }, [spawnRipple]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      style={{ background: "#ffffff", cursor: "none" }}
    >
      {/* GPU-composited canvas layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform",   // promote to own GPU layer
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(170,170,190,0.13) 1px, transparent 0)",
          backgroundSize: "44px 44px",
          zIndex: 1,
        }}
      />

      {/* ── Hero content ── */}
      <Container className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full shadow-lg mx-auto"
          >
            <motion.div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">
              Available for opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-primary to-purple-600 bg-clip-text text-transparent">
                Vamshi Gutha
              </span>
            </h1>
          </motion.div>

          {/* Role & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700 leading-tight">
              Salesforce Developer &amp; Full Stack Engineer
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Passionate about creating scalable solutions with{" "}
              <span className="font-semibold text-primary">5+ years</span> of experience
              in Salesforce ecosystem and modern web technologies. I transform complex
              business requirements into elegant, user-friendly applications.
            </p>
          </motion.div>

          {/* Skill chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto px-4"
          >
            {[
              { icon: "fab fa-salesforce", label: "Salesforce", color: "from-blue-400 to-blue-600" },
              { icon: "fab fa-react", label: "React", color: "from-cyan-400 to-blue-500" },
              { icon: "fab fa-node-js", label: "Node.js", color: "from-green-400 to-emerald-600" },
              { icon: "fab fa-js", label: "JavaScript", color: "from-yellow-400 to-orange-500" },
            ].map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.07, y: -6 }}
                className={`p-3 sm:p-4 bg-gradient-to-br ${skill.color} rounded-xl sm:rounded-2xl shadow-lg text-white text-center group cursor-pointer`}
              >
                <i className={`${skill.icon} text-xl sm:text-2xl mb-1 sm:mb-2 block group-hover:scale-110 transition-transform`} />
                <span className="text-xs sm:text-sm font-medium">{skill.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 px-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base">Let's Work Together</span>
                <motion.i
                  className="fas fa-arrow-right text-sm"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </span>
            </motion.a>

            <motion.a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl sm:rounded-2xl font-semibold border-2 border-slate-200 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <i className="fas fa-download text-primary text-sm" />
                <span className="text-sm sm:text-base">View Resume</span>
              </span>
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 px-4"
          >
            {[
              { icon: "fab fa-github", href: "https://github.com/guthaVamshi", color: "hover:text-gray-900" },
              { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", color: "hover:text-blue-600" },
              { icon: "fas fa-envelope", href: "mailto:vamshigutha@gmail.com", color: "hover:text-red-500" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.4 + i * 0.1 }}
                whileHover={{ scale: 1.2, y: -3 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-600 ${s.color} transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <i className={`${s.icon} text-base sm:text-lg`} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
        >
          <motion.i
            className="fas fa-chevron-down text-sm sm:text-base text-slate-600 group-hover:text-white"
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.a>
      </motion.div> */}
    </section>
  );
}