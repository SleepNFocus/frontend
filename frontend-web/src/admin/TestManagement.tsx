const TestManagement = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-lightGray">
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">테스트 이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">유형</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-mediumLightGray">
              <tr className="hover:bg-lightGray">
                <td className="px-6 py-4 whitespace-nowrap text-textColor">기본 수면 테스트</td>
                <td className="px-6 py-4 whitespace-nowrap text-textColor">수면</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-softBlue bg-opacity-10 text-softBlue">
                    활성
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-softBlue hover:text-deepNavy mr-4">수정</button>
                  <button className="text-red-600 hover:text-red-800">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestManagement; 