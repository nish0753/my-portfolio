import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RoleTransitionProps {
  currentRole: number;
  roles: Array<{
    title: string;
    description: string;
    logo: string;
    color: string;
  }>;
}

const RoleTransition: React.FC<RoleTransitionProps> = ({ currentRole, roles }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(particles, particleMaterial);
    scene.add(points);
    particlesRef.current = points;

    // Animation
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.001;
        particlesRef.current.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      scene.dispose();
    };
  }, []);

  // Handle role transition
  useEffect(() => {
    if (!particlesRef.current) return;

    // Burst effect
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const originalPositions = [...positions];

    // Animate particles outward
    const burstDuration = 1000; // 1 second
    const startTime = performance.now();

    const burstAnimation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / burstDuration, 1);

      for (let i = 0; i < positions.length; i += 3) {
        const originalX = originalPositions[i];
        const originalY = originalPositions[i + 1];
        const originalZ = originalPositions[i + 2];

        const angle = Math.random() * Math.PI * 2;
        const radius = progress * 10;

        positions[i] = originalX + Math.cos(angle) * radius;
        positions[i + 1] = originalY + Math.sin(angle) * radius;
        positions[i + 2] = originalZ + (Math.random() - 0.5) * radius;
      }

      particlesRef.current!.geometry.attributes.position.needsUpdate = true;

      if (progress < 1) {
        requestAnimationFrame(burstAnimation);
      } else {
        // Reset positions for next transition
        for (let i = 0; i < positions.length; i++) {
          positions[i] = originalPositions[i];
        }
        particlesRef.current!.geometry.attributes.position.needsUpdate = true;
      }
    };

    requestAnimationFrame(burstAnimation);
  }, [currentRole]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default RoleTransition; 