import { useEffect, useRef } from 'react';

const SDGParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // UN SDG Data (17 goals with colors and numbers)
    const sdgData = [
      { number: 1, color: '#E5243B', name: 'No Poverty' },
      { number: 2, color: '#DDA63A', name: 'Zero Hunger' },
      { number: 3, color: '#4C9F38', name: 'Good Health' },
      { number: 4, color: '#C5192D', name: 'Quality Education' },
      { number: 5, color: '#FF3A21', name: 'Gender Equality' },
      { number: 6, color: '#26BDE2', name: 'Clean Water' },
      { number: 7, color: '#FCC30B', name: 'Affordable Energy' },
      { number: 8, color: '#A21942', name: 'Decent Work' },
      { number: 9, color: '#FD6925', name: 'Industry Innovation' },
      { number: 10, color: '#DD1367', name: 'Reduced Inequalities' },
      { number: 11, color: '#FD9D24', name: 'Sustainable Cities' },
      { number: 12, color: '#BF8B2E', name: 'Responsible Consumption' },
      { number: 13, color: '#3F7E44', name: 'Climate Action' },
      { number: 14, color: '#0A97D9', name: 'Life Below Water' },
      { number: 15, color: '#56C02B', name: 'Life on Land' },
      { number: 16, color: '#00689D', name: 'Peace and Justice' },
      { number: 17, color: '#19486A', name: 'Partnerships' },
    ];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class with SDG icons
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.4 + 0.4;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 15 + 25; // Larger size for visibility
        this.speedY = Math.random() * 0.3 + 0.15;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.sdg = sdgData[Math.floor(Math.random() * sdgData.length)];
        this.opacity = Math.random() * 0.4 + 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Reset particle when it goes off screen
        if (this.y > canvas.height + 50) {
          this.reset();
        }

        if (this.x < -50 || this.x > canvas.width + 50) {
          this.speedX *= -1;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw colored square (like SDG icons)
        ctx.fillStyle = this.sdg.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // Draw white number
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = this.opacity;
        ctx.font = `bold ${this.size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.sdg.number, 0, 0);

        ctx.restore();
        ctx.globalAlpha = 1;
      }
    }

    // Create particles - show all 17 SDGs multiple times
    const particlesPerSDG = Math.max(2, Math.floor((canvas.width * canvas.height) / 100000));
    for (let i = 0; i < sdgData.length * particlesPerSDG; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
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
      style={{ opacity: 0.8 }}
    />
  );
};

export default SDGParticles;
