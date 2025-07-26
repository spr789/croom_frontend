"use client";

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Cloud, Sun, ExternalLink } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

export default function WeatherBanner() {
  const { alert, loading } = useWeather();

  if (loading || !alert) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'storm':
        return <AlertTriangle className="h-4 w-4" />;
      case 'heatwave':
        return <Sun className="h-4 w-4" />;
      default:
        return <Cloud className="h-4 w-4" />;
    }
  };

  const getBgColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800';
      case 'medium':
        return 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800';
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800';
    }
  };

  return (
    <Alert className={`${getBgColor(alert.severity)} mb-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getIcon(alert.type)}
          <AlertDescription className="font-medium">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Weather Alert:
            </span>{' '}
            {alert.message}
          </AlertDescription>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-xs">
          <span>More details</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </Alert>
  );
}