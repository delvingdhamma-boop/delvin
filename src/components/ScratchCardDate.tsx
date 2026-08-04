import React, { useRef, useEffect, useState, useCallback } from "react";
import { Sparkles } from "lucide-react";

interface ScratchCardDateProps {
  dateText: string;
  subText?: string;
  language?: "en" | "gu";
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
}

export default function ScratchCardDate({
  dateText,
  subText,
  language = "en",
  className = "",
}: ScratchCardDateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [fadeCanvas, setFadeCanvas] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const scratchPercentageRef = useRef<number>(0);
  const isRevealedRef = useRef<boolean>(false);

  // Initialize Web Audio API for realistic scratch sound
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create 1-second buffer of white noise
      const bufferSize = ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.8;
      }

      // Source node
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter to simulate paper/foil scratch crunch
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(1600, ctx.currentTime);
      bandpass.Q.setValueAtTime(1.8, ctx.currentTime);

      // Gain node for volume control
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);

      whiteNoise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();

      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gain;
    } catch {
      // Ignore if Web Audio API not supported
    }
  }, []);

  const playScratchSound = useCallback(() => {
    if (!audioCtxRef.current) initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      const gain = gainNodeRef.current;
      const now = audioCtxRef.current.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    }
  }, [initAudio]);

  const stopScratchSound = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const gain = gainNodeRef.current;
      const now = audioCtxRef.current.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setTargetAtTime(0, now, 0.03);
    }
  }, []);

  // Draw Gold Foil Metallic Scratch Surface
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, width, height);

    // Rounded rectangle path for 14px border radius
    const radius = 14 * dpr;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();

    // 1. Rich Metallic Gold Foil Gradient
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, "#8D6118");
    goldGrad.addColorStop(0.15, "#C59B27");
    goldGrad.addColorStop(0.35, "#F7E58B");
    goldGrad.addColorStop(0.5, "#FFF7D1");
    goldGrad.addColorStop(0.65, "#E2B842");
    goldGrad.addColorStop(0.85, "#B8860B");
    goldGrad.addColorStop(1, "#70480C");
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Metallic Radial Specular Shine
    const shineGrad = ctx.createRadialGradient(
      width * 0.35,
      height * 0.25,
      5 * dpr,
      width * 0.35,
      height * 0.25,
      width * 0.7
    );
    shineGrad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
    shineGrad.addColorStop(0.5, "rgba(255, 245, 200, 0.2)");
    shineGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = shineGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Diagonal Embossed Micro-lines for Foil Texture
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1 * dpr;
    for (let x = -height; x < width + height; x += 6 * dpr) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }

    // 4. Subtle Sparkle Pattern across the surface
    const sparklesCount = Math.floor((width * height) / (2500 * dpr * dpr));
    const sparkleColors = ["#FFFFFF", "#FFF3A0", "#F7D070"];
    for (let i = 0; i < sparklesCount; i++) {
      const sx = ((i * 37 + 13) % width);
      const sy = ((i * 53 + 29) % height);
      const size = (2 + (i % 3)) * dpr;
      ctx.fillStyle = sparkleColors[i % sparkleColors.length];

      // Draw 4-point star
      ctx.beginPath();
      ctx.arc(sx, sy, size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(sx - size, sy);
      ctx.lineTo(sx + size, sy);
      ctx.moveTo(sx, sy - size);
      ctx.lineTo(sx, sy + size);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 0.75 * dpr;
      ctx.stroke();
    }

    // 5. Tiny Floral Corner Ornaments in Gold
    const ornSize = 18 * dpr;
    const corners = [
      { x: 12 * dpr, y: 12 * dpr, sx: 1, sy: 1 },
      { x: width - 12 * dpr, y: 12 * dpr, sx: -1, sy: 1 },
      { x: 12 * dpr, y: height - 12 * dpr, sx: 1, sy: -1 },
      { x: width - 12 * dpr, y: height - 12 * dpr, sx: -1, sy: -1 },
    ];

    ctx.strokeStyle = "rgba(100, 65, 10, 0.75)";
    ctx.lineWidth = 1.2 * dpr;
    corners.forEach(({ x, y, sx, sy }) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sx, sy);
      ctx.beginPath();
      ctx.moveTo(0, ornSize);
      ctx.quadraticCurveTo(0, 0, ornSize, 0);
      ctx.moveTo(0, ornSize * 0.6);
      ctx.quadraticCurveTo(0, 0, ornSize * 0.6, 0);
      ctx.stroke();

      // Corner dot
      ctx.fillStyle = "rgba(120, 80, 15, 0.85)";
      ctx.beginPath();
      ctx.arc(3 * dpr, 3 * dpr, 1.5 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 6. Embossed Inner Bevel (Highlight top/left, Shadow bottom/right)
    ctx.lineWidth = 2 * dpr;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.beginPath();
    ctx.moveTo(radius, 1 * dpr);
    ctx.lineTo(width - radius, 1 * dpr);
    ctx.stroke();

    ctx.strokeStyle = "rgba(80, 50, 5, 0.5)";
    ctx.beginPath();
    ctx.moveTo(radius, height - 1 * dpr);
    ctx.lineTo(width - radius, height - 1 * dpr);
    ctx.stroke();

    ctx.restore(); // Exit clip

    // 7. Outer 2px White-Gold Border with soft outer glow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();

    const borderGrad = ctx.createLinearGradient(0, 0, width, height);
    borderGrad.addColorStop(0, "#FFF8DC");
    borderGrad.addColorStop(0.5, "#D4AF37");
    borderGrad.addColorStop(1, "#FFFDD0");
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 2.5 * dpr;
    ctx.shadowColor = "rgba(212, 181, 102, 0.6)";
    ctx.shadowBlur = 6 * dpr;
    ctx.stroke();
    ctx.restore();

    // 8. Centered Scratch Text
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const titleText = language === "gu" ? "✨ ખોલવા માટે સ્ક્રેચ કરો ✨" : "✨ SCRATCH TO REVEAL ✨";
    const titleFontSize = Math.max(11, Math.min(13.5, width / 21)) * dpr;

    ctx.font = `600 ${titleFontSize}px "Cinzel", "Playfair Display", Georgia, serif`;
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(100, 60, 0, 0.85)";
    ctx.shadowBlur = 4 * dpr;
    ctx.shadowOffsetY = 1.5 * dpr;

    ctx.fillText(titleText, width / 2, height / 2);
    ctx.restore();
  }, [language]);

  // Handle Resize and Canvas Initialization
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (!isRevealedRef.current) {
        drawFoil();
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [drawFoil]);

  // Calculate percentage scratched
  const checkScratchPercentage = useCallback(() => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    try {
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let transparentCount = 0;
      const totalPixels = data.length / 4;
      
      // Sample every 8th pixel for fast 60fps performance
      const step = 8;
      let sampledCount = 0;

      for (let i = 3; i < data.length; i += 4 * step) {
        sampledCount++;
        if (data[i] < 128) {
          transparentCount++;
        }
      }

      const ratio = transparentCount / sampledCount;
      scratchPercentageRef.current = ratio;

      // Reveal if 45% - 50% scratched
      if (ratio >= 0.45 && !isRevealedRef.current) {
        isRevealedRef.current = true;
        setIsRevealed(true);
        setFadeCanvas(true);
        stopScratchSound();
        triggerSparkleExplosion();
      }
    } catch {
      // Ignore cross-origin image errors if any
    }
  }, [stopScratchSound]);

  // Trigger celebratory sparkles explosion on reveal
  const triggerSparkleExplosion = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const newParticles: Particle[] = [];
    const particleCount = 36;
    const colors = ["#D4AF37", "#FFDF00", "#FFFFFF", "#F3E5AB", "#B8860B"];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
      const speed = 2 + Math.random() * 5;
      newParticles.push({
        x: rect.width / 2,
        y: rect.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    let animId: number;
    const update = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.12, // gravity
            vx: p.vx * 0.98,
            alpha: Math.max(0, 1 - p.life / p.maxLife),
            life: p.life + 1,
            rotation: p.rotation + p.rotSpeed,
          }))
          .filter((p) => p.life < p.maxLife)
      );

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [particles]);

  // Scratch stroke handler
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      if (isRevealedRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();

      const radius = 22 * dpr;

      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.lineWidth = radius * 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      lastPointRef.current = { x, y };

      playScratchSound();
      checkScratchPercentage();
    },
    [playScratchSound, checkScratchPercentage]
  );

  // Mouse & Touch Event Listeners
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isRevealedRef.current) return;
    setIsScratching(true);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.setPointerCapture(e.pointerId);
    }
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching || isRevealedRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isScratching) return;
    setIsScratching(false);
    lastPointRef.current = null;
    stopScratchSound();
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block my-2 text-center select-none ${className}`}
    >
      {/* 1. Underlying Date Content */}
      <div
        className={`relative z-10 w-[230px] sm:w-[270px] px-4 py-2.5 min-h-[48px] flex flex-col items-center justify-center rounded-[14px] bg-gradient-to-r from-amber-50/90 via-sky-50/80 to-amber-50/90 border border-gold-300/80 transition-all duration-500 shadow-sm ${
          isRevealed
            ? "shadow-[0_0_20px_rgba(212,181,102,0.4)] border-gold-400"
            : "opacity-95"
        }`}
      >
        <p className="font-serif text-sm sm:text-base font-bold text-sky-950 tracking-wide relative flex items-center justify-center gap-1.5 w-full text-center">
          <Sparkles className={`h-3.5 w-3.5 text-gold-500 transition-opacity duration-500 ${isRevealed ? "opacity-100 animate-pulse" : "opacity-0"}`} />
          <span className="truncate">{dateText}</span>
          <Sparkles className={`h-3.5 w-3.5 text-gold-500 transition-opacity duration-500 ${isRevealed ? "opacity-100 animate-pulse" : "opacity-0"}`} />
        </p>

        {subText && (
          <p className="font-serif text-xs font-semibold text-gold-700 mt-0.5">
            {subText}
          </p>
        )}
      </div>

      {/* 2. Metallic Scratch Canvas Surface (Covers Date with 20px padding) */}
      {!isRevealed || fadeCanvas ? (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 z-20 touch-none cursor-pointer rounded-[14px] transition-opacity duration-700 ${
            fadeCanvas ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            touchAction: "none",
          }}
        />
      ) : null}

      {/* 3. Celebration Sparkles Overlay */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-visible">
          {particles.map((p, idx) => (
            <div
              key={idx}
              className="absolute rounded-full"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: p.alpha,
                boxShadow: `0 0 6px ${p.color}`,
                transform: `translate(-50%, -50%) rotate(${p.rotation}rad)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
