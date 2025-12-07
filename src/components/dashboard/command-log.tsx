import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LogEntry } from '@/lib/types';

type CommandLogProps = {
  logs: LogEntry[];
};

const CommandLog = ({ logs }: CommandLogProps) => {
  const getPrefixAndColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'send':
        return { prefix: '>>', color: 'text-primary' };
      case 'receive':
        return { prefix: '<<', color: 'text-accent-foreground' };
      case 'system':
        return { prefix: '##', color: 'text-muted-foreground' };
      default:
        return { prefix: '??', color: 'text-foreground' };
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          Communication Log
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[300px] w-full p-6 pt-0">
          <div className="space-y-2">
            {logs.map((log, index) => {
              const { prefix, color } = getPrefixAndColor(log.type);
              return (
                <div key={index} className="flex items-start gap-2 font-code text-sm">
                  <span className="text-muted-foreground opacity-75">{log.timestamp}</span>
                  <div className="flex-grow">
                    <span className={cn("font-bold mr-2", color)}>{prefix}</span>
                    <span className={cn(color)}>{log.message}</span>
                  </div>
                </div>
              );
            })}
             {logs.length === 0 && (
                <div className="text-center text-muted-foreground pt-10">
                    <p>Awaiting connection...</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CommandLog;
