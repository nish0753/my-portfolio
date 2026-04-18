
// Utility functions for firefly animations

/**
 * Creates the CSS keyframes for firefly animations
 */
export const createFireflyAnimations = (): HTMLStyleElement => {
  if (document.getElementById('firefly-animations')) {
    return document.getElementById('firefly-animations') as HTMLStyleElement;
  }
  
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
  return style;
};

/**
 * Calculate the next position and velocity for a firefly
 */
export const calculateNextPosition = (
  x: number, 
  y: number, 
  vx: number, 
  vy: number, 
  containerWidth: number, 
  containerHeight: number
): { x: number; y: number; vx: number; vy: number } => {
  // Apply small random changes to velocity (gentle wandering)
  vx += (Math.random() - 0.5) * 0.03;
  vy += (Math.random() - 0.5) * 0.03;
  
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
  
  return { x, y, vx, vy };
};
