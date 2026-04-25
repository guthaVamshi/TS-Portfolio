import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,          // disabled — barely visible at this opacity
      powerPreference: "low-power",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // Cap at 1× DPR — more than enough for translucent background dots
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

    // Fewer particles — 400 vs 1000 (still looks identical at this opacity)
    const COUNT = 400;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x6C63FF,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    // Smooth, lerped mouse target instead of raw per-frame delta
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth)  *  2 - 1;
      targetY = (e.clientY / window.innerHeight) * -2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Frame-rate cap for the background — 20fps is plenty for subtle bg dots
    const FPS_CAP   = 20;
    const FRAME_MS  = 1000 / FPS_CAP;
    let lastFrame   = 0;
    let rafId       = 0;
    let visible     = true;

    // Pause when scrolled completely off-screen
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    const animate = (ts: number) => {
      rafId = requestAnimationFrame(animate);
      if (!visible) return;
      if (ts - lastFrame < FRAME_MS) return;
      lastFrame = ts;

      // Lerp towards mouse position for buttery movement
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      mesh.rotation.x += 0.0003 + currentY * 0.0003;
      mesh.rotation.y += 0.0002 + currentX * 0.0003;

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    // Throttled resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}
