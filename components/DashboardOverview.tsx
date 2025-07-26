"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Power, 
  Activity, 
  Signal, 
  TrendingUp, 
  TrendingDown,
  Clock,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function DashboardOverview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  const overviewStats = [
    {
      title: 'Total Events Today',
      value: 47,
      change: +12,
      changeType: 'increase',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Active Trippings',
      value: 5,
      change: +2,
      changeType: 'increase',
      icon: Zap,
      color: 'text-red-600'
    },
    {
      title: 'Ongoing Outages',
      value: 3,
      change: -1,
      changeType: 'decrease',
      icon: Power,
      color: 'text-orange-600'
    },
    {
      title: 'Pending Line Clears',
      value: 8,
      change: +3,
      changeType: 'increase',
      icon: Signal,
      color: 'text-green-600'
    }
  ];

  const recentCriticalEvents = [
    {
      id: '1',
      type: 'Tripping',
      severity: 'high',
      substation: 'SS-MAIN-01',
      equipment: '132KV Feeder F-1',
      time: '14:30:45',
      employee: 'EMP001',
      status: 'active',
      description: 'Earth fault detected on 132KV line'
    },
    {
      id: '2',
      type: 'Outage',
      severity: 'medium',
      substation: 'SS-SUB-02',
      equipment: 'Transformer T-2',
      time: '13:45:20',
      employee: 'EMP002',
      status: 'planned',
      description: 'Scheduled maintenance outage'
    },
    {
      id: '3',
      type: 'Tripping',
      severity: 'high',
      substation: 'SS-DIST-03',
      equipment: '11KV Feeder F-5',
      time: '14:15:30',
      employee: 'EMP003',
      status: 'cleared',
      description: 'Over-current protection operated'
    }
  ];

  const systemHealth = {
    substations: {
      total: 12,
      online: 11,
      offline: 1,
      maintenance: 0
    },
    feeders: {
      total: 48,
      active: 45,
      tripped: 3,
      maintenance: 0
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'cleared':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'planned':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time monitoring of electrical system operations
          </p>
        </div>
        <div className="flex space-x-2">
          {['today', '7days', '30days'].map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeRange(range)}
            >
              {range === 'today' ? 'Today' : range === '7days' ? '7 Days' : '30 Days'}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      )}
                      <span className={`text-xs ${stat.changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
                        {stat.change > 0 ? '+' : ''}{stat.change} vs yesterday
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Events */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Critical Events</span>
                <Badge variant="destructive" className="ml-2">
                  {recentCriticalEvents.filter(e => e.status === 'active').length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCriticalEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(event.status)}
                        <Badge className={getSeverityColor(event.severity)} variant="outline">
                          {event.severity.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {event.equipment}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.substation}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{event.employee}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Substations</span>
                  <span className="text-sm text-gray-600">
                    {systemHealth.substations.online}/{systemHealth.substations.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(systemHealth.substations.online / systemHealth.substations.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{systemHealth.substations.online} Online</span>
                  <span>{systemHealth.substations.offline} Offline</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Feeders</span>
                  <span className="text-sm text-gray-600">
                    {systemHealth.feeders.active}/{systemHealth.feeders.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(systemHealth.feeders.active / systemHealth.feeders.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{systemHealth.feeders.active} Active</span>
                  <span>{systemHealth.feeders.tripped} Tripped</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Logs</span>
                <Badge variant="secondary">47</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Response Time</span>
                <Badge variant="secondary">2.4 min</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Uptime</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  99.8%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Operators</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}