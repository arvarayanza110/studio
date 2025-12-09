"use client"

import { useState, useEffect, useRef } from 'react';
import type { CommandLog, RobotStatus, MotorParams } from '@/lib/types';

import DashboardHeader from '@/components/dashboard-header';
import ControlPanel from '@/components/dashboard/control-panel';
import RealtimeStatus from '@/components/dashboard/realtime-status';
import PerformanceChart from '@/components/dashboard/performance-chart';
import MotorParameters from '@/components/dashboard/motor-parameters';
import { useToast } from '@/hooks/use-toast';

// --- UNTUK INTEGRASI PROYEK NYATA ---
// Ganti nilai string di bawah ini dengan alamat IP ESP32/robot Anda.
const ROBOT_IP_ADDRESS = "IP_ESP32_KAMU"; // contoh: "192.168.1.42"
// ------------------------------------

const initialRobotStatus: RobotStatus = {
    main: 'Connecting...',
    target: '-',
    active: '-',
    lastColor: '-',
    lastAction: '-',
};

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [robotStatus, setRobotStatus] = useState<RobotStatus>(initialRobotStatus);
  const [commandHistory, setCommandHistory] = useState<CommandLog[]>([]);
  const { toast } = useToast();
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${ROBOT_IP_ADDRESS}/ws`;

    console.log(`Attempting to connect to robot at ${wsUrl}...`);

    websocket.current = new WebSocket(wsUrl);

    websocket.current.onopen = () => {
        console.log('WebSocket connection established.');
        setIsConnected(true);
        setRobotStatus(prev => ({...prev, main: 'Connected'}));
        toast({
            title: 'Connection Success',
            description: 'Successfully connected to the robot.',
        });
    };

    websocket.current.onmessage = (event) => {
        const message = event.data;
        console.log('Message from robot:', message);

        // --- Protokol Komunikasi: Robot ke UI ---
        // Robot HARUS mengirim statusnya dalam format JSON string:
        // 'status:{"main":"Following Line","target":"Blue","active":"PID","lastColor":"Black","lastAction":"Turn Right"}'
        if (message.startsWith('status:')) {
            try {
                const statusJson = message.substring(7);
                const statusObject = JSON.parse(statusJson);
                
                // Update state, pastikan semua key ada
                setRobotStatus(prevStatus => ({
                    main: statusObject.main ?? prevStatus.main,
                    target: statusObject.target ?? prevStatus.target,
                    active: statusObject.active ?? prevStatus.active,
                    lastColor: statusObject.lastColor ?? prevStatus.lastColor,
                    lastAction: statusObject.lastAction ?? prevStatus.lastAction,
                }));

            } catch (error) {
                console.error("Failed to parse status JSON from robot:", error);
                // Jika JSON tidak valid, tampilkan pesan mentah sebagai status utama
                setRobotStatus(prev => ({...initialRobotStatus, main: message}));
            }
        }
    };

    websocket.current.onclose = () => {
        console.log('WebSocket connection closed.');
        setIsConnected(false);
        setRobotStatus({...initialRobotStatus, main: 'Disconnected'});
        toast({
            title: 'Connection Lost',
            description: 'Disconnected from the robot.',
            variant: 'destructive',
        });
    };

    websocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
        setRobotStatus({...initialRobotStatus, main: 'Connection Error'});
        toast({
            title: 'Connection Error',
            description: 'Could not connect to the robot. Check the IP address and connection.',
            variant: 'destructive',
        });
    };

    return () => {
        if (websocket.current) {
            websocket.current.close();
        }
    };
}, [toast]);


  const handleSendCommand = (color: string) => {
      if (!websocket.current || websocket.current.readyState !== WebSocket.OPEN) {
          toast({
              title: 'Connection Error',
              description: 'Cannot send command. Robot is not connected.',
              variant: 'destructive',
          });
          return;
      }
      
      const command = `follow:${color}`;
      console.log('Sending command:', command);
      websocket.current.send(command);
      
      setCommandHistory(prevHistory => [...prevHistory, { color, timestamp: new Date() }]);
  };
  
  const handleSendParams = (params: MotorParams) => {
    if (!websocket.current || websocket.current.readyState !== WebSocket.OPEN) {
        toast({
            title: 'Connection Error',
            description: 'Cannot send parameters. Robot is not connected.',
            variant: 'destructive',
        });
        return;
    }

    // --- Protokol Komunikasi: UI ke Robot ---
    // UI akan mengirim parameter dalam format "param:<nama_param>=<nilai>"
    // Contoh: "param:speed_base=200"
    Object.entries(params).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
            const command = `param:${key}=${value}`;
            console.log('Sending parameter:', command);
            websocket.current?.send(command);
        }
    });

    toast({
        title: 'Parameters Sent',
        description: 'Motor parameters have been sent to the robot.',
    });
};

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader isConnected={isConnected} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <ControlPanel onSendCommand={handleSendCommand} disabled={!isConnected} />
            <RealtimeStatus status={robotStatus} />
          </div>
          <div className="lg:row-span-2">
            <MotorParameters onSendParams={handleSendParams} disabled={!isConnected} />
          </div>
          <div className="lg:col-span-3">
            <PerformanceChart commandHistory={commandHistory} />
          </div>
        </div>
      </main>
    </div>
  );
}
