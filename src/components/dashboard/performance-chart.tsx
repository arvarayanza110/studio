"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltip, ChartTooltipContent, ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { BarChart as BarChartIcon } from 'lucide-react';
import type { ChartData } from '@/lib/types';

type PerformanceChartProps = {
  data: ChartData[];
};

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--primary))",
  },
  blue: {
    label: "Blue",
    color: "#3b82f6",
  },
  green: {
    label: "Green",
    color: "#22c55e",
  },
  brown: {
    label: "Brown",
    color: "#a16207",
  },
} satisfies ChartConfig;

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChartIcon className="h-6 w-6" />
          Performance Analysis
        </CardTitle>
        <CardDescription>
          Count of each color-following command sent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="color"
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
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent
                  indicator="dot"
                  labelClassName="font-bold"
                  className="bg-card/80 backdrop-blur-sm"
                  />}
              />
              <Bar dataKey="count" radius={4}>
                {data.map((entry) => (
                    <Cell key={`cell-${entry.color}`} fill={chartConfig[entry.color.toLowerCase() as keyof typeof chartConfig]?.color || chartConfig.count.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
