import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from '../Files/VamshiGutha_JFSD.pdf';
import { useState, useEffect } from "react";

export interface TimeConfig {
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

export function adjustColor(hex: string, amount: number): string {
  let color = hex.replace(/^#/, "");
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  const num = parseInt(color, 16);
  let r = Math.max(0, Math.min(255, (num >> 16) + amount));
  let g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  let b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function getTimeConfig(hour: number): TimeConfig {
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

interface TrailheadMountainGroupProps {
  colorStart: string;
  colorEnd: string;
  transform?: string;
  className?: string;
}

export function TrailheadMountainGroup({ colorStart, colorEnd, transform, className }: TrailheadMountainGroupProps) {
  return (
    <g transform={transform} className={className}>
      <polygon className="transition-colors duration-1000" points="336.62,150 350.02,161.52 355.52,170.33 379.56,184.57 439,203.55 380.94,205.24 349.82,207 327,188.97 331.81,162.2" style={{ fill: colorStart }}></polygon>
      <polygon className="transition-colors duration-1000" points="264,175.61 311.93,159.49 336.87,150 334.82,162.88 336.87,179.15 350,207 278.78,197.11" style={{ fill: adjustColor(colorStart, 25) }}></polygon>
      <path className="transition-colors duration-1000" d="M253.84,130.36l15.47,16.06c0,0,20.63,12.98,22.01,14.35s28.19,14.35,28.19,14.35l35.76,4.44 l32.46,18.17l-68.21,5.17l-47.45-16.85l-20.97-25.28L253.84,130.36z" style={{ fill: adjustColor(colorStart, -22) }}></path>
      <polygon className="transition-colors duration-1000" points="234.26,132.41 253.84,130.36 255.56,137.87 264.15,150.85 267.59,166.57 237.68,137.87" style={{ fill: adjustColor(colorStart, 15) }}></polygon>
      <polygon className="transition-colors duration-1000" points="209.83,88 222.89,110.89 241.46,137.87 267.59,166.57 319.51,202.89 282.22,211.93 202.26,193.21 184.38,181.26 176.48,154.61 176.48,137.87 176.48,110.89 180.1,100.85" style={{ fill: colorEnd }}></polygon>
      <polygon className="transition-colors duration-1000" points="228.74,156.66 228.74,163.15 215.67,160.76 205.01,152.56 197.45,144.36 197.45,149.15 187.48,127.63 176.48,135.88 176.48,137.87 176.48,154.61 184.38,181.26 202.26,193.21 250.42,204.48 255.21,204.48 299.22,193.21 300.79,189.79 267.59,166.57 261.28,159.64 239.74,160.76" style={{ fill: adjustColor(colorEnd, -25) }}></polygon>
      <polygon className="transition-colors duration-1000" points="538.85,125.4 518.93,132.41 481.11,164.18 418.88,195.94 478.86,175.51 516.87,160.76 524.09,146.4" style={{ fill: adjustColor(colorStart, 15) }}></polygon>
      <polyline className="transition-colors duration-1000" points="538.87,125.23 547.68,136.85 554,144.23 536.81,154.61 516.87,160.76 524.09,143 536.81,127.71" style={{ fill: adjustColor(colorStart, -22) }}></polyline>
      <polygon className="transition-colors duration-1000" points="209.83,88 191.26,98.93 191.26,110.89 184.38,120.45 178.2,142.66 122.84,154.61 35.51,130.36 91.21,127.63 126.62,117.38 156.88,110.89" style={{ fill: adjustColor(colorStart, 5) }}></polygon>
      <polygon className="transition-colors duration-1000" points="184.38,120.45 150.69,137.87 91.11,145.8 35.51,130.36 15.57,163.08 0,181.26 127.65,181.26 184.38,181.26 181.98,171.35 176.48,154.61 178.2,142.66 184.38,127.63" style={{ fill: adjustColor(colorStart, -22) }}></polygon>
      <polygon className="transition-colors duration-1000" points="191.26,111.57 162.54,117.52 144.84,130.36 121.46,137.87 91.21,145.73 54.95,146.7 27.6,159.05 75.13,152 101.18,158.71 131.09,163.15 149.51,149.15 174.41,135.48 184.38,127.63 184.38,120.45" style={{ fill: adjustColor(colorStart, 5) }}></polygon>
      <polygon className="transition-colors duration-1000" points="178.2,142.66 191.26,166.57 225.99,181.26 218.08,168.62 234.24,181.26 251.09,186.72 266.9,186.72 244.9,175.45 266.9,181.26 280.97,189.7 295.7,186.23 319.51,202.89 278.25,212 202.26,193.21 184.38,181.26 176.48,156.66" style={{ fill: adjustColor(colorEnd, -25) }}></polygon>
      <polyline className="transition-colors duration-1000" points="669,46.19 669,64.33 673.08,88.07 681.93,99.08 690.25,142 784.65,195.94 701,88.07 690.25,64.59 673.08,43" style={{ fill: adjustColor(colorEnd, -35) }}></polyline>
      <polygon className="transition-colors duration-1000" points="672.22,43 654.03,57.09 644.08,77.36 611.48,97.63 581.62,127.86 537,155 595.35,132.67 643.36,106.27 650.26,94.88 656.09,91.79 655.06,76.33 666.05,81.48 672.22,88.01 676,68.42 671.2,54.68" style={{ fill: adjustColor(colorStart, 10) }}></polygon>
      <path className="transition-colors duration-1000" d="M671.48,55l-2.41,8.92l-7.57,7.89l-12.04,3.77l-11.69,16.46l-21.37,18.6 c0,0,15.18-3.16,15.87-4.19c0.69-1.03,13.41-14.41,13.41-14.41l12.04-10.63l14.79,6.86l3.78-19.55L671.48,55z" style={{ fill: adjustColor(colorStart, -12) }}></path>
      <polygon className="transition-colors duration-1000" points="706.47,110.78 687.13,94.62 670.63,77.47 655.14,77.47 656.17,91.87 650.33,94.96 638.98,114.17 620.75,143.32 632.96,155.16 687.65,222.04 753,178.5" style={{ fill: adjustColor(colorStart, -22) }}></polygon>
      <polygon className="transition-colors duration-1000" points="643.58,106.51 620.92,144.52 614.73,150.36 610.6,173.68 580.33,209.69 587.9,182.6 564.51,170.59 552.47,163.39 501.22,172.31 472.33,177.8 517.05,160.65 537,155.16 541.47,152.45 595.47,131.49 613.35,118.46" style={{ fill: adjustColor(colorEnd, 5) }}></polygon>
      <path className="transition-colors duration-1000" d="M655.32,77.3l-7.91,8.92c0,0-9.32,9.26-14.81,13.03c-5.49,3.77-47.6,33.61-47.6,33.61 l58.62-26.41l6.88-11.32l6.19-3.09L655.32,77.3z" style={{ fill: adjustColor(colorStart, 10) }}></path>
      <polygon className="transition-colors duration-1000" points="706.47,217.6 680.08,225.47 638.46,161.67 620.92,143.15 614.73,150.35 606.65,178.39 565.54,221.7 599.59,221.7 638.12,237.82 672.86,256 706.47,239.94" style={{ fill: adjustColor(colorEnd, -15) }}></polygon>
      <polygon className="transition-colors duration-1000" points="706.47,188.02 697.62,163.39 687.65,176.42 684.55,207.64 670.1,146.92 662.19,143.15 656.69,146.92 654.28,176.77 644.22,139.57 644.31,120.86 620.92,143.15 633.99,205.92 695.92,244.98 706.47,239.94" style={{ fill: adjustColor(colorEnd, -35) }}></polygon>
      <polygon className="transition-colors duration-1000" points="565.54,221.7 580.33,209.69 593.75,182.25 587.9,182.25 604.07,158.24 598.91,158.24 570.7,167.51 573.45,160.65 603.72,143.84 611.98,138.36 561.07,160.3 591.68,139.38 582.05,143.49 551.44,158.24 472.33,177.8 472.1,177.88 454.79,187.4 430.03,201.42 498.82,189.46 490.22,196.66 514.64,201.46 535.62,207.29 548,201.46 548,205.92 557.98,203.52 574.49,201.46 568.3,209.69" style={{ fill: adjustColor(colorEnd, -15) }}></polygon>
    </g>
  );
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-28 bg-transparent"
    >

      {/* ── Layer 3: Back Mountains (Low-Poly, Repeating & Parallax) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[255px] sm:h-[320px] md:h-[385px] pointer-events-none transition-all duration-1000 z-20"
        style={{
          transform: `translate3d(0, ${scrollY * 0.45}px, 0)`,
          willChange: "transform"
        }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="rockTexture-back">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <TrailheadMountainGroup colorStart={theme.mountainBackStart} colorEnd={theme.mountainBackEnd} transform="translate(-150, 60) scale(1.15)" />
        <TrailheadMountainGroup colorStart={theme.mountainBackStart} colorEnd={theme.mountainBackEnd} transform="translate(500, 40) scale(1.25)" />
        <TrailheadMountainGroup colorStart={theme.mountainBackStart} colorEnd={theme.mountainBackEnd} transform="translate(1150, 75) scale(1.1)" />
        {/* Jagged low-poly base layer for Back Mountains */}
        <g filter="url(#rockTexture-back)">
          <polygon points="0,260 200,240 400,270 400,320 0,320" style={{ fill: adjustColor(theme.mountainBackEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="400,270 600,230 800,265 800,320 400,320" style={{ fill: adjustColor(theme.mountainBackEnd, -35) }} className="transition-colors duration-1000" />
          <polygon points="800,265 1000,245 1200,275 1200,320 800,320" style={{ fill: adjustColor(theme.mountainBackEnd, -20) }} className="transition-colors duration-1000" />
          <polygon points="1200,275 1400,235 1600,260 1600,320 1200,320" style={{ fill: adjustColor(theme.mountainBackEnd, -30) }} className="transition-colors duration-1000" />
        </g>
      </svg>

      {/* ── Layer 3.5: Middle Mountains (Low-Poly, Repeating & Parallax) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[210px] sm:h-[265px] md:h-[320px] pointer-events-none transition-all duration-1000"
        style={{
          zIndex: 25,
          transform: `translate3d(0, ${scrollY * 0.28}px, 0)`,
          willChange: "transform"
        }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="rockTexture-mid">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(-50, 95) scale(1.2)" />
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(600, 110) scale(-1.15, 1.05)" />
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(1250, 85) scale(1.25)" />
        {/* Jagged low-poly base layer for Middle Mountains */}
        <g filter="url(#rockTexture-mid)">
          <polygon points="0,295 150,280 300,300 300,320 0,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="300,300 450,285 600,305 600,320 300,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
          <polygon points="600,305 750,275 900,300 900,320 600,320" style={{ fill: adjustColor(theme.mountainMidEnd, -20) }} className="transition-colors duration-1000" />
          <polygon points="900,300 1050,280 1200,305 1200,320 900,320" style={{ fill: adjustColor(theme.mountainMidEnd, -30) }} className="transition-colors duration-1000" />
          <polygon points="1200,305 1350,285 1500,300 1500,320 1200,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="1500,300 1600,280 1600,320 1500,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
        </g>
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-[210px] sm:h-[265px] md:h-[320px] pointer-events-none transition-all duration-1000"
        style={{
          zIndex: 25,
          transform: `translate3d(0, ${scrollY * 0.28}px, 0)`,
          willChange: "transform"
        }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="rockTexture-mid">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(-50, 95) scale(1.2)" />
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(600, 110) scale(-1.15, 1.05)" />
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(1250, 85) scale(1.25)" />
        {/* Jagged low-poly base layer for Middle Mountains */}
        <g filter="url(#rockTexture-mid)">
          <polygon points="0,295 150,280 300,300 300,320 0,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="300,300 450,285 600,305 600,320 300,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
          <polygon points="600,305 750,275 900,300 900,320 600,320" style={{ fill: adjustColor(theme.mountainMidEnd, -20) }} className="transition-colors duration-1000" />
          <polygon points="900,300 1050,280 1200,305 1200,320 900,320" style={{ fill: adjustColor(theme.mountainMidEnd, -30) }} className="transition-colors duration-1000" />
          <polygon points="1200,305 1350,285 1500,300 1500,320 1200,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="1500,300 1600,280 1600,320 1500,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
        </g>
      </svg>

      {/* ── Layer 4: Front Mountains (Low-Poly, Repeating, Traffic & Parallax) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[165px] sm:h-[210px] md:h-[265px] pointer-events-none transition-all duration-1000 z-30 mountains-near-svg"
        style={{
          transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
          willChange: "transform"
        }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="rockTexture-front">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g className="mountain-group">
          {/* Paths for CSS animation references */}
          <path transform="translate(190, 70)" className="astro-path hidden" fill="transparent" d="M0,81.51c10.48,5.27,13.77.59,32.77-2.49C72.5,72.59,88.39,43,145.4,15.28,155.58,10.34,182.7-2.49,216.58.43a101.57,101.57,0,0,1,19,3.59c24.77,6.94,43.56,16.91,57.73,18.61,37.46,4.51,55.56-17.93,107.06-1.12,59.36,14.46,171,30.41,238.76,28.42,110.63,0,254,105.11,377.73,87.7"></path>
          <path transform="translate(200, 0)" fill="transparent" className="astro-glider-path hidden" d="M0,120.87c102-1,104-54,159-71,46.84-14.48,48,27.1,96,31,36.8,3,57.27-12.65,91-4,46.16,11.85,66-13,64.5-37.5-3.85-62.83-63.5-40.5-65-2-2.41,61.8,67,88,121,67C578,61,557,64.29,668.5,92.37c131,33,244.5,164.5,299.5,166.5"></path>



          {/* Tiled Mountain Groups */}
          <TrailheadMountainGroup colorStart={theme.mountainFrontStart} colorEnd={theme.mountainFrontEnd} transform="translate(-100, 120) scale(1.25, 0.95)" />
          <TrailheadMountainGroup colorStart={theme.mountainFrontStart} colorEnd={theme.mountainFrontEnd} transform="translate(550, 130) scale(1.2, 0.9)" />
          <TrailheadMountainGroup colorStart={theme.mountainFrontStart} colorEnd={theme.mountainFrontEnd} transform="translate(1100, 115) scale(-1.25, 0.95)" />
          {/* Jagged low-poly base layer for Front Mountains */}
          <g filter="url(#rockTexture-mid)">
            <polygon points="0,295 150,280 300,300 300,320 0,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
            <polygon points="300,300 450,285 600,305 600,320 300,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
            <polygon points="600,305 750,275 900,300 900,320 600,320" style={{ fill: adjustColor(theme.mountainMidEnd, -20) }} className="transition-colors duration-1000" />
            <polygon points="900,300 1050,280 1200,305 1200,320 900,320" style={{ fill: adjustColor(theme.mountainMidEnd, -30) }} className="transition-colors duration-1000" />
            <polygon points="1200,305 1350,285 1500,300 1500,320 1200,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
            <polygon points="1500,300 1600,280 1600,320 1500,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
          </g>
        </g>
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-[210px] sm:h-[265px] md:h-[320px] pointer-events-none transition-all duration-1000"
        style={{
          zIndex: 25,
          transform: `translate3d(0, ${scrollY * 0.28}px, 0)`,
          willChange: "transform"
        }}
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="rockTexture-mid">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(-50, 95) scale(1.2)" />
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(600, 110) scale(-1.15, 1.05)" />
        <TrailheadMountainGroup colorStart={theme.mountainMidStart} colorEnd={theme.mountainMidEnd} transform="translate(1250, 85) scale(1.25)" />
        {/* Jagged low-poly base layer for Middle Mountains */}
        <g filter="url(#rockTexture-mid)">
          <polygon points="0,295 150,280 300,300 300,320 0,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="300,300 450,285 600,305 600,320 300,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
          <polygon points="600,305 750,275 900,300 900,320 600,320" style={{ fill: adjustColor(theme.mountainMidEnd, -20) }} className="transition-colors duration-1000" />
          <polygon points="900,300 1050,280 1200,305 1200,320 900,320" style={{ fill: adjustColor(theme.mountainMidEnd, -30) }} className="transition-colors duration-1000" />
          <polygon points="1200,305 1350,285 1500,300 1500,320 1200,320" style={{ fill: adjustColor(theme.mountainMidEnd, -25) }} className="transition-colors duration-1000" />
          <polygon points="1500,300 1600,280 1600,320 1500,320" style={{ fill: adjustColor(theme.mountainMidEnd, -35) }} className="transition-colors duration-1000" />
        </g>
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
              Full Stack Java Developer
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-1000 ${theme.isDarkText ? "text-slate-600" : "text-slate-300"
              }`}>
              Passionate about creating scalable enterprise web applications with{" "}
              <span className={`font-semibold ${theme.isDarkText ? "text-indigo-600" : "text-indigo-300"}`}>
                4+ years
              </span> of experience in Java 17, Spring Boot, React.js, and Salesforce integration. I transform complex business requirements into elegant, high-performing applications.
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
              { icon: "fab fa-java", label: "Java / Spring Boot", color: "from-green-600 to-green-500" },
              { icon: "fab fa-react", label: "React & TypeScript", color: "from-cyan-500 to-blue-500" },
              { icon: "fab fa-node-js", label: "Node.js", color: "from-green-500 to-emerald-600" },
              { icon: "fab fa-salesforce", label: "Salesforce LWC", color: "from-blue-500 to-blue-600" },
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