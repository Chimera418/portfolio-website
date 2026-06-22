import { ClawCaptcha } from './playcaptcha/index.ts';
import './playcaptcha/clawcaptcha.css';
import { useEffect, useState } from 'react';

export default function PlaycaptchaWrapper() {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleReset = () => setResetKey(k => k + 1);
    document.addEventListener('captcha-reset', handleReset);
    return () => document.removeEventListener('captcha-reset', handleReset);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ClawCaptcha 
        key={resetKey}
        assetBase="/toys/" 
        onVerify={() => {
          document.dispatchEvent(new CustomEvent('captcha-success'));
        }} 
      />
    </div>
  );
}
