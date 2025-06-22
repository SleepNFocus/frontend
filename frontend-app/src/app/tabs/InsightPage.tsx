import React from 'react';
import { Layout } from '@/components/common/Layout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AISleepTipsScreen } from '@/components/sleep/AISleepTipsScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/App';

type InsightPageRouteProp = RouteProp<RootStackParamList, 'Insight'>;

export const InsightPage: React.FC = () => {
  const route = useRoute<InsightPageRouteProp>();
  // route.params가 있으면 해당 값을 사용하고, 없으면 기본값을 사용합니다.
  const date = route.params?.date || new Date().toISOString().split('T')[0];
  const score = route.params?.score ?? 75; // 실제로는 사용자의 최근 수면 점수를 가져와야 함

  return (
    <ErrorBoundary>
      <Layout showNavbar={true}>
        <AISleepTipsScreen date={date} score={score} showNavigation={true} />
      </Layout>
    </ErrorBoundary>
  );
};

export default InsightPage;
