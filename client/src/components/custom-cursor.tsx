import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    // Event listeners for links and buttons to change cursor style
    const links = document.querySelectorAll("a, button");
    
    const mouseEnterLink = () => setCursorVariant("link");
    const mouseLeaveLink = () => setCursorVariant("default");
    
    links.forEach(link => {
      link.addEventListener("mouseenter", mouseEnterLink);
      link.addEventListener("mouseleave", mouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      
      links.forEach(link => {
        link.removeEventListener("mouseenter", mouseEnterLink);
        link.removeEventListener("mouseleave", mouseLeaveLink);
      });
    };
  }, []);

  // Only show custom cursor on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "var(--primary)"
    },
    link: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      height: 30,
      width: 30,
      backgroundColor: "var(--primary)",
      mixBlendMode: "difference"
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 2.5,
      y: mousePosition.y - 2.5,
      opacity: 1
    },
    link: {
      x: mousePosition.x - 2.5,
      y: mousePosition.y - 2.5,
      opacity: 0
    }
  };

  return (
    <>
      <motion.div
        className="custom-cursor hidden lg:block fixed rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="cursor-dot hidden lg:block fixed bg-white rounded-full pointer-events-none z-50 w-[5px] h-[5px] mix-blend-difference"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
