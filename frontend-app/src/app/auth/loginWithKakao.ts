// // import KakaoLogins, { KakaoProfile } from '@react-native-seoul/kakao-login';

// export interface KakaoLoginResult {
//   token: string;
//   profile: KakaoProfile;
// }

// export const loginWithKakao = async (): Promise<KakaoLoginResult | null> => {
//   try {
//     const { accessToken } = await KakaoLogins.login();
//     const profile = await KakaoLogins.getProfile();     

//     return { token: accessToken, profile };
//   } catch (error) {
//     console.error('카카오 로그인 실패:', error);
//     return null;
//   }
// };
