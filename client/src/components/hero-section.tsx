import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from '../Files/Vamshi_SFDC.pdf';
import FlightBirds from "./flight-birds";

interface TimeConfig {
  skyGradient: string;
  mountainBackStart: string;
  mountainBackEnd: string;
  mountainMidStart: string;
  mountainMidEnd: string;
  mountainFrontStart: string;
  mountainFrontEnd: string;
  sunStyle: string;
  isDarkText: boolean;
  starsOpacity: number;
  cloudsOpacity: number;
  label: string;
}

function getTimeConfig(hour: number): TimeConfig {
  if (hour >= 6 && hour < 11) {
    // Morning (6 AM - 11 AM)
    return {
      skyGradient: "from-sky-300 via-amber-100 to-orange-100",
      mountainBackStart: "#7C95A9",
      mountainBackEnd: "#BAC9D6",
      mountainMidStart: "#648197",
      mountainMidEnd: "#94AAB9",
      mountainFrontStart: "#4F6D82",
      mountainFrontEnd: "#6E889A",
      sunStyle: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_50px_rgba(245,158,11,0.5)] border border-orange-300",
      isDarkText: true,
      starsOpacity: 0,
      cloudsOpacity: 0.3,
      label: "Morning"
    };
  } else if (hour >= 11 && hour < 17) {
    // Midday (11 AM - 5 PM)
    return {
      skyGradient: "from-sky-400 via-sky-200 to-blue-200",
      mountainBackStart: "#6F8FA8",
      mountainBackEnd: "#9FB5C7",
      mountainMidStart: "#527490",
      mountainMidEnd: "#7E9AB2",
      mountainFrontStart: "#3A607D",
      mountainFrontEnd: "#5E7E98",
      sunStyle: "bg-gradient-to-br from-yellow-300 to-amber-400 shadow-[0_0_60px_rgba(253,224,71,0.7)] border border-yellow-200",
      isDarkText: true,
      starsOpacity: 0,
      cloudsOpacity: 0.4,
      label: "Midday"
    };
  } else if (hour >= 17 && hour < 20) {
    // Evening / Sunset (5 PM - 8 PM)
    return {
      skyGradient: "from-indigo-950 via-pink-700 to-orange-500",
      mountainBackStart: "#4A306D",
      mountainBackEnd: "#75559E",
      mountainMidStart: "#341C52",
      mountainMidEnd: "#54367A",
      mountainFrontStart: "#26143F",
      mountainFrontEnd: "#3E2361",
      sunStyle: "bg-gradient-to-br from-orange-400 to-red-600 shadow-[0_0_50px_rgba(239,68,68,0.5)] border border-orange-400",
      isDarkText: false,
      starsOpacity: 0.25,
      cloudsOpacity: 0.2,
      label: "Evening"
    };
  } else {
    // Night (8 PM - 6 AM)
    return {
      skyGradient: "from-slate-950 via-slate-900 to-indigo-950",
      mountainBackStart: "#1B2244",
      mountainBackEnd: "#2B3566",
      mountainMidStart: "#121731",
      mountainMidEnd: "#1F274F",
      mountainFrontStart: "#0A0D20",
      mountainFrontEnd: "#121836",
      sunStyle: "bg-gradient-to-br from-slate-100 to-slate-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-slate-200",
      isDarkText: false,
      starsOpacity: 0.85,
      cloudsOpacity: 0.1,
      label: "Night"
    };
  }
}

export default function HeroSection() {
  const hour = new Date().getHours();

  // Support manual hour override via URL parameters for testing (e.g. ?hour=12)
  let currentHour = hour;
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const hOverride = params.get("hour");
    if (hOverride !== null) {
      const parsed = parseInt(hOverride, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
        currentHour = parsed;
      }
    }
  }

  const theme = getTimeConfig(currentHour);

  // Determine if it is daytime or nighttime for celestial bodies
  const isDay = currentHour >= 6 && currentHour < 18;

  // Calculate relative left-to-right percentage (t goes 0 -> 1 over 12 hours)
  const t = isDay
    ? (currentHour - 6) / 12
    : (currentHour >= 18 ? (currentHour - 18) / 12 : (currentHour + 6) / 12);

  const celestialX = t * 100;
  const celestialY = Math.sin(t * Math.PI) * 50 + 8; // Parabolic trajectory peak at 58% height

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-28 bg-gradient-to-b ${theme.skyGradient} transition-all duration-1000`}
    >
      {/* ── Layer 1: Stars & Comets (Evening / Night Only) ── */}
      {theme.starsOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 z-0"
          style={{ opacity: theme.starsOpacity }}
        >
          {/* Twinkling Stars */}
          <div className="absolute top-[8%] left-[12%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.2s', animationDuration: '2.5s' }} />
          <div className="absolute top-[18%] left-[40%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }} />
          <div className="absolute top-[10%] left-[72%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
          <div className="absolute top-[28%] left-[22%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '2.1s', animationDuration: '4s' }} />
          <div className="absolute top-[24%] left-[58%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }} />
          <div className="absolute top-[32%] left-[82%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.2s', animationDuration: '3.2s' }} />
          <div className="absolute top-[14%] left-[88%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '2.7s', animationDuration: '2.2s' }} />
          <div className="absolute top-[30%] left-[6%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.9s', animationDuration: '3.8s' }} />
          <div className="absolute top-[5%] left-[30%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.3s', animationDuration: '2.6s' }} />
          <div className="absolute top-[20%] left-[68%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.7s', animationDuration: '3.1s' }} />

          {/* Shooting Stars / Comets (Trigger on different cycles and locations) */}
          <div className="absolute top-[10%] left-[65%] w-[80px] h-[1px] bg-gradient-to-r from-white to-transparent opacity-0 animate-shooting-star" style={{ animationDelay: '2s', transformOrigin: 'right center' }} />
          <div className="absolute top-[22%] left-[80%] w-[100px] h-[1px] bg-gradient-to-r from-white to-transparent opacity-0 animate-shooting-star" style={{ animationDelay: '6s', transformOrigin: 'right center' }} />
          <div className="absolute top-[15%] left-[50%] w-[90px] h-[1.5px] bg-gradient-to-r from-white to-transparent opacity-0 animate-shooting-star" style={{ animationDelay: '11s', transformOrigin: 'right center' }} />
        </div>
      )}

      {/* ── Layer 1: High-Altitude Airplane (Day & Night) ── */}
      <div className="absolute top-0 left-0 animate-plane pointer-events-none z-0" style={{ animationDelay: '8s' }}>
        <div className="relative flex items-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-700/10 dark:text-slate-100/10 fill-current -rotate-90">
            <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
          </svg>
          <div className="absolute top-[8px] left-[8px] w-1 h-1 bg-red-500 rounded-full animate-blink-red" />
        </div>
      </div>

      {/* ── Layer 1: Flying Birds (Day Only) ── */}
      <FlightBirds theme={theme} isDay={isDay} />

      {/* ── Layer 1: Floating Clouds ── */}
      {theme.cloudsOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 z-0"
          style={{ opacity: theme.cloudsOpacity }}
        >
          {/* Cloud 1 */}
          <div className="absolute top-[14%] left-0 animate-cloud-slow">
            <svg width="120" height="70" viewBox="0 0 120 70" fill="white" className="opacity-45">
              <path d="M20 50 C20 40, 35 35, 45 40 C50 30, 70 30, 75 38 C85 32, 100 38, 100 48 C105 48, 115 55, 110 62 C105 68, 15 68, 10 60 C8 55, 15 50, 20 50 Z" />
            </svg>
          </div>
          {/* Cloud 2 */}
          <div className="absolute top-[26%] left-0 animate-cloud-medium" style={{ animationDelay: '-20s' }}>
            <svg width="150" height="80" viewBox="0 0 150 80" fill="white" className="opacity-35">
              <path d="M30 60 C30 50, 45 45, 55 50 C60 40, 85 40, 90 50 C100 42, 120 48, 120 60 C128 60, 138 68, 132 75 C125 82, 25 82, 18 75 C15 70, 25 60, 30 60 Z" />
            </svg>
          </div>
          {/* Cloud 3 */}
          <div className="absolute top-[6%] left-0 animate-cloud-fast" style={{ animationDelay: '-10s' }}>
            <svg width="90" height="50" viewBox="0 0 90 50" fill="white" className="opacity-30">
              <path d="M15 35 C15 28, 25 25, 32 28 C35 22, 50 22, 53 28 C60 22, 72 26, 72 35 C78 35, 85 40, 82 45 C78 50, 12 50, 8 45 C6 41, 12 35, 15 35 Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Subtle dot grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── Layer 2: Celestial Body (Sun / Waxing Crescent Moon) ── */}
      <div
        className="absolute w-20 h-20 sm:w-28 sm:h-28 pointer-events-none transition-all duration-1000 z-10"
        style={{
          left: `${celestialX}%`,
          bottom: `${celestialY}%`,
          transform: 'translate(-50%, 50%)',
          willChange: 'left, bottom',
        }}
      >
        {isDay ? (
          /* Sun with custom styles & glowing background filter */
          <div className={`w-full h-full rounded-full transition-all duration-1000 ${theme.sunStyle}`} />
        ) : (
          /* Waxing Crescent Moon (Yellowish tone and drop shadow) */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(253,224,71,0.55)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFEE8" />
                <stop offset="45%" stopColor="#FFF27D" />
                <stop offset="100%" stopColor="#E5B229" />
              </linearGradient>
            </defs>
            <path
              d="M50 10 A 40 40 0 1 1 50 90 A 30 40 0 0 0 50 10 Z"
              fill="url(#moonGrad)"
            />
          </svg>
        )}
      </div>

      {/* ── Layer 3: Back Mountains (Rugged, Gradient Filled) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[255px] sm:h-[320px] md:h-[385px] pointer-events-none transition-all duration-1000 z-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="backMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.mountainBackStart} className="transition-colors duration-1000" />
            <stop offset="100%" stopColor={theme.mountainBackEnd} className="transition-colors duration-1000" />
          </linearGradient>
        </defs>
        <path
          d="M0 240 L100 210 L210 230 L310 180 L420 205 L530 160 L640 195 L750 140 L860 175 L970 135 L1080 180 L1190 150 L1300 190 L1440 160 L1440 320 L0 320 Z"
          fill="url(#backMountainGrad)"
        />
      </svg>

      {/* ── Layer 3.5: Middle Mountains (Rugged, Overlapping Gradient Filled) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[210px] sm:h-[265px] md:h-[320px] pointer-events-none transition-all duration-1000"
        style={{ zIndex: 25 }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="midMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.mountainMidStart} className="transition-colors duration-1000" />
            <stop offset="100%" stopColor={theme.mountainMidEnd} className="transition-colors duration-1000" />
          </linearGradient>
        </defs>
        <path
          d="M0 270 L120 240 L240 255 L350 210 L470 235 L580 185 L700 215 L810 170 L930 200 L1040 175 L1160 215 L1280 190 L1400 220 L1440 200 L1440 320 L0 320 Z"
          fill="url(#midMountainGrad)"
        />
      </svg>

      {/* ── Layer 4: Front Mountains (Detailed Foreground Gradient Filled) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[165px] sm:h-[210px] md:h-[265px] pointer-events-none transition-all duration-1000 z-30"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="frontMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.mountainFrontStart} className="transition-colors duration-1000" />
            <stop offset="100%" stopColor={theme.mountainFrontEnd} className="transition-colors duration-1000" />
          </linearGradient>
        </defs>
        <path
          d="M0 290 L140 265 L270 280 L390 235 L510 260 L620 215 L740 240 L860 195 L980 225 L1100 190 L1220 215 L1330 190 L1440 210 L1440 320 L0 320 Z"
          fill="url(#frontMountainGrad)"
        />
      </svg>

      {/* ── Layer 5: Hero Content ── */}
      <Container className="relative z-40 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-sm border transition-colors duration-1000 mx-auto ${theme.isDarkText
                ? "bg-white/70 border-slate-200/50 text-slate-700 shadow-sm"
                : "bg-black/30 border-white/10 text-slate-200 shadow-md shadow-black/10"
              }`}
          >
            <motion.div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
              Available for opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight font-display transition-colors duration-1000">
              <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${theme.isDarkText
                  ? "from-slate-900 via-slate-800 to-indigo-950"
                  : "from-white via-indigo-100 to-blue-200"
                }`}>
                Vamshi Gutha
              </span>
            </h1>
          </motion.div>

          {/* Role & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight font-display transition-colors duration-1000 ${theme.isDarkText ? "text-slate-800" : "text-slate-100"
              }`}>
              Salesforce Developer &amp; Full Stack Engineer
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-1000 ${theme.isDarkText ? "text-slate-600" : "text-slate-300"
              }`}>
              Passionate about creating scalable solutions with{" "}
              <span className={`font-semibold ${theme.isDarkText ? "text-indigo-600" : "text-indigo-300"}`}>
                5+ years
              </span> of experience in Salesforce ecosystem and modern web technologies. I transform complex business requirements into elegant, user-friendly applications.
            </p>
          </motion.div>

          {/* Skill chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto px-4"
          >
            {[
              { icon: "fab fa-salesforce", label: "Salesforce", color: "from-blue-500 to-blue-600" },
              { icon: "fab fa-react", label: "React", color: "from-cyan-500 to-blue-500" },
              { icon: "fab fa-node-js", label: "Node.js", color: "from-green-500 to-emerald-600" },
              { icon: "fab fa-js", label: "JavaScript", color: "from-yellow-500 to-orange-500" },
            ].map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.07, y: -6 }}
                className={`p-3 sm:p-4 bg-gradient-to-br ${skill.color} rounded-xl sm:rounded-2xl shadow-md text-white text-center group cursor-pointer`}
              >
                <i className={`${skill.icon} text-xl sm:text-2xl mb-1 sm:mb-2 block group-hover:scale-110 transition-transform`} />
                <span className="text-xs sm:text-sm font-semibold">{skill.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 px-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base">Let's Work Together</span>
                <motion.i
                  className="fas fa-arrow-right text-sm"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </span>
            </motion.a>

            <motion.a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold border-2 transition-all duration-300 text-center ${theme.isDarkText
                  ? "bg-white/80 text-slate-700 border-slate-200 hover:border-indigo-400 shadow-md"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-lg"
                }`}
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <i className={`fas fa-download text-sm ${theme.isDarkText ? "text-indigo-600" : "text-white"}`} />
                <span className="text-sm sm:text-base">View Resume</span>
              </span>
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 px-4"
          >
            {[
              { icon: "fab fa-github", href: "https://github.com/guthaVamshi", color: theme.isDarkText ? "hover:text-black" : "hover:text-white" },
              { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", color: theme.isDarkText ? "hover:text-blue-600" : "hover:text-blue-400" },
              { icon: "fas fa-envelope", href: "mailto:vamshigutha@gmail.com", color: theme.isDarkText ? "hover:text-red-500" : "hover:text-red-400" },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.4 + i * 0.1 }}
                whileHover={{ scale: 1.2, y: -3 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${theme.isDarkText
                    ? "bg-white/80 border-slate-200 text-slate-600"
                    : "bg-white/10 border-white/10 text-slate-300 hover:bg-white/20"
                  } ${s.color}`}
              >
                <i className={`${s.icon} text-base sm:text-lg`} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}