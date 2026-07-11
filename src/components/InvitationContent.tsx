import { Calendar, Clock, MapPin, Heart } from "lucide-react";
import FadeUp from "./FadeUp";

// ============================================================================
// INVITATION WEBSITE CONFIGURATION
// Easily edit all text, dates, venues, maps, and images below.
// ============================================================================
const INVITATION_CONFIG = {
  couple: {
    bride: "Siddhi",
    groom: "Delvin",
    groomShort: "Delvin",
    brideShort: "Siddhi",
    title: "Delvin & Siddhi",
  },
  event: {
    title: "Our Engagement Celebration",
    message: "Two hearts, one journey. Because you have shared in our lives with your warm support and friendship, we are overjoyed to invite you to celebrate our engagement. Join us for an enchanting evening of love, laughter, and champagne as we take our next steps toward forever. This content can be easily replaced or customized in our invitation configuration.",
    dateString: "Friday, August 14, 2026",
    timeString: "6:00 PM Onwards",
    venue1Name: "The Grand Amber Ballroom",
    venue1Address: "Royal Orchard Estate, 1045 Amber Wood Dr, Beverly Hills, CA 90210",
    venue1GoogleMapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.2619472626895!2d-118.4239853!3d34.0883832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc0511855555%3A0x6e2c39a8beeb2e5f!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    venue1MapDirectionsUrl: "https://maps.google.com/?q=Beverly+Hills+CA+90210",
    venue2Name: "The Whispering Pines Garden",
    venue2Address: "Pinecrest Valley Resort, 2088 Whispering Pines Rd, Malibu, CA 90265",
    venue2GoogleMapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.626788533887!2d-118.7999812!3d34.0259218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82012c40c867b%3A0x1c8b3d6874a169b1!2sMalibu%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    venue2MapDirectionsUrl: "https://maps.google.com/?q=Malibu+CA",
  },
  images: {
    hero: "/src/assets/images/delvin_siddhi_embrace_hero_1783693743436.jpg",
  },
  registryQuote: "To love and be loved is to feel the sun from both sides."
};

export default function InvitationContent() {

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#bae6fd] text-sky-950 pb-12 selection:bg-gold-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 text-center overflow-hidden">
        {/* Subtle royal background ornament */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(212,181,102,0.18)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        <FadeUp delay={100} className="flex flex-col items-center max-w-4xl mx-auto">
          {/* Gujarati Shree Ganeshay Namah */}
          <div className="mb-6 flex flex-col items-center gap-1.5 text-gold-600">
            <svg className="w-8 h-8 text-gold-600 filter drop-shadow-[0_0_4px_rgba(212,181,102,0.3)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Crown (Mukut) */}
              <path d="M42 15 L50 7 L58 15 L50 22 Z" />
              <path d="M46 15 L50 11 L54 15" />
              {/* Head and Tilak */}
              <path d="M50 22 C44 24, 44 28, 50 30 C56 28, 56 24, 50 22 Z" fill="currentColor" opacity="0.15" />
              <path d="M50 24 L50 28" strokeWidth="3" stroke="currentColor" />
              {/* Ears */}
              <path d="M38 30 C22 30, 26 50, 38 48" />
              <path d="M62 30 C78 30, 74 50, 62 48" />
              {/* Eyes */}
              <path d="M43 36 C45 35, 47 36, 48 38" />
              <path d="M57 36 C55 35, 53 36, 52 38" />
              {/* Face and Trunk */}
              <path d="M50 30 C42 35, 43 45, 45 52 C47 58, 41 68, 34 65 C28 62, 33 55, 36 55" />
              {/* Modak */}
              <circle cx="34" cy="55" r="2.5" fill="currentColor" />
            </svg>
            <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-gold-600">
              શ્રી ગણેશાય નમઃ
            </span>
          </div>

          {/* Top ornamental ribbon */}
          <div className="mb-4 flex items-center gap-3 text-gold-500">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
            <Heart className="h-4 w-4 fill-current animate-pulse text-gold-500" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <h3 className="font-cinzel text-xs md:text-sm tracking-[0.35em] text-gold-600 font-semibold uppercase mb-6">
            The Engagement of
          </h3>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-sky-950 tracking-wide mb-6">
            <span className="block gold-gradient-text font-cinzel font-semibold tracking-wider">{INVITATION_CONFIG.couple.groom}</span>
            <span className="font-serif text-2xl md:text-3xl italic text-gold-500 my-2 block">&amp;</span>
            <span className="block gold-gradient-text font-cinzel font-semibold tracking-wider">{INVITATION_CONFIG.couple.bride}</span>
          </h1>

          <p className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-sky-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] uppercase max-w-md mx-auto mb-12 font-semibold">
            14 August 2026
          </p>

          {/* Hero Couple Photo within a Premium Double Gold-Border Arch Frame */}
          <div className="relative group max-w-[280px] sm:max-w-[340px] md:max-w-[380px] mx-auto mb-6 transition-transform duration-500 hover:scale-[1.02]">
            {/* Outer gold glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-400 to-gold-200 rounded-t-[190px] rounded-b-2xl blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-700" />
            
            {/* Double gold border frames */}
            <div className="relative border-[3px] border-gold-400 rounded-t-[180px] rounded-b-xl p-2 bg-white/40 shadow-[0_15px_45px_-10px_rgba(8,47,73,0.12)]">
              <div className="border border-gold-300 rounded-t-[172px] rounded-b-md overflow-hidden aspect-[3/4]">
                <img
                  src={INVITATION_CONFIG.images.hero}
                  alt="Delvin &amp; Siddhi"
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Filigree corner embellishments inside CSS */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-gold-400 rounded-bl-lg opacity-80" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold-400 rounded-br-lg opacity-80" />
          </div>
        </FadeUp>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gold-600 animate-bounce cursor-pointer opacity-70 hover:opacity-100">
          <span className="font-sans text-[10px] tracking-widest uppercase">Scroll Down</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2. INVITATION MESSAGE SECTION */}
      <section id="message" className="relative py-24 px-4 md:px-8 bg-sky-50/45">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          
          {/* Section Divider Icon */}
          <div className="flex justify-center mb-8">
            <svg className="w-12 h-12 text-gold-500/80" viewBox="0 0 100 100">
              <path d="M50 15 C 60 35, 90 40, 50 85 C 10 40, 40 35, 50 15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="45" r="4" fill="currentColor" />
            </svg>
          </div>

          <FadeUp>
            <h2 className="font-serif text-2xl md:text-3xl text-gold-600 italic tracking-wide mb-6">
              With Joyful Hearts
            </h2>
            
            {/* Rich Glassmorphism Prose Card */}
            <div className="glass-card-light p-8 md:p-12 rounded-2xl gold-border relative overflow-hidden">
              <div className="absolute inset-0 bg-[#e0f2fe]/20 pointer-events-none" />
              <p className="font-serif text-lg md:text-xl text-sky-950 leading-relaxed italic md:px-4">
                "{INVITATION_CONFIG.event.message}"
              </p>
            </div>

            {/* Signature names in exquisite typography */}
            <div className="mt-10">
              <p className="font-cinzel text-xl tracking-wider text-sky-900 font-medium">
                {INVITATION_CONFIG.couple.groomShort} &amp; {INVITATION_CONFIG.couple.brideShort}
              </p>
              <div className="mt-3 w-16 h-[1px] bg-gold-500 mx-auto" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. EVENT DETAILS SECTION */}
      <section id="details" className="relative py-24 px-4 md:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-gold-600 uppercase mb-3">
                Where &amp; When
              </h2>
              <h3 className="font-serif text-3xl md:text-4xl text-sky-950 font-light tracking-wide">
                Celebration Details
              </h3>
              <div className="mt-3 w-12 h-[2px] bg-gold-400 mx-auto" />
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Date Card */}
            <FadeUp delay={100} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    The Date
                  </h4>
                  <p className="font-serif text-base font-semibold text-sky-950 mb-2">
                    {INVITATION_CONFIG.event.dateString}
                  </p>
                </div>
                <p className="text-sky-900/80 text-[11px] mt-4 font-sans font-medium">
                  Please RSVP by August 1st, 2026
                </p>
              </div>
            </FadeUp>

            {/* Time Card */}
            <FadeUp delay={200} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    The Time
                  </h4>
                  <p className="font-serif text-base font-semibold text-sky-950 mb-2">
                    {INVITATION_CONFIG.event.timeString}
                  </p>
                </div>
                <p className="text-sky-900/80 text-[11px] mt-4 font-sans font-medium">
                  Cocktails, Dinner &amp; Dance to follow
                </p>
              </div>
            </FadeUp>

            {/* Ceremony Venue Card */}
            <FadeUp delay={300} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    Ceremony Venue
                  </h4>
                  <p className="font-serif text-sm font-semibold text-sky-950 mb-1">
                    {INVITATION_CONFIG.event.venue1Name}
                  </p>
                  <p className="font-sans text-[11px] text-sky-900 leading-relaxed px-2">
                    {INVITATION_CONFIG.event.venue1Address}
                  </p>
                </div>
                <a
                  href={INVITATION_CONFIG.event.venue1MapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 border border-gold-400 rounded-full text-[10px] font-cinzel text-gold-600 bg-white hover:bg-gold-500 hover:text-white transition-colors duration-300 tracking-wider uppercase shadow-sm"
                >
                  Directions
                </a>
              </div>
            </FadeUp>

            {/* Reception Venue Card */}
            <FadeUp delay={400} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-12 w-12 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    Reception Venue
                  </h4>
                  <p className="font-serif text-sm font-semibold text-sky-950 mb-1">
                    {INVITATION_CONFIG.event.venue2Name}
                  </p>
                  <p className="font-sans text-[11px] text-sky-900 leading-relaxed px-2">
                    {INVITATION_CONFIG.event.venue2Address}
                  </p>
                </div>
                <a
                  href={INVITATION_CONFIG.event.venue2MapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 border border-gold-400 rounded-full text-[10px] font-cinzel text-gold-600 bg-white hover:bg-gold-500 hover:text-white transition-colors duration-300 tracking-wider uppercase shadow-sm"
                >
                  Directions
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 6. GOOGLE MAP SECTION */}
      <section id="map" className="relative py-24 px-4 md:px-8 bg-sky-50/50">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <FadeUp>
              <h2 className="font-cinzel text-xs md:text-sm tracking-[0.3em] text-gold-600 uppercase mb-3">
                The Journey To Us
              </h2>
              <h3 className="font-serif text-3xl md:text-4xl text-sky-950 font-light tracking-wide">
                Interactive Venue Locations
              </h3>
              <div className="mt-3 w-12 h-[2px] bg-gold-400 mx-auto" />
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp delay={100}>
              <div className="text-center mb-6">
                <h4 className="font-cinzel text-xs tracking-widest text-gold-600 uppercase mb-2">
                  Ceremony Venue
                </h4>
                <p className="font-serif text-xl font-semibold text-sky-950 mb-1">
                  {INVITATION_CONFIG.event.venue1Name}
                </p>
                <p className="font-sans text-xs text-sky-900 max-w-sm mx-auto">
                  {INVITATION_CONFIG.event.venue1Address}
                </p>
              </div>
              {/* Elegant Map Container with Gold Border */}
              <div className="relative border-[4px] border-double border-gold-400 rounded-2xl bg-white/80 p-2 shadow-xl mb-6">
                <div className="w-full h-[280px] rounded-xl overflow-hidden shadow-inner">
                  <iframe
                    title="Ceremony Venue Location Map"
                    src={INVITATION_CONFIG.event.venue1GoogleMapIframeSrc}
                    className="w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="text-center">
                <a
                  href={INVITATION_CONFIG.event.venue1MapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 border border-gold-400 rounded-full text-xs font-cinzel text-gold-600 bg-white hover:bg-gold-500 hover:text-white transition-colors duration-300 tracking-wider uppercase shadow-sm"
                >
                  Ceremony Directions
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="text-center mb-6">
                <h4 className="font-cinzel text-xs tracking-widest text-gold-600 uppercase mb-2">
                  Reception Venue
                </h4>
                <p className="font-serif text-xl font-semibold text-sky-950 mb-1">
                  {INVITATION_CONFIG.event.venue2Name}
                </p>
                <p className="font-sans text-xs text-sky-900 max-w-sm mx-auto">
                  {INVITATION_CONFIG.event.venue2Address}
                </p>
              </div>
              {/* Elegant Map Container with Gold Border */}
              <div className="relative border-[4px] border-double border-gold-400 rounded-2xl bg-white/80 p-2 shadow-xl mb-6">
                <div className="w-full h-[280px] rounded-xl overflow-hidden shadow-inner">
                  <iframe
                    title="Reception Venue Location Map"
                    src={INVITATION_CONFIG.event.venue2GoogleMapIframeSrc}
                    className="w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="text-center">
                <a
                  href={INVITATION_CONFIG.event.venue2MapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 border border-gold-400 rounded-full text-xs font-cinzel text-gold-600 bg-white hover:bg-gold-500 hover:text-white transition-colors duration-300 tracking-wider uppercase shadow-sm"
                >
                  Reception Directions
                </a>
              </div>
            </FadeUp>
          </div>
          
          <div className="text-center mt-12">
            <p className="font-serif text-xs italic text-sky-900">
              Ample free valet parking is provided at both premium estate main entrances.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer className="relative pt-16 pb-12 px-4 md:px-8 text-center border-t border-gold-400/20 bg-[#bae6fd]/35 overflow-hidden">
        {/* Subtle decorative vector bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(212,181,102,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          
          <div className="text-gold-500">
            <Heart className="h-6 w-6 fill-current animate-pulse" />
          </div>

          <p className="font-serif text-lg md:text-xl italic text-sky-950 max-w-md mx-auto mb-6">
            "{INVITATION_CONFIG.registryQuote}"
          </p>

          <h4 className="font-cinzel text-sm tracking-[0.3em] text-sky-950 font-medium uppercase mb-4">
            {INVITATION_CONFIG.couple.title}
          </h4>

          <p className="font-sans text-[10px] tracking-widest text-sky-900/80 uppercase">
            Designed for eternity • August 14, 2026
          </p>
          
        </div>
      </footer>

    </div>
  );
}
