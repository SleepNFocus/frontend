export interface CognitiveResultType {
  has_data: boolean;
  results: {
    detailed_raw_scores: {
      srt: {
        avg_ms: number;
        total_duration_sec: number;
        average_score: number;
      };
      symbol: {
        correct: number;
        avg_ms: number;
        symbol_accuracy: number;
        total_duration_sec: number;
        average_score: number;
      };
      pattern: {
        correct: number;
        total_duration_sec: number;
        average_score: number;
      };
    };
    normalized_scores: Record<string, unknown>;
    average_score: number;
    total_duration_sec: number;
  }[];
}

export enum TestSession {
  SRT = 1,
  SYMBOL = 2,
  PATTERN = 3,
}
