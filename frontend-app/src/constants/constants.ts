export const GENDER_OPTIONS = [
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
  
];

// export const AGE_OPTIONS = [
//   { label: '10대', value: '10s' },
//   { label: '20대', value: '20s' },
//   { label: '30대', value: '30s' },
//   { label: '40대', value: '40s' },
//   { label: '50대 이상', value: '50s+' },
// ]; 
export const BIRTH_YEAR_OPTIONS = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => {
  const year = 1900 + i;
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
  { label: '선택 안 함', value: 'none' },
];