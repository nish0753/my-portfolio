import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

interface ThreeFirefliesProps {
  count?: number;
  size?: number;
  colors?: string[];
  enabled?: boolean;
  speed?: number;
  minDistance?: number;
  maxDistance?: number;
  cameraDistortion?: boolean;
  distortionIntensity?: number;
  sphereRadius?: number;
}

const ThreeFireflies: React.FC<ThreeFirefliesProps> = ({
  count = 400,
  size = 30,
  colors = ['#4F46E5', '#F8FAFC', '#38BDF8'],
  enabled = true,
  speed = 0.5,
  minDistance = 50,
  maxDistance = 100,
  sphereRadius = 200,
  cameraDistortion = true,
  distortionIntensity = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const firefliesRef = useRef<THREE.Mesh[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const targetCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, sphereRadius));
  const lastMouseMoveTime = useRef<number>(Date.now());
  const velocitiesRef = useRef<{ x: number; y: number; z: number }[]>([]);
  const simulatedMouseTimeRef = useRef<number>(0);
  const isMobile = useIsMobile();

  // Adjust parameters for mobile
  const mobileAdjustedCount = isMobile ? Math.floor(count * 0.6) : count;
  const mobileAdjustedSize = isMobile ? size * 0.8 : size;
  const mobileAdjustedSpeed = isMobile ? speed * 0.8 : speed;
  const mobileAdjustedSphereRadius = isMobile ? sphereRadius * 0.5 : sphereRadius * 0.7;
  const mobileAdjustedDistortionIntensity = isMobile ? distortionIntensity * 0.5 : distortionIntensity;

  const handleMouseMove = (event: MouseEvent) => {
    if (cameraDistortion) {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      lastMouseMoveTime.current = Date.now();

      // Add mouse influence on fireflies
      if (firefliesRef.current.length > 0) {
        const mousePos = new THREE.Vector3(
          mouseRef.current.x * window.innerWidth * 0.5,
          -mouseRef.current.y * window.innerHeight * 0.5,
          0
        );

        firefliesRef.current.forEach((firefly, index) => {
          const distance = mousePos.distanceTo(firefly.position);
          if (distance < maxDistance) {
            const influence = 1 - distance / maxDistance;
            velocitiesRef.current[index].x += (mousePos.x - firefly.position.x) * influence * 0.01;
            velocitiesRef.current[index].y += (mousePos.y - firefly.position.y) * influence * 0.01;
          }
        });
      }
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (cameraDistortion && event.touches.length > 0) {
      const touch = event.touches[0];
      mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((touch.clientY / window.innerHeight) * 2 - 1);
      lastMouseMoveTime.current = Date.now();
    }
  };

  useEffect(() => {
    if (!containerRef.current || !enabled) return;

    const adjustedCount = mobileAdjustedCount;
    const adjustedSize = mobileAdjustedSize;
    const adjustedSpeed = mobileAdjustedSpeed;
    const adjustedSphereRadius = mobileAdjustedSphereRadius;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 85 : 75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = adjustedSphereRadius * 0.8;
    targetCameraPositionRef.current = new THREE.Vector3(0, 0, adjustedSphereRadius * 0.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio);

    // Clean existing canvas if it exists
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Create sphere geometry for fireflies
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const colorPalette = colors.map(color => new THREE.Color(color));

    // Create fireflies
    for (let i = 0; i < adjustedCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        transparent: true,
        opacity: 0.8,
      });

      const firefly = new THREE.Mesh(geometry, material);
      const scale = (adjustedSize * (0.7 + Math.random() * 0.6)) * 0.03; // Adjust scale to be smaller
      firefly.scale.set(scale, scale, scale);

      // Position fireflies
      const viewWidth = window.innerWidth * 0.4;
      const viewHeight = window.innerHeight * 0.4;
      firefly.position.set(
        (Math.random() - 0.5) * viewWidth,
        (Math.random() - 0.5) * viewHeight,
        (Math.random() - 0.5) * (adjustedSphereRadius * 0.3)
      );

      // Add glow effect
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        transparent: true,
        opacity: 0.3,
      });
      const glowSphere = new THREE.Mesh(geometry, glowMaterial);
      const glowScale = scale * 2;
      glowSphere.scale.set(glowScale, glowScale, glowScale);
      firefly.add(glowSphere);

      scene.add(firefly);
      firefliesRef.current.push(firefly);
      
      // Initialize velocity
      velocitiesRef.current.push({
        x: (Math.random() - 0.5) * adjustedSpeed * 0.8,
        y: (Math.random() - 0.5) * adjustedSpeed * 0.8,
        z: (Math.random() - 0.5) * adjustedSpeed * 0.6
      });
    }

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Animation function
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      firefliesRef.current.forEach((firefly, index) => {
        const velocity = velocitiesRef.current[index];
        
        // Update positions
        firefly.position.x += velocity.x;
        firefly.position.y += velocity.y;
        firefly.position.z += velocity.z;

        // Bounds checking
        const boundsX = window.innerWidth * 0.4;
        const boundsY = window.innerHeight * 0.4;
        const boundsZ = adjustedSphereRadius * 0.3;

        if (Math.abs(firefly.position.x) > boundsX) {
          firefly.position.x = Math.sign(firefly.position.x) * boundsX;
          velocity.x *= -1;
        }
        if (Math.abs(firefly.position.y) > boundsY) {
          firefly.position.y = Math.sign(firefly.position.y) * boundsY;
          velocity.y *= -1;
        }
        if (Math.abs(firefly.position.z) > boundsZ) {
          firefly.position.z = Math.sign(firefly.position.z) * boundsZ;
          velocity.z *= -1;
        }

        // Add slight random movement
        velocity.x += (Math.random() - 0.5) * 0.1;
        velocity.y += (Math.random() - 0.5) * 0.1;
        velocity.z += (Math.random() - 0.5) * 0.1;

        // Dampen velocities
        velocity.x *= 0.99;
        velocity.y *= 0.99;
        velocity.z *= 0.99;

        // Pulse the glow
        const glow = firefly.children[0] as THREE.Mesh;
        const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.2;
        glow.scale.set(scale, scale, scale);
      });

      // Simulate mouse movement automatically only when no real mouse movement for 2 seconds
      const timeSinceLastMouseMove = Date.now() - lastMouseMoveTime.current;
      if (cameraDistortion && timeSinceLastMouseMove > 2000) {
        simulatedMouseTimeRef.current += 0.03;
        
        // Create a smooth figure-8 pattern for mouse movement with easing
        const radius = 0.8;
        const smoothX = Math.sin(simulatedMouseTimeRef.current) * radius;
        const smoothY = Math.sin(simulatedMouseTimeRef.current * 2) * radius * 0.6;
        
        // Smooth interpolation to avoid jerky movement
        mouseRef.current.x += (smoothX - mouseRef.current.x) * 0.1;
        mouseRef.current.y += (smoothY - mouseRef.current.y) * 0.1;

        // Add mouse influence on fireflies (same as real mouse)
        if (firefliesRef.current.length > 0) {
          const mousePos = new THREE.Vector3(
            mouseRef.current.x * window.innerWidth * 0.5,
            -mouseRef.current.y * window.innerHeight * 0.5,
            0
          );

          firefliesRef.current.forEach((firefly, index) => {
            const distance = mousePos.distanceTo(firefly.position);
            if (distance < maxDistance) {
              const influence = 1 - distance / maxDistance;
              velocitiesRef.current[index].x += (mousePos.x - firefly.position.x) * influence * 0.01;
              velocitiesRef.current[index].y += (mousePos.y - firefly.position.y) * influence * 0.01;
            }
          });
        }
      }

      // Camera movement based on mouse position
      if (cameraDistortion) {
        const targetX = mouseRef.current.x * 50;
        const targetY = mouseRef.current.y * 50;
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
      }

      cameraRef.current.lookAt(scene.position);
      rendererRef.current.render(scene, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      
      // Clean up Three.js resources
      firefliesRef.current.forEach(firefly => {
        firefly.geometry.dispose();
        (firefly.material as THREE.Material).dispose();
        firefly.children.forEach(child => {
          (child as THREE.Mesh).geometry.dispose();
          ((child as THREE.Mesh).material as THREE.Material).dispose();
        });
      });
    };
  }, [enabled, mobileAdjustedCount, mobileAdjustedSize, mobileAdjustedSpeed, mobileAdjustedSphereRadius, colors, isMobile, maxDistance]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10
      }} 
    />
  );
};

export default ThreeFireflies;
