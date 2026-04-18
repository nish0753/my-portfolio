
import { calculateNextPosition } from './fireflyAnimations';

export interface FireflyElement extends HTMLDivElement {
  dataset: DOMStringMap & {
    vx: string;
    vy: string;
    x: string;
    y: string;
  };
}

/**
 * Creates a single firefly element with the given properties
 */
export const createFirefly = (
  containerWidth: number, 
  containerHeight: number, 
  size: number, 
  minOpacity: number, 
  maxOpacity: number, 
  colors: string[]
): FireflyElement => {
  const firefly = document.createElement('div') as FireflyElement;
  
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
  const vx = (Math.random() - 0.5) * 0.5; // pixels per frame
  const vy = (Math.random() - 0.5) * 0.5; // pixels per frame
  
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
  
  return firefly;
};

/**
 * Creates a specified number of fireflies
 */
export const createFireflies = (
  container: HTMLDivElement, 
  count: number, 
  size: number, 
  minOpacity: number, 
  maxOpacity: number, 
  colors: string[]
): FireflyElement[] => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const fireflies: FireflyElement[] = [];
  
  for (let i = 0; i < count; i++) {
    const firefly = createFirefly(containerWidth, containerHeight, size, minOpacity, maxOpacity, colors);
    container.appendChild(firefly);
    fireflies.push(firefly);
  }
  
  return fireflies;
};

/**
 * Updates the positions of fireflies based on their current state
 */
export const updateFireflyPositions = (
  fireflies: Array<FireflyElement | null>,
  containerWidth: number,
  containerHeight: number
): void => {
  fireflies.forEach((firefly) => {
    if (!firefly) return;
    
    // Get current position and velocity
    let x = parseFloat(firefly.dataset.x || '0');
    let y = parseFloat(firefly.dataset.y || '0');
    let vx = parseFloat(firefly.dataset.vx || '0');
    let vy = parseFloat(firefly.dataset.vy || '0');
    
    // Calculate new position and velocity
    const newValues = calculateNextPosition(x, y, vx, vy, containerWidth, containerHeight);
    
    // Store updated values
    firefly.dataset.x = newValues.x.toString();
    firefly.dataset.y = newValues.y.toString();
    firefly.dataset.vx = newValues.vx.toString();
    firefly.dataset.vy = newValues.vy.toString();
    
    // Apply new position
    firefly.style.left = `${newValues.x}px`;
    firefly.style.top = `${newValues.y}px`;
  });
};
