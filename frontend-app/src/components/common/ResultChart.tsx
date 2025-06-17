import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, G, Text as SvgText } from 'react-native-svg';
import { colors } from '@/constants/colors';

type Props = {
  data: number[]; // 점수 배열 (최대 6개)
  labels: string[]; // 각 점수에 대한 라벨 (data.length와 동일 길이)
};

export default function ResultChart({ data, labels }: Props) {
  const chartSize = 300;
  const center = chartSize / 2;
  const radius = 100;
  const listNum = 6;

  // 6개 이하 데이터 입력 시 남은 값은 0으로 채움
  const paddedData = [
    ...data,
    ...Array(Math.max(0, listNum - data.length)).fill(0),
  ];
  const paddedLabels = [
    ...labels,
    ...Array(Math.max(0, listNum - labels.length)).fill('(추가예정)'),
  ];

  const getCoordinates = (values: number[], r = radius) => {
    return values.map((value, i) => {
      const angle = (Math.PI * 2 * i) / listNum - Math.PI / 2;
      const pointRadius = (value / 100) * r;
      return {
        x: center + pointRadius * Math.cos(angle),
        y: center + pointRadius * Math.sin(angle),
      };
    });
  };

  const pointsString = getCoordinates(paddedData)
    .map(p => `${p.x},${p.y}`)
    .join(' ');

  const chartInLines = Array.from({ length: listNum }, (_, i) => {
    const angle = (Math.PI * 2 * i) / listNum - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return (
      <Line
        key={i}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke={colors.mediumGray}
      />
    );
  });

  const labelPositions = Array.from({ length: listNum }, (_, i) => {
    const angle = (Math.PI * 2 * i) / listNum - Math.PI / 2;
    const r = radius + 30;
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

          {/* 바깥 점선 원 */}
          <Polygon
            points={getCoordinates(new Array(listNum).fill(100))
              .map(p => `${p.x},${p.y}`)
              .join(' ')}
            stroke={colors.midnightBlue}
            strokeDasharray="4"
            fill="none"
          />

          {/* 점수 영역 */}
          <Polygon
            points={pointsString}
            fill={`${colors.softBlue}66`}
            stroke={colors.softBlue}
            strokeWidth={2}
          />

          {/* 축 레이블 */}
          {labelPositions.map((p, i) => {
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
                fill={colors.midnightBlue}
                fontSize="12"
                textAnchor={anchor}
                alignmentBaseline="middle"
              >
                {paddedLabels[i]}
              </SvgText>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}