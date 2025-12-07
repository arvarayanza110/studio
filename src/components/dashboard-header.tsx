import { Bot, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

type DashboardHeaderProps = {
  isConnected: boolean;
};

const DashboardHeader = ({ isConnected }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Bot className="h-7 w-7 text-primary" />
          <h1 className="ml-2 text-2xl font-bold tracking-tight font-headline">
            Line Commander
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
              isConnected
                ? "border-accent/50 bg-accent/20 text-accent-foreground"
                : "border-destructive/50 bg-destructive/20 text-destructive"
            )}
          >
            {isConnected ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                isConnected ? "bg-accent animate-pulse" : "bg-destructive"
              )}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
