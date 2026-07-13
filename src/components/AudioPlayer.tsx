import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioEngine {
  playDoorOpen: () => void;
  startMusic: () => void;
  stopMusic: () => void;
  setVolume: (v: number) => void;
}

let audioEngineInstance: AudioEngine | null = null;

// Procedural audio engine using Web Audio API
const createAudioEngine = (): AudioEngine => {
  let audioCtx: AudioContext | null = null;
  let musicInterval: any = null;
  let isPlaying = false;
  let mainVolumeNode: GainNode | null = null;
  let activeNodes: AudioNode[] = [];

  const init = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      mainVolumeNode = audioCtx.createGain();
      const isMobile = typeof window !== "undefined" && (
        /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768
      );
      const defaultVolume = isMobile ? 0.5 : 0.3; // slightly increased on mobile to 50% vs 30% desktop
      mainVolumeNode.gain.setValueAtTime(defaultVolume, audioCtx.currentTime);
      mainVolumeNode.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  };

  const playDoorOpen = () => {
    init();
    if (!audioCtx || !mainVolumeNode) return;
    const now = audioCtx.currentTime;

    // --- 1. Heavy Door Creak & Rumble (Sub-frequencies) ---
    // Create oscillator for low frequency rumbling sound
    const rumbleOsc = audioCtx.createOscillator();
    const rumbleGain = audioCtx.createGain();
    rumbleOsc.type = "triangle";
    rumbleOsc.frequency.setValueAtTime(45, now);
    rumbleOsc.frequency.exponentialRampToValueAtTime(30, now + 3.0);

    rumbleGain.gain.setValueAtTime(0, now);
    rumbleGain.gain.linearRampToValueAtTime(0.4, now + 0.5);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

    rumbleOsc.connect(rumbleGain);
    rumbleGain.connect(mainVolumeNode);
    rumbleOsc.start(now);
    rumbleOsc.stop(now + 3.5);

    // --- 2. Golden Chime Sweeping (Magical Arpeggio) ---
    const chimeFrequencies = [
      261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
      659.25, 783.99, 1046.50, 1318.51, // E5, G5, C6, E6
    ];

    chimeFrequencies.forEach((freq, idx) => {
      const chimeOsc = audioCtx!.createOscillator();
      const chimeGain = audioCtx!.createGain();
      const delay = idx * 0.12; // stagger the notes
      const noteTime = now + delay;

      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(freq, noteTime);
      // Slight pitch bend to sound premium/magical
      chimeOsc.frequency.exponentialRampToValueAtTime(freq * 1.005, noteTime + 1.2);

      chimeGain.gain.setValueAtTime(0, noteTime);
      chimeGain.gain.linearRampToValueAtTime(0.12, noteTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.8);

      // Lowpass filter for warmer sound
      const filter = audioCtx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, noteTime);

      chimeOsc.connect(filter);
      filter.connect(chimeGain);
      chimeGain.connect(mainVolumeNode!);

      chimeOsc.start(noteTime);
      chimeOsc.stop(noteTime + 2.0);
    });

    // --- 3. Sparkling Wind Chime Effect (High-pitched frequencies) ---
    for (let i = 0; i < 15; i++) {
      const sparkleOsc = audioCtx.createOscillator();
      const sparkleGain = audioCtx.createGain();
      const sparkleDelay = 0.5 + Math.random() * 2.0;
      const sparkleTime = now + sparkleDelay;
      const freq = 1500 + Math.random() * 2500;

      sparkleOsc.type = "sine";
      sparkleOsc.frequency.setValueAtTime(freq, sparkleTime);

      sparkleGain.gain.setValueAtTime(0, sparkleTime);
      sparkleGain.gain.linearRampToValueAtTime(0.03, sparkleTime + 0.02);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.4);

      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(mainVolumeNode);

      sparkleOsc.start(sparkleTime);
      sparkleOsc.stop(sparkleTime + 0.5);
    }
  };

  const startMusic = () => {
    init();
    if (!audioCtx || !mainVolumeNode) return;
    if (isPlaying) return;
    isPlaying = true;

    const chords = [
      [130.81, 261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9 (C3, C4, E4, G4, B4, D5)
      [174.61, 349.23, 440.00, 523.25, 659.25, 698.46], // Fmaj9 (F3, F4, A4, C5, E5, F5)
      [110.00, 220.00, 293.66, 329.63, 392.00, 493.88], // Am9 (A2, A3, D4, E4, G4, B4)
      [196.00, 392.00, 493.88, 587.33, 659.25, 783.99], // G6/9 (G3, G4, B4, D5, E5, G5)
    ];

    let chordIdx = 0;
    const playArpeggio = () => {
      if (!audioCtx || !mainVolumeNode || !isPlaying) return;
      const now = audioCtx.currentTime;
      const currentChord = chords[chordIdx];

      // Play soft bass pad (held root note)
      const padOsc = audioCtx.createOscillator();
      const padGain = audioCtx.createGain();
      padOsc.type = "triangle";
      padOsc.frequency.setValueAtTime(currentChord[0], now);
      
      padGain.gain.setValueAtTime(0, now);
      padGain.gain.linearRampToValueAtTime(0.08, now + 1.5);
      padGain.gain.setValueAtTime(0.08, now + 4.5);
      padGain.gain.exponentialRampToValueAtTime(0.001, now + 6.0);

      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now);

      padOsc.connect(filter);
      filter.connect(padGain);
      padGain.connect(mainVolumeNode);
      padOsc.start(now);
      padOsc.stop(now + 6.0);

      // Play elegant staggered arpeggio notes (like a slow harp or piano)
      currentChord.slice(1).forEach((freq, idx) => {
        const noteOsc = audioCtx!.createOscillator();
        const noteGain = audioCtx!.createGain();
        const delay = idx * 0.45; // Slow deliberate cascade
        const noteTime = now + delay;

        // Custom soft timbre combining sine with a hint of triangle
        noteOsc.type = "sine";
        noteOsc.frequency.setValueAtTime(freq, noteTime);

        noteGain.gain.setValueAtTime(0, noteTime);
        noteGain.gain.linearRampToValueAtTime(0.06, noteTime + 0.1); // soft attack
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 3.0); // long premium release

        // Feedback Delay Effect Simulation
        const delayNode = audioCtx!.createDelay();
        delayNode.delayTime.setValueAtTime(0.35, noteTime);
        const delayGain = audioCtx!.createGain();
        delayGain.gain.setValueAtTime(0.3, noteTime); // feedback volume

        // Lowpass for gentle ambient feeling
        const noteFilter = audioCtx!.createBiquadFilter();
        noteFilter.type = "lowpass";
        noteFilter.frequency.setValueAtTime(1200, noteTime);

        noteOsc.connect(noteFilter);
        noteFilter.connect(noteGain);
        noteGain.connect(mainVolumeNode!);

        // Wire delay circuit
        noteGain.connect(delayNode);
        delayNode.connect(delayGain);
        delayGain.connect(mainVolumeNode!);

        noteOsc.start(noteTime);
        noteOsc.stop(noteTime + 3.5);
      });

      chordIdx = (chordIdx + 1) % chords.length;
    };

    // Play immediately
    playArpeggio();
    // Play next chord every 6 seconds
    musicInterval = setInterval(playArpeggio, 6000);
  };

  const stopMusic = () => {
    isPlaying = false;
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  };

  const setVolume = (v: number) => {
    if (mainVolumeNode && audioCtx) {
      mainVolumeNode.gain.setValueAtTime(v, audioCtx.currentTime);
    }
  };

  return { playDoorOpen, startMusic, stopMusic, setVolume };
};

export const getAudioEngine = (): AudioEngine => {
  if (!audioEngineInstance) {
    audioEngineInstance = createAudioEngine();
  }
  return audioEngineInstance;
};

interface AudioPlayerProps {
  shouldStartMusic: boolean;
  onOpenSoundTrigger?: () => void;
}

export default function AudioPlayer({ shouldStartMusic, onOpenSoundTrigger }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const engineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    engineRef.current = getAudioEngine();
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      if (shouldStartMusic && !isMuted) {
        engineRef.current.startMusic();
      } else {
        engineRef.current.stopMusic();
      }
    }
  }, [shouldStartMusic, isMuted]);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (engineRef.current) {
      if (nextMute) {
        engineRef.current.stopMusic();
      } else {
        if (shouldStartMusic) {
          engineRef.current.startMusic();
        }
      }
    }
  };

  // Allow trigger from parent
  useEffect(() => {
    if (shouldStartMusic && onOpenSoundTrigger) {
      // Parent detected door opened, trigger door open sound effects
      if (!isMuted && engineRef.current) {
        engineRef.current.playDoorOpen();
      }
    }
  }, [shouldStartMusic, onOpenSoundTrigger]);

  return (
    <button
      id="mute_toggle_btn"
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-lg border border-gold-300 text-gold-600 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
      aria-label={isMuted ? "Unmute romantic music" : "Mute romantic music"}
      title={isMuted ? "Play Music" : "Mute Music"}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 animate-pulse" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </button>
  );
}
