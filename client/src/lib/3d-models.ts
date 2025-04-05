import * as THREE from "three";

type ModelType = "torus" | "octa" | "terrain" | "waves" | "skills" | "contact" | "projects";

interface Create3DObjectParams {
  el: HTMLElement;
  type: ModelType;
  color?: number;
  rotation?: boolean;
  scale?: number;
}

export function create3DObject({ 
  el, 
  type, 
  color = 0x6C63FF, 
  rotation = false,
  scale = 1
}: Create3DObjectParams) {
  // Setup renderer
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  
  renderer.setSize(el.clientWidth, el.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.appendChild(renderer.domElement);
  
  // Setup scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, 
    el.clientWidth / el.clientHeight, 
    0.1, 
    1000
  );
  camera.position.z = 5;
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create geometry based on type
  let geometry: THREE.BufferGeometry | null = null;
  let material: THREE.Material | null = null;
  let mesh: THREE.Mesh | null = null;
  let group: THREE.Group | null = null;
  
  switch (type) {
    case "torus":
      geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      material = new THREE.MeshPhongMaterial({ 
        color: color,
        shininess: 100,
        emissive: new THREE.Color(color).multiplyScalar(0.1)
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      break;
      
    case "octa":
      geometry = new THREE.OctahedronGeometry(1, 1);
      material = new THREE.MeshPhongMaterial({ 
        color: color,
        wireframe: false,
        flatShading: true,
        shininess: 80,
        emissive: new THREE.Color(color).multiplyScalar(0.1)
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      break;
      
    case "terrain":
      // Create terrain using PlaneGeometry with noise
      geometry = new THREE.PlaneGeometry(4, 4, 64, 64);
      material = new THREE.MeshPhongMaterial({ 
        color: color,
        wireframe: true,
        side: THREE.DoubleSide,
        shininess: 30
      });
      
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.scale.set(scale, scale, scale);
      
      // Add height to vertices
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Simple noise function
        const noise = Math.sin(x * 2) * 0.2 + Math.cos(y * 2) * 0.2;
        positionAttribute.setZ(i, noise);
      }
      
      geometry.computeVertexNormals();
      scene.add(mesh);
      break;
      
    case "waves":
      geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
      material = new THREE.MeshPhongMaterial({ 
        color: color,
        wireframe: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 3;
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      break;

    case "skills":
      // Create a group of skill icons represented as 3D objects
      group = new THREE.Group();
      
      // Create different shapes representing different skills
      const shapes = [
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.ConeGeometry(0.5, 1, 16),
        new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16),
        new THREE.TorusGeometry(0.4, 0.2, 16, 32),
        new THREE.IcosahedronGeometry(0.5, 0),
        new THREE.TetrahedronGeometry(0.6, 0),
        new THREE.DodecahedronGeometry(0.5, 0)
      ];
      
      // Create a grid of objects
      const count = shapes.length;
      
      for (let i = 0; i < count; i++) {
        const shapeIndex = i % shapes.length;
        const shape = shapes[shapeIndex];
        
        const mat = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(i / count, 0.8, 0.5),
          shininess: 80,
          flatShading: true
        });
        
        const shapeMesh = new THREE.Mesh(shape, mat);
        
        // Position in a circle
        const angle = (i / count) * Math.PI * 2;
        const radius = 2;
        shapeMesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5,
          0
        );
        
        shapeMesh.scale.multiplyScalar(0.8);
        group.add(shapeMesh);
      }
      
      scene.add(group);
      break;

    case "projects":
      // Create a 3D project gallery visualization
      group = new THREE.Group();
      
      // Create a framework that looks like a project showcase
      const frameCount = 6;
      
      for (let i = 0; i < frameCount; i++) {
        // Create a project frame
        const frameGeo = new THREE.BoxGeometry(1.5, 1, 0.1);
        const frameMat = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(i / frameCount, 0.8, 0.5),
          shininess: 50,
          transparent: true,
          opacity: 0.9
        });
        
        const frame = new THREE.Mesh(frameGeo, frameMat);
        
        // Position frames in a circular gallery
        const angle = (i / frameCount) * Math.PI * 2;
        const radius = 2.5;
        
        frame.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.3,
          0
        );
        
        // Rotate frames to face center
        frame.lookAt(0, 0, 0);
        
        group.add(frame);
      }
      
      scene.add(group);
      break;

    case "contact":
      // Create a 3D contact/communication visualization
      group = new THREE.Group();
      
      // Create envelope shape
      const envelopeBody = new THREE.BoxGeometry(2, 1.5, 0.1);
      const envelopeMat = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 90,
        flatShading: true
      });
      
      const envelope = new THREE.Mesh(envelopeBody, envelopeMat);
      group.add(envelope);
      
      // Create envelope flap
      const flapGeo = new THREE.CylinderGeometry(1, 1, 2, 4, 1, false, Math.PI/4, Math.PI/2);
      const flapMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color).multiplyScalar(1.2),
        shininess: 90,
        flatShading: true
      });
      
      const flap = new THREE.Mesh(flapGeo, flapMat);
      flap.scale.set(1, 0.2, 0.5);
      flap.rotation.set(Math.PI/2, 0, 0);
      flap.position.set(0, 0.7, 0);
      group.add(flap);
      
      // Add some small spheres representing email/communication dots
      for (let i = 0; i < 3; i++) {
        const dotGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const dotMat = new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          emissive: new THREE.Color(color).multiplyScalar(0.5),
          shininess: 100
        });
        
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(0, -0.2, 0.2 + i * 0.5);
        group.add(dot);
      }
      
      scene.add(group);
      break;
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    if (rotation && mesh) {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.007;
    }
    
    // Type-specific animations
    if (type === "waves" && mesh && geometry) {
      const time = Date.now() * 0.002;
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Create wave effect
        const waveZ = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 2 + time) * 0.3;
        positionAttribute.setZ(i, waveZ);
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    }
    
    // Animate skill objects
    if (type === "skills" && group) {
      const time = Date.now() * 0.001;
      group.rotation.y = time * 0.2;
      
      // Animate each skill object individually
      group.children.forEach((child: THREE.Object3D, i: number) => {
        child.rotation.x = time * 0.3 + i * 0.1;
        child.rotation.z = time * 0.2 + i * 0.05;
        
        // Make objects "breathe"
        const s = 0.8 + Math.sin(time * 2 + i) * 0.1;
        child.scale.set(s, s, s);
      });
    }
    
    // Animate projects gallery
    if (type === "projects" && group) {
      const time = Date.now() * 0.001;
      group.rotation.y = time * 0.1;
      
      // Subtle pulse animation on project frames
      group.children.forEach((child: THREE.Object3D, i: number) => {
        const pulse = 1 + Math.sin(time * 3 + i * 0.5) * 0.05;
        child.scale.set(pulse, pulse, pulse);
      });
    }
    
    // Animate contact elements
    if (type === "contact" && group) {
      const time = Date.now() * 0.001;
      
      // Gentle floating animation
      group.position.y = Math.sin(time) * 0.1;
      group.rotation.z = Math.sin(time * 0.5) * 0.1;
      
      // Animate the dots
      group.children.forEach((child: THREE.Object3D, i: number) => {
        if (i > 1) { // Only animate the dots
          child.position.x = Math.sin(time * 2 + i) * 0.5;
        }
      });
    }
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  function handleResize() {
    camera.aspect = el.clientWidth / el.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(el.clientWidth, el.clientHeight);
  }
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return {
    cleanup: () => {
      window.removeEventListener('resize', handleResize);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      scene.clear();
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    }
  };
}
