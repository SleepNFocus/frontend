import { useAdminMain } from '@/services/adminApi';

const Dashboard = () => {
  const { data, isLoading, error } = useAdminMain();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-textColor">관리자 대시보드</h1>
      <div className="space-y-2">
        <div>총 사용자: {data?.total_users}</div>
        <div>활성 사용자: {data?.active_users}</div>
        <div>오늘 가입자: {data?.new_users_today}</div>
        <div>총 로그 수: {data?.total_logs}</div>
      </div>
    </div>
  );
};

export default Dashboard; 