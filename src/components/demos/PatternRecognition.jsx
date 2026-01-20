import { useEffect, useRef, useState } from 'react';

const PatternRecognition = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Trigger reveal after 800ms
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate data points for pattern - refined grid
    const gridSize = 45;
    const points = [];
    const cols = Math.ceil(canvas.width / dpr / gridSize);
    const rows = Math.ceil(canvas.height / dpr / gridSize);

    // Create a hidden "pattern" - a subtle circular cluster
    const centerX = cols / 2;
    const centerY = rows / 2;
    const patternRadius = Math.min(cols, rows) / 3.5;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const px = x * gridSize + gridSize / 2;
        const py = y * gridSize + gridSize / 2;

        // Calculate distance from center
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Soft falloff at pattern edge
        const isInPattern = dist < patternRadius;
        const patternStrength = isInPattern
          ? Math.max(0, 1 - (dist / patternRadius) * 0.5)
          : 0;

        // Very subtle randomness
        const noise = Math.random() * 0.2;

        points.push({
          x: px,
          y: py,
          inPattern: isInPattern,
          patternStrength,
          baseOpacity: 0.08 + noise * 0.05,
          revealedOpacity: 0.25 + patternStrength * 0.15,
          size: 1.2 + noise * 1.5,
        });
      }
    }

    let animationFrame;
    let revealStart = null;

    // Easing function for smooth reveal (ease-in-out)
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp) => {
      if (revealed && !revealStart) {
        revealStart = timestamp;
      }

      // Calculate reveal progress with easing
      let revealProgress = 0;
      if (revealed && revealStart) {
        const elapsed = timestamp - revealStart;
        const rawProgress = Math.min(elapsed / 1500, 1); // 1.5s duration
        revealProgress = easeInOutCubic(rawProgress);
      }

      // Hover amplification (desktop only)
      const hoverBoost = isHovered ? 0.3 : 0;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Draw very subtle connecting lines within pattern
      if (revealProgress > 0.2) {
        points.forEach((point, i) => {
          if (point.inPattern && i % 8 === 0) {
            const nearby = points.find((p, j) => {
              if (j <= i || !p.inPattern) return false;
              const dx = p.x - point.x;
              const dy = p.y - point.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              return dist < gridSize * 2.2 && dist > gridSize * 0.8;
            });

            if (nearby) {
              const lineOpacity = 0.03 * revealProgress + hoverBoost * 0.05;
              ctx.strokeStyle = `rgba(31, 122, 99, ${lineOpacity})`; // Forest green
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(nearby.x, nearby.y);
              ctx.stroke();
            }
          }
        });
      }

      // Draw points
      points.forEach(point => {
        let opacity;
        let color;

        if (point.inPattern) {
          // Pattern points gradually reveal with green tint
          opacity = point.baseOpacity +
                   (point.revealedOpacity - point.baseOpacity) * revealProgress * point.patternStrength +
                   hoverBoost * point.patternStrength * 0.2;

          // Subtle green tint emerges during reveal
          const greenStrength = revealProgress * point.patternStrength;
          const r = Math.floor(250 - greenStrength * 219); // 250 -> 31
          const g = Math.floor(245 - greenStrength * 123); // 245 -> 122
          const b = Math.floor(240 - greenStrength * 141); // 240 -> 99
          color = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else {
          // Background points remain subtle and off-white
          opacity = point.baseOpacity;
          color = `rgba(250, 245, 240, ${opacity})`;
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [revealed, isHovered]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'normal' }}
      />
    </div>
  );
};

export default PatternRecognition;
