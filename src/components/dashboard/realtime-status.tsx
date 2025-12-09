import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import type { RobotStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type RealtimeStatusProps = {
  status: RobotStatus;
};

const statusLabels: Record<keyof RobotStatus, string> = {
    currentStatus: 'Current Status',
    target: 'Target',
    active: 'Active Program',
    lastColor: 'Last Color Seen',
    lastAction: 'Last Action',
};

const RealtimeStatus = ({ status }: RealtimeStatusProps) => {
  const isConnected = status.currentStatus === 'Connected' || status.currentStatus?.includes('Following');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <span>Robot Status</span>
            </div>
            <Badge variant={isConnected ? 'default' : 'destructive'} className="text-sm">
                {status.currentStatus}
            </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-3 pt-2">
        {(Object.keys(statusLabels) as Array<keyof RobotStatus>).map((key) => {
          // Hide other fields if not connected or error
          if (key !== 'currentStatus' && !isConnected) return null;
          // Don't render the main status again in the grid
          if (key === 'currentStatus') return null;

          return (
            <div key={key} className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-semibold text-muted-foreground">{statusLabels[key]}</p>
              <p className="text-lg font-bold text-foreground truncate">{String(status[key])}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
