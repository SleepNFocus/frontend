export const GENDER_OPTIONS = [
  { label: '남성', value: '남' },
  { label: '여성', value: '여' },
];

export const BIRTH_YEAR_OPTIONS = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => {
  const year = 2025 - i;
  return { label: `${year}년`, value: `${year}` };
});

export const MBTI_OPTIONS = [
  { label: 'ISTJ', value: 'ISTJ' },
  { label: 'ISFJ', value: 'ISFJ' },
  { label: 'INFJ', value: 'INFJ' },
  { label: 'INTJ', value: 'INTJ' },
  { label: 'ISTP', value: 'ISTP' },
  { label: 'ISFP', value: 'ISFP' },
  { label: 'INFP', value: 'INFP' },
  { label: 'INTP', value: 'INTP' },
  { label: 'ESTP', value: 'ESTP' },
  { label: 'ESFP', value: 'ESFP' },
  { label: 'ENFP', value: 'ENFP' },
  { label: 'ENTP', value: 'ENTP' },
  { label: 'ESTJ', value: 'ESTJ' },
  { label: 'ESFJ', value: 'ESFJ' },
  { label: 'ENFJ', value: 'ENFJ' },
  { label: 'ENTJ', value: 'ENTJ' },
  { label: '선택 안 함', value: '선택안함' },
];

export const COGNITIVE_TYPE_OPTIONS = [
  { label: '복잡한 문제 해결·전략적 사고 중심', value: 'high_focus' },
  { label: '판단력·멀티태스킹·정보 처리 중심', value: 'multitask' },
  { label: '반복적 업무·신체 활동 중심', value: 'physical' },
  { label: '현재 일하지 않음 / 학생 / 은퇴 등', value: 'none' },
];

export const WORK_TIME_OPTIONS = [
  { label: '낮 시간대, 규칙적 근무 (9시~6시 등)', value: 'regular_day' },
  { label: '교대/야간 등 불규칙 근무', value: 'shift_night' },
  { label: '자유로운 시간대, 프리랜서 등', value: 'flexible' },
  { label: '일정 없음 / 일 안 함 / 학생 / 주부 등', value: 'no_schedule' },
];