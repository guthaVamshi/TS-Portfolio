import React, { useMemo } from "react";

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

interface FlightBirdsProps {
  theme: TimeConfig;
  isDay: boolean;
}

interface BirdData {
  id: number;
  y: number;
  size: number;
  speed: number;
  flapSpeed: number;
  opacity: number;
  delay: number;
}

export default function FlightBirds({ theme, isDay }: FlightBirdsProps) {
  const hour = useMemo(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hOverride = params.get("hour");
      if (hOverride !== null) {
        const parsed = parseInt(hOverride, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
          return parsed;
        }
      }
    }
    return new Date().getHours();
  }, []);

  const isNight = hour >= 20 || hour < 6;
  const isEvening = hour >= 17 && hour < 20;

  // 0 birds during the night
  if (isNight) {
    return null;
  }

  // Determine bird count: 14 to 18 for morning/midday, 6 for evening
  const birdCount = isEvening ? 6 : useMemo(() => Math.floor(Math.random() * 5) + 14, []);

  // Generate bird properties once on mount
  const birds = useMemo<BirdData[]>(() => {
    const list: BirdData[] = [];
    for (let i = 0; i < birdCount; i++) {
      // y-position as percent of screen height (5% to 45%)
      const y = Math.random() * 40 + 5;
      
      let size = 20;
      let speed = 20;
      let opacity = 0.4;

      if (y <= 15) {
        // Distant flock
        size = Math.random() * 2 + 16; // 16px - 18px
        speed = Math.random() * 6 + 24; // 24s - 30s
        opacity = Math.random() * 0.1 + 0.2; // 0.2 - 0.3
      } else if (y <= 35) {
        // Medium
        size = Math.random() * 4 + 19; // 19px - 23px
        speed = Math.random() * 6 + 18; // 18s - 24s
        opacity = Math.random() * 0.15 + 0.35; // 0.35 - 0.5
      } else {
        // Larger, just above mountains
        size = Math.random() * 4 + 24; // 24px - 28px
        speed = Math.random() * 4 + 14; // 14s - 18s
        opacity = Math.random() * 0.1 + 0.55; // 0.55 - 0.65
      }

      // Flap speed: 1.8s to 3.2s (handles flap-and-glide pacing)
      const flapSpeed = Math.random() * 1.4 + 1.8;
      
      // Delay: negative so they start mid-flight, spanning full cycle
      const delay = -Math.random() * speed;

      list.push({
        id: i,
        y,
        size,
        speed: isEvening ? speed + 6 : speed, // Slower in evening
        flapSpeed,
        opacity: isEvening ? opacity * 0.7 : opacity, // Drop opacity by 30% in evening
        delay,
      });
    }
    return list;
  }, [birdCount, isEvening]);

  // Construct CSS styles dynamically to inject via <style>
  const styles = useMemo(() => {
    let cssString = "";
    birds.forEach((bird) => {
      cssString += `
        @keyframes bird-fly-${bird.id} {
          0% {
            transform: translate3d(-15vw, calc(${bird.y}vh - 12px), 0);
          }
          50% {
            transform: translate3d(50vw, calc(${bird.y}vh + 12px), 0);
          }
          100% {
            transform: translate3d(115vw, calc(${bird.y}vh - 12px), 0);
          }
        }
        @keyframes bird-flap-${bird.id} {
          /* Side-profile wings flapping and gliding loop */
          0%, 100% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 9 6, 12 0, 12 0 C 12 0, 13 4, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          12% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 8 3, 9 -3, 9 -3 C 9 -3, 12 2, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          24% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 9 6, 12 0, 12 0 C 12 0, 13 4, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          36% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 8 11, 11 15, 11 15 C 11 15, 13 11, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          48% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 8 3, 9 -3, 9 -3 C 9 -3, 12 2, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          60% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 9 6, 12 0, 12 0 C 12 0, 13 4, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          72% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 8 11, 11 15, 11 15 C 11 15, 13 11, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
          84%, 100% {
            d: path("M 0 10 C 2 9, 4 9, 6 9 C 9 6, 12 0, 12 0 C 12 0, 13 4, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z");
          }
        }
        .bird-anim-${bird.id} {
          animation: bird-fly-${bird.id} ${bird.speed}s linear infinite;
          animation-delay: ${bird.delay}s;
          will-change: transform;
        }
        .bird-anim-${bird.id} path {
          animation: bird-flap-${bird.id} ${bird.flapSpeed}s ease-in-out infinite;
        }
      `;
    });
    return cssString;
  }, [birds]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {birds.map((bird) => (
          <div
            key={bird.id}
            className={`absolute top-0 left-0 bird-anim-${bird.id} text-slate-700/60`}
            style={{
              width: `${bird.size}px`,
              height: `${bird.size * 0.66}px`,
              opacity: bird.opacity,
            }}
          >
            <svg
              viewBox="0 0 24 16"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current"
                d="M 0 10 C 2 9, 4 9, 6 9 C 9 6, 12 0, 12 0 C 12 0, 13 4, 15 7 C 18 6, 21 6, 24 7 C 22 8, 19 9, 16 9 C 14 11, 10 12, 6 11 C 3 11, 1 10, 0 10 Z"
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
