import { useEffect, useRef, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;

// Original implementation: a damped height-field simulation, independent of Skiper UI.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simulationShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uState;
  uniform vec2 uTexel;
  uniform vec2 uPointer;
  uniform vec2 uPrevious;
  uniform float uImpulse;
  uniform float uAspect;

  float segmentDistance(vec2 p, vec2 a, vec2 b) {
    vec2 d = b - a;
    float t = clamp(dot(p - a, d) / max(dot(d, d), 0.00001), 0.0, 1.0);
    return length(p - a - t * d);
  }

  void main() {
    vec2 state = texture2D(uState, vUv).rg;
    float neighbors = texture2D(uState, vUv + vec2(uTexel.x, 0.0)).r
      + texture2D(uState, vUv - vec2(uTexel.x, 0.0)).r
      + texture2D(uState, vUv + vec2(0.0, uTexel.y)).r
      + texture2D(uState, vUv - vec2(0.0, uTexel.y)).r;
    float velocity = (state.g + (neighbors - 4.0 * state.r) * 0.23) * 0.975;
    vec2 aspect = vec2(uAspect, 1.0);
    float distanceToTrail = segmentDistance(vUv * aspect, uPrevious * aspect, uPointer * aspect);
    velocity += exp(-pow(distanceToTrail / 0.017, 2.0)) * uImpulse;
    float height = (state.r + velocity) * 0.994;
    float edge = smoothstep(0.0, 0.035, min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y)));
    gl_FragColor = vec4(clamp(height * edge, -1.5, 1.5), velocity * edge, 0.0, 1.0);
  }
`;

const waterShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uState;
  uniform vec2 uTexel;
  uniform float uAspect;

  void main() {
    float height = texture2D(uState, vUv).r;
    vec2 slope = vec2(
      texture2D(uState, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uState, vUv - vec2(uTexel.x, 0.0)).r,
      texture2D(uState, vUv + vec2(0.0, uTexel.y)).r - texture2D(uState, vUv - vec2(0.0, uTexel.y)).r
    );
    vec2 p = (vUv - vec2(0.78, 0.52)) * vec2(uAspect, 1.0);
    p += slope * 0.24;
    // Fine, curved reflection bands make refraction visible even in still water.
    float curve = p.x + 0.11 * sin(p.y * 6.5) + 0.045 * sin(p.y * 14.0);
    float band = pow(0.5 + 0.5 * cos(curve * 155.0), 18.0);
    float pool = exp(-dot(p * vec2(1.15, 0.85), p * vec2(1.15, 0.85)) * 5.0);
    vec3 normal = normalize(vec3(-slope * 14.0, 1.0));
    float specular = pow(max(dot(normal, normalize(vec3(-0.5, 0.65, 1.0))), 0.0), 24.0);
    float movement = clamp(length(slope) * 11.0 + abs(height) * 0.14, 0.0, 1.0);
    float rim = pow(movement, 0.65);
    vec3 base = vec3(0.063, 0.067, 0.059);
    vec3 sage = vec3(0.58, 0.69, 0.41);
    vec3 light = vec3(0.82, 0.91, 0.65);
    vec3 color = base + sage * pool * (0.016 + band * 0.11);
    color += sage * rim * 0.23 + light * specular * movement * 0.75;
    float edge = smoothstep(0.0, 0.1, min(vUv.y, 1.0-vUv.y));
    gl_FragColor = vec4(mix(base, color, edge), 1.0);
  }
`;

export default function HeroWater() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, () => true);

  useEffect(() => {
    const host = hostRef.current;
    const stage = host?.parentElement;
    if (!host || !stage || reduced) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;

    async function initialize() {
      const THREE = await import("three");
      if (cancelled || !host || !stage) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false, powerPreference: "low-power" });
      } catch { return; }
      if (!renderer.extensions.has("EXT_color_buffer_float")) {
        renderer.dispose();
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x10110f, 1);
      host.appendChild(renderer.domElement);
      host.dataset.waterReady = "true";

      const resolution = new THREE.Vector2(256, 192);
      const options = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
      let read = new THREE.WebGLRenderTarget(256, 192, options);
      let write = read.clone();
      const texel = new THREE.Vector2(1 / 256, 1 / 192);
      const pointer = new THREE.Vector2(-1, -1);
      const previous = pointer.clone();
      const simulation = new THREE.ShaderMaterial({ vertexShader, fragmentShader: simulationShader, uniforms: {
        uState: { value: read.texture }, uTexel: { value: texel },
        uPointer: { value: pointer }, uPrevious: { value: previous },
        uImpulse: { value: 0 }, uAspect: { value: 1 },
      } });
      const water = new THREE.ShaderMaterial({ vertexShader, fragmentShader: waterShader, uniforms: {
        uState: { value: read.texture }, uTexel: { value: texel }, uAspect: { value: 1 },
      } });
      const geometry = new THREE.PlaneGeometry(2, 2);
      const quad = new THREE.Mesh(geometry, water);
      const scene = new THREE.Scene();
      scene.add(quad);
      const camera = new THREE.Camera();
      let frame = 0;
      let visible = true;
      let contextAvailable = true;
      let lastTime = 0;
      let activeUntil = 0;
      let moved = false;
      let hasPointer = false;

      const render = (time: number) => {
        frame = 0;
        if (!visible || document.hidden || !contextAvailable) return;
        if (time - lastTime >= 1000 / 60 - 1) {
          simulation.uniforms.uState.value = read.texture;
          simulation.uniforms.uImpulse.value = moved ? 0.18 : 0;
          quad.material = simulation;
          renderer.setRenderTarget(write);
          renderer.render(scene, camera);
          [read, write] = [write, read];
          quad.material = water;
          water.uniforms.uState.value = read.texture;
          renderer.setRenderTarget(null);
          renderer.render(scene, camera);
          previous.copy(pointer);
          moved = false;
          lastTime = time;
        }
        if (time < activeUntil) frame = requestAnimationFrame(render);
      };
      const wake = () => {
        activeUntil = performance.now() + 5000;
        if (!frame && visible && !document.hidden && contextAvailable) frame = requestAnimationFrame(render);
      };
      const resize = () => {
        if (!contextAvailable) return;
        const { width, height } = stage.getBoundingClientRect();
        const aspect = width / Math.max(height, 1);
        renderer.setSize(width, height);
        resolution.set(Math.min(384, Math.round(220 * aspect)), 220);
        read.setSize(resolution.x, resolution.y);
        write.setSize(resolution.x, resolution.y);
        texel.set(1 / resolution.x, 1 / resolution.y);
        simulation.uniforms.uAspect.value = aspect;
        water.uniforms.uAspect.value = aspect;
        renderer.setClearColor(0x000000, 0);
        for (const target of [read, write]) { renderer.setRenderTarget(target); renderer.clear(); }
        renderer.setRenderTarget(null);
        renderer.setClearColor(0x10110f, 1);
        wake();
      };
      const onPointer = (event: PointerEvent) => {
        if (event.target instanceof Element && event.target.closest("a, button")) return;
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1 - (event.clientY - rect.top) / rect.height;
        pointer.set(x, y);
        if (!hasPointer) previous.copy(pointer);
        hasPointer = true;
        moved = true;
        wake();
      };
      const leave = () => { hasPointer = false; };
      const visibility = () => {
        if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
        else if (visible) wake();
      };
      const contextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(frame);
        frame = 0;
        contextAvailable = false;
        renderer.domElement.style.display = "none";
        host.dataset.waterReady = "false";
      };
      const resizeObserver = new ResizeObserver(resize);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else { cancelAnimationFrame(frame); frame = 0; hasPointer = false; }
      });
      resizeObserver.observe(stage);
      observer.observe(stage);
      stage.addEventListener("pointermove", onPointer, { passive: true });
      stage.addEventListener("pointerdown", onPointer, { passive: true });
      stage.addEventListener("pointerleave", leave);
      stage.addEventListener("pointercancel", leave);
      document.addEventListener("visibilitychange", visibility);
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      resize();
      dispose = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        observer.disconnect();
        stage.removeEventListener("pointermove", onPointer);
        stage.removeEventListener("pointerdown", onPointer);
        stage.removeEventListener("pointerleave", leave);
        stage.removeEventListener("pointercancel", leave);
        document.removeEventListener("visibilitychange", visibility);
        renderer.domElement.removeEventListener("webglcontextlost", contextLost);
        geometry.dispose(); simulation.dispose(); water.dispose(); read.dispose(); write.dispose(); renderer.dispose();
        renderer.domElement.remove();
        delete host.dataset.waterReady;
      };
    }
    initialize().catch(() => { dispose?.(); });
    return () => { cancelled = true; dispose?.(); };
  }, [reduced]);

  return <div ref={hostRef} className="hero-water" aria-hidden="true" />;
}
