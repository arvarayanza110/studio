import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import type { RobotStatus } from '@/lib/types';

type RealtimeStatusProps = {
  status: string;
};

const RealtimeStatus = ({ status }: RealtimeStatusProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Robot Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 h-40">
        <h2 className="text-2xl font-bold tracking-tight text-center">{status}</h2>
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
