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

export interface SleepRecordApiResponse {
  id: number;
  date: string;
  sleep_duration: number;
  subjective_quality: number;
  sleep_latency: number;
  wake_count: number;
  disturb_factors: string[];
  memo: string;
  score: number;
  created_at: string;
  updated_at: string;
}