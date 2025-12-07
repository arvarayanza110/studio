export type LogEntry = {
  type: 'send' | 'receive' | 'system';
  message: string;
  timestamp: string;
};

export type ChartData = {
  time: string;
  speed: number;
};
