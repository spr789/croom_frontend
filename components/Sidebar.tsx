"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Zap, 
  Power, 
  Activity, 
  AlertTriangle, 
  BarChart3,
  Settings,
  TrendingUp,
  FileText
} from 'lucide-react';
import ShiftChangeover from '@/components/ShiftChangeover';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'overview' | 'trippings' | 'outages' | 'line-clears' | 'voltage-regulation') => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isTrippingDialogOpen, setIsTrippingDialogOpen] = useState(false);
  const [isOutageDialogOpen, setIsOutageDialogOpen] = useState(false);
  const [isVRDialogOpen, setIsVRDialogOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3, color: 'text-blue-600' },
    { id: 'trippings', label: 'Trippings', icon: Zap, color: 'text-red-600', count: 12 },
    { id: 'outages', label: 'Outages', icon: Power, color: 'text-orange-600', count: 5 },
    { id: 'line-clears', label: 'Line Clears', icon: Activity, color: 'text-green-600', count: 8 },
    { id: 'voltage-regulation', label: 'Voltage Regulation', icon: TrendingUp, color: 'text-purple-600', count: 15 }
  ];

  const stats = {
    ongoingOutages: 3,
    activeTrippings: 5,
    pendingLineClear: 2
  };

  const NewTrippingDialog = () => (
    <Dialog open={isTrippingDialogOpen} onOpenChange={setIsTrippingDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Tripping Entry</DialogTitle>
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
            <Input id="feeder" placeholder="e.g., 11KV Feeder F-1" />
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
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Additional details..." rows={3} />
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => setIsTrippingDialogOpen(false)}>
              Submit
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsTrippingDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const NewOutageDialog = () => (
    <Dialog open={isOutageDialogOpen} onOpenChange={setIsOutageDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Outage</DialogTitle>
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
            <Label htmlFor="equipment">Equipment</Label>
            <Input id="equipment" placeholder="e.g., Transformer T-2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Expected Duration (hours)</Label>
            <Input id="duration" type="number" placeholder="4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea id="reason" placeholder="Reason for outage..." rows={3} />
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => setIsOutageDialogOpen(false)}>
              Submit
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsOutageDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const NewVRDialog = () => (
    <Dialog open={isVRDialogOpen} onOpenChange={setIsVRDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Voltage Regulation Entry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="busVoltage">Bus Voltage (kV)</Label>
            <Input id="busVoltage" type="number" step="0.1" placeholder="135.5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tapPosition">Tap Position</Label>
            <Input id="tapPosition" type="number" placeholder="5" />
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
            <Button className="flex-1" onClick={() => setIsVRDialogOpen(false)}>
              Submit
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsVRDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-between ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => onViewChange(item.id as any)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.count && (
                  <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                    {item.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      
      {/* Live Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Live Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Power className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Ongoing Outages</span>
            </div>
            <Badge variant="secondary">{stats.ongoingOutages}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-red-500" />
              <span className="text-sm">Active Trippings</span>
            </div>
            <Badge variant="secondary">{stats.activeTrippings}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Pending Line Clear</span>
            </div>
            <Badge variant="secondary">{stats.pendingLineClear}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Shift Management */}
      <ShiftChangeover />

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-400 font-medium">
              Duplicate Tripping Alert
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">
              Feeder F-1 has tripped 3 times in the last hour.
            </p>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-400 font-medium">
              VR Log Reminder
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-500 mt-1">
              Voltage regulation entry pending for Bus-B.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Components */}
      <NewTrippingDialog />
      <NewOutageDialog />
      <NewVRDialog />
    </div>
  );
}