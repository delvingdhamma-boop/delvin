import { useState } from "react";
import RoyalDoors from "./components/RoyalDoors";
import InvitationContent from "./components/InvitationContent";
import PetalsEffect from "./components/PetalsEffect";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [shouldStartMusic, setShouldStartMusic] = useState(false);
  const [triggerSoundPulse, setTriggerSoundPulse] = useState(false);
  const [language, setLanguage] = useState<"en" | "gu">("gu");

  const handleTriggerOpenSound = () => {
    // Trigger the procedural chiming and heavy rumble door creak SFX
    setTriggerSoundPulse(true);
    
    // Smoothly kick off the romantic ambient background music loop
    setShouldStartMusic(true);
  };

  const handleOpen = (lang: "en" | "gu") => {
    setLanguage(lang);
    setHasOpened(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f0f9ff] overflow-x-hidden">
      {/* Floating flower petals and glittering gold dust particles throughout the page */}
      <PetalsEffect />

      {/* Audio Engine controller with floating premium mute toggle button */}
      <AudioPlayer
        shouldStartMusic={shouldStartMusic}
        onOpenSoundTrigger={triggerSoundPulse ? () => {
          // Reset the trigger flag to prevent duplicate play triggers
          setTriggerSoundPulse(false);
        } : undefined}
      />

      {/* Cinematic 3D Royal Doors Entrance Stage */}
      {!hasOpened && (
        <RoyalDoors
          onOpen={handleOpen}
          onTriggerOpenSound={handleTriggerOpenSound}
        />
      )}

      {/* Complete Scrolling Invitation Website revealed after entering */}
      {hasOpened && (
        <div className="w-full min-h-screen animate-fade-in">
          <InvitationContent language={language} />
        </div>
      )}
    </div>
  );
}
