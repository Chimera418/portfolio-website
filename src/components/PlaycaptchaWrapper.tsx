import PixelClaw from './pixelclaw/PixelClaw';
import { useEffect, useState } from 'react';

export default function PlaycaptchaWrapper() {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleReset = () => setResetKey(k => k + 1);
    document.addEventListener('captcha-reset', handleReset);
    return () => document.removeEventListener('captcha-reset', handleReset);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PixelClaw 
        key={resetKey}
        onSuccess={() => {
          document.dispatchEvent(new CustomEvent('captcha-success'));
        }} 
      />
    </div>
  );
}
