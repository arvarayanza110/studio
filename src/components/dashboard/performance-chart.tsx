"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltip, ChartTooltipContent, ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { LineChart as LineChartIcon } from 'lucide-react';
import type { ChartData } from '@/lib/types';

type PerformanceChartProps = {
  data: ChartData[];
};

const chartConfig = {
  speed: {
    label: "Speed (cm/s)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-6 w-6" />
          Performance Analytics
        </CardTitle>
        <CardDescription>
          Real-time analysis of the robot's speed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[0, 25]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  indicator="dot"
                  labelClassName="font-bold"
                  className="bg-card/80 backdrop-blur-sm"
                  />}
              />
              <Line
                dataKey="speed"
                type="monotone"
                stroke="var(--color-speed)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
