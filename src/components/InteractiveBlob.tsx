import React, { useState, useRef, useEffect } from 'react';
import { JellyBlobMascot } from 'feral-blob';

export default function InteractiveBlob({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [isSad, setIsSad] = useState(false);
  
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    setIsSad(false);
    idleTimeoutRef.current = setTimeout(() => {
      setIsSad(true);
    }, 120000); // 2 minutes (120,000 ms)
  };

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    resetIdleTimer();
    setIsAngry(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setIsAngry(false);
    }, 2500); // Stays angry for 2.5 seconds
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    resetIdleTimer();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetIdleTimer();
  };

  let mood: 'neutral' | 'happy' | 'angry' | 'sad' | 'hmm' = 'neutral';
  let happyEyes: 'star' | 'smile' = 'star';

  if (isAngry) {
    mood = 'angry';
  } else if (isHovered) {
    mood = 'happy';
    happyEyes = 'smile';
  } else if (isSad) {
    mood = 'sad';
  }

  // Derive blob shades dynamically from the active theme's primary color
  const style = {
    '--jelly-body-top': 'color-mix(in srgb, var(--primary) 70%, white)',
    '--jelly-body-mid': 'var(--primary)',
    '--jelly-body-deep': 'color-mix(in srgb, var(--primary) 80%, black)',
    '--jelly-body-rim': 'color-mix(in srgb, var(--primary) 60%, white)',
    '--jelly-outline': 'color-mix(in srgb, var(--primary) 70%, black)',
    '--jelly-outline-light': 'color-mix(in srgb, var(--primary) 50%, white)',
    '--jelly-arm-light': 'color-mix(in srgb, var(--primary) 80%, white)',
    '--jelly-arm-mid': 'var(--primary)',
    '--jelly-arm-deep': 'color-mix(in srgb, var(--primary) 70%, black)',
    '--jelly-cheek-light': 'color-mix(in srgb, var(--primary) 30%, white)',
    '--jelly-cheek': 'color-mix(in srgb, var(--primary) 60%, white)',
    '--jelly-cheek-deep': 'color-mix(in srgb, var(--primary) 50%, white)',
    '--jelly-eye-sparkle': 'color-mix(in srgb, var(--primary) 50%, white)',
  } as React.CSSProperties;

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style} 
      className={`cursor-pointer transition-colors duration-300 ${className}`}
    >
      <JellyBlobMascot mood={mood} happyEyes={happyEyes} className="w-full h-full" />
    </div>
  );
}
