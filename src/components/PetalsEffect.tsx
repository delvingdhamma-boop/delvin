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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let petals: Petal[] = [];
    const maxPetals = 45; // balanced density for gorgeous looks without lag
    const maxSparkles = 35;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const colors = [
      "rgba(245, 237, 208, 0.75)", // gold light
      "rgba(214, 181, 102, 0.6)",  // primary gold translucent
      "rgba(173, 216, 250, 0.75)", // powder blue petal
      "rgba(147, 197, 253, 0.7)",  // light sky blue petal
    ];

    const createPetal = (isInitial = false): Petal => {
      const size = Math.random() * 12 + 6;
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : -20,
        size,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        swayAmount: Math.random() * 2 + 1,
        swaySpeed: Math.random() * 0.02 + 0.005,
        opacity: Math.random() * 0.4 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "petal",
      };
    };

    const createSparkle = (isInitial = false): Petal => {
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : -10,
        size: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: Math.random() * 0.2 - 0.1,
        rotation: 0,
        rotationSpeed: 0,
        swayAmount: Math.random() * 0.8,
        swaySpeed: Math.random() * 0.01,
        opacity: Math.random() * 0.3 + 0.4,
        color: "rgba(212, 181, 102, 0.8)", // bright glittering gold
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
      // Draw organic elegant curved petal shape
      c.moveTo(0, 0);
      c.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      c.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      c.closePath();
      c.fill();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
          // Sparkle: draw soft golden glowing particle
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(212, 181, 102, 0.9)";
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
      window.removeEventListener("resize", resizeCanvas);
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
