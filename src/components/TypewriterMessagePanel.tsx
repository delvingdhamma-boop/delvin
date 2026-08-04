import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

interface TypewriterMessagePanelProps {
  message: string;
  className?: string;
}

interface SparkleParticle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  delay: number;
}

export default function TypewriterMessagePanel({
  message,
  className = "",
}: TypewriterMessagePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [panelVisible, setPanelVisible] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  const hasTriggeredRef = useRef(false);

  const fullText = `"${message}"`;

  // 1. Intersection Observer for scroll trigger (60% visible or ~0.4 threshold)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          // Step 1: Panel fade-in and move upward by 20px (duration 0.6s)
          setPanelVisible(true);

          // Step 2: Wait 300ms after panel is visible, then start typing
          setTimeout(() => {
            setIsTyping(true);
          }, 600 + 300);
        }
      },
      {
        threshold: 0.4, // triggers when panel is ~40-60% in view
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle message change (e.g., switching language between EN and GU)
  const prevMessageRef = useRef(message);
  useEffect(() => {
    if (prevMessageRef.current !== message) {
      prevMessageRef.current = message;
      if (hasTriggeredRef.current) {
        setTypedIndex(0);
        setIsComplete(false);
        setIsTyping(true);
        setSparkles([]);
      }
    }
  }, [message]);

  // 2. Handwritten typewriter animation loop with natural pauses
  useEffect(() => {
    if (!isTyping || isComplete) return;

    if (typedIndex >= fullText.length) {
      setIsTyping(false);
      setIsComplete(true);

      // Trigger subtle golden sparkle effect around the panel
      const newSparkles: SparkleParticle[] = [];
      const count = 16;
      for (let i = 0; i < count; i++) {
        // Place sparkles around the border of the panel
        const isHorizontal = Math.random() > 0.5;
        const x = isHorizontal ? Math.random() * 100 : Math.random() > 0.5 ? 2 : 98;
        const y = !isHorizontal ? Math.random() * 100 : Math.random() > 0.5 ? 2 : 98;
        newSparkles.push({
          id: i,
          x,
          y,
          size: 12 + Math.random() * 12,
          delay: Math.random() * 400,
        });
      }
      setSparkles(newSparkles);
      return;
    }

    const currentChar = fullText[typedIndex];
    
    // Natural typing speed: 35-45ms per character + variations
    let delay = 35 + Math.random() * 12;

    // Pauses after commas, periods, newlines to simulate thoughtful handwriting
    if (currentChar === "," || currentChar === "،") {
      delay += 160;
    } else if (currentChar === "." || currentChar === "!" || currentChar === "?" || currentChar === "\n" || currentChar === "॥") {
      delay += 260;
    }

    const timer = setTimeout(() => {
      setTypedIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isTyping, typedIndex, fullText, isComplete]);

  // Split fullText into character array for smooth fade-in rendering without layout shift
  const chars = Array.from(fullText);

  return (
    <div
      ref={containerRef}
      className={`glass-card-light p-8 md:p-12 rounded-2xl gold-border relative overflow-hidden transition-all duration-700 ease-out ${
        panelVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      } ${isComplete ? "shadow-[0_0_25px_rgba(212,181,102,0.35)]" : ""} ${className}`}
      style={{
        transitionProperty: "opacity, transform, box-shadow",
      }}
    >
      {/* Background soft tint */}
      <div className="absolute inset-0 bg-[#e0f2fe]/20 pointer-events-none" />

      {/* Message Paragraph - Pre-rendered structure prevents any layout shift */}
      <p className="font-serif text-lg md:text-xl text-sky-950 leading-relaxed italic md:px-4 whitespace-pre-line text-center relative z-10">
        {chars.map((char, index) => {
          const isRevealed = index < typedIndex;
          const isCurrentChar = isTyping && index === typedIndex - 1;

          return (
            <React.Fragment key={index}>
              <span
                className={`inline transition-opacity duration-200 ${
                  isRevealed ? "opacity-100" : "opacity-0"
                }`}
              >
                {char}
              </span>
              {/* Blinking gold cursor placed right after the last typed character */}
              {isCurrentChar && !isComplete && (
                <span className="inline-block w-[2px] h-[1.1em] bg-gold-500 ml-[1px] align-middle animate-[blink_0.5s_infinite_alternate]" />
              )}
            </React.Fragment>
          );
        })}

        {/* Cursor if typing hasn't started yet or right at character 0 */}
        {isTyping && typedIndex === 0 && (
          <span className="inline-block w-[2px] h-[1.1em] bg-gold-500 ml-[1px] align-middle animate-[blink_0.5s_infinite_alternate]" />
        )}
      </p>

      {/* Completion Sparkles Overlay */}
      {isComplete && sparkles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="absolute animate-ping opacity-80"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                animationDuration: "1.2s",
                animationDelay: `${s.delay}ms`,
                animationIterationCount: 1,
              }}
            >
              <Sparkles
                className="text-gold-400"
                style={{ width: `${s.size}px`, height: `${s.size}px` }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Custom Keyframes for Gold Cursor Blinking */}
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
