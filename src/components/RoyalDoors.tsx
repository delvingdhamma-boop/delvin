import { useState, useEffect } from "react";

interface RoyalDoorsProps {
  onOpen: (lang: "en" | "gu") => void;
  onTriggerOpenSound?: () => void;
}

// Client-side background remover helper
function TransparentImage({ src, alt, className, id }: { src: string; alt: string; className?: string; id?: string }) {
  const [processedSrc, setProcessedSrc] = useState<string>("");

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      if (!active) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setProcessedSrc(src);
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Remove white or light-colored background pixels
        const threshold = 230;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const minColor = Math.min(r, g, b);
          
          if (minColor > threshold) {
            const diff = 255 - minColor;
            const range = 255 - threshold;
            const alphaFactor = diff / range;
            data[i + 3] = Math.round(data[i + 3] * alphaFactor);
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        setProcessedSrc(canvas.toDataURL("image/png"));
      } catch (error) {
        console.error("Error processing transparent image:", error);
        setProcessedSrc(src);
      }
    };
    img.onerror = () => {
      if (!active) return;
      setProcessedSrc(src);
    };

    return () => {
      active = false;
    };
  }, [src]);

  return (
    <img 
      src={processedSrc || src} 
      alt={alt} 
      className={`${className} ${!processedSrc ? "mix-blend-multiply" : ""}`}
      referrerPolicy="no-referrer"
      id={id}
    />
  );
}

// Global SVG gradients and definitions
const MasterSvgDefs = () => (
  <svg className="absolute w-0 h-0 pointer-events-none" viewBox="0 0 100 100">
    <defs>
      {/* High-quality sparkling gold metallic gradient */}
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" /> {/* yellow-200 */}
        <stop offset="25%" stopColor="#eab308" /> {/* yellow-500 */}
        <stop offset="50%" stopColor="#fef9c3" /> {/* yellow-100 */}
        <stop offset="75%" stopColor="#ca8a04" /> {/* yellow-600 */}
        <stop offset="100%" stopColor="#854d0e" /> {/* yellow-900 */}
      </linearGradient>
      
      {/* Rose color gradient: white-pink outer to rich velvet-rose center */}
      <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff1f2" /> {/* rose-50 */}
        <stop offset="40%" stopColor="#fbcfe8" /> {/* pink-200 */}
        <stop offset="100%" stopColor="#f43f5e" /> {/* rose-500 */}
      </linearGradient>
      
      <linearGradient id="petalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffe4e6" /> {/* rose-100 */}
        <stop offset="50%" stopColor="#f9a8d4" /> {/* pink-300 */}
        <stop offset="100%" stopColor="#db2777" /> {/* pink-600 */}
      </linearGradient>
      
      <linearGradient id="petalGradCenter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbcfe8" />
        <stop offset="50%" stopColor="#e11d48" /> {/* rose-600 */}
        <stop offset="100%" stopColor="#881337" /> {/* rose-900 */}
      </linearGradient>
      
      <linearGradient id="budGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff1f2" />
        <stop offset="60%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#9f1239" />
      </linearGradient>
      
      <linearGradient id="sepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bef264" /> {/* lime-300 */}
        <stop offset="100%" stopColor="#15803d" /> {/* green-700 */}
      </linearGradient>
      
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bbf7d0" /> {/* green-200 */}
        <stop offset="50%" stopColor="#22c55e" /> {/* green-500 */}
        <stop offset="100%" stopColor="#14532d" /> {/* green-900 */}
      </linearGradient>
    </defs>
  </svg>
);

// High-fidelity Rose Blossom
const RoseBlossom = () => (
  <svg className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(244,63,94,0.15)] hover:scale-105 transition-transform duration-300 cursor-pointer" viewBox="0 0 100 100" fill="none">
    {/* Outer petals layer */}
    <path d="M50 6 C68 6, 88 18, 88 40 C88 62, 68 94, 50 94 C32 94, 12 62, 12 40 C12 18, 32 6, 50 6 Z" fill="url(#petalGrad1)" opacity="0.95" />
    <path d="M50 14 C72 14, 82 30, 82 50 C82 70, 70 86, 50 86 C30 86, 18 70, 18 50 C18 30, 28 14, 50 14 Z" fill="url(#petalGrad2)" />
    
    {/* Staggered layered petals for 3D fullness */}
    <path d="M50 20 C64 20, 76 32, 76 50 C76 68, 64 80, 50 80 C36 80, 24 68, 24 50 C24 32, 36 20, 50 20 Z" fill="url(#petalGrad1)" transform="rotate(20 50 50)" />
    <path d="M50 25 C58 25, 68 34, 68 48 C68 62, 58 72, 50 72 C42 72, 32 62, 32 48 C32 34, 42 25, 50 25 Z" fill="url(#petalGrad2)" transform="rotate(-30 50 50)" />
    
    {/* Rich deep center core */}
    <path d="M50 32 C56 32, 62 38, 62 48 C62 58, 56 64, 50 64 C44 64, 38 58, 38 48 C38 38, 44 32, 50 32 Z" fill="url(#petalGradCenter)" />
    <path d="M50 36 C54 36, 58 40, 58 48 C58 56, 54 60, 50 60 C46 60, 42 56, 42 48 C42 40, 46 36, 50 36 Z" fill="url(#petalGradCenter)" transform="rotate(45 50 50)" />
    
    {/* Inside swirl details */}
    <path d="M47 44 C49 42, 51 42, 53 44 C55 46, 54 49, 51 51 C48 53, 45 49, 47 45 Z" fill="#4c0519" opacity="0.35" />
  </svg>
);

// Rose Bud
const RoseBud = () => (
  <svg className="w-full h-full filter drop-shadow-[0_1px_3px_rgba(244,63,94,0.1)]" viewBox="0 0 100 100" fill="none">
    {/* Green Sepals */}
    <path d="M50 88 C36 78, 26 52, 36 32 C44 42, 50 58, 50 88 Z" fill="url(#sepalGrad)" />
    <path d="M50 88 C64 78, 74 52, 64 32 C56 42, 50 58, 50 88 Z" fill="url(#sepalGrad)" />
    {/* Rose Bud core petals */}
    <path d="M50 84 C42 74, 34 50, 50 22 C66 50, 58 74, 50 84 Z" fill="url(#budGrad)" />
    <path d="M50 84 C45 74, 39 62, 50 38 C61 62, 55 74, 50 84 Z" fill="url(#budGrad)" opacity="0.85" />
  </svg>
);

// Green Leaf
const RoseLeaf = () => (
  <svg className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(20,83,45,0.15)]" viewBox="0 0 100 100" fill="none">
    {/* Serrated Leaf Shape */}
    <path d="M50 90 C26 66, 22 36, 50 12 C78 36, 74 66, 50 90 Z" fill="url(#leafGrad)" />
    {/* Main central vein */}
    <path d="M50 90 L50 12" stroke="#14532d" strokeWidth="2.5" opacity="0.5" />
    {/* Branching veins */}
    <path d="M50 76 Q38 68, 30 65 M50 76 Q62 68, 70 65" stroke="#14532d" strokeWidth="1.5" opacity="0.35" />
    <path d="M50 56 Q38 46, 28 41 M50 56 Q62 46, 72 41" stroke="#14532d" strokeWidth="1.5" opacity="0.35" />
    <path d="M50 36 Q40 28, 32 19 M50 36 Q60 28, 68 19" stroke="#14532d" strokeWidth="1.5" opacity="0.35" />
  </svg>
);

// Gold baroque filigrees for upper panel top
const GoldUpperScroll = () => (
  <svg className="w-full h-full" viewBox="0 0 100 50" fill="none">
    <path d="M10 42 Q25 18, 50 18 Q75 18, 90 42" stroke="url(#goldGrad)" strokeWidth="3" fill="none" />
    <path d="M50 18 Q50 6, 45 6 Q40 6, 42 12 Q45 18, 50 18 Z" fill="url(#goldGrad)" />
    <path d="M50 18 Q50 6, 55 6 Q60 6, 58 12 Q55 18, 50 18 Z" fill="url(#goldGrad)" />
    <path d="M25 27 Q15 22, 20 17 Q25 12, 30 22" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
    <path d="M75 27 Q85 22, 80 17 Q75 12, 70 22" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
  </svg>
);

// Gold baroque Urn-style Knocker / Pull ring
const GoldUrnKnocker = () => (
  <svg className="w-full h-full" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="17" stroke="url(#goldGrad)" strokeWidth="1.5" fill="rgba(212,181,102,0.1)" />
    {/* Urn Cup */}
    <path d="M30 40 C30 52, 50 52, 50 40 L52 35 C52 32, 28 32, 28 35 Z" fill="url(#goldGrad)" />
    <path d="M36 50 L44 50 L42 55 L38 55 Z" fill="url(#goldGrad)" />
    {/* Knocking ring */}
    <path d="M40 50 C48 50, 48 68, 40 68 C32 68, 32 50, 40 50 Z" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" />
    {/* Top curls */}
    <path d="M40 32 C37 25, 43 25, 40 32 Z" fill="url(#goldGrad)" />
    <path d="M28 35 Q22 35, 25 30" stroke="url(#goldGrad)" strokeWidth="2" />
    <path d="M52 35 Q58 35, 55 30" stroke="url(#goldGrad)" strokeWidth="2" />
  </svg>
);

// Gold baroque bottom panel crest (Fleur-de-lis)
const GoldLowerCrest = () => (
  <svg className="w-full h-full" viewBox="0 0 80 80" fill="none">
    <path d="M40 16 C43 29, 46 39, 40 66 C34 39, 37 29, 40 16 Z" fill="url(#goldGrad)" />
    <path d="M40 46 C30 46, 20 39, 20 29 C20 19, 32 31, 36 41" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" />
    <path d="M40 46 C50 46, 60 39, 60 29 C60 19, 48 31, 44 41" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" />
    <rect x="29" y="49" width="22" height="4.5" rx="2" fill="url(#goldGrad)" />
    <path d="M40 53 C32 59, 25 59, 28 69 C34 69, 38 61, 40 53 Z" fill="url(#goldGrad)" />
    <path d="M40 53 C48 59, 55 59, 52 69 C46 69, 42 61, 40 53 Z" fill="url(#goldGrad)" />
  </svg>
);

// Gold baroque vertical handles
const GoldHandleLeft = () => (
  <svg className="w-full h-full filter drop-shadow-[-3px_3px_5px_rgba(116,75,22,0.45)]" viewBox="0 0 40 160" fill="none">
    {/* Handle Mounts */}
    <circle cx="28" cy="25" r="7" fill="url(#goldGrad)" stroke="#744b16" strokeWidth="0.5" />
    <circle cx="28" cy="135" r="7" fill="url(#goldGrad)" stroke="#744b16" strokeWidth="0.5" />
    {/* Main baroque S-curve handle bar */}
    <path d="M28 25 C14 30, 4 48, 9 70 C14 92, 24 102, 19 118 C14 128, 23 135, 28 135" stroke="url(#goldGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M28 25 C14 30, 4 48, 9 70 C14 92, 24 102, 19 118 C14 128, 23 135, 28 135" stroke="#744b16" strokeWidth="1" strokeLinecap="round" fill="none" />
    {/* Decorative scroll accents */}
    <path d="M28 18 C22 18, 19 22, 23 25" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
    <path d="M28 142 C22 142, 19 138, 23 135" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
  </svg>
);

const GoldHandleRight = () => (
  <svg className="w-full h-full filter drop-shadow-[3px_3px_5px_rgba(116,75,22,0.45)]" viewBox="0 0 40 160" fill="none">
    {/* Handle Mounts */}
    <circle cx="12" cy="25" r="7" fill="url(#goldGrad)" stroke="#744b16" strokeWidth="0.5" />
    <circle cx="12" cy="135" r="7" fill="url(#goldGrad)" stroke="#744b16" strokeWidth="0.5" />
    {/* Main baroque S-curve handle bar (mirrored) */}
    <path d="M12 25 C26 30, 36 48, 31 70 C26 92, 16 102, 21 118 C26 128, 17 135, 12 135" stroke="url(#goldGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M12 25 C26 30, 36 48, 31 70 C26 92, 16 102, 21 118 C26 128, 17 135, 12 135" stroke="#744b16" strokeWidth="1" strokeLinecap="round" fill="none" />
    {/* Decorative scroll accents */}
    <path d="M12 18 C18 18, 21 22, 17 25" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
    <path d="M12 142 C18 142, 21 138, 17 135" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" />
  </svg>
);

// Baroque Neoclassical Arched Pediment Frame
const ArchwayPediment = () => (
  <div id="archway_pediment" className="absolute -top-16 left-1/2 -translate-x-1/2 w-[340px] md:w-[410px] h-[150px] pointer-events-none z-20 overflow-visible">
    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" fill="none">
      <defs>
        <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fafaf9" />
          <stop offset="50%" stopColor="#f5f5f4" />
          <stop offset="100%" stopColor="#e7e5e4" />
        </linearGradient>
        <filter id="archShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#082f49" floodOpacity="0.12" />
        </filter>
      </defs>
      
      {/* Arch structure */}
      <g filter="url(#archShadow)">
        <path d="M 22 150 A 178 178 0 0 1 378 150" stroke="url(#stoneGrad)" strokeWidth="26" fill="none" strokeLinecap="square" />
        <path d="M 32 150 A 168 168 0 0 1 368 150" stroke="#d6d3d1" strokeWidth="2.5" fill="none" />
        <path d="M 14 150 A 186 186 0 0 1 386 150" stroke="#fafaf9" strokeWidth="1.5" fill="none" />
        
        {/* Supporting Capital block backing */}
        <rect x="2" y="132" width="34" height="20" rx="2" fill="url(#stoneGrad)" stroke="#d6d3d1" strokeWidth="1" />
        <rect x="364" y="132" width="34" height="20" rx="2" fill="url(#stoneGrad)" stroke="#d6d3d1" strokeWidth="1" />
      </g>
      
      {/* Exquisite Top Carving/Crest */}
      <g transform="translate(160, -10)">
        <path d="M20 70 C30 50, 50 50, 60 70" stroke="url(#stoneGrad)" strokeWidth="4" fill="none" />
        <path d="M40 30 C20 40, 10 65, 40 75 C70 65, 60 40, 40 30 Z" fill="url(#stoneGrad)" stroke="#d6d3d1" strokeWidth="1.5" />
        <path d="M40 30 L40 75" stroke="#d6d3d1" strokeWidth="2" />
        <path d="M40 30 C30 40, 25 55, 40 75" stroke="#d6d3d1" strokeWidth="1.5" fill="none" />
        <path d="M40 30 C50 40, 55 55, 40 75" stroke="#d6d3d1" strokeWidth="1.5" fill="none" />
        <path d="M15 50 Q5 35, 20 30 Q35 25, 40 45" stroke="url(#stoneGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M15 50 Q5 35, 20 30 Q35 25, 40 45" stroke="#d6d3d1" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M65 50 Q75 35, 60 30 Q45 25, 40 45" stroke="url(#stoneGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M65 50 Q75 35, 60 30 Q45 25, 40 45" stroke="#d6d3d1" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M40 25 C36 10, 44 10, 40 25 Z" fill="url(#stoneGrad)" stroke="#d6d3d1" strokeWidth="1" />
        <path d="M40 25 C30 15, 33 5, 40 2" fill="none" stroke="#d6d3d1" strokeWidth="1.5" />
        <path d="M40 25 C50 15, 47 5, 40 2" fill="none" stroke="#d6d3d1" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
);

// Fluted Neoclassical Columns
const FlutedColumnLeft = () => (
  <div id="column_left" className="absolute top-0 -left-9 w-7 md:w-8 h-full pointer-events-none z-20 flex flex-col justify-between overflow-visible">
    {/* Corinthian Capital */}
    <div className="w-[140%] -ml-[20%] h-8 bg-gradient-to-b from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] border border-[#d6d3d1] rounded-b-md shadow-sm relative overflow-visible flex items-center justify-around">
      <div className="w-3 h-3 rounded-full border border-[#d6d3d1] bg-[#fafaf9] -mt-1 shadow-inner" />
      <div className="w-3 h-3 rounded-full border border-[#d6d3d1] bg-[#fafaf9] -mt-1 shadow-inner" />
    </div>
    {/* Column Shaft */}
    <div className="w-full flex-grow bg-gradient-to-r from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] border-l border-r border-[#d6d3d1] relative shadow-[2px_0_8px_rgba(0,0,0,0.05)]">
      <div className="absolute inset-y-0 left-[20%] w-[1px] bg-stone-300/40" />
      <div className="absolute inset-y-0 left-[40%] w-[1px] bg-stone-300/40" />
      <div className="absolute inset-y-0 left-[60%] w-[1px] bg-stone-300/40" />
      <div className="absolute inset-y-0 left-[80%] w-[1px] bg-stone-300/40" />
    </div>
    {/* Column Base */}
    <div className="w-[130%] -ml-[15%] h-10 bg-gradient-to-b from-[#e7e5e4] to-[#d6d3d1] border border-stone-400 rounded-t-sm shadow-md flex flex-col justify-end p-0.5">
      <div className="w-full h-3 bg-[#fafaf9] rounded-sm" />
    </div>
  </div>
);

const FlutedColumnRight = () => (
  <div id="column_right" className="absolute top-0 -right-9 w-7 md:w-8 h-full pointer-events-none z-20 flex flex-col justify-between overflow-visible">
    {/* Corinthian Capital */}
    <div className="w-[140%] -ml-[20%] h-8 bg-gradient-to-b from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] border border-[#d6d3d1] rounded-b-md shadow-sm relative overflow-visible flex items-center justify-around">
      <div className="w-3 h-3 rounded-full border border-[#d6d3d1] bg-[#fafaf9] -mt-1 shadow-inner" />
      <div className="w-3 h-3 rounded-full border border-[#d6d3d1] bg-[#fafaf9] -mt-1 shadow-inner" />
    </div>
    {/* Column Shaft */}
    <div className="w-full flex-grow bg-gradient-to-r from-[#fafaf9] via-[#f5f5f4] to-[#e7e5e4] border-l border-r border-[#d6d3d1] relative shadow-[-2px_0_8px_rgba(0,0,0,0.05)]">
      <div className="absolute inset-y-0 left-[20%] w-[1px] bg-stone-300/40" />
      <div className="absolute inset-y-0 left-[40%] w-[1px] bg-stone-300/40" />
      <div className="absolute inset-y-0 left-[60%] w-[1px] bg-stone-300/40" />
      <div className="absolute inset-y-0 left-[80%] w-[1px] bg-stone-300/40" />
    </div>
    {/* Column Base */}
    <div className="w-[130%] -ml-[15%] h-10 bg-gradient-to-b from-[#e7e5e4] to-[#d6d3d1] border border-stone-400 rounded-t-sm shadow-md flex flex-col justify-end p-0.5">
      <div className="w-full h-3 bg-[#fafaf9] rounded-sm" />
    </div>
  </div>
);

// Relative positioning coordinates for climbing rose garden framing
const LEFT_ROSES = [
  { type: "bud", x: "15%", y: "8%", size: "w-5.5 h-5.5", rotate: "rotate-12" },
  { type: "blossom", x: "0%", y: "20%", size: "w-8 h-8", rotate: "rotate-45" },
  { type: "leaf", x: "45%", y: "25%", size: "w-6 h-6", rotate: "rotate-[60deg]" },
  { type: "blossom", x: "-20%", y: "34%", size: "w-9 h-9", rotate: "rotate-[-12deg]" },
  { type: "leaf", x: "25%", y: "40%", size: "w-7 h-7", rotate: "rotate-[-15deg]" },
  { type: "blossom", x: "25%", y: "47%", size: "w-8 h-8", rotate: "rotate-[-30deg]" },
  { type: "leaf", x: "-35%", y: "52%", size: "w-6 h-6", rotate: "rotate-[90deg]" },
  { type: "bud", x: "-5%", y: "59%", size: "w-6.5 h-6.5", rotate: "rotate-[15deg]" },
  { type: "leaf", x: "40%", y: "65%", size: "w-6 h-6", rotate: "rotate-[-30deg]" },
  { type: "blossom", x: "-15%", y: "71%", size: "w-9 h-9", rotate: "rotate-[55deg]" },
  { type: "leaf", x: "10%", y: "76%", size: "w-7 h-7", rotate: "rotate-[120deg]" },
  { type: "blossom", x: "12%", y: "82%", size: "w-10 h-10", rotate: "rotate-[-15deg]" },
  
  // Dense Bottom Bush Group
  { type: "blossom", x: "-55%", y: "88%", size: "w-12 h-12", rotate: "rotate-[-25deg]" },
  { type: "blossom", x: "-22%", y: "92%", size: "w-11 h-11", rotate: "rotate-[35deg]" },
  { type: "blossom", x: "22%", y: "90%", size: "w-10 h-10", rotate: "rotate-[10deg]" },
  { type: "bud", x: "-42%", y: "81%", size: "w-7 h-7", rotate: "rotate-[-45deg]" },
  { type: "leaf", x: "-45%", y: "84%", size: "w-8 h-8", rotate: "rotate-[-60deg]" },
  { type: "leaf", x: "-10%", y: "95%", size: "w-7 h-7", rotate: "rotate-[15deg]" },
];

const RIGHT_ROSES = [
  { type: "bud", x: "15%", y: "8%", size: "w-5.5 h-5.5", rotate: "rotate-[-12deg]" },
  { type: "blossom", x: "30%", y: "20%", size: "w-8 h-8", rotate: "rotate-[-45deg]" },
  { type: "leaf", x: "-15%", y: "25%", size: "w-6 h-6", rotate: "rotate-[-60deg]" },
  { type: "blossom", x: "50%", y: "34%", size: "w-9 h-9", rotate: "rotate-[12deg]" },
  { type: "leaf", x: "5%", y: "40%", size: "w-7 h-7", rotate: "rotate-[15deg]" },
  { type: "blossom", x: "5%", y: "47%", size: "w-8 h-8", rotate: "rotate-[30deg]" },
  { type: "leaf", x: "65%", y: "52%", size: "w-6 h-6", rotate: "rotate-[-90deg]" },
  { type: "bud", x: "35%", y: "59%", size: "w-6.5 h-6.5", rotate: "rotate-[-15deg]" },
  { type: "leaf", x: "-10%", y: "65%", size: "w-6 h-6", rotate: "rotate-[30deg]" },
  { type: "blossom", x: "45%", y: "71%", size: "w-9 h-9", rotate: "rotate-[-55deg]" },
  { type: "leaf", x: "25%", y: "76%", size: "w-7 h-7", rotate: "rotate-[-120deg]" },
  { type: "blossom", x: "18%", y: "82%", size: "w-10 h-10", rotate: "rotate-[15deg]" },
  
  // Dense Bottom Bush Group
  { type: "blossom", x: "70%", y: "88%", size: "w-12 h-12", rotate: "rotate-[25deg]" },
  { type: "blossom", x: "36%", y: "92%", size: "w-11 h-11", rotate: "rotate-[-35deg]" },
  { type: "blossom", x: "-10%", y: "90%", size: "w-10 h-10", rotate: "rotate-[-10deg]" },
  { type: "bud", x: "60%", y: "81%", size: "w-7 h-7", rotate: "rotate-[45deg]" },
  { type: "leaf", x: "60%", y: "84%", size: "w-8 h-8", rotate: "rotate-[60deg]" },
  { type: "leaf", x: "25%", y: "95%", size: "w-7 h-7", rotate: "rotate-[-15deg]" },
];

const TOP_ROSES = [
  { type: "blossom", x: "12%", y: "45%", size: "w-8 h-8", rotate: "rotate-[15deg]" },
  { type: "blossom", x: "80%", y: "45%", size: "w-8 h-8", rotate: "rotate-[-25deg]" },
  { type: "bud", x: "22%", y: "25%", size: "w-6.5 h-6.5", rotate: "rotate-[-35deg]" },
  { type: "bud", x: "72%", y: "25%", size: "w-6.5 h-6.5", rotate: "rotate-[35deg]" },
  { type: "leaf", x: "5%", y: "55%", size: "w-6.5 h-6.5", rotate: "rotate-[45deg]" },
  { type: "leaf", x: "88%", y: "55%", size: "w-6.5 h-6.5", rotate: "rotate-[-45deg]" },
  { type: "leaf", x: "30%", y: "20%", size: "w-6 h-6", rotate: "rotate-[70deg]" },
  { type: "leaf", x: "64%", y: "20%", size: "w-6 h-6", rotate: "rotate-[-70deg]" },
];

export default function RoyalDoors({ onOpen, onTriggerOpenSound }: RoyalDoorsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [viewportScale, setViewportScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // The box is ~380px wide and total height is around 720px with headings
      const targetWidth = 380;
      const targetHeight = 720;
      
      const widthScale = window.innerWidth < targetWidth ? (window.innerWidth - 16) / targetWidth : 1;
      const heightScale = window.innerHeight < targetHeight ? (window.innerHeight - 32) / targetHeight : 1;
      
      // Clamp scale to a minimum of 0.65 and maximum of 1.05 to preserve gorgeous rendering proportions
      const calculatedScale = Math.max(0.65, Math.min(widthScale, heightScale, 1.05));
      setViewportScale(calculatedScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    if (onTriggerOpenSound) {
      onTriggerOpenSound();
    }
    
    // Smoothly fade in the language selection card after the doors swing open
    setTimeout(() => {
      setShowLanguageOptions(true);
    }, 1500);
  };

  const handleSelectLanguage = (lang: "en" | "gu") => {
    setShowLanguageOptions(false);
    setIsZooming(true);
    
    setTimeout(() => {
      onOpen(lang);
    }, 1800);
  };

  return (
    <div
      id="royal_doors_screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#f0f9ff] transition-opacity duration-1000 ${
        isZooming ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Global Hidden Master Definitions */}
      <MasterSvgDefs />

      {/* Dynamic Golden and Cyan Beam Glow (behind the doors) */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22)_0%,rgba(217,119,6,0.03)_50%,rgba(0,0,0,0)_70%)] pointer-events-none transition-opacity duration-1000 ${
          isOpen ? "opacity-100 scale-150" : "opacity-75"
        }`} 
      />

      {/* Main Container with camera zoom and auto-viewport responsive scaling */}
      <div
        className="relative flex flex-col items-center justify-center transition-all duration-[3000ms] cubic-bezier(0.25, 1, 0.3, 1)"
        style={{
          transform: isZooming 
            ? `scale(${viewportScale * 1.85})` 
            : `scale(${viewportScale})`,
          filter: isZooming ? "drop-shadow(0 20px 50px rgba(8,47,73,0.12)) blur(12px)" : "drop-shadow(0 20px 50px rgba(8,47,73,0.12))",
          transformOrigin: "center center",
          willChange: "transform"
        }}
      >
        {/* Elegant glassmorphic Gujarati panel */}
        <div 
          className={`mb-8 text-center px-8 py-5 transition-all duration-1000 ${
            isOpen ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-6 md:translate-y-8"
          }`}
        >
          {/* Upside lighting text in Gujarati */}
          <div className="mb-2.5 flex justify-center items-center">
            <span className="relative inline-block text-lg md:text-xl font-bold tracking-widest font-serif text-sky-600 animate-pulse" id="shree_ganeshay_namah_img">
              {/* Brilliant theme lighting/neon glow underlay */}
              <span className="absolute inset-0 text-sky-400 blur-[8px] select-none text-center">
                શ્રી ગણેશાય નમઃ
              </span>
              <span className="absolute inset-0 text-sky-300 blur-[2px] select-none text-center">
                શ્રી ગણેશાય નમઃ
              </span>
              {/* High-contrast crisp foreground text */}
              <span className="relative text-sky-950 drop-shadow-[0_2px_4px_rgba(56,189,248,0.5)]">
                શ્રી ગણેશાય નમઃ
              </span>
            </span>
          </div>

          <p className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-sky-950 font-medium uppercase mb-1.5">
            engagement invitation
          </p>
          <h2 className="font-serif text-2xl md:text-3.5xl text-sky-950 font-bold tracking-wide italic capitalize drop-shadow-[0_0_10px_rgba(56,189,248,0.65)]">
            Delvin &amp; Siddhi
          </h2>
        </div>

        {/* 3D Double Door Stage */}
        <div className="relative door-container w-[320px] h-[480px] md:w-[380px] md:h-[540px] flex items-center justify-center bg-transparent z-10">
          
          {/* Elegant Minimalist Archway Frame around the doors */}
          <div className="absolute -inset-4 rounded-t-[200px] border-[4px] border-[#ca8a04]/40 bg-sky-100/5 pointer-events-none shadow-[0_0_30px_rgba(56,189,248,0.15),inset_0_0_15px_rgba(212,181,102,0.15)] z-20">
            {/* Inner Golden border line */}
            <div className="absolute inset-1 rounded-t-[194px] border border-[#ca8a04]/20" />
          </div>

          {/* Inner Room/Courtyard Background (revealed behind doors) */}
          <div 
            className={`absolute inset-1 rounded-t-[178px] rounded-b-sm bg-gradient-to-b from-[#fbf7ec] to-[#f5edd0] transition-opacity duration-1000 z-0 ${
              isOpen ? "opacity-100 shadow-[inset_0_0_30px_rgba(212,181,102,0.3)]" : "opacity-0"
            } pointer-events-none`}
          />

          {/* Language Selection overlay (revealed behind doors) */}
          <div 
            className={`absolute inset-3 rounded-t-[174px] rounded-b-md flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#e0f2fe]/95 to-[#f0f9ff]/95 backdrop-blur-[6px] shadow-[inset_0_0_30px_rgba(186,230,253,0.4),0_10px_25px_rgba(8,47,73,0.08)] border border-gold-400/30 transition-all duration-1000 z-20 ${
              showLanguageOptions ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="font-cinzel text-[10px] md:text-xs tracking-[0.25em] text-sky-950 font-bold mb-1 uppercase text-center block">
              WELCOME
            </span>
            <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-4" />
            
            <h3 className="font-serif text-sm md:text-base text-sky-950 italic font-semibold mb-6 leading-relaxed">
              Select Invitation Language<br/>
              <span className="text-xs md:text-sm font-sans tracking-wide block mt-1">આમંત્રણની ભાષા પસંદ કરો</span>
            </h3>
            
            <div className="flex flex-col gap-3.5 w-full max-w-[170px] md:max-w-[200px]">
              {/* English Button */}
              <button
                onClick={() => handleSelectLanguage("en")}
                className="group relative px-6 py-2.5 rounded-full overflow-hidden border border-gold-400 bg-white hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 font-cinzel text-xs font-bold tracking-widest shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-sky-950"
              >
                <span className="relative z-10">English</span>
              </button>
              
              {/* Gujarati Button */}
              <button
                onClick={() => handleSelectLanguage("gu")}
                className="group relative px-6 py-2.5 rounded-full overflow-hidden border border-gold-400 bg-white hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 font-serif text-sm font-bold tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-sky-950"
              >
                <span className="relative z-10">ગુજરાતી</span>
              </button>
            </div>
          </div>

          {/* Light glow bursting when opening */}
          <div 
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,242,242,0.9)_0%,rgba(56,189,248,0)_60%)] z-10 transition-opacity duration-1000 ${
              isOpen ? "opacity-100 scale-125" : "opacity-0"
            } pointer-events-none`}
          />

          {/* LEFT DOOR (Light Blue with Gold Filigree Panel) */}
          <div
            id="left_door"
            onClick={handleOpenDoors}
            className={`door-left absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#e0f2fe] via-[#bae6fd] to-[#f0f9ff] border-r border-[#ca8a04]/40 rounded-tl-[180px] shadow-[inset_-3px_0_12px_rgba(14,165,233,0.15)] cursor-pointer select-none overflow-hidden z-10 ${
              isOpen ? "open pointer-events-none" : ""
            }`}
          >
            {/* Elegant Double Gold Moldings & Carvings */}
            <div className="absolute inset-3 border border-[#ca8a04]/30 rounded-tl-[165px] p-2.5 flex flex-col justify-between">
              
              {/* Upper Arched Panel */}
              <div className="w-full h-[60%] border border-[#ca8a04]/25 rounded-tl-[150px] relative bg-white/10 backdrop-blur-xs flex flex-col items-center pt-5">
                <div className="w-11/12 h-6 opacity-80 mb-2">
                  <GoldUpperScroll />
                </div>
                <div className="w-14 h-14 mt-1 opacity-90">
                  <GoldUrnKnocker />
                </div>
                {/* Decorative border line inside panel */}
                <div className="absolute inset-2 border border-[#ca8a04]/10 rounded-tl-[142px] pointer-events-none" />
              </div>
              
              {/* Lower Rectangular Panel */}
              <div className="w-full h-[36%] border border-[#ca8a04]/25 rounded-md relative bg-white/10 backdrop-blur-xs flex items-center justify-center">
                <div className="w-12 h-12 opacity-85">
                  <GoldLowerCrest />
                </div>
                {/* Decorative border line inside panel */}
                <div className="absolute inset-1.5 border border-[#ca8a04]/10 rounded-sm pointer-events-none" />
              </div>

            </div>

            {/* Left Baroque Gold Handle */}
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-36 z-30 pointer-events-none">
              <GoldHandleLeft />
            </div>
          </div>

          {/* RIGHT DOOR (Light Blue with Gold Filigree Panel) */}
          <div
            id="right_door"
            onClick={handleOpenDoors}
            className={`door-right absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#e0f2fe] via-[#bae6fd] to-[#f0f9ff] border-l border-[#ca8a04]/40 rounded-tr-[180px] shadow-[inset_3px_0_12px_rgba(14,165,233,0.15)] cursor-pointer select-none overflow-hidden z-10 ${
              isOpen ? "open pointer-events-none" : ""
            }`}
          >
            {/* Elegant Double Gold Moldings & Carvings */}
            <div className="absolute inset-3 border border-[#ca8a04]/30 rounded-tr-[165px] p-2.5 flex flex-col justify-between">
              
              {/* Upper Arched Panel */}
              <div className="w-full h-[60%] border border-[#ca8a04]/25 rounded-tr-[150px] relative bg-white/10 backdrop-blur-xs flex flex-col items-center pt-5">
                <div className="w-11/12 h-6 opacity-80 mb-2">
                  <GoldUpperScroll />
                </div>
                <div className="w-14 h-14 mt-1 opacity-90">
                  <GoldUrnKnocker />
                </div>
                {/* Decorative border line inside panel */}
                <div className="absolute inset-2 border border-[#ca8a04]/10 rounded-tr-[142px] pointer-events-none" />
              </div>
              
              {/* Lower Rectangular Panel */}
              <div className="w-full h-[36%] border border-[#ca8a04]/25 rounded-md relative bg-white/10 backdrop-blur-xs flex items-center justify-center">
                <div className="w-12 h-12 opacity-85">
                  <GoldLowerCrest />
                </div>
                {/* Decorative border line inside panel */}
                <div className="absolute inset-1.5 border border-[#ca8a04]/10 rounded-sm pointer-events-none" />
              </div>

            </div>

            {/* Right Baroque Gold Handle */}
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-36 z-30 pointer-events-none">
              <GoldHandleRight />
            </div>
          </div>
          
        </div>

        {/* Dreamy light blue and pink ground lighting */}
        <div className="absolute bottom-[-100px] w-[500px] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(254,205,211,0.25)_0%,rgba(14,165,233,0.02)_60%,rgba(0,0,0,0)_80%)] pointer-events-none z-0" />

        {/* Touch to Open Action text */}
        <div 
          onClick={handleOpenDoors}
          className={`mt-10 flex flex-col items-center cursor-pointer group transition-all duration-1000 ${
            isOpen ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <span className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-sky-950 font-bold animate-pulse group-hover:text-pink-600 transition-colors uppercase">
            Touch to Open Our Invitation
          </span>
          <div className="mt-3 w-12 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent group-hover:w-20 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}
