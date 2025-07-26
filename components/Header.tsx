"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Moon, Sun, User, LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTimeBlock } from '@/hooks/useTimeBlock';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useAuth();
  const { currentTime, timeBlock, countdown } = useTimeBlock();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              CROOM Logbook
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Live Time Display */}
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Time Block Countdown */}
          <div className="text-center border-l pl-4">
            <div className="text-xs text-gray-600 dark:text-gray-400">Time Block</div>
            <div className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
              {timeBlock}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400">
              Next: {countdown}
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{user?.employeeId}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-semibold">
                {user?.name}
              </div>
              <div className="px-2 py-1.5 text-xs text-gray-600 dark:text-gray-400">
                {user?.role}
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs">
                <div className="text-gray-600 dark:text-gray-400">Last Login</div>
                <div className="font-mono text-xs">
                  {user?.lastLoginTime && new Date(user.lastLoginTime).toLocaleString()}
                </div>
                <div className="text-gray-500 text-xs">IP: {user?.lastLoginIP}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}