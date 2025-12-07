import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, ScanLine, Bot } from 'lucide-react';

type RealtimeStatusProps = {
  status: string;
  readings: {
    speed: number;
    left: number;
    right: number;
  };
};

const StatusItem = ({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string | number, unit?: string }) => (
  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium text-muted-foreground">{label}</span>
    </div>
    <div className="font-mono text-lg font-semibold">
      {value}
      {unit && <span className="text-sm font-sans text-muted-foreground ml-1">{unit}</span>}
    </div>
  </div>
);

const RealtimeStatus = ({ status, readings }: RealtimeStatusProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Robot Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 text-center bg-primary text-primary-foreground rounded-lg">
          <p className="text-sm font-medium text-primary-foreground/80">Current State</p>
          <p className="text-xl font-bold">{status}</p>
        </div>
        <StatusItem
          icon={<Gauge className="h-5 w-5 text-primary" />}
          label="Speed"
          value={readings.speed.toFixed(1)}
          unit="cm/s"
        />
        <StatusItem
          icon={<ScanLine className="h-5 w-5 text-primary" />}
          label="Left Sensor"
          value={readings.left.toFixed(0)}
        />
        <StatusItem
          icon={<ScanLine className="h-5 w-5 text-primary" />}
          label="Right Sensor"
          value={readings.right.toFixed(0)}
        />
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
