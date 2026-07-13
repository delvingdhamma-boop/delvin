import { Calendar, Clock, MapPin, Heart, Users, Sparkles, Music, Utensils } from "lucide-react";
import FadeUp from "./FadeUp";
import heroImage from "../assets/images/delvin_siddhi_reference_hero_1783780196159.jpg";
import footerImage from "../assets/images/footer_art_ds_perfect_1783782009912.jpg";

// ============================================================================
// INVITATION WEBSITE CONFIGURATIONS (English & Gujarati)
// ============================================================================
const INVITATION_CONFIG_EN = {
  couple: {
    bride: "Siddhi",
    groom: "Delvin",
    groomShort: "Delvin",
    brideShort: "Siddhi",
    title: "Delvin & Siddhi",
  },
  event: {
    title: "Our Engagement Celebration",
    message: "To the lovely couple\nWishing you both a beautiful journey filled with love, happiness, and endless memories. May your bond grow stronger with each passing day, and may your life together be filled with joy, laughter, and love.",
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
    hero: heroImage,
  },
  family: {
    groomParents: "Rameshbhai Dharamshibhai Ghoghari & Arunaben Rameshbhai Ghoghari",
    groomGrandparents: "Shree Dharamshibhai Veljibhai Ghoghari & Late. Panbaiben Dharmshibhai Ghoghari",
    groomExtended: "Brothers, Sisters & Near and Dear Ones",
    groomCompliments: "Pareshbhai Dharamshibhai Ghoghari\nAlpeshbhai Dharamshibhai Ghoghari",
    brideParents: "Dilipbhai Mohanbhai Kaklotar & Illaben Dilipbhai Kaklotar",
    brideGrandparents: "Late. Mohanbhai Pragjibhai Kaklotar & Parvatiben Mohanbhai Kaklotar",
    brideExtended: "Brothers, Sisters & Near and Dear Ones",
    brideCompliments: "Rameshbhai Mohanbhai Kaklotar\nPravinbhai Mohanbhai Kaklotar",
  },
  registryQuote: "To love and be loved is to feel the sun from both sides.",
  program: [
    {
      time: "6:00 PM",
      title: "Welcoming of Guests",
      desc: "Receiving families and guests with traditional warmth and music.",
      icon: "Users",
      venue: "The Grand Amber Ballroom"
    },
    {
      time: "6:30 PM",
      title: "Chandla Vidhi",
      desc: "The traditional auspicious ritual to bless the couple with custom shlokas.",
      icon: "Sparkles",
      venue: "The Grand Amber Ballroom"
    },
    {
      time: "7:00 PM",
      title: "The Ring Ceremony",
      desc: "The joyful exchange of rings symbolizing eternal love and commitment.",
      icon: "Heart",
      venue: "The Grand Amber Ballroom"
    },
    {
      time: "8:00 PM Onwards",
      title: "Dinner & Celebration",
      desc: "A premium banquet dinner followed by lively traditional music and dance.",
      icon: "Utensils",
      venue: "The Whispering Pines Garden"
    }
  ]
};

const INVITATION_CONFIG_GU = {
  couple: {
    bride: "સિદ્ધિ",
    groom: "ડેલ્વિન",
    groomShort: "ડેલ્વિન",
    brideShort: "સિદ્ધિ",
    title: "ડેલ્વિન અને સિદ્ધિ",
  },
  event: {
    title: "અમારો સગાઈ મહોત્સવ",
    message: "સ્નેહી દંપતીને\nતમારા બંનેની આ સુંદર સગાઈ સફર સ્નેહ, સુખ અને અવિસ્મરણીય સ્મૃતિઓથી ભરેલી રહે તેવી હાર્દિક શુભકામનાઓ. આપનો આ પવિત્ર સ્નેહ સંબંધ દિન-પ્રતિદિન વધુ ગાઢ બને અને આપનું સહજીવન હર્ષ, ઉલ્લાસ અને અનંત પ્રેમથી હર્યું-ભર્યું રહે.",
    dateString: "શુક્રવાર, ૧૪ ઓગસ્ટ ૨૦૨૬",
    timeString: "સાંજે ૬:૦૦ વાગ્યાથી",
    venue1Name: "ધી ગ્રાન્ડ અંબર બોલરૂમ",
    venue1Address: "રોયલ ઓર્કાર્ડ એસ્ટેટ, ૧૦૪૫ અંબર વુડ ડ્રાઇવ, બેવર્લી હિલ્સ, સીએ ૯૦૨૧૦",
    venue1GoogleMapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.2619472626895!2d-118.4239853!3d34.0883832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc0511855555%3A0x6e2c39a8beeb2e5f!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    venue1MapDirectionsUrl: "https://maps.google.com/?q=Beverly+Hills+CA+90210",
    venue2Name: "ધી વ્હીસ્પરિંગ પાઇન્સ ગાર્ડન",
    venue2Address: "પાઇનક્રેસ્ટ વેલી રિસોર્ટ, ૨૦૮૮ વ્હીસ્પરિંગ પાઇન્સ રોડ, માલિબુ, સીએ ૯૦૨૬૫",
    venue2GoogleMapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.626788533887!2d-118.7999812!3d34.0259218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82012c40c867b%3A0x1c8b3d6874a169b1!2sMalibu%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    venue2MapDirectionsUrl: "https://maps.google.com/?q=Malibu+CA",
  },
  images: {
    hero: heroImage,
  },
  family: {
    groomParents: "રમેશભાઈ ધરમશીભાઈ ઘોઘારી અને અરુણાબેન રમેશભાઈ ઘોઘારી",
    groomGrandparents: "શ્રી ધરમશીભાઈ વેલજીભાઈ ઘોઘારી અને સ્વ. પાનબાઈબેન ધરમશીભાઈ ઘોઘારી",
    groomExtended: "ભાઈઓ, બહેનો તથા સ્નેહીજનો",
    groomCompliments: "પરેશભાઈ ધરમશીભાઈ ઘોઘારી\nઅલ્પેશભાઈ ધરમશીભાઈ ઘોઘારી",
    brideParents: "દિલીપભાઈ મોહનભાઈ કાકલોતર અને ઇલાબેન દિલીપભાઈ કાકલોતર",
    brideGrandparents: "સ્વ. મોહનભાઈ પ્રાગજીભાઈ કાકલોતર અને પાર્વતીબેન મોહનભાઈ કાકલોતર",
    brideExtended: "ભાઈઓ, બહેનો તથા સ્નેહીજનો",
    brideCompliments: "રમેશભાઈ મોહનભાઈ કાકલોતર\nપ્રવીણભાઈ મોહનભાઈ કાકલોતર",
  },
  registryQuote: "પ્રેમ કરવો અને પ્રેમ મેળવવો એ બંને બાજુથી સૂર્યના કિરણોનો અહેસાસ કરવા જેવું છે.",
  program: [
    {
      time: "સાંજે ૬:૦૦ કલાકે",
      title: "અતિથિ સ્વાગત",
      desc: "શરણાઈના મંગલ સૂર અને પરંપરાગત આદર-સત્કાર સાથે મહેમાનોનું સ્વાગત.",
      icon: "Users",
      venue: "ધી ગ્રાન્ડ અંબર બોલરૂમ"
    },
    {
      time: "સાંજે ૬:૩૦ કલાકે",
      title: "ચાંદલા વિધિ",
      desc: "કુમકુમ તિલક અને મંત્રોચ્ચાર સાથે વર-કન્યાને વધાવવાની માંગલિક વિધિ.",
      icon: "Sparkles",
      venue: "ધી ગ્રાન્ડ અંબર બોલરૂમ"
    },
    {
      time: "સાંજે ૭:૦૦ કલાકે",
      title: "રિંગ સેરેમની",
      desc: "મુદ્રિકા આદાન-પ્રદાન કરી સગાઈના પવિત્ર બંધનની શરૂઆત.",
      icon: "Heart",
      venue: "ધી ગ્રાન્ડ અંબર બોલરૂમ"
    },
    {
      time: "રાત્રે ૮:૦૦ કલાકે",
      title: "પ્રીતિભોજન",
      desc: "સ્વાદિષ્ટ ભોજન સમારંભ અને પરંપરાગત સંગીત-નૃત્યની રમઝટ.",
      icon: "Utensils",
      venue: "ધી વ્હીસ્પરિંગ પાઇન્સ ગાર્ડન"
    }
  ]
};
const LABELS = {
  en: {
    engagementOf: "The Engagement of",
    scrollDown: "Scroll Down",
    withJoyfulHearts: "With Joyful Hearts",
    familyDetails: "Family Details",
    groom: "Groom",
    bride: "Bride",
    sonOf: "Son of",
    daughterOf: "Daughter of",
    lovingGrandparents: "Loving Grandparents",
    warmRegards: "Warm Regards",
    familyCircle: "'s Family Circle",
    bestCompliments: "With Best Compliments From",
    dearlyWelcomed: "Dearly Welcomed By",
    celebrationDetails: "Chandla Vidhi",
    eventProgram: "Ring Ceremony",
    theDate: "The Date",
    pleaseRSVP: "Please RSVP by August 1st, 2026",
    theTime: "The Time",
    cocktailsDinner: "Cocktails, Dinner & Dance to follow",
    ceremonyVenue: "Ceremony Venue",
    receptionVenue: "Reception Venue",
    directions: "Directions",
    journeyToUs: "The Journey To Us",
    interactiveVenue: "Interactive Venue Locations",
    ceremonyDirections: "Ceremony Directions",
    receptionDirections: "Reception Directions",
    valetParking: "Ample free valet parking is provided at both premium estate main entrances.",
    withWarmGratitude: "With Warm Gratitude",
    families: "Ghoghari & Kaklotar Families",
  },
  gu: {
    engagementOf: "ચાંદલા વિધિ",
    scrollDown: "નીચે જુઓ",
    withJoyfulHearts: "આનંદિત હૃદય સાથે",
    familyDetails: "પરિવાર વિગત",
    groom: "વર",
    bride: "કન્યા",
    sonOf: "સુપુત્ર",
    daughterOf: "સુપુત્રી",
    lovingGrandparents: "પૂજનીય દાદા-દાદી",
    warmRegards: "સ્નેહ વંદન",
    familyCircle: "નો સ્નેહી પરિવાર",
    bestCompliments: "લિ. શુભેચ્છક",
    dearlyWelcomed: "લિ. સ્નેહાધીન",
    celebrationDetails: "ચાંદલા વિધિ",
    eventProgram: "રિંગ સેરેમની",
    theDate: "તારીખ",
    pleaseRSVP: "કૃપા કરીને ૧ ઓગસ્ટ, ૨૦૨૬ સુધીમાં હાજરીની પુષ્ટિ કરો",
    theTime: "સમય",
    cocktailsDinner: "ભોજન સમારંભ અને સંગીત સંધ્યા",
    ceremonyVenue: "વિધિ સ્થળ",
    receptionVenue: "સ્વાગત સ્થળ",
    directions: "નકશો",
    journeyToUs: "અમારા સુધીનો પ્રવાસ",
    interactiveVenue: "સ્થળનું લાઈવ લોકેશન",
    ceremonyDirections: "વિધિ સ્થળ નકશો",
    receptionDirections: "સ્વાગત સ્થળ નકશો",
    valetParking: "બંને ભવ્ય પ્રવેશદ્વાર પર પાર્કિંગની ઉત્તમ વ્યવસ્થા રાખેલ છે.",
    withWarmGratitude: "સ્નેહ આભાર",
    families: "ઘોઘારી અને કાકલોતર પરિવાર",
  }
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Users": return <Users className="h-5 w-5" />;
    case "Sparkles": return <Sparkles className="h-5 w-5" />;
    case "Heart": return <Heart className="h-5 w-5" />;
    case "Utensils": return <Utensils className="h-5 w-5" />;
    case "Music": return <Music className="h-5 w-5" />;
    case "Clock": return <Clock className="h-5 w-5" />;
    default: return <Sparkles className="h-5 w-5" />;
  }
};

export default function InvitationContent({ language = "en" }: { language?: "en" | "gu" }) {
  const config = language === "gu" ? INVITATION_CONFIG_GU : INVITATION_CONFIG_EN;
  const labels = LABELS[language];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#bae6fd] text-sky-950 pb-12 selection:bg-gold-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-16 px-4 md:px-8 text-center overflow-hidden">
        {/* Subtle royal background ornament */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(212,181,102,0.18)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        <FadeUp delay={100} className="flex flex-col items-center max-w-4xl mx-auto -mt-10 sm:-mt-12 md:-mt-16">
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
            <p className="mt-2 text-[11px] md:text-xs font-serif italic text-gold-700 tracking-wide max-w-md mx-auto leading-relaxed">
              ॥ वक्रतुण्ड महाकाय सूर्य कोटि समप्रभ ।<br />
              निर्विघ्नं कुरु मे देव सर्व-कार्येषु सर्वदा ॥
            </p>
          </div>

          {/* Top ornamental ribbon */}
          <div className="mb-2 flex items-center gap-3 text-gold-500">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
            <Heart className="h-4 w-4 fill-current animate-pulse text-gold-500" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <h3 className={`mb-3 ${
            language === "gu" ? "font-sans tracking-wide text-lg md:text-2xl text-sky-900 font-bold" : "text-xs md:text-sm font-semibold text-sky-900 font-cinzel tracking-[0.35em] uppercase"
          }`}>
            {labels.engagementOf}
          </h3>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-sky-950 tracking-wide mb-4">
            <span className={`block gold-gradient-text font-semibold overflow-visible py-0.5 leading-tight ${
              language === "gu" ? "font-sans tracking-normal text-4xl sm:text-5xl md:text-6xl" : "font-cinzel tracking-wider"
            }`}>{config.couple.groom}</span>
            <span className="font-serif text-xl md:text-2xl italic text-gold-500 my-0.5 block">&amp;</span>
            <span className={`block gold-gradient-text font-semibold overflow-visible py-0.5 leading-tight ${
              language === "gu" ? "font-sans tracking-normal text-4xl sm:text-5xl md:text-6xl" : "font-cinzel tracking-wider"
            }`}>{config.couple.bride}</span>
          </h1>

          <p className={`text-xs md:text-sm text-sky-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] max-w-md mx-auto mb-8 font-semibold ${
            language === "gu" ? "font-sans tracking-normal" : "font-cinzel tracking-[0.3em] uppercase"
          }`}>
            {language === "gu" ? "૧૪ ઓગસ્ટ ૨૦૨૬" : "14 August 2026"}
          </p>

          {/* Hero Couple Photo within a Premium Double Gold-Border Arch Frame */}
          <div className="relative group max-w-[280px] sm:max-w-[340px] md:max-w-[380px] mx-auto mb-6 transition-transform duration-500 hover:scale-[1.02]">
            {/* Outer gold glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-400 to-gold-200 rounded-t-[190px] rounded-b-2xl blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-700" />
            
            {/* Double gold border frames */}
            <div className="relative border-[3px] border-gold-400 rounded-t-[180px] rounded-b-xl p-2 bg-white/40 shadow-[0_15px_45px_-10px_rgba(8,47,73,0.12)]">
              <div className="border border-gold-300 rounded-t-[172px] rounded-b-md overflow-hidden aspect-[3/4]">
                <img
                  src={config.images.hero}
                  alt={`${config.couple.groom} & ${config.couple.bride}`}
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
          <span className="font-sans text-[10px] tracking-widest uppercase">{labels.scrollDown}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2. INVITATION MESSAGE SECTION */}
      <section id="message" className="relative py-24 px-4 md:px-8 bg-sky-50/45">
        <div className="max-w-3xl mx-auto text-center relative z-10">

          <FadeUp>
            <h2 className="font-serif text-2xl md:text-3xl text-gold-600 italic tracking-wide mb-6">
              {labels.withJoyfulHearts}
            </h2>
            
            {/* Rich Glassmorphism Prose Card */}
            <div className="glass-card-light p-8 md:p-12 rounded-2xl gold-border relative overflow-hidden">
              <div className="absolute inset-0 bg-[#e0f2fe]/20 pointer-events-none" />
              <p className="font-serif text-lg md:text-xl text-sky-950 leading-relaxed italic md:px-4 whitespace-pre-line">
                "{config.event.message}"
              </p>
            </div>
          </FadeUp>

          {/* Family Details Sub-section */}
          <FadeUp delay={150}>
            <div className="mt-16">
              <div className="inline-flex items-center gap-2 text-gold-600 mb-3">
                <div className="w-8 h-[1px] bg-gold-400" />
                <Users className="h-4 w-4" />
                <div className="w-8 h-[1px] bg-gold-400" />
              </div>
              <h3 className={`text-xs md:text-sm text-gold-600 font-semibold mb-8 ${
                language === "gu" ? "font-sans tracking-normal" : "font-cinzel tracking-[0.25em] uppercase"
              }`}>
                {labels.familyDetails}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-center">
                {/* Groom's Family Side */}
                <div className="glass-card-light p-6 rounded-xl gold-border relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-sky-500/5 pointer-events-none" />
                  <div className="relative z-10">
                    <span className={`text-[9px] text-sky-900/70 block mb-1 ${
                      language === "gu" ? "font-sans tracking-normal" : "font-cinzel tracking-widest uppercase"
                    }`}>
                      {labels.groom}
                    </span>
                    <h4 className={`text-xl text-gold-600 font-semibold mb-5 ${
                      language === "gu" ? "font-sans tracking-normal py-1" : "font-cinzel tracking-wide"
                    }`}>
                      {config.couple.groom}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.sonOf}
                        </p>
                        <p className="font-serif text-sm md:text-base text-sky-950 font-bold">
                          {config.family.groomParents}
                        </p>
                      </div>
                      
                      <div className="w-12 h-[1px] bg-gold-300/60 mx-auto my-2" />
                      
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.lovingGrandparents}
                        </p>
                        <p className="font-serif text-xs md:text-sm text-sky-950 italic">
                          {config.family.groomGrandparents}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groom's Side Compliments and Extended Family */}
                <div className="glass-card-light p-6 rounded-xl gold-border relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-sky-500/5 pointer-events-none" />
                  <div className="relative z-10">
                    <span className={`text-[9px] text-sky-900/70 block mb-1 ${
                      language === "gu" ? "font-sans tracking-normal" : "font-cinzel tracking-widest uppercase"
                    }`}>
                      {labels.warmRegards}
                    </span>
                    <h4 className={`text-base text-gold-600 font-semibold mb-5 ${
                      language === "gu" ? "font-sans tracking-normal py-1" : "font-serif italic"
                    }`}>
                      {config.couple.groom}{labels.familyCircle}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.bestCompliments}
                        </p>
                        <p className="font-serif text-sm md:text-base text-sky-950 font-bold whitespace-pre-line">
                          {config.family.groomCompliments}
                        </p>
                      </div>
                      
                      <div className="w-12 h-[1px] bg-gold-300/60 mx-auto my-2" />
                      
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.dearlyWelcomed}
                        </p>
                        <p className="font-serif text-xs md:text-sm text-sky-950 italic">
                          {config.family.groomExtended}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bride's Family Side */}
                <div className="glass-card-light p-6 rounded-xl gold-border relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-sky-500/5 pointer-events-none" />
                  <div className="relative z-10">
                    <span className={`text-[9px] text-sky-900/70 block mb-1 ${
                      language === "gu" ? "font-sans tracking-normal" : "font-cinzel tracking-widest uppercase"
                    }`}>
                      {labels.bride}
                    </span>
                    <h4 className={`text-xl text-gold-600 font-semibold mb-5 ${
                      language === "gu" ? "font-sans tracking-normal py-1" : "font-cinzel tracking-wide"
                    }`}>
                      {config.couple.bride}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.daughterOf}
                        </p>
                        <p className="font-serif text-sm md:text-base text-sky-950 font-bold">
                          {config.family.brideParents}
                        </p>
                      </div>
                      
                      <div className="w-12 h-[1px] bg-gold-300/60 mx-auto my-2" />
                      
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.lovingGrandparents}
                        </p>
                        <p className="font-serif text-xs md:text-sm text-sky-950 italic">
                          {config.family.brideGrandparents}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bride's Side Compliments and Extended Family */}
                <div className="glass-card-light p-6 rounded-xl gold-border relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-sky-500/5 pointer-events-none" />
                  <div className="relative z-10">
                    <span className={`text-[9px] text-sky-900/70 block mb-1 ${
                      language === "gu" ? "font-sans tracking-normal" : "font-cinzel tracking-widest uppercase"
                    }`}>
                      {labels.warmRegards}
                    </span>
                    <h4 className={`text-base text-gold-600 font-semibold mb-5 ${
                      language === "gu" ? "font-sans tracking-normal py-1" : "font-serif italic"
                    }`}>
                      {config.couple.bride}{labels.familyCircle}
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.bestCompliments}
                        </p>
                        <p className="font-serif text-sm md:text-base text-sky-950 font-bold whitespace-pre-line">
                          {config.family.brideCompliments}
                        </p>
                      </div>
                      
                      <div className="w-12 h-[1px] bg-gold-300/60 mx-auto my-2" />
                      
                      <div>
                        <p className={`text-[9px] text-sky-950/60 font-medium mb-1 ${
                          language === "gu" ? "font-sans tracking-normal" : "font-sans tracking-widest uppercase"
                        }`}>
                          {labels.dearlyWelcomed}
                        </p>
                        <p className="font-serif text-xs md:text-sm text-sky-950 italic">
                          {config.family.brideExtended}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. EVENT DETAILS SECTION - CHANDLA VIDHI */}
      <section id="details" className="relative py-20 px-4 md:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <FadeUp>
              <h3 className="font-serif text-3xl md:text-4xl text-sky-950 font-light tracking-wide">
                {labels.celebrationDetails}
              </h3>
              <div className="mt-3 w-12 h-[2px] bg-gold-400 mx-auto" />
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Date & Time Card */}
            <FadeUp delay={100} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center w-full">
                  <div className="flex gap-2 mb-4">
                    <div className="h-11 w-11 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="h-11 w-11 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    {labels.theDate} & {labels.theTime}
                  </h4>
                  <p className="font-serif text-base font-semibold text-sky-950 mb-1">
                    {config.event.dateString}
                  </p>
                  <div className="w-8 h-[1px] bg-gold-300/60 my-2" />
                  <p className="font-serif text-base font-semibold text-sky-950">
                    {language === "gu" ? "સાંજે ૬:૩૦ કલાકે" : "6:30 PM"}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Ceremony Venue Card */}
            <FadeUp delay={200} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center w-full">
                  <div className="mb-4 h-12 w-12 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    {labels.ceremonyVenue}
                  </h4>
                  <p className="font-serif text-sm font-semibold text-sky-950 mb-1">
                    {config.event.venue1Name}
                  </p>
                  <p className="font-sans text-[11px] text-sky-900 leading-relaxed px-2">
                    {config.event.venue1Address}
                  </p>
                </div>
                <a
                  href={config.event.venue1MapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 border border-gold-400 rounded-full text-[10px] font-cinzel text-gold-600 bg-white hover:bg-gold-500 hover:text-white transition-colors duration-300 tracking-wider uppercase shadow-sm"
                >
                  {labels.directions}
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4.5 EVENT DETAILS SECTION - RING CEREMONY */}
      <section id="ring-ceremony-details" className="relative py-20 px-4 md:px-8 bg-sky-50/25">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <FadeUp>
              <h3 className="font-serif text-3xl md:text-4xl text-sky-950 font-light tracking-wide">
                {labels.eventProgram}
              </h3>
              <div className="mt-3 w-12 h-[2px] bg-gold-400 mx-auto" />
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Date & Time Card */}
            <FadeUp delay={100} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center w-full">
                  <div className="flex gap-2 mb-4">
                    <div className="h-11 w-11 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="h-11 w-11 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    {labels.theDate} & {labels.theTime}
                  </h4>
                  <p className="font-serif text-base font-semibold text-sky-950 mb-1">
                    {config.event.dateString}
                  </p>
                  <div className="w-8 h-[1px] bg-gold-300/60 my-2" />
                  <p className="font-serif text-base font-semibold text-sky-950">
                    {language === "gu" ? "સાંજે ૭:૦૦ કલાકે" : "7:00 PM Onwards"}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Ceremony Venue Card */}
            <FadeUp delay={200} className="h-full">
              <div className="glass-card-light p-6 rounded-2xl text-center flex flex-col justify-between items-center h-full relative border border-gold-300 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-1 border border-gold-200/30 rounded-xl pointer-events-none" />
                <div className="flex flex-col items-center w-full">
                  <div className="mb-4 h-12 w-12 rounded-full bg-sky-100/75 flex items-center justify-center text-gold-600 border border-gold-400/30">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h4 className="font-cinzel text-xs tracking-widest text-gold-500 uppercase mb-3">
                    {labels.ceremonyVenue}
                  </h4>
                  <p className="font-serif text-sm font-semibold text-sky-950 mb-1">
                    {config.event.venue1Name}
                  </p>
                  <p className="font-sans text-[11px] text-sky-900 leading-relaxed px-2">
                    {config.event.venue1Address}
                  </p>
                </div>
                <a
                  href={config.event.venue1MapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 border border-gold-400 rounded-full text-[10px] font-cinzel text-gold-600 bg-white hover:bg-gold-500 hover:text-white transition-colors duration-300 tracking-wider uppercase shadow-sm"
                >
                  {labels.directions}
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>



      {/* 8. FOOTER SECTION */}
      <footer className="relative pt-12 pb-16 px-4 md:px-8 text-center border-t border-gold-400/20 bg-sky-50/30 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[radial-gradient(circle_at_bottom,rgba(212,181,102,0.1)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />

        <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
          
          <FadeUp>
            {/* Elegant Art Frame */}
            <div className="relative group mx-auto mb-8 max-w-[340px]">
              {/* Outer Golden Glow & Border */}
              <div className="absolute -inset-2 bg-gradient-to-r from-gold-400 to-gold-200 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-700" />
              
              {/* Double Gold Border Frame */}
              <div className="relative border-[3px] border-gold-400 rounded-2xl p-2 bg-white shadow-[0_15px_45px_-10px_rgba(8,47,73,0.15)]">
                <div className="border border-gold-300 rounded-xl overflow-hidden aspect-[2/3]">
                  <img
                    src={footerImage}
                    alt="Wedding Monogram D & S"
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              {/* Corner Embellishments */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-gold-400 rounded-bl-md opacity-80" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold-400 rounded-br-md opacity-80" />
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold-400 rounded-tl-md opacity-80" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-gold-400 rounded-tr-md opacity-80" />
            </div>

            <div className="text-gold-500 mb-3 flex justify-center">
              <Heart className="h-5 w-5 fill-current animate-pulse" />
            </div>

            <p className={`text-xs text-sky-950 font-medium mb-2 ${
              language === "gu" ? "font-sans tracking-normal text-sm" : "font-cinzel tracking-[0.3em] uppercase"
            }`}>
              {config.couple.title}
            </p>

            <div className="mt-4 pt-4 border-t border-gold-400/20 w-48 mx-auto">
              <p className="font-sans text-[8px] tracking-[0.25em] text-sky-900/50 uppercase mb-1">
                {labels.withWarmGratitude}
              </p>
              <p className="font-serif text-xs md:text-sm text-sky-950 font-bold tracking-wide">
                {labels.families}
              </p>
            </div>
          </FadeUp>
          
        </div>
      </footer>

    </div>
  );
}
