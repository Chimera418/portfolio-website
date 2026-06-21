import React, { useState } from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';

export default function ThemePullCord() {
  const [pulled, setPulled] = useState(false);

  return (
    <div style={{
      '--pullcord-top': '0px',
      '--pullcord-right': '2vw',
      '--pullcord-z': '9999',
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
