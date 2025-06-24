import { useUser, useUpdateUser, useDeleteUser, useCreateLog } from '@/services/adminApi';
import { UserUpdateRequest } from '@/types/admin';
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/Card";

interface UserDetailModalProps {
  userId: number;
  onClose: () => void;
}

const UserDetailModal = ({ userId, onClose }: UserDetailModalProps) => {
  const { data: user, isLoading, error } = useUser(userId);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: createLog } = useCreateLog();

  // 수정용 상태
  const [nickname, setNickname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setIsAdmin(user.is_admin);
    }
  }, [user]);

  const handleUpdate = () => {
    if (!user) return;
    const updateData: UserUpdateRequest = {
      user_id: user.user_id,
      nickname: nickname,
      is_admin: isAdmin,
    };
    updateUser(updateData, {
      onSuccess: () => {
        createLog({
          action_type: 'USER_UPDATE',
          description: `Admin updated user ${user.user_id} (${user.nickname})`,
        });
        onClose();
      },
    });
  };

  const handleDelete = () => {
    if (!user) return;
    deleteUser(user.user_id, {
      onSuccess: () => {
        createLog({
          action_type: 'USER_DELETE',
          description: `Admin deleted user ${user.user_id} (${user.nickname})`,
        });
        onClose();
      },
    });
  };

  if (isLoading) return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-white">로딩중...</div>;
  if (error) return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center text-white">에러 발생: {error.message}</div>;
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Card className="w-full max-w-md mx-4 p-8">
        <h2 className="text-2xl font-bold mb-6 text-textColor">사용자 상세 정보</h2>
        
        {/* 상세 정보 표시 및 수정 폼 */}
        <div className="space-y-4">
          <div><p className="text-sm text-softBlue">이메일</p><p className="text-lg text-textColor">{user.email}</p></div>
          <div><p className="text-sm text-softBlue">닉네임</p><input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full px-3 py-2 border rounded-md" /></div>
          <div><p className="text-sm text-softBlue">관리자 권한</p><input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /></div>
          {/* 추가 정보 표시 */}
          <div><p className="text-sm text-softBlue">가입일</p><p>{new Date(user.joined_at).toLocaleString()}</p></div>
          <div><p className="text-sm text-softBlue">마지막 로그인</p><p>{user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'N/A'}</p></div>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-8 flex justify-between">
          <button onClick={handleDelete} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400">삭제</button>
          <div>
            <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-300 rounded-md hover:bg-gray-400">취소</button>
            <button onClick={handleUpdate} disabled={isUpdating} className="px-4 py-2 bg-softBlue text-white rounded-md hover:bg-deepNavy disabled:bg-gray-400">저장</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDetailModal; 