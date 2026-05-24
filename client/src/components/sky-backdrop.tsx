import React, { useMemo } from "react";
import FlightBirds from "./flight-birds";
import { getTimeConfig } from "./hero-section";

interface SkyBackdropProps {
  hour: number;
}

export default function SkyBackdrop({ hour }: SkyBackdropProps) {
  const theme = useMemo(() => getTimeConfig(hour), [hour]);
  const isDay = hour >= 6 && hour < 18;

  // Calculate relative left-to-right percentage (t goes 0 -> 1 over 12 hours)
  const t = isDay
    ? (hour - 6) / 12
    : (hour >= 18 ? (hour - 18) / 12 : (hour + 6) / 12);

  const celestialX = t * 100;
  const celestialY = Math.sin(t * Math.PI) * 50 + 8; // Parabolic trajectory peak at 58% height

  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b ${theme.skyGradient} transition-all duration-1000`}
    >
      {/* Layer 1: Stars & Comets (Evening / Night Only) */}
      {theme.starsOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
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

          {/* Shooting Stars / Comets */}
          <div className="absolute top-[10%] left-[65%] w-[80px] h-[1px] bg-gradient-to-r from-white to-transparent opacity-0 animate-shooting-star" style={{ animationDelay: '2s', transformOrigin: 'right center' }} />
          <div className="absolute top-[22%] left-[80%] w-[100px] h-[1px] bg-gradient-to-r from-white to-transparent opacity-0 animate-shooting-star" style={{ animationDelay: '6s', transformOrigin: 'right center' }} />
          <div className="absolute top-[15%] left-[50%] w-[90px] h-[1.5px] bg-gradient-to-r from-white to-transparent opacity-0 animate-shooting-star" style={{ animationDelay: '11s', transformOrigin: 'right center' }} />
        </div>
      )}

      {/* Layer 1: High-Altitude Airplane */}
      <div className="absolute top-0 left-0 animate-plane pointer-events-none" style={{ animationDelay: '8s' }}>
        <div className="relative flex items-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-700/10 dark:text-slate-100/10 fill-current -rotate-90">
            <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
          </svg>
          <div className="absolute top-[8px] left-[8px] w-1 h-1 bg-red-500 rounded-full animate-blink-red" />
        </div>
      </div>

      {/* Layer 1: Flying Birds (Day Only) */}
      <FlightBirds theme={theme} isDay={isDay} />

      {/* Layer 1: Floating Clouds */}
      {theme.cloudsOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000"
          style={{ opacity: theme.cloudsOpacity }}
        >
          <div className="absolute top-[14%] left-0 animate-cloud-slow">
            <svg width="120" height="70" viewBox="0 0 120 70" fill="white" className="opacity-45">
              <path d="M20 50 C20 40, 35 35, 45 40 C50 30, 70 30, 75 38 C85 32, 100 38, 100 48 C105 48, 115 55, 110 62 C105 68, 15 68, 10 60 C8 55, 15 50, 20 50 Z" />
            </svg>
          </div>
          <div className="absolute top-[26%] left-0 animate-cloud-medium" style={{ animationDelay: '-20s' }}>
            <svg width="150" height="80" viewBox="0 0 150 80" fill="white" className="opacity-35">
              <path d="M30 60 C30 50, 45 45, 55 50 C60 40, 85 40, 90 50 C100 42, 120 48, 120 60 C128 60, 138 68, 132 75 C125 82, 25 82, 18 75 C15 70, 25 60, 30 60 Z" />
            </svg>
          </div>
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
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Layer 2: Celestial Body (Sun / Waxing Crescent Moon) */}
      <div
        className="absolute w-20 h-20 sm:w-28 sm:h-28 pointer-events-none transition-all duration-1000"
        style={{
          left: `${celestialX}%`,
          bottom: `${celestialY}%`,
          transform: 'translate(-50%, 50%)',
        }}
      >
        {isDay ? (
          <div className={`w-full h-full rounded-full transition-all duration-1000 ${theme.sunStyle}`} />
        ) : (
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
    </div>
  );
}
