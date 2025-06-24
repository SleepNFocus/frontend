/**
 * 사용자 상세 정보 (GET 응답)
 * API 명세의 UserDetail과 일치
 */
export interface User {
  user_id: number;
  email: string;
  nickname: string;
  gender: string;
  birth_year: number;
  status: string;
  is_active: boolean;
  is_admin: boolean;
  joined_at: string;
  last_login_at: string;
  updated_at: string;
}

/**
 * 사용자 정보 수정 요청 (PUT 요청 바디)
 * API 명세의 UserUpdate와 일치
 */
export interface UserUpdateRequest {
  user_id: number;
  email?: string;
  nickname?: string;
  is_admin?: boolean;
}

/**
 * 로그 정보 (GET 응답)
 * API 명세의 Log와 일치
 */
export interface AdminLog {
  logs_id: number;
  user_id: number;
  action_type: string;
  description: string;
  created_at: string;
}

/**
 * 로그 생성 요청 (POST 요청 바디)
 * API 명세의 LogCreate와 일치
 */
export interface LogCreateRequest {
  user_id?: number | null;
  action_type: string;
  description: string;
}

/**
 * 관리자 메인 대시보드 정보
 */
export interface AdminMain {
  total_users: number;
  active_users: number;
  new_users_today: number;
  total_logs: number;
}

/**
 * 사용자 목록 조회 API 응답 타입 (이제 사용되지 않음, 직접 배열 사용)
 */
// export interface UsersResponse { ... }

/**
 * 로그 목록 조회 API 응답 타입
 */
export interface LogsResponse {
  logs: AdminLog[];
  total: number;
  page: number;
  limit: number;
} 