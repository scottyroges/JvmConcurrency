export type ScenarioLogType = {
  id: string;
  message: string;
  thread: string;
  timestamp: Date;
  startTime: number;
  endTime: number;
  activityId: string;
  url: string;
  osThread: string;
  virtualThread: string;
  coroutine: string;
};
