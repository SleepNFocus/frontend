import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">사용자 관리</h2>
          <p className="text-gray-600">사용자 계정 및 권한 관리</p>
        </Link>
        <Link to="/admin/tests" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">테스트 관리</h2>
          <p className="text-gray-600">테스트 및 문제 관리</p>
        </Link>
        <Link to="/admin/analytics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">분석</h2>
          <p className="text-gray-600">시스템 사용 통계 및 분석</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 