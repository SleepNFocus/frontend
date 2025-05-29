export type SleepOption = {
    label: string;
    value: string; // 예: '07:00', '12:00+', '04:30'
    score: number;
  };
  
  export const sleepQuestion1 = {
    id: 'q1',
    text: '어젯밤 총 몇 시간 주무셨나요?',
    maxScore: 25,
    options: [
      { id: 1, label: '4시간 이하', value: '04:00-', score: 0 },
      { id: 2, label: '4시간 30분', value: '04:30', score: 0 },
      { id: 3, label: '5시간', value: '05:00', score: 5 },
      { id: 4, label: '5시간 30분', value: '05:30', score: 10 },
      { id: 5, label: '6시간', value: '06:00', score: 15 },
      { id: 6, label: '6시간 30분', value: '06:30', score: 20 },
      { id: 7, label: '7시간', value: '07:00', score: 25 },
      { id: 8, label: '7시간 30분', value: '07:30', score: 25 },
      { id: 9, label: '8시간', value: '08:00', score: 25 },
      { id: 10, label: '8시간 30분', value: '08:30', score: 25 },
      { id: 11, label: '9시간', value: '09:00', score: 25 },
      { id: 12, label: '9시간 30분', value: '09:30', score: 20 },
      { id: 13, label: '10시간', value: '10:00', score: 15 },
      { id: 14, label: '10시간 30분', value: '10:30', score: 10 },
      { id: 15, label: '11시간', value: '11:00', score: 5 },
      { id: 16, label: '11시간 30분', value: '11:30', score: 0 },
      { id: 17, label: '12시간 이상', value: '12:00+', score: 0 },
    ],
  };

  export const sleepQuestion2 = {
    id: 'q2',
    text: '아침에 기상했을 때 느낀 주관적인 수면의 질은 어떠셨나요?',
    maxScore: 30,
    options: [
      { id: 1, label: '매우 개운함', value: '매우 개운함', score: 30 },
      { id: 2, label: '개운함', value: '개운함', score: 25 },
      { id: 3, label: '보통', value: '보통', score: 20 },
      { id: 4, label: '약간 피곤함', value: '약간 피곤함', score: 10 },
      { id: 5, label: '매우 피곤함', value: '매우 피곤함', score: 0 },
      ],
  };

  export const sleepQuestion3 = {
    id: 'q3',
    text: '잠드는 데 걸린 시간과 밤새 깬 횟수는 어떻게 되시나요?',
    maxScore: 25,
    subQuestions: [
        {
          id: 'fallAsleep',
          label: 'A. 잠드는 데 걸린 시간',
          options: [
            { label: '15분 이하', value: 'under_15', score: 15 },
            { label: '15분 ~ 30분', value: '15_30', score: 10 },
            { label: '30분 초과', value: 'over_30', score: 0 },
          ],
        },
        {
          id: 'wakeCount',
          label: 'B. 밤새 깬 횟수',
          options: [
            { label: '0번', value: '0', score: 10 },
            { label: '1~2번', value: '1_2', score: 5 },
            { label: '3번 이상', value: '3_more', score: 0 },
          ],
        },
    ]
}