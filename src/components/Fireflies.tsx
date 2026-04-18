
import React, { useEffect, useRef } from 'react';

interface FireflyProps {
  count?: number;
  size?: number;
  minOpacity?: number;
  maxOpacity?: number;
  colors?: string[];
  enabled?: boolean;
}

const Fireflies: React.FC<FireflyProps> = ({
  count = 200,
  size = 4,
  minOpacity = 0.3,
  maxOpacity = 0.6,
  colors = ['#4F46E5', '#F8FAFC', '#38BDF8'], // Professional indigo, white, sky blue
  enabled = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<Array<HTMLDivElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!containerRef.current || !enabled) return;
    
    const container = containerRef.current;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Create fireflies only once
    if (firefliesRef.current.length === 0) {
      // Create stylesheet for the glowing effect
      if (!document.getElementById('firefly-animations')) {
        const style = document.createElement('style');
        style.id = 'firefly-animations';
        style.innerHTML = `
          @keyframes firefly-pulse {
            0%, 100% {
              opacity: var(--base-opacity);
              box-shadow: 0 0 var(--glow-size) var(--glow-intensity) var(--glow-color);
            }
            50% {
              opacity: calc(var(--base-opacity) * 1.5);
              box-shadow: 0 0 calc(var(--glow-size) * 1.2) calc(var(--glow-intensity) * 1.2) var(--glow-color);
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Create fireflies with initial properties
      for (let i = 0; i < count; i++) {
        const firefly = document.createElement('div');
        
        // Random position
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight;
        
        // Random size variation for more natural feel
        
        const fireflySize = size * (0.7 + Math.random() * 0.6);
        
        // Random opacity but always visible
        const baseOpacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
        
        // Random color from the palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set properties as CSS variables for animation
        firefly.style.setProperty('--base-opacity', baseOpacity.toString());
        firefly.style.setProperty('--glow-size', `${fireflySize * 2}px`);
        firefly.style.setProperty('--glow-intensity', `${fireflySize}px`);
        firefly.style.setProperty('--glow-color', `${color}80`);
        
        // Random animation duration for blinking (between 3-7 seconds)
        const pulseSpeed = 3 + Math.random() * 4;
        
        // Random velocity for movement
        const vx = (Math.random() - 0.5) * 1; // pixels per frame
        const vy = (Math.random() - 0.5) * 1; // pixels per frame
        
        // Store velocity data
        firefly.dataset.vx = vx.toString();
        firefly.dataset.vy = vy.toString();
        firefly.dataset.x = x.toString();
        firefly.dataset.y = y.toString();
        
        // Apply styles
        Object.assign(firefly.style, {
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          width: `${fireflySize}px`,
          height: `${fireflySize}px`,
          backgroundColor: color,
          borderRadius: '50%',
          opacity: baseOpacity.toString(),
          boxShadow: `0 0 ${fireflySize * 2}px ${fireflySize}px ${color}80`,
          animation: `firefly-pulse ${pulseSpeed}s infinite ease-in-out`,
          animationDelay: `${Math.random() * 5}s`,
          zIndex: '10',
          pointerEvents: 'none',
          transform: 'translate3d(0, 0, 0)',
        });
        
        container.appendChild(firefly);
        firefliesRef.current.push(firefly);
      }
    }
    
    // Function for smooth continuous movement
    const animateFireflies = () => {
      firefliesRef.current.forEach((firefly) => {
        if (!firefly) return;
        
        // Get current position and velocity
        let x = parseFloat(firefly.dataset.x || '0');
        let y = parseFloat(firefly.dataset.y || '0');
        let vx = parseFloat(firefly.dataset.vx || '0');
        let vy = parseFloat(firefly.dataset.vy || '0');
        
        // Apply small random changes to velocity (gentle wandering)
        vx += (Math.random() - 0.5) * 0.1;
        vy += (Math.random() - 0.5) * 0.1;
        
        // Dampen velocity for smooth, gentle movement
        vx = vx * 0.99;
        vy = vy * 0.99;
        
        // Update position
        x += vx;
        y += vy;
        
        // Boundary check with soft bounce
        if (x < 0 || x > containerWidth) {
          vx = -vx * 0.5; // Gentle bounce
          x = Math.max(0, Math.min(x, containerWidth));
        }
        
        if (y < 0 || y > containerHeight) {
          vy = -vy * 0.5; // Gentle bounce
          y = Math.max(0, Math.min(y, containerHeight));
        }
        
        // Store updated values
        firefly.dataset.x = x.toString();
        firefly.dataset.y = y.toString();
        firefly.dataset.vx = vx.toString();
        firefly.dataset.vy = vy.toString();
        
        // Apply new position
        firefly.style.left = `${x}px`;
        firefly.style.top = `${y}px`;
      });
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animateFireflies);
    };
    
    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animateFireflies);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Update firefly positions on resize to keep them within bounds
      firefliesRef.current.forEach((firefly) => {
        if (!firefly) return;
        
        let x = parseFloat(firefly.dataset.x || '0');
        let y = parseFloat(firefly.dataset.y || '0');
        
        // Ensure fireflies stay within new boundaries
        x = Math.min(x, newWidth);
        y = Math.min(y, newHeight);
        
        firefly.dataset.x = x.toString();
        firefly.dataset.y = y.toString();
        firefly.style.left = `${x}px`;
        firefly.style.top = `${y}px`;
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      // Only remove style element if component is unmounting completely
      if (!enabled) { // Changed from if (enabled === false) to fix type error
        document.getElementById('firefly-animations')?.remove();
        
        // Remove all fireflies
        firefliesRef.current.forEach(firefly => {
          if (firefly && firefly.parentNode) {
            firefly.parentNode.removeChild(firefly);
          }
        });
        firefliesRef.current = [];
      }
    };
  }, [count, size, minOpacity, maxOpacity, colors, enabled]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};

export default Fireflies;
