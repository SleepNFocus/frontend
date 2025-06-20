import React from 'react';
import { Layout } from '@/components/common/Layout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AISleepTipsScreen } from '@/components/sleep/AISleepTipsScreen';

export const InsightPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const testScore = 75; // 실제로는 사용자의 최근 수면 점수를 가져와야 함

  return (
    <ErrorBoundary>
      <Layout showNavbar={true}>
        <AISleepTipsScreen
          date={today}
          score={testScore}
          showNavigation={true}
        />
      </Layout>
    </ErrorBoundary>
  );
};
