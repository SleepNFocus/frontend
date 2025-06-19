export interface Profile {
  nickname: string;
  profile_image: string | null;
  gender: string;
  birth_year: number;
  mbti: string;
  cognitive_type: string;
  cognitive_type_out_label: string;
  work_time_pattern: string;
  work_time_pattern_out_label: string;
  email: string;
}

export interface ProfileUpdateRequest {
  nickname?: string;
  profile_image?: string | null;
  gender?: string;
  birth_year?: number;
  mbti?: string;
  cognitive_type?: string;
  work_time_pattern?: string;
}

export interface MypageMain {
  nickname: string;
  profile_image: string;
  joined_at: string;
  tracking_days: number;
  total_sleep_hours: number;
  average_sleep_score: number;
  average_cognitive_score: number;
}

export interface Record {
  date: string;
  sleep_hour: number;
  sleep_score: number;
  cognitive_score: number;
}

export interface RecordsResponse {
  results: Record[];
}

export interface RecordDetail {
  week: string[];
  sleep_hour_arr: number[];
  cognitive_score_arr: number[];
  sleep_score_arr: number[];
  selected_date: string;
  detail: {
    date: string;
    total_sleep_hours: number;
    sleep_score: number;
    cognitive_score: number;
    my_score: number;
    symbol_count: number;
    pattern_score: number;
    pattern_time_avg: number;
    pattern_time_cnt: number;
    pattern_time_sum: number;
  };
} 