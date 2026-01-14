import { useEffect, useRef } from 'react';

const SDGParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // Code lines with SDG and AI themes
    const codeLines = [
      '# Training AI model for SDG impact analysis',
      'import tensorflow as tf',
      'from sdg_classifier import SDGModel',
      '',
      'model = SDGModel(goals=17)',
      'model.compile(optimizer="adam")',
      '',
      '# Analyzing climate data...',
      'sdg_13_accuracy = 0.94  # Climate Action',
      'sdg_7_accuracy = 0.91   # Clean Energy',
      'sdg_11_accuracy = 0.89  # Sustainable Cities',
      '',
      '> Training on 1M+ sustainability records',
      '> Epoch 47/50 - Loss: 0.023',
      '> Model converged. Ready for deployment.',
    ];

    // Matrix-style falling characters
    class MatrixColumn {
      constructor(x) {
        this.x = x;
        this.y = Math.random() * -height;
        this.speed = 1 + Math.random() * 2;
        this.chars = '01アイウエオカキクケコサシスセソタチツテト1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.trail = [];
        this.length = 10 + Math.random() * 20;
      }

      update() {
        this.y += this.speed;
        if (this.y > height + 100) {
          this.y = -50;
          this.x = Math.random() * width;
        }
      }

      draw(ctx) {
        const char = this.chars[Math.floor(Math.random() * this.chars.length)];

        // Bright head
        ctx.fillStyle = '#00ff41';
        ctx.font = '14px monospace';
        ctx.fillText(char, this.x, this.y);

        // Fading trail
        for (let i = 1; i < this.length; i++) {
          const alpha = 1 - (i / this.length);
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha * 0.5})`;
          ctx.fillText(
            this.chars[Math.floor(Math.random() * this.chars.length)],
            this.x,
            this.y - i * 16
          );
        }
      }
    }

    // Code snippet display
    class CodeDisplay {
      constructor() {
        this.currentLine = 0;
        this.currentChar = 0;
        this.displayedLines = [];
        this.charSpeed = 2; // Characters per frame
        this.lineDelay = 30; // Frames between lines
        this.delayCounter = 0;
      }

      update() {
        if (this.currentLine < codeLines.length) {
          const line = codeLines[this.currentLine];

          if (this.currentChar < line.length) {
            // Type characters
            this.currentChar += this.charSpeed;
            if (this.currentChar >= line.length) {
              this.currentChar = line.length;
              this.delayCounter = 0;
            }
          } else {
            // Move to next line after delay
            this.delayCounter++;
            if (this.delayCounter > this.lineDelay) {
              this.displayedLines.push(line);
              this.currentLine++;
              this.currentChar = 0;
            }
          }
        } else {
          // Reset and loop
          setTimeout(() => {
            this.currentLine = 0;
            this.currentChar = 0;
            this.displayedLines = [];
          }, 2000);
        }
      }

      draw(ctx) {
        const startX = 40;
        const startY = height / 2 - 150;
        const lineHeight = 24;

        // Draw terminal-style background
        ctx.fillStyle = 'rgba(20, 20, 30, 0.85)';
        ctx.fillRect(20, startY - 40, Math.min(600, width - 40), 380);

        // Terminal header
        ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.fillRect(20, startY - 40, Math.min(600, width - 40), 30);

        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('ai_engineer@sustainable-dev:~$ train_sdg_model.py', 30, startY - 20);

        // Draw completed lines
        ctx.font = '14px "Fira Code", monospace';
        this.displayedLines.forEach((line, i) => {
          const y = startY + i * lineHeight;
          this.drawCodeLine(ctx, line, startX, y);
        });

        // Draw current typing line
        if (this.currentLine < codeLines.length) {
          const currentLineText = codeLines[this.currentLine].substring(0, Math.floor(this.currentChar));
          const y = startY + this.displayedLines.length * lineHeight;
          this.drawCodeLine(ctx, currentLineText, startX, y);

          // Blinking cursor
          if (Math.floor(Date.now() / 500) % 2 === 0) {
            ctx.fillStyle = '#00ff88';
            ctx.fillRect(startX + ctx.measureText(currentLineText).width + 2, y - 14, 8, 16);
          }
        }
      }

      drawCodeLine(ctx, line, x, y) {
        // Syntax highlighting
        if (line.startsWith('#')) {
          ctx.fillStyle = '#6a9955'; // Comments
        } else if (line.startsWith('import') || line.startsWith('from')) {
          ctx.fillStyle = '#c586c0'; // Keywords
        } else if (line.includes('=')) {
          const parts = line.split('=');
          ctx.fillStyle = '#9cdcfe';
          ctx.fillText(parts[0], x, y);
          ctx.fillStyle = '#d4d4d4';
          ctx.fillText('=', x + ctx.measureText(parts[0]).width, y);
          ctx.fillStyle = '#ce9178';
          ctx.fillText(parts[1], x + ctx.measureText(parts[0] + '=').width, y);
          return;
        } else if (line.startsWith('>')) {
          ctx.fillStyle = '#00ff88'; // Terminal output
        } else {
          ctx.fillStyle = '#d4d4d4'; // Default
        }
        ctx.fillText(line, x, y);
      }
    }

    // Create matrix columns
    const columns = [];
    const columnCount = Math.floor(width / 20);
    for (let i = 0; i < columnCount; i++) {
      columns.push(new MatrixColumn(i * 20));
    }

    const codeDisplay = new CodeDisplay();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw matrix columns
      columns.forEach(column => {
        column.update();
        column.draw(ctx);
      });

      // Update and draw code display
      codeDisplay.update();
      codeDisplay.draw(ctx);

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ backgroundColor: '#000' }}
    />
  );
};

export default SDGParticles;
