"use client"

import { useState, useEffect, useCallback } from 'react';
import type { LogEntry, ChartData } from '@/lib/types';

import DashboardHeader from '@/components/dashboard-header';
import ControlPanel from '@/components/dashboard/control-panel';
import RealtimeStatus from '@/components/dashboard/realtime-status';
import PerformanceChart from '@/components/dashboard/performance-chart';
import CommandLog from '@/components/dashboard/command-log';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [robotStatus, setRobotStatus] = useState<string>('Connecting...');
  const [sensorReadings, setSensorReadings] = useState({ left: 0, right: 0, speed: 0 });
  const [commandLog, setCommandLog] = useState<LogEntry[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { toast } = useToast();

  const addLog = useCallback((type: 'send' | 'receive' | 'system', message: string) => {
    setCommandLog(prevLog => {
      const newEntry: LogEntry = {
        type,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
      // Keep the log from getting too long
      return [...prevLog.slice(-99), newEntry];
    });
  }, []);

  // Simulate connection to ESP32
  useEffect(() => {
    addLog('system', 'Attempting to connect to robot...');
    const connectionTimer = setTimeout(() => {
      setIsConnected(true);
      setRobotStatus('Idle');
      addLog('system', 'Connection established with Line Commander bot.');
      toast({
        title: 'Connection Success',
        description: 'Successfully connected to the robot.',
        variant: 'default',
      });
    }, 2000);
    return () => clearTimeout(connectionTimer);
  }, [addLog, toast]);

  // Simulate real-time data stream from the robot
  useEffect(() => {
    if (!isConnected) return;

    const dataInterval = setInterval(() => {
      const newSpeed = robotStatus === 'Idle' ? 0 : Math.random() * 15 + 5;
      const newLeftSensor = robotStatus.includes('RED') ? Math.random() * 50 + 50 : Math.random() * 30;
      const newRightSensor = robotStatus.includes('BLUE') ? Math.random() * 50 + 50 : Math.random() * 30;
      
      const newReadings = {
        speed: newSpeed,
        left: newLeftSensor,
        right: newRightSensor,
      };
      setSensorReadings(newReadings);

      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setChartData(prevData => [...prevData.slice(-19), { time: newTime, speed: newReadings.speed }]);

      addLog('receive', `DATA: Speed=${newSpeed.toFixed(1)}, L_Sensor=${newLeftSensor.toFixed(0)}, R_Sensor=${newRightSensor.toFixed(0)}`);
    }, 3000);

    return () => clearInterval(dataInterval);
  }, [isConnected, robotStatus, addLog]);

  const handleSendCommand = (color: string) => {
    if (!isConnected) {
      toast({
        title: 'Connection Error',
        description: 'Cannot send command. Robot is not connected.',
        variant: 'destructive',
      });
      return;
    }
    const newStatus = `Following ${color.toUpperCase()} line`;
    setRobotStatus(newStatus);
    addLog('send', `CMD: FOLLOW_LINE(${color.toUpperCase()})`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader isConnected={isConnected} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ControlPanel onSendCommand={handleSendCommand} disabled={!isConnected} />
            <RealtimeStatus status={robotStatus} readings={sensorReadings} />
          </div>
          <div className="lg:col-span-2">
            <PerformanceChart data={chartData} />
          </div>
          <div>
            <CommandLog logs={commandLog} />
          </div>
        </div>
      </main>
    </div>
  );
}
