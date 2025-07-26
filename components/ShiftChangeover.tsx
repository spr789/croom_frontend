"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserCheck, UserX, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ShiftChangeover() {
  const [takeoverEmployeeId, setTakeoverEmployeeId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, logout } = useAuth();

  const getCurrentShift = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return 'A';
    if (hour >= 14 && hour < 22) return 'B';
    if (hour >= 22 || hour < 6) return 'C';
    return 'OFF';
  };

  const handleShiftChangeover = () => {
    if (!takeoverEmployeeId) return;
    
    // Mock shift changeover process
    alert(`Shift changeover initiated. Employee ${takeoverEmployeeId} will take over the shift.`);
    setIsDialogOpen(false);
    logout();
  };

  const handleTakeOver = () => {
    alert('Shift taken over successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserCheck className="h-5 w-5" />
          <span>Shift Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Current Shift</Label>
            <Badge variant="outline" className="text-lg font-bold">
              Shift {getCurrentShift()}
            </Badge>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">On Duty</Label>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{user?.employeeId}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <UserX className="mr-2 h-4 w-4" />
                Shift Change Over
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Shift Changeover</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="takeoverEmployee">Employee ID Taking Over</Label>
                  <Input
                    id="takeoverEmployee"
                    value={takeoverEmployeeId}
                    onChange={(e) => setTakeoverEmployeeId(e.target.value)}
                    placeholder="Enter Employee ID"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleShiftChangeover} 
                    className="flex-1"
                    disabled={!takeoverEmployeeId}
                  >
                    Initiate Changeover
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleTakeOver} className="w-full">
            <UserCheck className="mr-2 h-4 w-4" />
            Take Over Shift
          </Button>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-sm text-gray-600 mb-2 block">Recent Handovers</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">EMP002 → EMP001</span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-3 w-3" />
                <span>06:00</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">EMP003 → EMP002</span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Yesterday 22:00</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}