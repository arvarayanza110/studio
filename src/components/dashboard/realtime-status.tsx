import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Target, Palette, Workflow, Footprints } from 'lucide-react';
import type { RobotStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

type RealtimeStatusProps = {
  status: RobotStatus;
};

const statusDetailsConfig = [
  { key: 'target', label: 'Target', icon: Target },
  { key: 'active', label: 'Active Color', icon: Palette },
  { key: 'lastColor', label: 'Last Color', icon: Workflow },
  { key: 'lastAction', label: 'Last Action', icon: Footprints },
];

const RealtimeStatus = ({ status }: RealtimeStatusProps) => {
  const { main, ...details } = status;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Robot Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 h-40">
        <h2 className="text-2xl font-bold tracking-tight text-center">{main}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {statusDetailsConfig.map(({ key, label, icon: Icon }) =>
            details[key] ? (
              <div key={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>
                  <strong>{label}:</strong> {details[key]}
                </span>
              </div>
            ) : null
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeStatus;
