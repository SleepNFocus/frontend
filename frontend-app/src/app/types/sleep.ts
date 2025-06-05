export interface ScoreBreakdown {
  durationScore: number;
  qualityScore: number;
  sleepEfficiencyScore: number;
  environmentScore: number;
}

export interface SleepRecordData {
  selectedDate: string;
  sleepDuration: string;
  sleepQuality: string;
  fallAsleepTime: string;
  nightWakeCount: string;
  sleepDisruptors: string[];
  totalScore: number;
  scoreBreakdown: ScoreBreakdown;
}
