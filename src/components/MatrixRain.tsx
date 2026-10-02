"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Cyberpunk/Data Analytics characters
    const chars = "01010101010101010101ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const fontSize = 16;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops: number[] = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Random starting positions above screen
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      // Translucent black background to create trail effect
      ctx.fillStyle = "rgba(7, 8, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Randomly highlight some characters in violet or white for a cyberpunk feel
        const random = Math.random();
        if (random > 0.98) ctx.fillStyle = "#FFF";
        else if (random > 0.9) ctx.fillStyle = "#7C5CFF";
        else ctx.fillStyle = "#00E5C3";

        // Draw character
        if (drops[i] * fontSize >= 0) {
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        // Reset drop to top randomly after it crosses the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 40);
    
    window.addEventListener("resize", setCanvasSize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
