import * as THREE from "three";

type ModelType = "torus" | "octa" | "terrain" | "waves" | "skills" | "contact" | "projects" | "code" | "computer" | "wave-bg";

interface Create3DObjectParams {
  el: HTMLElement;
  type: ModelType;
  color?: number;
  rotation?: boolean;
  scale?: number;
  isBackground?: boolean;
}

export function create3DObject({ 
  el, 
  type, 
  color = 0x6C63FF, 
  rotation = false,
  scale = 1,
  isBackground = false
}: Create3DObjectParams) {
  // Setup renderer
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  
  renderer.setSize(el.clientWidth, el.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // If it's background, position it absolutely
  if (isBackground) {
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';
  }
  
  el.appendChild(renderer.domElement);
  
  // Setup scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, 
    el.clientWidth / el.clientHeight, 
    0.1, 
    1000
  );
  
  // Position camera based on if it's background or not
  if (isBackground) {
    camera.position.z = 15;
  } else {
    camera.position.z = 5;
  }
  
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

    case "wave-bg":
      // Create wave background
      geometry = new THREE.PlaneGeometry(40, 20, 64, 32);
      material = new THREE.MeshPhongMaterial({ 
        color: color,
        wireframe: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 4;
      mesh.position.z = -10;
      mesh.position.y = -5;
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

    case "code":
      // Create a field of floating code symbols
      group = new THREE.Group();
      
      // Create symbol geometries
      const symbolGeometries = [
        new THREE.BoxGeometry(0.3, 0.3, 0.05),        // [ ]
        new THREE.TorusGeometry(0.2, 0.05, 16, 16),   // ()
        new THREE.CylinderGeometry(0.05, 0.05, 0.4),   // |
        new THREE.ConeGeometry(0.2, 0.4, 4),          // ^
        new THREE.PlaneGeometry(0.3, 0.3),            // =
        new THREE.RingGeometry(0.1, 0.2, 16)          // o
      ];
      
      // Create a simple set of code-like symbols
      for (let i = 0; i < 40; i++) {
        const geoIndex = Math.floor(Math.random() * symbolGeometries.length);
        const geo = symbolGeometries[geoIndex];
        
        // Create color variations
        const symbolColor = new THREE.Color(color).offsetHSL(
          (Math.random() - 0.5) * 0.1,
          Math.random() * 0.2,
          (Math.random() - 0.5) * 0.1
        );
        
        const boxMat = new THREE.MeshPhongMaterial({ 
          color: symbolColor,
          transparent: true,
          opacity: 0.6,
          flatShading: true
        });
        
        const symbolMesh = new THREE.Mesh(geo, boxMat);
        
        // Random position - spread them widely
        symbolMesh.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        );
        
        // Random rotation
        symbolMesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        // Random scale variation
        const scale = Math.random() * 0.5 + 0.8;
        symbolMesh.scale.set(scale, scale, scale);
        
        group.add(symbolMesh);
      }
      
      scene.add(group);
      break;

    case "computer":
      // Create a 3D computer/laptop model
      group = new THREE.Group();
      
      // Create laptop base
      const laptopBaseGeo = new THREE.BoxGeometry(2, 0.1, 1.5);
      const laptopBaseMat = new THREE.MeshPhongMaterial({
        color: 0x333333,
        shininess: 100
      });
      
      const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopBaseMat);
      group.add(laptopBase);
      
      // Create laptop screen
      const laptopScreenGeo = new THREE.BoxGeometry(2, 1.2, 0.08);
      const laptopScreenMat = new THREE.MeshPhongMaterial({
        color: 0x222222,
        shininess: 100
      });
      
      const laptopScreen = new THREE.Mesh(laptopScreenGeo, laptopScreenMat);
      laptopScreen.position.set(0, 0.7, -0.7);
      laptopScreen.rotation.x = -Math.PI / 6;
      group.add(laptopScreen);
      
      // Create screen display
      const displayGeo = new THREE.PlaneGeometry(1.8, 1.1);
      const displayMat = new THREE.MeshPhongMaterial({
        color: color,
        emissive: new THREE.Color(color).multiplyScalar(0.5),
        shininess: 100
      });
      
      const display = new THREE.Mesh(displayGeo, displayMat);
      display.position.set(0, 0, 0.05);
      laptopScreen.add(display);
      
      // Create keyboard
      const keyboardGeo = new THREE.PlaneGeometry(1.8, 1.2);
      const keyboardMat = new THREE.MeshPhongMaterial({
        color: 0x444444,
        shininess: 50
      });
      
      const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
      keyboard.position.set(0, 0.06, 0);
      keyboard.rotation.x = -Math.PI / 2;
      laptopBase.add(keyboard);
      
      group.scale.set(scale, scale, scale);
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
    if ((type === "waves" || type === "wave-bg") && mesh && geometry) {
      const time = Date.now() * 0.001;
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Create wave effect
        const waveZ = Math.sin(x * 0.5 + time) * 0.3 + Math.cos(y * 0.5 + time) * 0.3;
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
    
    // Animate code symbols
    if (type === "code" && group) {
      const time = Date.now() * 0.001;
      
      // Animate each code symbol individually
      group.children.forEach((child: THREE.Object3D, i: number) => {
        // Floating motion
        child.position.y += Math.sin(time + i * 0.1) * 0.003;
        child.position.x += Math.cos(time + i * 0.1) * 0.002;
        
        // Slowly rotate
        child.rotation.z += 0.001;
        child.rotation.y += 0.002;
        
        // Reset position if it goes too far
        if (child.position.y > 10) child.position.y = -10;
        if (child.position.x > 15) child.position.x = -15;
      });
    }
    
    // Animate computer/laptop
    if (type === "computer" && group) {
      const time = Date.now() * 0.001;
      
      // Gentle floating and rotating animation
      group.position.y = Math.sin(time * 0.5) * 0.05;
      group.rotation.y = Math.sin(time * 0.3) * 0.1;
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
