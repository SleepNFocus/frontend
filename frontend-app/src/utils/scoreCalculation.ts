export interface ScoreBreakdown {
  durationScore: number; 
  qualityScore: number; 
  sleepEfficiencyScore: number; 
  environmentScore: number; 
}

export const calculateScoreBreakdown = (sleepData: any): ScoreBreakdown => {
  const durationScore = calculateDurationScore(sleepData.sleep_duration);
  
  const qualityScore = calculateQualityScore(sleepData.subjective_quality);
  
  const sleepEfficiencyScore = calculateSleepEfficiencyScore(
    sleepData.sleep_latency, 
    sleepData.wake_count
  );
  
  const environmentScore = calculateEnvironmentScore(sleepData.disturb_factors);

  return {
    durationScore,
    qualityScore,
    sleepEfficiencyScore,
    environmentScore,
  };
};

const calculateDurationScore = (durationMinutes: number): number => {
  const hours = durationMinutes / 60;
  
  if (hours >= 7 && hours <= 9) return 25;
  if (hours >= 6.5 && hours < 7) return 20;
  if (hours > 9 && hours <= 9.5) return 20;
  if (hours >= 6 && hours < 6.5) return 15;
  if (hours > 9.5 && hours <= 10) return 15;
  if (hours >= 5 && hours < 6) return 10;
  if (hours > 10 && hours <= 11) return 10;
  return 5;
};

const calculateQualityScore = (subjectiveQuality: number): number => {
  switch (subjectiveQuality) {
    case 5: return 30;
    case 4: return 25;
    case 3: return 20;
    case 2: return 15;
    case 1: return 10;
    default: return 10;
  }
};

const calculateSleepEfficiencyScore = (sleepLatency: number, wakeCount: number): number => {
  let score = 25;
  
  if (sleepLatency > 30) score -= 10;
  else if (sleepLatency > 15) score -= 5;
  
  if (wakeCount >= 3) score -= 10;
  else if (wakeCount >= 2) score -= 5;
  else if (wakeCount >= 1) score -= 3;
  
  return Math.max(0, score);
};

const calculateEnvironmentScore = (disturbFactors: string[]): number => {
  const maxScore = 20;
  const deduction = disturbFactors.length * 3;
  return Math.max(0, maxScore - deduction);
};

export const formatSleepDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}시간 ${mins}분`;
};

export const formatSleepLatency = (minutes: number): string => {
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}시간 ${mins}분`;
};