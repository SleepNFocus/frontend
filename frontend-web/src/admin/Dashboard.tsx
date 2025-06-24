import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllUsers, useAdminLogs } from '@/services/adminApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card";

const Dashboard = () => {
  const { data: users, isLoading, error } = useAllUsers();
  const { data: logs } = useAdminLogs();
  const [isLoginSuccessModalOpen, setLoginSuccessModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('login_success') === 'true') {
      setLoginSuccessModalOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!users) return null;

  // 통계 계산
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active).length;
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const newUsersToday = users.filter(u => u.joined_at && u.joined_at.slice(0, 10) === today).length;
  const adminCount = users.filter(u => u.is_admin).length;
  const maleCount = users.filter(u => u.gender === '남').length;
  const femaleCount = users.filter(u => u.gender === '여').length;
  const statusCounts = users.reduce((acc, u) => {
    acc[u.status] = (acc[u.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const recentUsers = [...users].sort((a, b) => new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime()).slice(0, 5);
  const recentLogins = [...users].filter(u => u.last_login_at).sort((a, b) => new Date(b.last_login_at!).getTime() - new Date(a.last_login_at!).getTime()).slice(0, 5);
  const ageGroups = users.reduce((acc, u) => {
    if (!u.birth_year || u.birth_year < 1900 || u.birth_year > new Date().getFullYear()) {
      acc['기타'] = (acc['기타'] || 0) + 1;
      return acc;
    }
    const decade = Math.floor(u.birth_year / 10) * 10;
    acc[`${decade}년대생`] = (acc[`${decade}년대생`] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedAgeGroups = Object.entries(ageGroups).sort(([, a], [, b]) => b - a);
  const recentLogs = Array.isArray(logs?.logs) ? logs.logs.slice(0, 10) : [];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-textColor">관리자 대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold">총 사용자</div>
              <div className="text-2xl font-bold text-softBlue">{totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold">활성 사용자</div>
              <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold">오늘 가입자</div>
              <div className="text-2xl font-bold text-orange-500">{newUsersToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold">관리자 수</div>
              <div className="text-2xl font-bold text-deepNavy">{adminCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold">성별 비율</div>
              <div className="text-base">남: {maleCount} / 여: {femaleCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold">상태별 사용자 수</div>
              <div className="text-base space-y-1">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status}>{status}: {count}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 최근 가입자 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">최근 가입자</h2>
          <Card>
            <CardContent className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">닉네임</th>
                    <th className="px-4 py-2">이메일</th>
                    <th className="px-4 py-2">가입일</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(u => (
                    <tr key={u.user_id}>
                      <td className="px-4 py-2">{u.nickname}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{new Date(u.joined_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* 최근 로그인 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">최근 로그인</h2>
          <Card>
            <CardContent className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">닉네임</th>
                    <th className="px-4 py-2">이메일</th>
                    <th className="px-4 py-2">마지막 로그인</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogins.map(u => (
                    <tr key={u.user_id}>
                      <td className="px-4 py-2">{u.nickname}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* 연령대별 분포 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">출생년도별 사용자 분포</h2>
          <Card>
            <CardContent className="p-4 flex flex-wrap gap-4">
              {sortedAgeGroups.length === 0 && <div>데이터 없음</div>}
              {sortedAgeGroups.map(([group, count]) => (
                <div key={group} className="text-base">{group}: {count}명</div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 최근 관리자 활동 로그 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">최근 관리자 활동 로그</h2>
          <Card>
            <CardContent className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">시간</th>
                    <th className="px-4 py-2">행위 유형</th>
                    <th className="px-4 py-2">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs.length === 0 && (
                    <tr><td colSpan={3} className="text-center py-2">로그 없음</td></tr>
                  )}
                  {recentLogs.map(log => (
                    <tr key={log.logs_id}>
                      <td className="px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="px-4 py-2">{log.action_type}</td>
                      <td className="px-4 py-2">{log.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isLoginSuccessModalOpen} onOpenChange={setLoginSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 로그인 성공</DialogTitle>
            <DialogDescription>
              관리자 대시보드에 오신 것을 환영합니다!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setLoginSuccessModalOpen(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard; 