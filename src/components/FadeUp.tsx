import { useEffect, useRef, useState, ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number; // millisecond delay
  className?: string;
}

export default function FadeUp({ children, delay = 0, className = "" }: FadeUpProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once it has animated, we can unobserve
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.12, // trigger when 12% is visible
        rootMargin: "0px 0px -50px 0px", // triggers slightly before scrolling fully in
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out transform ${
        isIntersecting
          ? "opacity-100 translate-y-0 filter blur-0"
          : "opacity-0 translate-y-12 filter blur-[2px]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
