import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NodeData {
  id: string;
  name: string;
  sub: string;
  category: string;
  pos: [number, number, number];
  color: number;
  hexColor: string;
  stats: { throughput: string; latency: string; status: string; stack: string };
}

// Nodes positioned with artistic distribution (shifted slightly right on desktop for perfect text balance)
const NODES: NodeData[] = [
  {
    id: "gateway",
    name: "Spring Boot Gateway",
    sub: "Edge Routing & OAuth2",
    category: "Gateway",
    pos: [1.6, 0.4, 0],
    color: 0x6366f1,
    hexColor: "#6366f1",
    stats: { throughput: "42k req/s", latency: "18ms", status: "Active", stack: "Java 17, Spring Security, JWT" },
  },
  {
    id: "client",
    name: "React Storefront UI",
    sub: "Edge Client Tier",
    category: "Frontend",
    pos: [-0.6, 1.8, 0.4],
    color: 0x38bdf8,
    hexColor: "#38bdf8",
    stats: { throughput: "Client Edge", latency: "12ms", status: "Rendered", stack: "React 18, TypeScript, Tailwind" },
  },
  {
    id: "microservices",
    name: "Order & Cart Microservices",
    sub: "Core Domain Logic",
    category: "Backend",
    pos: [3.8, 1.6, -0.3],
    color: 0x10b981,
    hexColor: "#10b981",
    stats: { throughput: "28k req/s", latency: "24ms", status: "Healthy", stack: "Java 17, Spring Boot, Hibernate" },
  },
  {
    id: "salesforce",
    name: "Salesforce CRM & LWC",
    sub: "Enterprise Cloud Tier",
    category: "CRM & Cloud",
    pos: [-0.5, -1.6, 0.3],
    color: 0x00a1e0,
    hexColor: "#00a1e0",
    stats: { throughput: "Realtime Sync", latency: "65ms", status: "Connected", stack: "Apex, Lightning Web Components, REST" },
  },
  {
    id: "database",
    name: "PostgreSQL & Redis",
    sub: "High-Throughput Persistence",
    category: "Data Store",
    pos: [3.6, -1.4, 0.2],
    color: 0xa855f7,
    hexColor: "#a855f7",
    stats: { throughput: "35k IOPS", latency: "8ms", status: "Optimized", stack: "PostgreSQL, Connection Pooling, SQL" },
  },
  {
    id: "cloud",
    name: "AWS & Docker Clusters",
    sub: "Containerized Cloud",
    category: "Infrastructure",
    pos: [1.6, -2.4, -0.5],
    color: 0xf59e0b,
    hexColor: "#f59e0b",
    stats: { throughput: "Multi-Zone", latency: "99.99% Uptime", status: "Deployed", stack: "AWS EC2, S3, Docker, CI/CD" },
  },
];

const CONNECTIONS: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "microservices"],
  ["gateway", "salesforce"],
  ["gateway", "database"],
  ["microservices", "database"],
  ["microservices", "cloud"],
  ["salesforce", "cloud"],
  ["database", "cloud"],
];

interface Hero3DProps {
  trafficSpike?: boolean;
}

export default function Hero3D({ trafficSpike = false }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Responsive position adaptation
    const isMobile = width < 768;
    const xShift = isMobile ? 0 : 0.8;

    const nodeMeshes: Array<{
      data: NodeData;
      mesh: THREE.Mesh;
      glowRing: THREE.Mesh;
      basePos: THREE.Vector3;
    }> = [];

    // Create Nodes
    NODES.forEach((node) => {
      const group = new THREE.Group();

      // Node Sphere
      const sphereGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.8,
        roughness: 0.15,
        metalness: 0.9,
        clearcoat: 1.0,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { nodeId: node.id };
      group.add(sphereMesh);

      // Rotating Outer Ring
      const ringGeo = new THREE.TorusGeometry(0.38, 0.015, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      group.add(ringMesh);

      // Billboard Text Label
      const createLabelTexture = (title: string, sub: string, color: string) => {
        const c = document.createElement("canvas");
        c.width = 340;
        c.height = 96;
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "rgba(10, 15, 30, 0.88)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(4, 4, 332, 88, 18);
          ctx.fill();
          ctx.stroke();

          // Dot
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(28, 48, 8, 0, Math.PI * 2);
          ctx.fill();

          // Title
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 22px Inter, sans-serif";
          ctx.fillText(title, 48, 40);

          // Subtitle
          ctx.fillStyle = "#94a3b8";
          ctx.font = "15px Inter, sans-serif";
          ctx.fillText(sub, 48, 70);
        }
        return new THREE.CanvasTexture(c);
      };

      const labelTex = createLabelTexture(node.name, node.sub, node.hexColor);
      const labelMat = new THREE.SpriteMaterial({ map: labelTex, transparent: true, opacity: 0.92 });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(1.45, 0.42, 1);
      labelSprite.position.set(0, -0.6, 0);
      group.add(labelSprite);

      // Shift slightly right to balance hero layout
      const adjustedX = isMobile ? node.pos[0] * 0.75 : node.pos[0] + xShift;
      const adjustedY = isMobile ? node.pos[1] * 0.85 : node.pos[1];
      const basePos = new THREE.Vector3(adjustedX, adjustedY, node.pos[2]);
      group.position.copy(basePos);
      rootGroup.add(group);

      nodeMeshes.push({
        data: node,
        mesh: sphereMesh,
        glowRing: ringMesh,
        basePos,
      });
    });

    // 2. Conduits / Cables between nodes (Bezier curves)
    const conduitCurves: THREE.CatmullRomCurve3[] = [];
    CONNECTIONS.forEach(([fromId, toId]) => {
      const fromNode = nodeMeshes.find((n) => n.data.id === fromId);
      const toNode = nodeMeshes.find((n) => n.data.id === toId);
      if (!fromNode || !toNode) return;

      const midPoint = new THREE.Vector3()
        .addVectors(fromNode.basePos, toNode.basePos)
        .multiplyScalar(0.5);
      midPoint.z += 0.45;

      const curve = new THREE.CatmullRomCurve3([
        fromNode.basePos,
        midPoint,
        toNode.basePos,
      ]);
      conduitCurves.push(curve);

      const points = curve.getPoints(60);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      rootGroup.add(line);
    });

    // 3. Flowing Data Packet Particles along Curves
    const packetCount = 32;
    const packetGeo = new THREE.SphereGeometry(0.048, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const packetMeshes: Array<{ mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }> = [];

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat.clone());
      const curveIndex = i % conduitCurves.length;
      const progress = Math.random();
      const speed = 0.0035 + Math.random() * 0.0045;

      packetMeshes.push({ mesh: pMesh, curveIndex, progress, speed });
      rootGroup.add(pMesh);
    }

    // 4. Ambient Cyber Dust Particles
    const dustCount = 90;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 16;
      dustPos[i + 1] = (Math.random() - 0.5) * 10;
      dustPos[i + 2] = (Math.random() - 0.5) * 4;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.5,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    rootGroup.add(dustPoints);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x6366f1, 3.5, 15);
    blueLight.position.set(0, 3, 5);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 12);
    cyanLight.position.set(-4, -2, 4);
    scene.add(cyanLight);

    // Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Only drag if clicking background, not interactive overlay buttons
      if ((e.target as HTMLElement)?.closest("button, a, input")) return;
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.x = nx;
      mouse.y = ny;
      targetTiltX = nx * 0.2;
      targetTiltY = ny * 0.2;

      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        velY = dx * 0.004;
        velX = dy * 0.004;
        rootGroup.rotation.y += velY;
        rootGroup.rotation.x += velX;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onPointerUp = () => { isDragging = false; };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let isVisible = true;
    let rafId = 0;
    let time = 0;

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    io.observe(container);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      time += 0.012;

      // Parallax smooth interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      if (!isDragging) {
        velX *= 0.92;
        velY *= 0.92;
        rootGroup.rotation.x += velX + Math.sin(time * 0.4) * 0.0004;
        rootGroup.rotation.y += velY + 0.0014;
      }

      // Raycasting for node hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.nodeId;
        const found = NODES.find((n) => n.id === hitId) || null;
        setHoveredNode(found);
      } else if (!isDragging) {
        setHoveredNode(null);
      }

      // Animate Nodes with subtle organic floating
      nodeMeshes.forEach((item, idx) => {
        const floatY = Math.sin(time * 1.4 + idx * 1.2) * 0.05;
        item.mesh.parent!.position.y = item.basePos.y + floatY;
        item.glowRing.rotation.z = time * 0.5 + idx;
        item.glowRing.rotation.x = Math.sin(time * 0.7 + idx) * 0.25;
      });

      // Animate flowing data packets
      const speedMult = trafficSpike ? 2.8 : 1.0;
      packetMeshes.forEach((p) => {
        p.progress += p.speed * speedMult;
        if (p.progress > 1) p.progress = 0;

        const curve = conduitCurves[p.curveIndex];
        if (curve) {
          const pt = curve.getPoint(p.progress);
          p.mesh.position.copy(pt);
        }
      });

      // Camera parallax
      camera.position.x = currentTiltX * 1.2;
      camera.position.y = currentTiltY * 1.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [trafficSpike]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden select-none"
    >
      {/* Full-Bleed 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Realtime Node Inspection Telemetry Overlay */}
      {hoveredNode && (
        <div className="absolute top-20 right-6 sm:right-12 z-30 pointer-events-none transition-all duration-300">
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/40 backdrop-blur-xl shadow-2xl w-64 text-left">
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase text-purple-300 tracking-wider">
                {hoveredNode.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {hoveredNode.stats.status}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">{hoveredNode.name}</h4>
            <p className="text-[10px] text-slate-400 mb-3">{hoveredNode.stats.stack}</p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono">
              <div>
                <span className="text-slate-400 block text-[9px]">Throughput</span>
                <span className="text-purple-300 font-bold">{hoveredNode.stats.throughput}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">Latency</span>
                <span className="text-sky-300 font-bold">{hoveredNode.stats.latency}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
