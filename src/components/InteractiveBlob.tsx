import React, { useState, useRef, useEffect } from 'react';
import { JellyBlobMascot } from 'feral-blob';

export default function InteractiveBlob({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const IDLE_TIME = 15000; // Sleep after 15 seconds of inactivity

  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsSleeping(true);
    }, IDLE_TIME);
  };

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const triggerAngry = (duration = 2500) => {
    setIsAngry(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setIsAngry(false);
    }, duration);
  };

  const handleInteraction = (type: 'hover' | 'click') => {
    if (isSleeping) {
      // Woken up from sleep! Get angry!
      setIsSleeping(false);
      triggerAngry(4000); // Stay angry longer if woken up abruptly
    } else if (type === 'click') {
      triggerAngry(2500);
    }
    resetIdleTimer();
  };

  const handleClick = () => {
    handleInteraction('click');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    handleInteraction('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resetIdleTimer();
  };

  let mood: 'neutral' | 'happy' | 'angry' | 'sad' | 'hmm' | 'password' = 'neutral';
  let happyEyes: 'star' | 'smile' = 'star';
  let mouth: 'open' | 'wide' | undefined = undefined;

  if (isAngry) {
    mood = 'hmm'; // User prefers the hmm (squiggly) mouth for the angry/annoyed state
  } else if (isSleeping) {
    mood = 'password'; // Covers eyes / closed eyes
  } else if (isHovered) {
    mood = 'happy';
    happyEyes = 'smile';
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
      className={`relative cursor-pointer transition-colors duration-300 ${className}`}
    >
      {isSleeping && (
        <div className="absolute top-[5%] right-[15%] w-16 h-12 pointer-events-none z-10 font-bold text-text-secondary select-none" style={{ fontFamily: 'comic sans ms, sans-serif' }}>
          <span className="absolute bottom-0 left-0 text-sm opacity-0" style={{ animation: 'float-zzz 3s infinite linear 0s' }}>Z</span>
          <span className="absolute bottom-3 left-4 text-sm opacity-0" style={{ animation: 'float-zzz 3s infinite linear 1s' }}>Z</span>
          <span className="absolute bottom-6 left-8 text-sm opacity-0" style={{ animation: 'float-zzz 3s infinite linear 2s' }}>Z</span>
        </div>
      )}
      <style>
        {`
          @keyframes float-zzz {
            0% { opacity: 0; transform: translateY(0); }
            20% { opacity: 1; transform: translateY(-2px); }
            80% { opacity: 1; transform: translateY(-6px); }
            100% { opacity: 0; transform: translateY(-8px); }
          }
        `}
      </style>
      <JellyBlobMascot mood={mood} happyEyes={happyEyes} mouth={mouth} className="w-full h-full" />
    </div>
  );
}
