import { useAllUsers, useCreateLog } from '@/services/adminApi';
import { useState, useEffect } from 'react';
import UserDetailModal from './UserDetailModal'; // 모달 컴포넌트 import
import { User } from '@/types/admin'; // User 타입을 명시적으로 import
import { Card } from '@/components/ui/Card';

// UserManagement: 관리자 - 사용자 관리 페이지
const UserManagement = () => {
  const { data: users, isLoading, error } = useAllUsers();
  const { mutate: createLog } = useCreateLog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: keyof User | 'last_login_at', direction: 'asc' | 'desc'} | null>(null);
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [dateFilterType, setDateFilterType] = useState<'joined' | 'last_login'>('joined');
  const [dateAfter, setDateAfter] = useState('');
  const [dateBefore, setDateBefore] = useState('');
  
  // API 호출 상태 로깅
  console.log('🔍 UserManagement API 상태:', {
    users: users ? `${users.length}명` : '로딩중',
    isLoading,
    error: error?.message || '없음'
  });

  // 사용자 관리 페이지 접근 로그 기록
  useEffect(() => {
    createLog({
      action_type: 'USER_MANAGEMENT_ACCESS',
      description: '관리자가 사용자 관리 페이지에 접근했습니다.',
    });
  }, [createLog]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  // 필터/검색 적용
  let filteredUsers = users ?? [];
  if (searchQuery) {
    filteredUsers = filteredUsers.filter((user: User) =>
      user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (statusFilter) {
    filteredUsers = filteredUsers.filter(u => u.status === statusFilter);
  }
  if (adminFilter) {
    filteredUsers = filteredUsers.filter(u => adminFilter === 'admin' ? u.is_admin : !u.is_admin);
  }
  if (genderFilter) {
    filteredUsers = filteredUsers.filter(u => u.gender === genderFilter);
  }
  if (dateAfter) {
    if (dateFilterType === 'joined') {
      filteredUsers = filteredUsers.filter(u => u.joined_at && u.joined_at >= dateAfter);
    } else {
      filteredUsers = filteredUsers.filter(u => u.last_login_at && u.last_login_at >= dateAfter);
    }
  }
  if (dateBefore) {
    if (dateFilterType === 'joined') {
      filteredUsers = filteredUsers.filter(u => u.joined_at && u.joined_at <= dateBefore);
    } else {
      filteredUsers = filteredUsers.filter(u => u.last_login_at && u.last_login_at <= dateBefore);
    }
  }

  // 정렬 적용
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    let aValue = a[key as keyof User];
    let bValue = b[key as keyof User];
    if (key === 'joined_at' || key === 'last_login_at') {
      aValue = a[key] ? new Date(a[key] as string).getTime() : 0;
      bValue = b[key] ? new Date(b[key] as string).getTime() : 0;
    }
    if (key === 'is_admin') {
      aValue = aValue ? 1 : 0;
      bValue = bValue ? 1 : 0;
    }
    if (aValue! < bValue!) return direction === 'asc' ? -1 : 1;
    if (aValue! > bValue!) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // 사용자 검색 로그 기록
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      createLog({
        action_type: 'USER_SEARCH',
        description: `사용자 검색: "${query}"`,
      });
    }
  };

  // 필터 적용 로그 기록
  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        if (value !== 'all') {
          createLog({
            action_type: 'USER_FILTER',
            description: `상태 필터 적용: ${value}`,
          });
        }
        break;
      case 'gender':
        setGenderFilter(value);
        if (value !== 'all') {
          createLog({
            action_type: 'USER_FILTER',
            description: `성별 필터 적용: ${value}`,
          });
        }
        break;
      case 'admin':
        setAdminFilter(value);
        if (value !== 'all') {
          createLog({
            action_type: 'USER_FILTER',
            description: `권한 필터 적용: ${value}`,
          });
        }
        break;
    }
  };

  // 정렬 로그 기록
  const handleSort = (key: keyof User | 'last_login_at') => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    
    createLog({
      action_type: 'USER_SORT',
      description: `사용자 목록 정렬: ${key} (${direction})`,
    });
  };

  // 상태, 권한, 성별 옵션 추출
  const statusOptions = Array.from(new Set(users?.map(u => u.status))).filter(Boolean);
  const genderOptions = Array.from(new Set(users?.map(u => u.gender))).filter(Boolean);

  // 상태 한글 매핑 함수
  const getStatusKoreanName = (status: string) => {
    const statusMap: Record<string, string> = {
      'active': '활성',
      'withdrawn': '탈퇴',
      'suspended': '정지',
      'pending': '대기',
      'inactive': '비활성'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="p-6">
      {/* 필터/검색 입력창 */}
      <div className="mb-4 space-y-3 w-full">
        {/* 첫 번째 줄: 검색창 */}
        <div className="flex w-full">
          <input
            type="text"
            placeholder="닉네임/이메일 검색..."
            className="w-full px-4 py-2 border border-mediumLightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-softBlue focus:border-transparent"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        {/* 두 번째 줄: 필터 옵션들 */}
        <div className="flex flex-wrap gap-2 items-center w-full">
          <select value={statusFilter} onChange={(e) => handleFilterChange('status', e.target.value)} className="px-2 py-2 border rounded">
            <option value="">상태 전체</option>
            {statusOptions.map(opt => <option key={opt} value={opt}>{getStatusKoreanName(opt)}</option>)}
          </select>
          <select value={adminFilter} onChange={(e) => handleFilterChange('admin', e.target.value)} className="px-2 py-2 border rounded">
            <option value="">권한 전체</option>
            <option value="admin">관리자</option>
            <option value="user">일반</option>
          </select>
          <select value={genderFilter} onChange={(e) => handleFilterChange('gender', e.target.value)} className="px-2 py-2 border rounded">
            <option value="">성별 전체</option>
            {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id="joined"
                name="dateFilterType"
                value="joined"
                checked={dateFilterType === 'joined'}
                onChange={(e) => setDateFilterType(e.target.value as 'joined' | 'last_login')}
                className="mr-1"
              />
              <label htmlFor="joined" className="text-xs">가입일</label>
              <input
                type="radio"
                id="last_login"
                name="dateFilterType"
                value="last_login"
                checked={dateFilterType === 'last_login'}
                onChange={(e) => setDateFilterType(e.target.value as 'joined' | 'last_login')}
                className="ml-2 mr-1"
              />
              <label htmlFor="last_login" className="text-xs">마지막 로그인</label>
            </div>
            <input type="date" value={dateAfter} onChange={(e) => setDateAfter(e.target.value)} className="px-2 py-2 border rounded" />
            <span>~</span>
            <input type="date" value={dateBefore} onChange={(e) => setDateBefore(e.target.value)} className="px-2 py-2 border rounded" />
          </div>
        </div>
      </div>

      {/* 전체 인원 수 표시 */}
      <div className="mb-2 text-sm text-gray-600">총 {sortedUsers.length}명</div>

      {/* 사용자 목록 */}
      <Card className="w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full">
            <thead>
              <tr className="bg-lightGray">
                <th className="px-4 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">번호</th>
                <th onClick={() => handleSort('nickname')} className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider cursor-pointer select-none">
                  닉네임 {sortConfig?.key === 'nickname' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider cursor-pointer select-none">
                  이메일 {sortConfig?.key === 'email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider cursor-pointer select-none">
                  상태 {sortConfig?.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('joined_at')} className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider cursor-pointer select-none">
                  가입일 {sortConfig?.key === 'joined_at' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('last_login_at')} className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider cursor-pointer select-none">
                  마지막 로그인 {sortConfig?.key === 'last_login_at' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('is_admin')} className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider cursor-pointer select-none">
                  권한 {sortConfig?.key === 'is_admin' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-mediumLightGray">
              {sortedUsers.map((user: User, idx: number) => (
                <tr key={user.user_id} onClick={() => setSelectedUserId(user.user_id)} className="cursor-pointer hover:bg-lightGray">
                  <td className="px-4 py-4 whitespace-nowrap text-textColor text-center">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.nickname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{getStatusKoreanName(user.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{new Date(user.joined_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_admin ? 'bg-deepNavy bg-opacity-10 text-deepNavy' : 'bg-softBlue bg-opacity-10 text-softBlue'}`}>
                      {user.is_admin ? '관리자' : '일반 사용자'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 선택된 사용자 상세 정보 모달 */}
      {selectedUserId && (
        <UserDetailModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  );
};

export default UserManagement; 