import React, { useState } from 'react';
import { Group } from '@visx/group';
import genBins, { Bin, Bins } from '@visx/mock-data/lib/generators/genBins';
import { scaleLinear } from '@visx/scale';
import { HeatmapCircle, HeatmapRect } from '@visx/heatmap';
import { getSeededRandom } from '@visx/mock-data';

const hot1 = '#77312f';
const hot2 = '#f33d15';
const cool1 = '#122549';
const cool2 = '#b4fbde';
export const background = '#28272c';

const seededRandom = getSeededRandom(0.41);

const binData = genBins(
  16,
  16,
  (idx) => 150 * idx,
  (i, number) => 25 * (number - i) * seededRandom(),
);

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value));
}

const bins = (d: Bins) => d.bins;
const count = (d: Bin) => d.count;

const colorMax = max(binData, (d) => max(bins(d), count));
const bucketSizeMax = max(binData, (d) => bins(d).length);

const xScale = scaleLinear<number>({ domain: [0, binData.length] });
const yScale = scaleLinear<number>({ domain: [0, bucketSizeMax] });
const circleColorScale = scaleLinear<string>({ range: [hot1, hot2], domain: [0, colorMax] });
const rectColorScale = scaleLinear<string>({ range: [cool1, cool2], domain: [0, colorMax] });
const opacityScale = scaleLinear<number>({ range: [0.1, 1], domain: [0, colorMax] });

export type HeatmapProps = {
  width: number;
  height: number;
  type?: 'circle' | 'square';
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  events?: boolean;
  hover?: boolean;
  borderOnHover?: boolean;
};

const defaultMargin = { top: 10, left: 20, right: 20, bottom: 110 };

function Heatmap({
  width,
  height,
  type = 'circle',
  events = false,
  hover = false,
  borderOnHover = false,
  margin = defaultMargin,
  separation = 20,
}: HeatmapProps) {
  const [tooltipData, setTooltipData] = useState<null | { row: number; column: number }> (null);
  const size = width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
  const xMax = size / 2;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData.length;
  const binHeight = yMax / bucketSizeMax;
  const radius = min([binWidth, binHeight], (d) => d) / 2;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={background} />
      <Group top={margin.top} left={margin.left}>
        {type === 'circle' ? (
          <HeatmapCircle
            data={binData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={circleColorScale}
            opacityScale={opacityScale}
            radius={radius}
            gap={2}
          >
            {(heatmap) =>
              heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => (
                  <circle
                    key={`heatmap-circle-${bin.row}-${bin.column}`}
                    className="visx-heatmap-circle"
                    cx={bin.cx}
                    cy={bin.cy}
                    r={bin.r}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    stroke={borderOnHover && tooltipData?.row === bin.row && tooltipData?.column === bin.column ? 'black' : 'none'}
                    strokeWidth={borderOnHover ? 2 : 0}
                    onMouseEnter={() => hover && setTooltipData({ row: bin.row, column: bin.column })}
                    onMouseLeave={() => hover && setTooltipData(null)}
                    onClick={() => {
                      if (!events) return;
                      alert(JSON.stringify({ row: bin.row, column: bin.column, bin: bin.bin }));
                    }}
                  />
                )),
              )
            }
          </HeatmapCircle>
        ) : (
          <HeatmapRect
            data={binData}
            xScale={(d) => xScale(d) ?? 0}
            yScale={(d) => yScale(d) ?? 0}
            colorScale={rectColorScale}
            opacityScale={opacityScale}
            binWidth={binWidth}
            binHeight={binWidth}
            gap={2}
          >
            {(heatmap) =>
              heatmap.map((heatmapBins) =>
                heatmapBins.map((bin) => (
                  <rect
                    key={`heatmap-rect-${bin.row}-${bin.column}`}
                    className="visx-heatmap-rect"
                    width={bin.width}
                    height={bin.height}
                    x={bin.x}
                    y={bin.y}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    stroke={borderOnHover && tooltipData?.row === bin.row && tooltipData?.column === bin.column ? 'black' : 'none'}
                    strokeWidth={borderOnHover ? 2 : 0}
                    onMouseEnter={() => hover && setTooltipData({ row: bin.row, column: bin.column })}
                    onMouseLeave={() => hover && setTooltipData(null)}
                    onClick={() => {
                      if (!events) return;
                      alert(JSON.stringify({ row: bin.row, column: bin.column, bin: bin.bin }));
                    }}
                  />
                )),
              )
            }
          </HeatmapRect>
        )}
      </Group>
    </svg>
  );
}

export default Heatmap;
