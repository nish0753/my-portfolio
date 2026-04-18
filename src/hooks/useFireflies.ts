import { useEffect, useRef } from 'react';
import { createFireflyAnimations } from '@/utils/fireflyAnimations';
import { FireflyElement, createFireflies, updateFireflyPositions } from '@/utils/fireflyFactory';

interface UseFirefliesProps {
  count: number;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  colors: string[];
  enabled: boolean;
}

export const useFireflies = ({
  count,
  size,
  minOpacity,
  maxOpacity,
  colors,
  enabled
}: UseFirefliesProps) => {
  const firefliesRef = useRef<Array<FireflyElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!enabled) return;
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Only remove style element if component is unmounting completely
      if (!enabled) {
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
  }, [enabled]);
  
  // Hook function to initialize fireflies
  const initializeFireflies = (container: HTMLDivElement) => {
    if (!container || !enabled) return;
    
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Create fireflies only once
    if (firefliesRef.current.length === 0) {
      // Create stylesheet for the glowing effect
      createFireflyAnimations();
      
      // Create fireflies with initial properties
      const newFireflies = createFireflies(container, count, size, minOpacity, maxOpacity, colors);
      firefliesRef.current = newFireflies;
      
      // Function for smooth continuous movement
      const animateFireflies = () => {
        updateFireflyPositions(firefliesRef.current, containerWidth, containerHeight);
        
        // Continue animation loop
        animationFrameRef.current = requestAnimationFrame(animateFireflies);
      };
      
      // Start the animation
      animationFrameRef.current = requestAnimationFrame(animateFireflies);
      
      // Handle window resize
      const handleResize = () => {
        if (!container) return;
        
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
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
      };
    }
  };
  
  return { initializeFireflies };
};
