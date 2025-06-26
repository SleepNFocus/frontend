export interface SleepRecord {
  id: number;
  date: string;
  sleep_duration: number; // 분 단위
  sleep_latency: number; // 분 단위
  wake_count: number;
  subjective_quality: number; // 1-5
  environment_quality: number; // 1-5
  score: number;
}

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
  date: string;
  sleep_duration: number;
  subjective_quality: number;
  sleep_latency: number;
  wake_count: number;
  disturb_factors: string[];
  memo: string | null;
  score: number;
  created_at: string;
  updated_at: string;
}