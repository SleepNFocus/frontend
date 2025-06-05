import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, G, Text as SvgText } from 'react-native-svg';

export default function ResultChart() {
  const chartSize = 300;
  const center = chartSize / 2;
  const radius = 100;
  const listNum = 6;

  // 예시 데이터 (이후 Zustand 설정 후 결과 데이터 가져오기)
  const data = [70, 40, 90, 0, 0, 0];

  const getCoordinates = (values: number[], r = radius) => {
    return values.map((value, i) => {
      // [꼭지점 찍기] ex. (2π × 1)/6 60도
      //                 라디안에서 0은 오른쪽(3시 방향) -> 90도 = π/2
      const angle = (Math.PI * 2 * i) / listNum - Math.PI / 2;

      // 포인트 영역 표시 : 점수가 100이면 반지름 끝까지
      const pointRadius = (value / 100) * r;
      return {
        // 원 위의 점 좌표를 구하는 공식 ( x, y 좌표 확인 )
        x: center + pointRadius * Math.cos(angle),
        y: center + pointRadius * Math.sin(angle),
      };
    });
  };

  // 점수 데이터에 맞는 좌표를 "x,y x,y ..." 형태의 문자열로 변환
  const pointsReturnString = getCoordinates(data)
    .map(p => `${p.x},${p.y}`)
    .join(' ');

  const chartInLines = Array.from({ length: listNum }, (_, i) => {
    // 축의 시작을 12시 방향으로 설정
    const angle = (Math.PI * 2 * i) / listNum - Math.PI / 2;

    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    // x1, y1 = center / x2, y2 = 계산된 좌표
    return <Line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#ccc" />;
  });

  const axisLabels = [
    '반응속도',
    '처리속도',
    '패턴기억',
    '(추가예정)',
    '(추가예정)',
    '(추가예정)',
  ];

  const labelLocation = Array.from({ length: listNum }, (_, i) => {
    const angle = (Math.PI * 2 * i) / listNum - Math.PI / 2;
    const r = radius + 30; // 레이블이 점수 영역보다 바깥 쪽에 위치
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      angle,
    };
  });

  return (
    <View>
      <Svg width={chartSize} height={chartSize}>
        <G>
          {chartInLines}

          <Polygon
            points={getCoordinates(new Array(listNum).fill(100))
              .map(p => `${p.x},${p.y}`)
              .join(' ')}
            stroke="#666"
            strokeDasharray="4"
            fill="none"
          />

          <Polygon
            points={pointsReturnString}
            fill="rgba(128, 128, 255, 0.4)"
            stroke="#8888ff"
            strokeWidth={2}
          />

          {labelLocation.map((p, i) => {
            const dx = Math.cos(p.angle) * 5;
            const dy = Math.sin(p.angle) * 5;

            let anchor: 'start' | 'middle' | 'end' = 'middle';
            if (dx > 5) anchor = 'start';
            else if (dx < -5) anchor = 'end';

            return (
              <SvgText
                key={i}
                x={p.x + dx}
                y={p.y + dy}
                fill="#999"
                fontSize="12"
                textAnchor={anchor}
                alignmentBaseline="middle"
              >
                {axisLabels[i]}
              </SvgText>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}
