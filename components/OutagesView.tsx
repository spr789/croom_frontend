"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Power, 
  Plus, 
  Search, 
  Clock, 
  User, 
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Pause,
  Edit,
  Eye
} from 'lucide-react';

interface Outage {
  id: string;
  timestamp: string;
  substation: string;
  equipment: string;
  type: 'planned' | 'forced' | 'emergency';
  employee: string;
  status: 'active' | 'completed' | 'extended';
  expectedDuration: string;
  actualDuration?: string;
  reason: string;
  description: string;
  affectedCustomers?: number;
  estimatedRestoration?: string;
}

export default function OutagesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isNewOutageOpen, setIsNewOutageOpen] = useState(false);

  const outages: Outage[] = [
    {
      id: '1',
      timestamp: '2024-01-15 13:45:20',
      substation: 'SS-SUB-02',
      equipment: 'Transformer T-2',
      type: 'planned',
      employee: 'EMP002',
      status: 'active',
      expectedDuration: '4 hours',
      reason: 'Scheduled Maintenance',
      description: 'Annual maintenance of 132/11KV transformer including oil testing and bushing inspection',
      affectedCustomers: 1200,
      estimatedRestoration: '2024-01-15 17:45:00'
    },
    {
      id: '2',
      timestamp: '2024-01-15 11:30:15',
      substation: 'SS-MAIN-01',
      equipment: '132KV Circuit Breaker CB-1',
      type: 'forced',
      employee: 'EMP001',
      status: 'completed',
      expectedDuration: '2 hours',
      actualDuration: '1.5 hours',
      reason: 'Equipment Failure',
      description: 'Circuit breaker failed to operate, required replacement of control mechanism',
      affectedCustomers: 800
    },
    {
      id: '3',
      timestamp: '2024-01-15 09:15:30',
      substation: 'SS-DIST-03',
      equipment: '11KV Panel P-3',
      type: 'emergency',
      employee: 'EMP003',
      status: 'extended',
      expectedDuration: '3 hours',
      reason: 'Safety Isolation',
      description: 'Emergency isolation due to oil leak in switchgear panel',
      affectedCustomers: 450,
      estimatedRestoration: '2024-01-15 16:00:00'
    }
  ];

  const filteredOutages = outages.filter(outage => {
    const matchesSearch = outage.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outage.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outage.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || outage.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'forced':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'extended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Power className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'extended':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Pause className="h-4 w-4 text-gray-500" />;
    }
  };

  const typeCounts = {
    all: outages.length,
    planned: outages.filter(o => o.type === 'planned').length,
    forced: outages.filter(o => o.type === 'forced').length,
    emergency: outages.filter(o => o.type === 'emergency').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Power className="h-6 w-6 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Outages Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track and manage planned and unplanned outages
            </p>
          </div>
        </div>
        <Dialog open={isNewOutageOpen} onOpenChange={setIsNewOutageOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" />
              Log Outage
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Log New Outage</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="outageType">Outage Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned Maintenance</SelectItem>
                    <SelectItem value="forced">Forced Outage</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="equipment">Equipment</Label>
                <Input id="equipment" placeholder="e.g., Transformer T-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Expected Duration (hours)</Label>
                <Input id="duration" type="number" placeholder="4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customers">Affected Customers</Label>
                <Input id="customers" type="number" placeholder="1200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Reason for outage..." rows={3} />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setIsNewOutageOpen(false)}>
                  Log Outage
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsNewOutageOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Outages</p>
                <p className="text-2xl font-bold text-red-600">
                  {outages.filter(o => o.status === 'active').length}
                </p>
              </div>
              <Power className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Affected Customers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {outages.filter(o => o.status === 'active').reduce((sum, o) => sum + (o.affectedCustomers || 0), 0)}
                </p>
              </div>
              <User className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-blue-600">2.5h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search outages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types ({typeCounts.all})</SelectItem>
                <SelectItem value="planned">Planned ({typeCounts.planned})</SelectItem>
                <SelectItem value="forced">Forced ({typeCounts.forced})</SelectItem>
                <SelectItem value="emergency">Emergency ({typeCounts.emergency})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Outages List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Outages ({filteredOutages.length})</span>
            <div className="flex space-x-2">
              <Badge variant="destructive">{outages.filter(o => o.status === 'active').length} Active</Badge>
              <Badge variant="secondary">{outages.filter(o => o.status === 'extended').length} Extended</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOutages.map((outage) => (
              <div key={outage.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {getStatusIcon(outage.status)}
                        <Badge className={getTypeColor(outage.type)} variant="outline">
                          {outage.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(outage.status)} variant="outline">
                          {outage.status.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {outage.equipment}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {outage.reason}
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
                  {outage.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(outage.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{outage.substation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{outage.employee}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Duration: {outage.actualDuration || outage.expectedDuration}</span>
                  </div>
                  {outage.affectedCustomers && (
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{outage.affectedCustomers} customers</span>
                    </div>
                  )}
                </div>

                {outage.estimatedRestoration && outage.status === 'active' && (
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
                    <span className="font-medium text-blue-800 dark:text-blue-400">
                      Estimated Restoration: {new Date(outage.estimatedRestoration).toLocaleString()}
                    </span>
                  </div>
                )}

                {outage.status === 'active' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        Mark as Completed
                      </Button>
                      <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                        Extend Duration
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        Update Status
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