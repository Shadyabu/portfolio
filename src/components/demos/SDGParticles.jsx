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
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);
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

    const particles = [];
    const particleCount = 30; // Show each SDG icon at least once

    class Particle {
      constructor(index) {
        this.container = container;
        this.element = document.createElement('img');
        this.element.src = sdgIcons[index % sdgIcons.length];
        this.element.className = 'absolute transition-transform duration-100';
        this.element.style.width = '50px';
        this.element.style.height = '50px';
        this.element.style.pointerEvents = 'none';
        this.element.style.userSelect = 'none';

        this.reset();
        container.appendChild(this.element);
      }

      reset() {
        const rect = this.container.getBoundingClientRect();
        this.homeX = Math.random() * (rect.width - 50);
        this.homeY = Math.random() * (rect.height - 50);
        this.x = this.homeX;
        this.y = this.homeY;
        this.vx = 0;
        this.vy = 0;
        this.size = 50;
        this.opacity = 0.7 + Math.random() * 0.3;

        this.element.style.opacity = this.opacity;
        this.updatePosition();
      }

      updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
      }

      update(mouseX, mouseY) {
        const rect = this.container.getBoundingClientRect();

        // Calculate distance from mouse
        const dx = this.x + this.size / 2 - mouseX;
        const dy = this.y + this.size / 2 - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        // Mouse repulsion
        if (distance < repelRadius) {
          const force = (repelRadius - distance) / repelRadius;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 2;
          this.vy += Math.sin(angle) * force * 2;
        }

        // Return to home position
        const homeForce = 0.05;
        this.vx += (this.homeX - this.x) * homeForce;
        this.vy += (this.homeY - this.y) * homeForce;

        // Apply friction
        this.vx *= 0.9;
        this.vy *= 0.9;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Keep within bounds
        if (this.x < 0) {
          this.x = 0;
          this.vx = 0;
        }
        if (this.x > rect.width - this.size) {
          this.x = rect.width - this.size;
          this.vx = 0;
        }
        if (this.y < 0) {
          this.y = 0;
          this.vy = 0;
        }
        if (this.y > rect.height - this.size) {
          this.y = rect.height - this.size;
          this.vy = 0;
        }

        this.updatePosition();
      }

      destroy() {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(i));
    }

    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      particles.forEach((particle) => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particles.forEach((particle) => particle.destroy());
    };
  }, [imagesLoaded]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

export default SDGParticles;
