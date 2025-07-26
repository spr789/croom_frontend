"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Power, Activity, Signal, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardStat {
  type: string;
  count: number;
  trend: number;
  lastLog: string;
  status: 'active' | 'cleared' | 'pending';
}

export default function DashboardCards() {
  const [stats, setStats] = useState<DashboardStat[]>([
    {
      type: 'Trippings',
      count: 12,
      trend: 3,
      lastLog: '14:30',
      status: 'active'
    },
    {
      type: 'Outages',
      count: 5,
      trend: -2,
      lastLog: '13:45',
      status: 'pending'
    },
    {
      type: 'Line Clears',
      count: 8,
      trend: 1,
      lastLog: '14:15',
      status: 'cleared'
    },
    {
      type: 'SRLDC Line Clears',
      count: 3,
      trend: 0,
      lastLog: '12:30',
      status: 'active'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Trippings':
        return <Zap className="h-4 w-4" />;
      case 'Outages':
        return <Power className="h-4 w-4" />;
      case 'Line Clears':
        return <Activity className="h-4 w-4" />;
      case 'SRLDC Line Clears':
        return <Signal className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cleared':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.type}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {getIcon(stat.type)}
              <Badge className={getStatusColor(stat.status)} variant="secondary">
                {stat.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.count}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1 text-xs">
                {stat.trend > 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-red-500" />
                    <span className="text-red-500">+{stat.trend}</span>
                  </>
                ) : stat.trend < 0 ? (
                  <>
                    <TrendingDown className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">{stat.trend}</span>
                  </>
                ) : (
                  <span className="text-gray-500">No change</span>
                )}
                <span className="text-gray-500">vs yesterday</span>
              </div>
              <div className="text-xs text-gray-500">
                Last: {stat.lastLog}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}