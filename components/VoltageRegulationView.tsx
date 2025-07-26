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
  TrendingUp, 
  Plus, 
  Search, 
  Clock, 
  User, 
  MapPin,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

interface VoltageRegulation {
  id: string;
  timestamp: string;
  substation: string;
  busVoltage: number;
  targetVoltage: number;
  tapPosition: number;
  previousTapPosition: number;
  action: 'tap-up' | 'tap-down' | 'no-action';
  employee: string;
  remarks: string;
  status: 'normal' | 'high' | 'low' | 'critical';
}

export default function VoltageRegulationView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubstation, setSelectedSubstation] = useState('all');
  const [isNewVROpen, setIsNewVROpen] = useState(false);

  const voltageRegulations: VoltageRegulation[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:00:15',
      substation: 'SS-MAIN-01',
      busVoltage: 135.2,
      targetVoltage: 132.0,
      tapPosition: 5,
      previousTapPosition: 6,
      action: 'tap-down',
      employee: 'EMP001',
      remarks: 'Voltage high due to light load conditions',
      status: 'high'
    },
    {
      id: '2',
      timestamp: '2024-01-15 13:30:45',
      substation: 'SS-SUB-02',
      busVoltage: 131.8,
      targetVoltage: 132.0,
      tapPosition: 3,
      previousTapPosition: 3,
      action: 'no-action',
      employee: 'EMP002',
      remarks: 'Voltage within acceptable limits',
      status: 'normal'
    },
    {
      id: '3',
      timestamp: '2024-01-15 13:15:20',
      substation: 'SS-DIST-03',
      busVoltage: 129.5,
      targetVoltage: 132.0,
      tapPosition: 2,
      previousTapPosition: 1,
      action: 'tap-up',
      employee: 'EMP003',
      remarks: 'Voltage low due to heavy load, tap adjusted',
      status: 'low'
    },
    {
      id: '4',
      timestamp: '2024-01-15 12:45:10',
      substation: 'SS-MAIN-01',
      busVoltage: 127.8,
      targetVoltage: 132.0,
      tapPosition: 1,
      previousTapPosition: 2,
      action: 'tap-up',
      employee: 'EMP001',
      remarks: 'Critical low voltage, immediate action taken',
      status: 'critical'
    }
  ];

  const filteredVRs = voltageRegulations.filter(vr => {
    const matchesSearch = vr.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vr.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vr.remarks.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubstation = selectedSubstation === 'all' || vr.substation === selectedSubstation;
    return matchesSearch && matchesSubstation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'tap-up':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'tap-down':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'no-action':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getVoltageDeviation = (actual: number, target: number) => {
    const deviation = ((actual - target) / target) * 100;
    return deviation.toFixed(1);
  };

  const substationCounts = {
    all: voltageRegulations.length,
    'SS-MAIN-01': voltageRegulations.filter(vr => vr.substation === 'SS-MAIN-01').length,
    'SS-SUB-02': voltageRegulations.filter(vr => vr.substation === 'SS-SUB-02').length,
    'SS-DIST-03': voltageRegulations.filter(vr => vr.substation === 'SS-DIST-03').length
  };

  const statusCounts = {
    normal: voltageRegulations.filter(vr => vr.status === 'normal').length,
    high: voltageRegulations.filter(vr => vr.status === 'high').length,
    low: voltageRegulations.filter(vr => vr.status === 'low').length,
    critical: voltageRegulations.filter(vr => vr.status === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Voltage Regulation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and control system voltage levels
            </p>
          </div>
        </div>
        <Dialog open={isNewVROpen} onOpenChange={setIsNewVROpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add VR Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Voltage Regulation Entry</DialogTitle>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="busVoltage">Bus Voltage (kV)</Label>
                  <Input id="busVoltage" type="number" step="0.1" placeholder="135.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetVoltage">Target Voltage (kV)</Label>
                  <Input id="targetVoltage" type="number" step="0.1" placeholder="132.0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tapPosition">Current Tap Position</Label>
                  <Input id="tapPosition" type="number" placeholder="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousTap">Previous Tap Position</Label>
                  <Input id="previousTap" type="number" placeholder="4" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="action">Action Taken</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tap-up">Tap Up</SelectItem>
                    <SelectItem value="tap-down">Tap Down</SelectItem>
                    <SelectItem value="no-action">No Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea id="remarks" placeholder="Additional remarks..." rows={2} />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setIsNewVROpen(false)}>
                  Add Entry
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsNewVROpen(false)}>
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
                <p className="text-sm text-gray-600">Normal Voltage</p>
                <p className="text-2xl font-bold text-green-600">
                  {statusCounts.normal}
                </p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Voltage</p>
                <p className="text-2xl font-bold text-orange-600">
                  {statusCounts.high}
                </p>
              </div>
              <ArrowUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Voltage</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {statusCounts.low}
                </p>
              </div>
              <ArrowDown className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {statusCounts.critical}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
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
                placeholder="Search voltage regulation entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubstation} onValueChange={setSelectedSubstation}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by substation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Substations ({substationCounts.all})</SelectItem>
                <SelectItem value="SS-MAIN-01">SS-MAIN-01 ({substationCounts['SS-MAIN-01']})</SelectItem>
                <SelectItem value="SS-SUB-02">SS-SUB-02 ({substationCounts['SS-SUB-02']})</SelectItem>
                <SelectItem value="SS-DIST-03">SS-DIST-03 ({substationCounts['SS-DIST-03']})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Voltage Regulation Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Voltage Regulation Entries ({filteredVRs.length})</span>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {statusCounts.critical} Critical
              </Badge>
              <Badge variant="secondary">{statusCounts.normal} Normal</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVRs.map((vr) => (
              <div key={vr.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {getActionIcon(vr.action)}
                        <Badge className={getStatusColor(vr.status)} variant="outline">
                          {vr.status.toUpperCase()}
                        </Badge>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {vr.substation}
                        </span>
                        <span className="text-sm text-gray-600">
                          Action: {vr.action.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {vr.remarks}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {vr.busVoltage} kV
                    </div>
                    <div className={`text-xs ${
                      parseFloat(getVoltageDeviation(vr.busVoltage, vr.targetVoltage)) > 0 
                        ? 'text-red-600' 
                        : parseFloat(getVoltageDeviation(vr.busVoltage, vr.targetVoltage)) < -2
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}>
                      {getVoltageDeviation(vr.busVoltage, vr.targetVoltage)}% deviation
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(vr.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{vr.employee}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-3 w-3" />
                    <span>Target: {vr.targetVoltage} kV</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Tap: {vr.previousTapPosition} → {vr.tapPosition}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>Δ: {(vr.busVoltage - vr.targetVoltage).toFixed(1)} kV</span>
                  </div>
                </div>

                {vr.status === 'critical' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-400">
                        Critical voltage level requires immediate attention
                      </span>
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