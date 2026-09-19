import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const subscribe = (notify: () => void) => {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const snapshot = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroLandscape() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useSyncExternalStore(subscribe, snapshot, () => true);
  const [paused, setPaused] = useState(false);
  const still = reduced || paused;

  useEffect(() => {
    const canvas = ref.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0, height = 0, frame = 0, elapsed = 0, last = 0, visible = true;
    const pointer = { x: .5, y: .65 }, eased = { x: .5, y: .65 };
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const horizon = height * .49;
      const point = (column: number, row: number) => {
        const depth = row / 38;
        const spread = .2 + depth * 1.6;
        const x = width * .5 + (column / 100 - .5) * width * spread;
        const distance = (x/width-eased.x)*4;
        const influence = Math.exp(-distance*distance*2);
        const wave = Math.sin(column*.065 + depth*5 + elapsed*.34)*.6 + Math.sin(column*.12-depth*8-elapsed*.2)*.24;
        const y = horizon + depth*depth*height*.64 + wave*depth*height*.13 + influence*depth*(eased.y-.5)*height*.12;
        return { x, y };
      };
      for (let row = 1; row <= 38; row++) {
        const depth = row/38;
        ctx.beginPath();
        for (let column = 0; column <= 100; column++) {
          const p = point(column, row);
          column ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y);
        }
        ctx.strokeStyle = `rgba(145, 213, 177, ${.045+depth*.25})`;
        ctx.lineWidth = row % 5 === 0 ? 1 : .65;
        ctx.stroke();
      }
      for (let column = 0; column <= 100; column += 4) {
        ctx.beginPath();
        for (let row = 1; row <= 38; row++) {
          const p = point(column,row);
          row === 1 ? ctx.moveTo(p.x,p.y) : ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle = "rgba(121, 196, 154, .09)";
        ctx.lineWidth = .6;
        ctx.stroke();
      }
      for (let i = 0; i < 52; i++) {
        const x = ((Math.sin(i*127.1)*43758.5453)%1+1)%1*width;
        const y = ((Math.sin(i*311.7)*19287.32)%1+1)%1*height*.8;
        const alpha = .15 + .2*(.5+.5*Math.sin(elapsed*.4+i));
        ctx.fillStyle = `rgba(206, 233, 215, ${alpha})`;
        ctx.beginPath(); ctx.arc(x,y,i%7===0?1.25:.65,0,Math.PI*2);ctx.fill();
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (now-last > 32) {
        elapsed += Math.min((now-last)/1000,.06); last=now;
        eased.x += (pointer.x-eased.x)*.04;
        eased.y += (pointer.y-eased.y)*.04;
        render();
      }
      if (!still) frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!still && visible && !document.hidden && !frame) { last=performance.now();frame=requestAnimationFrame(tick); } };
    const resize = () => {
      width=stage.clientWidth; height=stage.clientHeight;
      const ratio=Math.min(devicePixelRatio || 1,1.5);
      canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);render();
    };
    const move = (event: PointerEvent) => {
      if (still || event.pointerType !== "mouse") return;
      const bounds=stage.getBoundingClientRect();
      pointer.x=(event.clientX-bounds.left)/width;pointer.y=(event.clientY-bounds.top)/height;
    };
    const leave = () => { pointer.x=.5;pointer.y=.65; };
    const visibility = () => { cancelAnimationFrame(frame);frame=0;start(); };
    const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting;visibility(); });
    const sizes = new ResizeObserver(resize);
    observer.observe(stage); sizes.observe(stage);
    stage.addEventListener("pointermove",move,{passive:true});stage.addEventListener("pointerleave",leave);
    document.addEventListener("visibilitychange",visibility);
    resize();start();
    return () => {
      cancelAnimationFrame(frame);observer.disconnect();sizes.disconnect();
      stage.removeEventListener("pointermove",move);stage.removeEventListener("pointerleave",leave);
      document.removeEventListener("visibilitychange",visibility);
    };
  }, [still]);

  return <>
    <div className="landscape-atmosphere" aria-hidden="true" />
    <canvas ref={ref} className="landscape-canvas" aria-hidden="true" />
    <div className="landscape-vignette" aria-hidden="true" />
    {!reduced && <button className="landscape-toggle" type="button" onClick={() => setPaused(value=>!value)} aria-pressed={paused} aria-label={paused ? "Play background animation" : "Pause background animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
  </>;
}
