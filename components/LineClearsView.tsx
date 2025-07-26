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
  Activity, 
  Plus, 
  Search, 
  Clock, 
  User, 
  MapPin,
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Eye,
  FileText
} from 'lucide-react';

interface LineClear {
  id: string;
  timestamp: string;
  lineNumber: string;
  substation: string;
  requestedBy: string;
  issuedBy: string;
  purpose: string;
  status: 'issued' | 'cancelled' | 'completed';
  type: 'maintenance' | 'emergency' | 'testing';
  validFrom: string;
  validTo: string;
  description: string;
  safetyPrecautions: string[];
  workPermitNumber?: string;
}

export default function LineClearsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isNewLineClearOpen, setIsNewLineClearOpen] = useState(false);

  const lineClears: LineClear[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:15:30',
      lineNumber: '132KV Line L-3',
      substation: 'SS-MAIN-01',
      requestedBy: 'Maintenance Team A',
      issuedBy: 'EMP001',
      purpose: 'Conductor Replacement',
      status: 'issued',
      type: 'maintenance',
      validFrom: '2024-01-15 15:00:00',
      validTo: '2024-01-15 18:00:00',
      description: 'Line clear for conductor replacement work on 132KV transmission line',
      safetyPrecautions: ['Earth both ends', 'Install safety tags', 'Verify isolation'],
      workPermitNumber: 'WP-2024-001'
    },
    {
      id: '2',
      timestamp: '2024-01-15 12:30:45',
      lineNumber: '11KV Feeder F-2',
      substation: 'SS-SUB-02',
      requestedBy: 'Emergency Crew',
      issuedBy: 'EMP002',
      purpose: 'Fault Investigation',
      status: 'completed',
      type: 'emergency',
      validFrom: '2024-01-15 12:45:00',
      validTo: '2024-01-15 14:30:00',
      description: 'Emergency line clear for fault location and repair',
      safetyPrecautions: ['Isolate at both ends', 'Test for dead', 'Apply earths'],
      workPermitNumber: 'WP-2024-002'
    },
    {
      id: '3',
      timestamp: '2024-01-15 10:20:15',
      lineNumber: '33KV Line L-5',
      substation: 'SS-DIST-03',
      requestedBy: 'Testing Team',
      issuedBy: 'EMP003',
      purpose: 'Protection Testing',
      status: 'cancelled',
      type: 'testing',
      validFrom: '2024-01-15 11:00:00',
      validTo: '2024-01-15 13:00:00',
      description: 'Line clear for protection relay testing - cancelled due to weather',
      safetyPrecautions: ['Isolate protection circuits', 'Inform control room']
    }
  ];

  const filteredLineClears = lineClears.filter(lineClear => {
    const matchesSearch = lineClear.lineNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lineClear.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lineClear.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lineClear.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'testing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const statusCounts = {
    all: lineClears.length,
    issued: lineClears.filter(lc => lc.status === 'issued').length,
    completed: lineClears.filter(lc => lc.status === 'completed').length,
    cancelled: lineClears.filter(lc => lc.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Line Clears Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Issue and manage electrical line clearances for safe work
            </p>
          </div>
        </div>
        <Dialog open={isNewLineClearOpen} onOpenChange={setIsNewLineClearOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Issue Line Clear
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Issue New Line Clear</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lineNumber">Line/Equipment</Label>
                  <Input id="lineNumber" placeholder="e.g., 132KV Line L-3" />
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestedBy">Requested By</Label>
                  <Input id="requestedBy" placeholder="Team/Person name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input id="validFrom" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input id="validTo" type="datetime-local" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input id="purpose" placeholder="e.g., Conductor Replacement" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workPermit">Work Permit Number</Label>
                <Input id="workPermit" placeholder="WP-2024-XXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of work..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="safetyPrecautions">Safety Precautions</Label>
                <Textarea id="safetyPrecautions" placeholder="List safety measures to be taken..." rows={2} />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setIsNewLineClearOpen(false)}>
                  Issue Line Clear
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsNewLineClearOpen(false)}>
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
                <p className="text-sm text-gray-600">Active Line Clears</p>
                <p className="text-2xl font-bold text-green-600">
                  {statusCounts.issued}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-blue-600">
                  {statusCounts.completed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">
                  {statusCounts.cancelled}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">156</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
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
                placeholder="Search line clears..."
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
                <SelectItem value="issued">Issued ({statusCounts.issued})</SelectItem>
                <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
                <SelectItem value="cancelled">Cancelled ({statusCounts.cancelled})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Line Clears List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Line Clears ({filteredLineClears.length})</span>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {statusCounts.issued} Active
              </Badge>
              <Badge variant="secondary">{statusCounts.completed} Completed</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLineClears.map((lineClear) => (
              <div key={lineClear.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {getStatusIcon(lineClear.status)}
                        <Badge className={getTypeColor(lineClear.type)} variant="outline">
                          {lineClear.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(lineClear.status)} variant="outline">
                          {lineClear.status.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {lineClear.lineNumber}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Purpose: {lineClear.purpose}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Print
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {lineClear.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Issued: {new Date(lineClear.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{lineClear.substation}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>By: {lineClear.issuedBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>For: {lineClear.requestedBy}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-3">
                  <div>
                    <span className="font-medium">Valid From: </span>
                    {new Date(lineClear.validFrom).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Valid To: </span>
                    {new Date(lineClear.validTo).toLocaleString()}
                  </div>
                </div>

                {lineClear.workPermitNumber && (
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">Work Permit: </span>
                    {lineClear.workPermitNumber}
                  </div>
                )}

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded mb-3">
                  <p className="text-xs font-medium text-yellow-800 dark:text-yellow-400 mb-1">
                    Safety Precautions:
                  </p>
                  <ul className="text-xs text-yellow-700 dark:text-yellow-500 list-disc list-inside">
                    {lineClear.safetyPrecautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </div>

                {lineClear.status === 'issued' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        Mark as Completed
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Cancel Line Clear
                      </Button>
                      <Button size="sm" variant="outline" className="text-gray-600 border-gray-600 hover:bg-gray-50">
                        Extend Duration
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