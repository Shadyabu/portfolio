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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sdgIcons = [
    sdg1, sdg2, sdg3, sdg4, sdg5, sdg6, sdg7, sdg8, sdg9,
    sdg10, sdg11, sdg12, sdg13, sdg14, sdg15, sdg16, sdg17
  ];

  // Positions for floating icons (strategically placed around edges)
  const iconPositions = [
    { x: 10, y: 15, icon: 0 },
    { x: 85, y: 20, icon: 1 },
    { x: 15, y: 75, icon: 2 },
    { x: 80, y: 80, icon: 3 },
    { x: 50, y: 10, icon: 4 },
    { x: 5, y: 45, icon: 5 },
    { x: 90, y: 50, icon: 6 },
    { x: 25, y: 85, icon: 7 },
    { x: 70, y: 15, icon: 8 },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Calculate parallax offset for each icon
  const getParallaxStyle = (iconX, iconY) => {
    const deltaX = (mousePos.x - iconX) * 0.02; // Subtle movement
    const deltaY = (mousePos.y - iconY) * 0.02;
    return {
      transform: `translate(${deltaX}%, ${deltaY}%)`,
    };
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 animate-gradient"></div>

      {/* Floating SDG icons with parallax */}
      {iconPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute transition-transform duration-300 ease-out"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            ...getParallaxStyle(pos.x, pos.y),
          }}
        >
          <img
            src={sdgIcons[pos.icon]}
            alt={`SDG ${pos.icon + 1}`}
            className="w-12 h-12 md:w-16 md:h-16 opacity-30 hover:opacity-60 transition-opacity duration-300"
            style={{
              animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        </div>
      ))}

      {/* Subtle animated blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default SDGParticles;
