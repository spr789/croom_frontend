"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import WeatherBanner from '@/components/WeatherBanner';
import DashboardOverview from '@/components/DashboardOverview';
import TrippingsView from '@/components/TrippingsView';
import OutagesView from '@/components/OutagesView';
import LineClearsView from '@/components/LineClearsView';
import VoltageRegulationView from '@/components/VoltageRegulationView';
import Sidebar from '@/components/Sidebar';

type DashboardView = 'overview' | 'trippings' | 'outages' | 'line-clears' | 'voltage-regulation';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<DashboardView>('overview');

  useEffect(() => {
    if (isLoading) return; // Wait for auth to finish checking
    if (!user) router.push('/');
  }, [user, isLoading, router]);
  

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'trippings':
        return <TrippingsView />;
      case 'outages':
        return <OutagesView />;
      case 'line-clears':
        return <LineClearsView />;
      case 'voltage-regulation':
        return <VoltageRegulationView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <WeatherBanner />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Sidebar currentView={currentView} onViewChange={setCurrentView} />
          </div>
          
          <div className="lg:col-span-4">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
}