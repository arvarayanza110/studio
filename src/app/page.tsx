"use client"

import { useState, useEffect, useRef } from 'react';
import type { CommandLog } from '@/lib/types';

import DashboardHeader from '@/components/dashboard-header';
import ControlPanel from '@/components/dashboard/control-panel';
import RealtimeStatus from '@/components/dashboard/realtime-status';
import PerformanceChart from '@/components/dashboard/performance-chart';
import { useToast } from '@/hooks/use-toast';

// --- Untuk Integrasi Proyek Nyata ---
// Ganti dengan alamat IP robot Anda.
const ROBOT_IP_ADDRESS = "192.168.1.100"; 
// ------------------------------------


export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [robotStatus, setRobotStatus] = useState<string>('Connecting...');
  const [commandHistory, setCommandHistory] = useState<CommandLog[]>([]);
  const { toast } = useToast();
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // --- Logika untuk terhubung ke WebSocket di robot ---
    console.log(`Attempting to connect to robot at ws://${ROBOT_IP_ADDRESS}/ws...`);
    
    // Ganti URL dengan alamat IP dan port robot Anda.
    websocket.current = new WebSocket(`ws://${ROBOT_IP_ADDRESS}/ws`);

    // Saat koneksi berhasil dibuka
    websocket.current.onopen = () => {
      console.log('WebSocket connection established.');
      setIsConnected(true);
      setRobotStatus('Connected');
      toast({
        title: 'Connection Success',
        description: 'Successfully connected to the robot.',
        variant: 'default',
      });
    };

    // Saat menerima pesan dari robot
    websocket.current.onmessage = (event) => {
      const message = event.data;
      console.log('Message from robot:', message);
      // Asumsikan robot mengirim statusnya dalam format "status:Following Blue"
      if (message.startsWith('status:')) {
        const newStatus = message.split(':')[1];
        setRobotStatus(newStatus);
      }
    };
    
    // Saat koneksi ditutup
    websocket.current.onclose = () => {
      console.log('WebSocket connection closed.');
      setIsConnected(false);
      setRobotStatus('Disconnected');
      toast({
        title: 'Connection Lost',
        description: 'Disconnected from the robot.',
        variant: 'destructive',
      });
    };

    // Saat terjadi error
    websocket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      setRobotStatus('Connection Error');
       toast({
        title: 'Connection Error',
        description: 'Could not connect to the robot. Check the IP address and connection.',
        variant: 'destructive',
      });
    };

    // Fungsi cleanup saat komponen di-unmount
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
    
    // Kirim perintah ke robot melalui WebSocket
    const command = `follow:${color}`;
    console.log('Sending command:', command);
    websocket.current.send(command);

    // Tambahkan ke riwayat perintah secara optimis
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
