import { useState, useEffect, useRef, useCallback } from 'react';


export const useRateLimitTimer = (actionKey: string, defaultSeconds: number = 60) => {
  const [cooldown, setCooldown] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const storageKey = `cooldown_expiry_${actionKey}`;

  // 1. On mount, check if a timer was already running
  useEffect(() => {
    const expiry = localStorage.getItem(storageKey);
    if (expiry) {
      const remaining = Math.ceil((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  const startCooldown = useCallback((seconds?: number) => {
    const duration = seconds || defaultSeconds;
    const expiryTimestamp = Date.now() + duration * 1000;
    
    // Save the exact end time to localStorage
    localStorage.setItem(storageKey, expiryTimestamp.toString());
    setCooldown(duration);
  }, [defaultSeconds, storageKey]);

  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            localStorage.removeItem(storageKey);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cooldown, storageKey]);

  return {
    cooldown,
    startCooldown,
    isLocked: cooldown > 0,
    displayText: cooldown > 0 ? `Retry in ${cooldown}s` : null
  };
};