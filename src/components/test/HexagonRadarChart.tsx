import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';

type Point = [number, number];
interface HexagonRadarChartProps {
  data?: number[]; 
  labels?: string[]; 
}

export const HexagonRadarChart: React.FC<HexagonRadarChartProps> = ({ data = [77, 54, 91, 60, 80, 70], labels = [] }) => {
  const size = 180;
  const center = size / 2;
  const radius = size / 2 - 20;
  const angleStep = (2 * Math.PI) / data.length;

  // 육각형 꼭짓점 좌표 계산
  const points = data.map((v, i) => {
    const valueRadius = (v / 100) * radius;
    const angle = -Math.PI / 2 + i * angleStep;
    return [
      center + valueRadius * Math.cos(angle),
      center + valueRadius * Math.sin(angle),
    ];
  });

  // 외곽선 좌표
  const outline = Array.from({ length: data.length }, (_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return [
      center + radius * Math.cos(angle),
      center + radius * Math.sin(angle),
    ];
  });

  return (
    <View>
      <Svg width={size} height={size}>
        {/* 외곽선 */}
        <Polygon
          points={outline.map(p => p.join(',')).join(' ')}
          fill="none"
          stroke="#b0b0d0"
          strokeWidth="2"
        />
        {/* 데이터 영역 */}
        <Polygon
          points={points.map(p => p.join(',')).join(' ')}
          fill="rgba(108,123,255,0.2)"
          stroke="#6C7BFF"
          strokeWidth="3"
        />
        {/* 축선 */}
        {outline.map((p, i) => (
          <Line
            key={i}
            x1={center}
            y1={center}
            x2={p[0]}
            y2={p[1]}
            stroke="#b0b0d0"
            strokeWidth="1"
          />
        ))}
        {/* 라벨 */}
        {outline.map((p, i) => (
          <SvgText
            key={i}
            x={p[0]}
            y={p[1] - 8}
            fontSize="12"
            fill="#888"
            textAnchor="middle"
          >
            {labels[i]}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}; 