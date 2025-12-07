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
      <CardContent className="flex items-center justify-center h-full pb-6">
        <div className="p-4 text-center bg-primary text-primary-foreground rounded-lg w-full">
          <p className="text-2xl font-bold">{status}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
