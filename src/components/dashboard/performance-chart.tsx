"use client"

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltip, ChartTooltipContent, ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart as BarChartIcon } from 'lucide-react';
import type { CommandLog, ChartData } from '@/lib/types';
import { isToday, isThisMonth } from 'date-fns';

type PerformanceChartProps = {
  commandHistory: CommandLog[];
};

type TimeFrame = 'today' | 'month' | 'all';

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

const PerformanceChart = ({ commandHistory }: PerformanceChartProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('today');

  const processData = (logs: CommandLog[]): ChartData[] => {
    const counts = logs.reduce((acc, log) => {
      acc[log.color] = (acc[log.color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colorOrder: Record<string, number> = { blue: 1, green: 2, brown: 3 };

    return Object.entries(counts)
      .map(([color, count]) => ({
        color: color.charAt(0).toUpperCase() + color.slice(1),
        count,
      }))
      .sort((a, b) => (colorOrder[a.color.toLowerCase()] || 99) - (colorOrder[b.color.toLowerCase()] || 99));
  };
  
  const getFilteredData = () => {
    let filteredLogs = commandHistory;
    if (timeFrame === 'today') {
        filteredLogs = commandHistory.filter(log => isToday(log.timestamp));
    } else if (timeFrame === 'month') {
        filteredLogs = commandHistory.filter(log => isThisMonth(log.timestamp));
    }
    return processData(filteredLogs);
  };
  
  const data = getFilteredData();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-6 w-6" />
                Performance Analysis
                </CardTitle>
                <CardDescription>
                Count of each color-following command sent.
                </CardDescription>
            </div>
            <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)} className="w-auto">
                <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                    <TabsTrigger value="all">All Time</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20 }}>
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
