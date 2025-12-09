export type ChartData = {
  color: string;
  count: number;
};

export type CommandLog = {
  color: string;
  timestamp: Date;
};

export type RobotStatus = {
  main: string;
  [key: string]: string;
};
