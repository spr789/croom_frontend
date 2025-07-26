"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, FileText, Filter, BarChart3 } from 'lucide-react';

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedSubstation, setSelectedSubstation] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');

  const presetFilters = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'This Month', days: 30 },
    { label: 'Last Month', days: 60 }
  ];

  const applyPreset = (days: number) => {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - days);
    
    setDateFrom(fromDate.toISOString().split('T')[0]);
    setDateTo(today.toISOString().split('T')[0]);
  };

  const mockReportData = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:45',
      type: 'Tripping',
      substation: 'SS-MAIN-01',
      employee: 'EMP001',
      description: '11KV Feeder F-1 tripped due to earth fault',
      status: 'Cleared'
    },
    {
      id: '2',
      timestamp: '2024-01-15 13:45:20',
      type: 'Outage',
      substation: 'SS-SUB-02',
      employee: 'EMP002',
      description: 'Planned maintenance outage for transformer T-2',
      status: 'Active'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:15:30',
      type: 'Line Clear',
      substation: 'SS-MAIN-01',
      employee: 'EMP001',
      description: 'Line clear issued for 132KV line L-3',
      status: 'Completed'
    }
  ];

  const exportReport = (format: 'pdf' | 'excel') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('excel')}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Substation</Label>
              <Select value={selectedSubstation} onValueChange={setSelectedSubstation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Substations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Substations</SelectItem>
                  <SelectItem value="ss-main-01">SS-MAIN-01</SelectItem>
                  <SelectItem value="ss-sub-02">SS-SUB-02</SelectItem>
                  <SelectItem value="ss-dist-03">SS-DIST-03</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Employee</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="All Employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="emp001">EMP001</SelectItem>
                  <SelectItem value="emp002">EMP002</SelectItem>
                  <SelectItem value="emp003">EMP003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tripping">Tripping</SelectItem>
                  <SelectItem value="outage">Outage</SelectItem>
                  <SelectItem value="line-clear">Line Clear</SelectItem>
                  <SelectItem value="vr-log">VR Log</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2 mt-4">
            <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
              Quick Filters:
            </Label>
            {presetFilters.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset.days)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Results */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Report Results ({mockReportData.length} entries)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Timestamp</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Substation</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Employee</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReportData.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-mono">
                          {row.timestamp}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                          <Badge variant="outline">{row.type}</Badge>
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                          {row.substation}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                          {row.employee}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                          {row.description}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                          <Badge
                            className={
                              row.status === 'Active'
                                ? 'bg-red-100 text-red-800'
                                : row.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }
                          >
                            {row.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-600 mt-1">+12% from last period</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Trippings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-600 mt-1">50% of total events</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Outages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-gray-600 mt-1">25% of total events</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Resolution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4h</div>
                <p className="text-xs text-gray-600 mt-1">-15% from last period</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Event Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Charts would be displayed here using a charting library</p>
                  <p className="text-sm mt-2">Event distribution, trends, and analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}