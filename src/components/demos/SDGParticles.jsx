import { useEffect, useRef, useState } from 'react';

// Import all SDG icons
import sdg1 from '../../assets/SDGIconsWEB/E-WEB-Goal-01.png';
import sdg2 from '../../assets/SDGIconsWEB/E-WEB-Goal-02.png';
import sdg3 from '../../assets/SDGIconsWEB/E-WEB-Goal-03.png';
import sdg4 from '../../assets/SDGIconsWEB/E-WEB-Goal-04.png';
import sdg5 from '../../assets/SDGIconsWEB/E-WEB-Goal-05.png';
import sdg6 from '../../assets/SDGIconsWEB/E-WEB-Goal-06.png';
import sdg7 from '../../assets/SDGIconsWEB/E-WEB-Goal-07.png';
import sdg8 from '../../assets/SDGIconsWEB/E-WEB-Goal-08.png';
import sdg9 from '../../assets/SDGIconsWEB/E-WEB-Goal-09.png';
import sdg10 from '../../assets/SDGIconsWEB/E-WEB-Goal-10.png';
import sdg11 from '../../assets/SDGIconsWEB/E-WEB-Goal-11.png';
import sdg12 from '../../assets/SDGIconsWEB/E-WEB-Goal-12.png';
import sdg13 from '../../assets/SDGIconsWEB/E-WEB-Goal-13.png';
import sdg14 from '../../assets/SDGIconsWEB/E-WEB-Goal-14.png';
import sdg15 from '../../assets/SDGIconsWEB/E-WEB-Goal-15.png';
import sdg16 from '../../assets/SDGIconsWEB/E-WEB-Goal-16.png';
import sdg17 from '../../assets/SDGIconsWEB/E-WEB-Goal-17.png';

const SDGParticles = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const sdgIcons = [
    sdg1, sdg2, sdg3, sdg4, sdg5, sdg6, sdg7, sdg8, sdg9,
    sdg10, sdg11, sdg12, sdg13, sdg14, sdg15, sdg16, sdg17
  ];

  useEffect(() => {
    // Preload images
    const imageElements = sdgIcons.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    Promise.all(
      imageElements.map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    ).then(() => {
      setImagesLoaded(true);
    });

    return () => {
      imageElements.forEach((img) => {
        img.src = '';
      });
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const container = containerRef.current;
    if (!container) return;

    const icons = [];
    const iconCount = 17; // All 17 SDG goals

    // Create icon elements
    sdgIcons.forEach((iconSrc, index) => {
      const img = document.createElement('img');
      img.src = iconSrc;
      img.className = 'absolute';
      img.style.width = '60px';
      img.style.height = '60px';
      img.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      img.style.pointerEvents = 'none';
      img.style.userSelect = 'none';
      container.appendChild(img);
      icons.push(img);
    });

    // Animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate radius based on screen size
      const radius = Math.min(rect.width, rect.height) * 0.35;

      // Rotate slowly
      rotationRef.current += 0.003; // Slow rotation speed

      icons.forEach((icon, index) => {
        // Calculate angle for this icon
        const angleOffset = (Math.PI * 2 / iconCount) * index;
        const angle = rotationRef.current + angleOffset;

        // Calculate position
        const x = centerX + Math.cos(angle) * radius - 30; // -30 to center the icon
        const y = centerY + Math.sin(angle) * radius - 30;

        // Apply position
        icon.style.transform = `translate(${x}px, ${y}px)`;

        // Subtle scale effect based on position (icons at top are slightly larger)
        const normalizedY = (y - centerY) / radius;
        const scale = 1 + (normalizedY * -0.2); // Icons at top (negative Y) are larger
        const opacity = 0.7 + (normalizedY * -0.3); // Icons at top are more opaque

        icon.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        icon.style.opacity = Math.max(0.4, Math.min(1, opacity));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      icons.forEach((icon) => {
        if (icon.parentNode) {
          icon.parentNode.removeChild(icon);
        }
      });
    };
  }, [imagesLoaded]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
};

export default SDGParticles;
