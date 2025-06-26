# 🧠 Focuz: 당신의 수면, 퍼포먼스가 되다

<div align="center">
 <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native">
 <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo">
 <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
 <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white" alt="Zustand">
</div>

<br>

> 수면과 인지 기능의 상관관계를 일상에서 쉽게 추적하고 체험할 수 있는 모바일 애플리케이션

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 가이드](#-개발-가이드)
- [팀 구성](#-팀-구성)
- [라이선스](#-라이선스)

## 🎯 프로젝트 소개

Focuz는 사용자의 수면 패턴과 인지 기능 간의 상관관계를 직관적으로 체험하고 기록할 수 있는 서비스입니다.

### 핵심 가치

- **직관적 체험**: "아, 내 기능이 이렇게 떨어져 있구나"를 수치로 확인
- **일상 속 추적**: 매일 1분, 간단한 테스트로 컨디션 체크
- **데이터 기반 인사이트**: 수면과 퍼포먼스의 상관관계 시각화

## ✨ 주요 기능

### 🛌 수면 기록

- 간편한 수면 시간 입력 (드롭다운 방식)
- 수면의 질 평가 (기상 시 컨디션, 밤중에 깬 횟수)
- 수면 패턴 추적 및 분석

### 🧪 인지 기능 테스트 (6종)

1. **단순 반응 시간 (SRT)**: 반응 속도 측정
2. **Go/No-Go**: 주의력과 반응 억제 능력
3. **스트룹 과제**: 인지적 억제 능력
4. **시각 패턴 외우기**: 단기 기억력
5. **시각 탐색**: 시각적 주의력
6. **연속 계산**: 수리력과 처리 속도

### 📊 결과 분석

- 육각형 차트로 보는 인지 능력 프로파일
- 수면-인지 기능 상관관계 그래프
- 7일/30일 추세 분석
- 개인 맞춤형 인사이트

### 🔐 사용자 관리

- 소셜 로그인 (구글, 카카오)
- 개인 기록 관리
- 프라이버시 보호

## 🛠 기술 스택

### Frontend

- **Framework**: React Native + Expo (SDK 50)
- **Language**: TypeScript
- **State Management**: Zustand
- **API State**: TanStack Query
- **Navigation**: Expo Router
- **UI Components**: React Native Paper
- **Charts**: React Native Chart Kit
- **Forms**: React Hook Form + Yup

### Backend Integration

- **Authentication**: OAuth 2.0 (Google, Kakao)
- **API Communication**: Axios
- **Storage**: AsyncStorage

### Development Tools

- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Native Testing Library
- **CI/CD**: EAS Build

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상
- Expo Go 앱 (개발 테스트용)

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-team/focuz-app.git
cd focuz-app

# 의존성 설치
npm install

# 개발 서버 실행
npx expo start

# iOS 시뮬레이터 실행
npx expo start --ios

# Android 에뮬레이터 실행
npx expo start --android
```

### 📁 프로젝트 구조

```
focuz-app/
├── app/ # Expo Router 페이지
│ ├── (auth)/ # 인증 관련 페이지
│ ├── (tabs)/ # 메인 탭 페이지
│ ├── admin/ # 관리자 페이지
│ └── \_layout.tsx # 루트 레이아웃
│
├── components/ # 재사용 컴포넌트
│ ├── auth/ # 인증 관련 컴포넌트
│ ├── sleep/ # 수면 기록 관련 컴포넌트
│ ├── test/ # 테스트 용도 컴포넌트
│ └── common/ # 공통 UI 컴포넌트 (예: 버튼, 카드 등)
│
├── lib/ # 라이브러리 및 유틸리티
│ ├── api.ts # API 클라이언트 설정
│ └── utils.ts # 일반 유틸 함수
│
├── hooks/ # 커스텀 훅
│
├── store/ # Zustand 전역 상태 관리
│
├── types/ # 공통 타입 정의
│
└── assets/ # 이미지, 폰트 등의 정적 자원
```

## 👥 개발 가이드

### 브랜치 전략

- **main** : 프로덕션 배포
- **develop** : 개발 통합
- **feature/@** : 기능 개발
- **fix/@**: 버그 수정

### 커밋 컨벤션

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드
- **chore**: 빌드 업무 수정

### 코드 스타일

ESLint + Prettier 설정 준수<br>
TypeScript strict mode 사용<br>
함수형 컴포넌트 + Hooks 사용

## 👨‍👩‍👧‍👦 팀 구성

### Frontend Team

개발자 A: 인증/사용자 관리<br>
개발자 B: 수면 기록 + AI 기능<br>
개발자 C: 인지 테스트 및 결과<br>
개발자 D: 관리자 페이지 + 공통 컴포넌트

### Backend Team

5명의 백엔드 개발자와 긴밀히 협업

## 📱 빌드 및 배포

개발 빌드
bash# iOS 개발 빌드
<br>
eas build --platform ios --profile development

# Android 개발 빌드

eas build --platform android --profile development
<br>
프로덕션 빌드
<br>
bash# iOS 앱스토어 빌드
<br>
eas build --platform ios --profile production
<br>

# Android 플레이스토어 빌드

eas build --platform android --profile production
<br>

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 LICENSE 파일을 참조하세요.

<div align="center">
  <p>Made with ❤️ by Focuz Team</p>
</div>
