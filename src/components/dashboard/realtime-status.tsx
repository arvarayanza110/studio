import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import type { RobotStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type RealtimeStatusProps = {
  status: RobotStatus;
};

const statusLabels: Record<keyof Omit<RobotStatus, 'main'>, string> = {
    target: 'Target',
    active: 'Active Program',
    lastColor: 'Last Color Seen',
    lastAction: 'Last Action',
};

const RealtimeStatus = ({ status }: RealtimeStatusProps) => {
  const displayStatus = { ...status };
  delete displayStatus.main;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <span>Robot Status</span>
            </div>
            <Badge variant={status.main === 'Connected' || status.main?.includes('Following') ? 'default' : 'destructive'} className="text-sm">
                {status.main}
            </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-3 pt-2">
        {(Object.keys(displayStatus) as Array<keyof typeof displayStatus>).map((key) => (
          <div key={key} className="flex flex-col gap-1 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground">{statusLabels[key]}</p>
            <p className="text-lg font-bold text-foreground truncate">{String(status[key])}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
