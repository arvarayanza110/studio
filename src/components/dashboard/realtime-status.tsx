import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

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
      <CardContent className="flex items-center justify-center h-40">
        <div className="text-center">
          <p className="text-3xl font-bold">{status}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
