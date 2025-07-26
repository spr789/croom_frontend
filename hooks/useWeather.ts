"use client";

import { useState, useEffect } from 'react';

interface WeatherAlert {
  id: string;
  type: 'storm' | 'heatwave' | 'heavy_rain' | 'fog' | 'normal';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export function useWeather() {
  const [alert, setAlert] = useState<WeatherAlert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = () => {
      // Mock weather data - replace with real API
      const alerts: WeatherAlert[] = [
        {
          id: '1',
          type: 'storm',
          message: 'Thunderstorm warning in effect. High winds expected.',
          severity: 'high',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'normal',
          message: 'Clear weather conditions.',
          severity: 'low',
          timestamp: new Date().toISOString()
        }
      ];

      // Randomly select an alert for demo
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setAlert(randomAlert.type !== 'normal' ? randomAlert : null);
      setLoading(false);
    };

    fetchWeather();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { alert, loading };
}