import { useEffect, useRef } from 'react';

const SDGParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // UN SDG Colors (17 goals)
    const sdgColors = [
      '#E5243B', // 1. No Poverty
      '#DDA63A', // 2. Zero Hunger
      '#4C9F38', // 3. Good Health
      '#C5192D', // 4. Quality Education
      '#FF3A21', // 5. Gender Equality
      '#26BDE2', // 6. Clean Water
      '#FCC30B', // 7. Affordable Energy
      '#A21942', // 8. Decent Work
      '#FD6925', // 9. Industry Innovation
      '#DD1367', // 10. Reduced Inequalities
      '#FD9D24', // 11. Sustainable Cities
      '#BF8B2E', // 12. Responsible Consumption
      '#3F7E44', // 13. Climate Action
      '#0A97D9', // 14. Life Below Water
      '#56C02B', // 15. Life on Land
      '#00689D', // 16. Peace and Justice
      '#19486A', // 17. Partnerships
    ];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.color = sdgColors[Math.floor(Math.random() * sdgColors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset particle when it goes off screen
        if (this.y > canvas.height) {
          this.reset();
        }

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw lines between close particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.15;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

export default SDGParticles;
