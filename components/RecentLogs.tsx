"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, User, MapPin } from 'lucide-react';

interface LogEntry {
  id: string;
  type: string;
  employee: string;
  timestamp: string;
  substation: string;
  status: 'active' | 'cleared' | 'pending';
  description: string;
}

export default function RecentLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'Tripping',
      employee: 'EMP001',
      timestamp: '14:30:45',
      substation: 'SS-MAIN-01',
      status: 'active',
      description: '11KV Feeder F-1 tripped due to earth fault'
    },
    {
      id: '2',
      type: 'Outage',
      employee: 'EMP002',
      timestamp: '13:45:20',
      substation: 'SS-SUB-02',
      status: 'pending',
      description: 'Planned maintenance outage for transformer T-2'
    },
    {
      id: '3',
      type: 'Line Clear',
      employee: 'EMP001',
      timestamp: '14:15:30',
      substation: 'SS-MAIN-01',
      status: 'cleared',
      description: 'Line clear issued for 132KV line L-3'
    },
    {
      id: '4',
      type: 'VR Log',
      employee: 'EMP003',
      timestamp: '14:00:15',
      substation: 'SS-MAIN-01',
      status: 'active',
      description: 'Voltage regulation: 132KV bus voltage at 135KV'
    }
  ]);

  const filteredLogs = logs.filter(log =>
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const LogList = ({ filterType }: { filterType?: string }) => {
    const filtered = filterType 
      ? filteredLogs.filter(log => log.type.toLowerCase().includes(filterType.toLowerCase()))
      : filteredLogs;

    return (
      <div className="space-y-3">
        {filtered.map((log) => (
          <div key={log.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(log.status)} variant="secondary">
                  {log.status}
                </Badge>
                <span className="font-medium text-gray-900 dark:text-white">
                  {log.type}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{log.timestamp}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {log.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{log.employee}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{log.substation}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Logs</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tripping">Trippings</TabsTrigger>
            <TabsTrigger value="outage">Outages</TabsTrigger>
            <TabsTrigger value="line">Line Clears</TabsTrigger>
            <TabsTrigger value="vr">VR Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <LogList />
          </TabsContent>
          <TabsContent value="tripping" className="mt-4">
            <LogList filterType="Tripping" />
          </TabsContent>
          <TabsContent value="outage" className="mt-4">
            <LogList filterType="Outage" />
          </TabsContent>
          <TabsContent value="line" className="mt-4">
            <LogList filterType="Line Clear" />
          </TabsContent>
          <TabsContent value="vr" className="mt-4">
            <LogList filterType="VR Log" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}