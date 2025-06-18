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

export interface UserUpdateRequest {
  nickname?: string;
  gender?: string;
  birth_year?: number;
  status?: string;
  is_active?: boolean;
  is_admin?: boolean;
}

export interface AdminLog {
  id: number;
  user_id: number;
  action: string;
  details: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface AdminMain {
  total_users: number;
  active_users: number;
  new_users_today: number;
  total_logs: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface LogsResponse {
  logs: AdminLog[];
  total: number;
  page: number;
  limit: number;
} 