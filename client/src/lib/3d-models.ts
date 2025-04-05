import * as THREE from "three";

type ModelType = "torus" | "octa" | "terrain" | "waves";

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
  let geometry;
  let material;
  let mesh;
  
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
      const positionAttribute = geometry.getAttribute('position');
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
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    if (rotation && mesh) {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.007;
    }
    
    // Special animations for certain types
    if (type === "waves" && mesh) {
      const time = Date.now() * 0.002;
      const positionAttribute = geometry!.getAttribute('position');
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Create wave effect
        const waveZ = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 2 + time) * 0.3;
        positionAttribute.setZ(i, waveZ);
      }
      
      positionAttribute.needsUpdate = true;
      geometry!.computeVertexNormals();
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
