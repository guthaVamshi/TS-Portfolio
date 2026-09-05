import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle field configuration
    const COUNT = 320;
    const positions = new Float32Array(COUNT * 3);
    const originalPositions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;

      scales[i] = Math.random() * 0.8 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom circular particle texture
    const createCircleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(168, 85, 247, 0.8)");
        gradient.addColorStop(0.7, "rgba(99, 102, 241, 0.3)");
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(c);
    };

    const particleTexture = createCircleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse coordinates in 3D world space
    let mouseWorldX = 0;
    let mouseWorldY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Click ripples
    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; strength: number }> = [];

    const onMouseMove = (e: MouseEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      // Convert NDC to world coordinates at z = 0
      targetMouseX = ndcX * 10;
      targetMouseY = ndcY * 7;
    };

    const onClick = (e: MouseEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      ripples.push({
        x: ndcX * 10,
        y: ndcY * 7,
        radius: 0.1,
        maxRadius: 6.0,
        strength: 0.8,
      });
      if (ripples.length > 5) ripples.shift();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    let rafId = 0;
    let isVisible = true;

    const io = new IntersectionObserver(([e]) => {
      isVisible = e.isIntersecting;
    });
    io.observe(canvas);

    let time = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      time += 0.01;

      // Smooth mouse tracking
      mouseWorldX += (targetMouseX - mouseWorldX) * 0.08;
      mouseWorldY += (targetMouseY - mouseWorldY) * 0.08;

      const posAttr = geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      // Update ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        ripples[r].radius += 0.12;
        ripples[r].strength *= 0.96;
        if (ripples[r].radius > ripples[r].maxRadius || ripples[r].strength < 0.02) {
          ripples.splice(r, 1);
        }
      }

      // Physics update for particles
      for (let i = 0; i < COUNT; i++) {
        const idx = i * 3;
        let px = arr[idx];
        let py = arr[idx + 1];
        let pz = arr[idx + 2];

        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        // 1. Gentle natural organic drifting
        px += velocities[idx] + Math.sin(time + i) * 0.003;
        py += velocities[idx + 1] + Math.cos(time + i * 0.7) * 0.003;

        // 2. Mouse Repulsion & Swirl
        const dx = px - mouseWorldX;
        const dy = py - mouseWorldY;
        const distSq = dx * dx + dy * dy;
        const radius = 3.5;

        if (distSq < radius * radius && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / radius) * 0.08;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
          // Add subtle tangential swirl
          px += (-dy / dist) * force * 0.5;
          py += (dx / dist) * force * 0.5;
        }

        // 3. Click Ripple Wave push
        for (const rip of ripples) {
          const rdx = px - rip.x;
          const rdy = py - rip.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rDist - rip.radius);
          if (diff < 1.0) {
            const push = (1.0 - diff) * rip.strength * 0.15;
            px += (rdx / (rDist || 1)) * push;
            py += (rdy / (rDist || 1)) * push;
          }
        }

        // 4. Spring back towards home base
        px += (ox - px) * 0.02;
        py += (oy - py) * 0.02;
        pz += (oz - pz) * 0.02;

        arr[idx] = px;
        arr[idx + 1] = py;
        arr[idx + 2] = pz;
      }

      posAttr.needsUpdate = true;
      particles.rotation.y = time * 0.02;
      particles.rotation.x = Math.sin(time * 0.01) * 0.05;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

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
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}
