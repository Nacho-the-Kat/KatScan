import React from "react";
import { AreaClosed, LinePath } from "@visx/shape";
import { scaleUtc, scaleLinear } from "@visx/scale";
import { curveMonotoneX } from "@visx/curve";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { extent, max } from "d3-array";

interface DataPoint {
  date: Date;
  value: number;
}

interface WidgetChartProps {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  width?: number;
  height?: number;
}

const WidgetChartComponent: React.FC<WidgetChartProps> = ({
  title,
  subtitle,
  data,
  width = 600,
  height = 300,
}) => {
  const margin = { top: 40, right: 30, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Define scales
  const xScale = scaleUtc({
    domain: extent(data, (d) => d.date) as [Date, Date],
    range: [0, innerWidth],
  });

  const yScale = scaleLinear({
    domain: [0, (max(data, (d) => d.value) || 0) + 10], // Ensure proper scaling
    range: [innerHeight, 0],
  });

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      {/* Title Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>

      {/* Chart Container */}
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Area Fill */}
          <AreaClosed
            data={data}
            x={(d) => xScale(d.date) ?? 0}
            y={(d) => yScale(d.value) ?? 0}
            yScale={yScale}
            strokeWidth={0}
            fill="rgba(58, 221, 190, 0.3)" // Light transparent fill
            curve={curveMonotoneX}
          />

          {/* Line Path */}
          <LinePath
            data={data}
            x={(d) => xScale(d.date) ?? 0}
            y={(d) => yScale(d.value) ?? 0}
            stroke="teal"
            strokeWidth={2}
            curve={curveMonotoneX}
          />

          {/* Axes */}
          <AxisLeft scale={yScale} stroke="gray" />
          <AxisBottom scale={xScale} top={innerHeight} stroke="gray" />
        </Group>
      </svg>
    </div>
  );
};

export default WidgetChartComponent;
