import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

type ControlPanelProps = {
  onSendCommand: (color: string) => void;
  disabled: boolean;
};

const colors = [
  { name: 'Red', value: 'red', hex: '#ef4444' },
  { name: 'Green', value: 'green', hex: '#22c55e' },
  { name: 'Blue', value: 'blue', hex: '#3b82f6' },
  { name: 'Yellow', value: 'yellow', hex: '#eab308' },
];

const ControlPanel = ({ onSendCommand, disabled }: ControlPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-6 w-6" />
          Command Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Select a color for the robot to follow. Commands are sent instantly.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {colors.map((color) => (
            <Button
              key={color.value}
              onClick={() => onSendCommand(color.value)}
              disabled={disabled}
              className="justify-start text-base py-6"
            >
              <span
                className="w-5 h-5 rounded-full mr-3 border-2 border-primary-foreground/50"
                style={{ backgroundColor: color.hex }}
              />
              Follow {color.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
