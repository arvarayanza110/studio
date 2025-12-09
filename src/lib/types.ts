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
  target?: string | number;
  active?: string | number;
  lastColor?: string | number;
  lastAction?: string | number;
};

export type MotorParams = {
  speed_base: number | string;
  speed_turn: number | string;
  speed_slow: number | string;
  speed_hard_turn: number | string;
  red_speed_turn: number | string;
  delay_red_speed_turn: number | string;
  pivot_speed_forward: number | string;
  pivot_speed_backward: number | string;
  turn_90_spin_ms: number | string;
};
