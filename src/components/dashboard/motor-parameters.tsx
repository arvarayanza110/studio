"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SlidersHorizontal } from 'lucide-react';
import type { MotorParams } from '@/lib/types';

type MotorParametersProps = {
  onSendParams: (params: MotorParams) => void;
  disabled: boolean;
};

const initialParams: MotorParams = {
  speed_base: 200,
  speed_turn: 100,
  speed_slow: 80,
  speed_hard_turn: 150,
  red_speed_turn: 120,
  delay_red_speed_turn: 100,
  pivot_speed_forward: 90,
  pivot_speed_backward: 90,
  turn_90_spin_ms: 300,
};

const paramLabels: Record<keyof MotorParams, string> = {
  speed_base: 'Speed Base',
  speed_turn: 'Speed Turn',
  speed_slow: 'Speed Slow',
  speed_hard_turn: 'Speed Hard Turn',
  red_speed_turn: 'Red Speed Turn',
  delay_red_speed_turn: 'Delay Red Speed Turn',
  pivot_speed_forward: 'Pivot Speed Forward',
  pivot_speed_backward: 'Pivot Speed Backward',
  turn_90_spin_ms: 'Turn 90 Spin (ms)',
};

const MotorParameters = ({ onSendParams, disabled }: MotorParametersProps) => {
  const [params, setParams] = useState<MotorParams>(initialParams);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendParams(params);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-6 w-6" />
          Motor Parameters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {(Object.keys(initialParams) as Array<keyof MotorParams>).map((key) => (
              <div key={key} className="grid w-full items-center gap-1.5">
                <Label htmlFor={key}>{paramLabels[key]}</Label>
                <Input
                  type="number"
                  id={key}
                  name={key}
                  value={params[key]}
                  onChange={handleChange}
                  placeholder="e.g., 200"
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={disabled}>
            Send Parameters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MotorParameters;
