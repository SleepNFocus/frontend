export interface SocialLoginRequest {
    provider: 'kakao' | 'google';
    code: string; // 프론트엔드에서는 여전히 code를 받지만, 백엔드로는 access_token을 전송
}

export interface User {
    user_id: number;
    social_type: string;
    social_id: string;
    email:string;
    nickname:string;
    profile_img: string | null;
    status: string;
    has_completed_onboarding: boolean;
}

export interface SocialLoginResponse {
    access: string;
    refresh: string;
    user: {
        user_id: number;
        social_type: string;
        social_id: string;
        nickname: string;
        email: string;
        profile_img: string | null;
        status: string;
        has_completed_onboarding: boolean;
    };
}

// 토큰 관련 타입 정의
export interface TokenRefreshRequest {
    refresh: string;
}

export interface TokenRefreshResponse {
    access: string;
}

export interface TokenValidationResponse {
    valid: boolean;
    user?: User;
}

// 로그인 상태 타입
export interface LoginState {
    isLoggedIn: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}