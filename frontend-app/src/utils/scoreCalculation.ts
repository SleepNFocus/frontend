import { SleepRecord } from '@/types/sleep';

export interface ScoreBreakdown {
  durationScore: number; 
  qualityScore: number; 
  sleepEfficiencyScore: number; 
  environmentScore: number; 
}

export const calculateScoreBreakdown = (sleepData: SleepRecord) => {
  const durationScore = calculateDurationScore(sleepData.sleep_duration);
  const qualityScore = calculateQualityScore(sleepData.subjective_quality);
  const sleepEfficiencyScore = calculateSleepEfficiencyScore(
    sleepData.sleep_latency,
    sleepData.wake_count
  );
  const environmentScore = calculateEnvironmentScore(sleepData.environment_quality);

  return {
    durationScore,
    qualityScore,
    sleepEfficiencyScore,
    environmentScore,
  };
};

export const formatSleepDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}시간 ${mins}분`;
};

export const formatSleepLatency = (minutes: number): string => {
  if (minutes < 1) return '1분 미만';
  return `${Math.round(minutes)}분`;
};

const calculateDurationScore = (duration: number): number => {
  const hours = duration / 60;
  if (hours >= 7 && hours <= 9) return 25;
  if (hours >= 6 && hours <= 10) return 20;
  if (hours >= 5 && hours <= 11) return 15;
  return 10;
};

const calculateQualityScore = (quality: number): number => {
  return quality * 6; // 5점 만점을 30점 만점으로 변환
};

const calculateSleepEfficiencyScore = (latency: number, wakeCount: number): number => {
  let score = 20;
  if (latency > 30) score -= 5;
  if (wakeCount > 2) score -= 5;
  return Math.max(0, score);
};

const calculateEnvironmentScore = (quality: number): number => {
  return quality * 3; // 5점 만점을 15점 만점으로 변환
};