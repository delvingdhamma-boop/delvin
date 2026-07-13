import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swayAmount: number;
  swaySpeed: number;
  opacity: number;
  color: string;
  type: "petal" | "sparkle";
}

export default function PetalsEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let petals: Petal[] = [];

    // Device diagnostics and conservative initial parameters
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    
    // Default initial counts, optimized for mobile vs desktop
    let maxPetals = isMobile ? 22 : 45;
    let maxSparkles = isMobile ? 18 : 35;
    let enableShadows = !isMobile; // canvas shadowBlur is notoriously heavy on mobile CPUs/GPUs

    // FPS Measurement States
    let frameCount = 0;
    let lastFpsCheck = performance.now();
    let isOptimizedForLag = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Use a lightweight resize listener
    let resizeTimeout: any = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();

    const colors = [
      "rgba(245, 237, 208, 0.75)", // gold light
      "rgba(214, 181, 102, 0.6)",  // primary gold translucent
      "rgba(173, 216, 250, 0.75)", // powder blue petal
      "rgba(147, 197, 253, 0.7)",  // light sky blue petal
    ];

    const createPetal = (isInitial = false): Petal => {
      const size = Math.random() * 11 + 5;
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : -20,
        size,
        speedY: Math.random() * 1.1 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 0.015 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        swayAmount: Math.random() * 1.8 + 0.8,
        swaySpeed: Math.random() * 0.015 + 0.003,
        opacity: Math.random() * 0.35 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "petal",
      };
    };

    const createSparkle = (isInitial = false): Petal => {
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : -10,
        size: Math.random() * 1.8 + 0.6,
        speedY: Math.random() * 0.35 + 0.15,
        speedX: Math.random() * 0.16 - 0.08,
        rotation: 0,
        rotationSpeed: 0,
        swayAmount: Math.random() * 0.6,
        swaySpeed: Math.random() * 0.008,
        opacity: Math.random() * 0.3 + 0.4,
        color: "rgba(212, 181, 102, 0.85)", // bright glittering gold
        type: "sparkle",
      };
    };

    // Populate initial particles
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }
    for (let i = 0; i < maxSparkles; i++) {
      petals.push(createSparkle(true));
    }

    const drawPetalShape = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      c.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      c.closePath();
      c.fill();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track frames for dynamic FPS monitoring
      frameCount++;
      const now = performance.now();
      const timeElapsed = now - lastFpsCheck;

      // Check performance diagnostics every 1.5 seconds
      if (timeElapsed >= 1500) {
        const calculatedFps = (frameCount * 1000) / timeElapsed;
        frameCount = 0;
        lastFpsCheck = now;

        // If rendering lag is detected (< 48 FPS), optimize aggressively
        if (calculatedFps < 48 && !isOptimizedForLag) {
          maxPetals = Math.max(10, Math.floor(maxPetals * 0.65));
          maxSparkles = Math.max(8, Math.floor(maxSparkles * 0.6));
          enableShadows = false; // Turn off expensive 2D shadows
          isOptimizedForLag = true;

          // Prune arrays to the new capacity immediately
          let finalPetals: Petal[] = [];
          let currentPetals = 0;
          let currentSparkles = 0;
          
          petals.forEach((p) => {
            if (p.type === "petal" && currentPetals < maxPetals) {
              finalPetals.push(p);
              currentPetals++;
            } else if (p.type === "sparkle" && currentSparkles < maxSparkles) {
              finalPetals.push(p);
              currentSparkles++;
            }
          });
          petals = finalPetals;
        }
      }

      petals.forEach((p, idx) => {
        // Update physics
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * p.swaySpeed) * 0.4;
        p.rotation += p.rotationSpeed;

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.globalAlpha = p.opacity;

        if (p.type === "petal") {
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          drawPetalShape(ctx, p.size);
        } else {
          ctx.fillStyle = p.color;
          if (enableShadows) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(212, 181, 102, 0.9)";
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Recycle if falls out of bottom or sides
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          petals[idx] = p.type === "petal" ? createPetal(false) : createSparkle(false);
        }
      });

      animationId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 block h-full w-full"
      style={{ opacity: 0.85 }}
    />
  );
}
