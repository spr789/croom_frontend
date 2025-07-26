"use client";

import { useState, useEffect } from 'react';

export function useTimeBlock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeBlock, setTimeBlock] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      // Calculate current 15-minute block
      const blockStart = Math.floor(minutes / 15) * 15;
      const blockEnd = blockStart + 15;
      
      setTimeBlock(`${String(now.getHours()).padStart(2, '0')}:${String(blockStart).padStart(2, '0')} - ${String(now.getHours()).padStart(2, '0')}:${String(blockEnd).padStart(2, '0')}`);
      
      // Calculate countdown to next block
      const secondsLeft = (15 - (minutes % 15)) * 60 - seconds;
      const minutesLeft = Math.floor(secondsLeft / 60);
      const secsLeft = secondsLeft % 60;
      
      setCountdown(`${String(minutesLeft).padStart(2, '0')}:${String(secsLeft).padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { currentTime, timeBlock, countdown };
}