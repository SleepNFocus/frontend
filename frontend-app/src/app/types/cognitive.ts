export type CognitiveResultType = {
  raw_scores: {
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
  normalized_scores: {
    srt: number;
    symbol: number;
    pattern: number;
  };
  average_score: number;
  total_duration_sec: number;
};
