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
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const particlesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef([]);

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
      imagesRef.current = imageElements;
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

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // Node class for SDG icons
    class Node {
      constructor(x, y, imageIndex) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.image = imagesRef.current[imageIndex];
        this.size = 40;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.connections = [];
      }

      update() {
        this.pulse += this.pulseSpeed;
        // Gentle floating motion
        this.x = this.baseX + Math.sin(this.pulse) * 3;
        this.y = this.baseY + Math.cos(this.pulse * 0.7) * 3;
      }

      draw(ctx) {
        const scale = 1 + Math.sin(this.pulse) * 0.1;
        const size = this.size * scale;
        ctx.globalAlpha = 0.8;
        ctx.drawImage(this.image, this.x - size / 2, this.y - size / 2, size, size);
        ctx.globalAlpha = 1;
      }
    }

    // Particle class for flowing data
    class Particle {
      constructor(from, to) {
        this.from = from;
        this.to = to;
        this.progress = Math.random();
        this.speed = 0.005 + Math.random() * 0.01;
        this.size = 2 + Math.random() * 2;
        this.hue = Math.random() * 60 + 150; // Blue-green range
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
        }
      }

      draw(ctx) {
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${1 - this.progress * 0.5})`;
        ctx.fill();
      }
    }

    // Create nodes in an organic layout
    const nodes = [];
    const nodeCount = Math.min(17, Math.floor(width / 100)); // Responsive node count

    for (let i = 0; i < nodeCount; i++) {
      const angle = (Math.PI * 2 / nodeCount) * i;
      const radius = Math.min(width, height) * 0.3;
      const x = width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 50;
      const y = height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 50;
      nodes.push(new Node(x, y, i % sdgIcons.length));
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i !== j) {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < Math.min(width, height) * 0.4) {
            node.connections.push(other);
          }
        }
      });
    });

    // Create particles
    const particles = [];
    nodes.forEach((node) => {
      node.connections.forEach((connection) => {
        if (Math.random() > 0.7) { // Only some connections get particles
          particles.push(new Particle(node, connection));
        }
      });
    });

    nodesRef.current = nodes;
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connection) => {
          const dx = connection.x - node.x;
          const dy = connection.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connection.x, connection.y);

          const opacity = Math.max(0.05, 0.2 - (distance / 400));
          ctx.strokeStyle = `rgba(100, 150, 200, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update();
        node.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
};

export default SDGParticles;
