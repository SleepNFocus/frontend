import { useAllUsers, useUser, useUpdateUser, useDeleteUser } from '@/services/adminApi';
import { useState } from 'react';

// UserManagement: 관리자 - 사용자 관리 페이지
const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data, isLoading, error } = useAllUsers();
  const { data: selectedUser, isLoading: isUserLoading } = useUser(selectedUserId ?? 0);
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  // 검색어에 따라 사용자 필터링
  const filteredUsers = data?.users.filter(user =>
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

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
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">닉네임</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">권한</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">마지막 로그인</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-mediumLightGray">
              {filteredUsers.map(user => (
                <tr key={user.user_id} onClick={() => setSelectedUserId(user.user_id)} className="cursor-pointer hover:bg-lightGray">
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.nickname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_admin ? 'bg-deepNavy bg-opacity-10 text-deepNavy' : 'bg-softBlue bg-opacity-10 text-softBlue'}`}>
                      {user.is_admin ? '관리자' : '일반 사용자'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-textColor">{user.last_login_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-softBlue hover:text-deepNavy mr-4" onClick={e => { e.stopPropagation(); updateUser.mutate({ userId: user.user_id, updateData: { nickname: user.nickname + ' (수정)' } }); }}>수정</button>
                    <button className="text-red-600 hover:text-red-800" onClick={e => { e.stopPropagation(); deleteUser.mutate(user.user_id); }}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 선택된 사용자 상세 정보 */}
      {selectedUserId && (
        <div className="mt-6 bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
          {isUserLoading ? (
            <div>상세 정보 로딩중...</div>
          ) : selectedUser ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-textColor">사용자 상세 정보</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-softBlue">닉네임</p>
                  <p className="text-lg text-textColor">{selectedUser.nickname}</p>
                </div>
                <div>
                  <p className="text-sm text-softBlue">이메일</p>
                  <p className="text-lg text-textColor">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-softBlue">권한</p>
                  <p className="text-lg text-textColor">{selectedUser.is_admin ? '관리자' : '일반 사용자'}</p>
                </div>
                <div>
                  <p className="text-sm text-softBlue">마지막 로그인</p>
                  <p className="text-lg text-textColor">{selectedUser.last_login_at}</p>
                </div>
              </div>
            </>
          ) : (
            <div>사용자 정보를 불러올 수 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement; 