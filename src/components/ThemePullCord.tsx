import React, { useState, useEffect } from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';

export default function ThemePullCord() {
  const [pulled, setPulled] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check initial state
    const stored = localStorage.getItem('pullcordEnabled');
    if (stored === 'true') {
      setEnabled(true);
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'mocha';
    if (currentTheme === 'latte') {
      setPulled(true);
    }

    // Listen for toggle events
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setEnabled(customEvent.detail === true);
    };

    window.addEventListener('toggle-pullcord', handleToggle);
    return () => window.removeEventListener('toggle-pullcord', handleToggle);
  }, []);

  if (!enabled) return null;

  return (
    <div style={{
      position: 'absolute',
      width: 0,
      height: 0,
      '--pullcord-top': '0px',
      '--pullcord-right': '2vw',
      '--pullcord-z': '40',
      '--pullcord-ink': 'var(--text-primary)',
    } as React.CSSProperties}>
      <PullCord
        onPull={() => {
          setPulled(p => !p);
          
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'mocha';
          let newTheme = 'latte';

          if (currentTheme !== 'latte') {
            localStorage.setItem('previousDarkTheme', currentTheme);
            newTheme = 'latte';
          } else {
            newTheme = localStorage.getItem('previousDarkTheme') || 'mocha';
          }

          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          window.dispatchEvent(new CustomEvent('theme-updated', { detail: newTheme }));
        }}
        pulled={pulled}
        ariaLabel="Toggle Light Mode"
      />
    </div>
  );
}
