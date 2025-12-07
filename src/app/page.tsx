"use client"

import { useState, useEffect } from 'react';
import type { CommandLog } from '@/lib/types';

import DashboardHeader from '@/components/dashboard-header';
import ControlPanel from '@/components/dashboard/control-panel';
import RealtimeStatus from '@/components/dashboard/realtime-status';
import PerformanceChart from '@/components/dashboard/performance-chart';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [robotStatus, setRobotStatus] = useState<string>('Connecting...');
  const [commandHistory, setCommandHistory] = useState<CommandLog[]>([]);
  const { toast } = useToast();

  // Simulate connection to ESP32
  useEffect(() => {
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
      setRobotStatus('Idle');
      toast({
        title: 'Connection Success',
        description: 'Successfully connected to the robot.',
        variant: 'default',
      });
    }, 2000);
    return () => clearTimeout(connectionTimer);
  }, [toast]);


  const handleSendCommand = (color: string) => {
    if (!isConnected) {
      toast({
        title: 'Connection Error',
        description: 'Cannot send command. Robot is not connected.',
        variant: 'destructive',
      });
      return;
    }
    const newStatus = `Following ${color.charAt(0).toUpperCase() + color.slice(1)}`;
    setRobotStatus(newStatus);
    
    setCommandHistory(prevHistory => [...prevHistory, { color, timestamp: new Date() }]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader isConnected={isConnected} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ControlPanel onSendCommand={handleSendCommand} disabled={!isConnected} />
            <RealtimeStatus status={robotStatus} />
          </div>
          <div className="lg:col-span-3">
            <PerformanceChart commandHistory={commandHistory} />
          </div>
        </div>
      </main>
    </div>
  );
}
