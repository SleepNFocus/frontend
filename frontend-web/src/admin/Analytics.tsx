import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  // 임시 라인 차트 데이터
  const lineData = [
    { name: '1월', value: 20 },
    { name: '2월', value: 45 },
    { name: '3월', value: 28 },
    { name: '4월', value: 80 },
    { name: '5월', value: 99 },
    { name: '6월', value: 43 },
  ];

  // 임시 바 차트 데이터
  const barData = [
    { name: '월', value: 20 },
    { name: '화', value: 45 },
    { name: '수', value: 28 },
    { name: '목', value: 80 },
    { name: '금', value: 99 },
    { name: '토', value: 43 },
    { name: '일', value: 50 },
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* 사용자 통계 차트 */}
        <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
          <h2 className="text-xl font-semibold mb-4 text-textColor">사용자 통계</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE3EA" />
                <XAxis dataKey="name" stroke="#0F1C36" />
                <YAxis stroke="#0F1C36" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#5A6EA3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 주간 테스트 통계 차트 */}
        <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
          <h2 className="text-xl font-semibold mb-4 text-textColor">주간 테스트 통계</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE3EA" />
                <XAxis dataKey="name" stroke="#0F1C36" />
                <YAxis stroke="#0F1C36" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#5A6EA3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 수면 데이터 분석 차트 */}
        <div className="bg-white rounded-lg shadow-md border border-mediumLightGray p-6">
          <h2 className="text-xl font-semibold mb-4 text-textColor">수면 데이터 분석</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE3EA" />
                <XAxis dataKey="name" stroke="#0F1C36" />
                <YAxis stroke="#0F1C36" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#5A6EA3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 