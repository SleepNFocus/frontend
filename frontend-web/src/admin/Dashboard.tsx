import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayTests: 0,
    activeUsers: 0,
    averageScore: 0
  });

  useEffect(() => {
    // TODO: API 연동
    // 임시 데이터
    setStats({
      totalUsers: 1234,
      todayTests: 56,
      activeUsers: 789,
      averageScore: 85.5
    });
  }, []);

  return (
    <div className="p-6">
      
      {/* 운영 현황 요약 */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <h2 className="text-xl font-semibold mb-4 text-textColor">운영 현황 요약</h2>
            <div className="p-2 border-r border-mediumLightGray last:border-r-0">
              <div className="text-softBlue text-sm font-medium">전체 가입자</div>
              <div className="text-2xl font-bold text-deepNavy">{stats.totalUsers.toLocaleString()}명</div>
            </div>
            <div className="p-2 border-r border-mediumLightGray last:border-r-0">
              <div className="text-softBlue text-sm font-medium">당일 테스트 완료</div>
              <div className="text-2xl font-bold text-deepNavy">{stats.todayTests.toLocaleString()}건</div>
            </div>
            <div className="p-2 border-r border-mediumLightGray last:border-r-0">
              <div className="text-softBlue text-sm font-medium">활성 사용자</div>
              <div className="text-2xl font-bold text-deepNavy">{stats.activeUsers.toLocaleString()}명</div>
            </div>
            <div className="p-2">
              <div className="text-softBlue text-sm font-medium">평균 점수</div>
              <div className="text-2xl font-bold text-deepNavy">{stats.averageScore}점</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 