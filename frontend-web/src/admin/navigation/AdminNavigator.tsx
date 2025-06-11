import { Link, useLocation } from 'react-router-dom';

const AdminNavigator = () => {
  const location = useLocation();
  const navItems = [
    { to: '/', label: '홈' },
    { to: '/admin', label: '대시보드' },
    { to: '/admin/users', label: '사용자 관리' },
    { to: '/admin/tests', label: '테스트 관리' },
    { to: '/admin/analytics', label: '통계' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* 탭 네비게이션 */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    `px-3 py-2 border-b-2 transition ` +
                    (isActive
                      ? 'text-deepNavy border-deepNavy font-semibold'
                      : 'text-softBlue border-transparent hover:text-deepNavy hover:border-deepNavy')
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavigator; 