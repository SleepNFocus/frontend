export type DayRecord = {
  date: string;
  sleep_hour: number;
  sleep_score: number;
  cognitive_score: number;
};

export type WeekRecord = {
  start_date: string;
  end_date: string;
  total_sleep_hours: number;
  average_sleep_score: number;
  average_cognitive_score: number;
};

export type MonthRecord = {
  month: string;
  total_sleep_hours: number;
  average_sleep_score: number;
  average_cognitive_score: number;
};

export type RecordListResponse =
  | { results: DayRecord[] }
  | { results: WeekRecord[] }
  | { results: MonthRecord[] };
