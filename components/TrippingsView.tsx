"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Eye
} from 'lucide-react';

interface Tripping {
  id: string;
  timestamp: string;
  substation: string;
  feeder: string;
  reason: string;
  employee: string;
  status: 'active' | 'cleared' | 'investigating';
  severity: 'high' | 'medium' | 'low';
  description: string;
  clearTime?: string;
  duration?: string;
}

export default function TrippingsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isNewTrippingOpen, setIsNewTrippingOpen] = useState(false);

  const trippings: Tripping[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:45',
      substation: 'SS-MAIN-01',
      feeder: '132KV Feeder F-1',
      reason: 'Earth Fault',
      employee: 'EMP001',
      status: 'active',
      severity: 'high',
      description: 'Earth fault detected on 132KV line due to tree contact during high winds'
    },
    {
      id: '2',
      timestamp: '2024-01-15 13:15:20',
      substation: 'SS-SUB-02',
      feeder: '11KV Feeder F-3',
      reason: 'Over Current',
      employee: 'EMP002',
      status: 'cleared',
      severity: 'medium',
      description: 'Over current protection operated due to temporary overload',
      clearTime: '2024-01-15 13:45:30',
      duration: '30 min'
    },
    {
      id: '3',
      timestamp: '2024-01-15 12:45:10',
      substation: 'SS-DIST-03',
      feeder: '11KV Feeder F-5',
      reason: 'Lightning',
      employee: 'EMP003',
      status: 'investigating',
      severity: 'high',
      description: 'Lightning strike caused protection to operate'
    }
  ];

  const filteredTrippings = trippings.filter(tripping => {
    const matchesSearch = tripping.feeder.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tripping.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tripping.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || tripping.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cleared':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'cleared':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'investigating':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const statusCounts = {
    all: trippings.length,
    active: trippings.filter(t => t.status === 'active').length,
    cleared: trippings.filter(t => t.status === 'cleared').length,
    investigating: trippings.filter(t => t.status === 'investigating').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="h-6 w-6 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trippings Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage electrical system trippings
            </p>
          </div>
        </div>
        <Dialog open={isNewTrippingOpen} onOpenChange={setIsNewTrippingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              New Tripping
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Log New Tripping</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="substation">Substation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select substation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ss-main-01">SS-MAIN-01</SelectItem>
                    <SelectItem value="ss-sub-02">SS-SUB-02</SelectItem>
                    <SelectItem value="ss-dist-03">SS-DIST-03</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feeder">Feeder/Equipment</Label>
                <Input id="feeder" placeholder="e.g., 132KV Feeder F-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earth-fault">Earth Fault</SelectItem>
                    <SelectItem value="over-current">Over Current</SelectItem>
                    <SelectItem value="lightning">Lightning</SelectItem>
                    <SelectItem value="equipment-failure">Equipment Failure</SelectItem>
                    <SelectItem value="human-error">Human Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the tripping..." rows={3} />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setIsNewTrippingOpen(false)}>
                  Log Tripping
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsNewTrippingOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search trippings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                <SelectItem value="active">Active ({statusCounts.active})</SelectItem>
                <SelectItem value="cleared">Cleared ({statusCounts.cleared})</SelectItem>
                <SelectItem value="investigating">Investigating ({statusCounts.investigating})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trippings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Trippings ({filteredTrippings.length})</span>
            <div className="flex space-x-2">
              <Badge variant="destructive">{statusCounts.active} Active</Badge>
              <Badge variant="secondary">{statusCounts.investigating} Investigating</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTrippings.map((tripping) => (
              <div key={tripping.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-1 h-12 rounded-full ${getSeverityColor(tripping.severity)}`}></div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {getStatusIcon(tripping.status)}
                        <Badge className={getStatusColor(tripping.status)} variant="outline">
                          {tripping.status.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {tripping.feeder}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reason: {tripping.reason}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {tripping.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(tripping.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{tripping.substation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{tripping.employee}</span>
                  </div>
                  {tripping.duration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Duration: {tripping.duration}</span>
                    </div>
                  )}
                </div>

                {tripping.status === 'active' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        Mark as Cleared
                      </Button>
                      <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                        Under Investigation
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}