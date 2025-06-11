import { useState } from 'react';

// User 타입 정의: 사용자 정보 구조
interface User {
  id: string;         // 사용자 고유 ID
  name: string;       // 이름
  email: string;      // 이메일
  role: 'admin' | 'user'; // 역할(관리자/일반)
  lastLogin: string;  // 마지막 로그인 시간
}

// 임시 사용자 데이터(목업)
const mockUsers: User[] = [
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    role: 'admin',
    lastLogin: '2024-03-20 14:30',
  },
  {
    id: '2',
    name: '김철수',
    email: 'kim@example.com',
    role: 'user',
    lastLogin: '2024-03-19 09:15',
  },
];

// UserManagement: 관리자 - 사용자 관리 페이지
const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // 선택된 사용자

  // 검색어에 따라 사용자 필터링
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      
      {/* 검색 입력창 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="사용자 검색..."
          className="w-full px-4 py-2 border border-mediumLightGray rounded-lg focus:outline-none focus:ring-2 focus:ring-softBlue focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 사용자 목록 */}
      <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-lightGray">
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">역할</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">마지막 로그인</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-mediumLightGray">
              {filteredUsers.map(user => (
                <tr key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer hover:bg-lightGray">
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-deepNavy bg-opacity-10 text-deepNavy' : 'bg-softBlue bg-opacity-10 text-softBlue'
                    }`}>
                      {user.role === 'admin' ? '관리자' : '일반 사용자'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-softBlue hover:text-deepNavy mr-4">수정</button>
                    <button className="text-red-600 hover:text-red-800">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 선택된 사용자 상세 정보 */}
      {selectedUser && (
        <div className="mt-6 bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
          <h2 className="text-2xl font-bold mb-4 text-textColor">사용자 상세 정보</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-softBlue">이름</p>
              <p className="text-lg text-textColor">{selectedUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-softBlue">이메일</p>
              <p className="text-lg text-textColor">{selectedUser.email}</p>
            </div>
            <div>
              <p className="text-sm text-softBlue">역할</p>
              <p className="text-lg text-textColor">{selectedUser.role === 'admin' ? '관리자' : '일반 사용자'}</p>
            </div>
            <div>
              <p className="text-sm text-softBlue">마지막 로그인</p>
              <p className="text-lg text-textColor">{selectedUser.lastLogin}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 