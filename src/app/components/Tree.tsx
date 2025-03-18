import React, { useState } from 'react';
import { Group } from '@visx/group';
import {
  Treemap,
  hierarchy,
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
} from '@visx/hierarchy';
import { TileMethod } from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';

export const color1 = '#f3e9d2';
const color2 = '#4281a4';
export const background = '#114b5f';

const tileMethods: { [tile: string]: TileMethod<any> } = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
};

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export type TreemapProps = {
  width: number;
  height: number;
  data: any;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function TreemapComponent({ width, height, data, margin = defaultMargin }: TreemapProps) {
  const [tileMethod, setTileMethod] = useState<string>('treemapSquarify');
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const root = hierarchy(data)
    .sum((d) => (d.value ? d.value : 0))
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const colorScale = scaleLinear<string>({
    domain: [0, root.value || 1],
    range: [color2, color1],
  });

  return width < 10 ? null : (
    <div>
      <label>Tile Method</label>{' '}
      <select
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setTileMethod(e.target.value)}
        value={tileMethod}
      >
        {Object.keys(tileMethods).map((tile) => (
          <option key={tile} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill={background} />
          <Treemap
            top={margin.top}
            root={root}
            size={[xMax, yMax]}
            tile={tileMethods[tileMethod]}
            round
          >
            {(treemap) => (
              <Group>
                {treemap
                  .descendants()
                  .reverse()
                  .map((node, i) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    return (
                      <Group
                        key={`node-${i}`}
                        top={node.y0 + margin.top}
                        left={node.x0 + margin.left}
                      >
                        <rect
                          width={nodeWidth}
                          height={nodeHeight}
                          stroke={background}
                          fill={colorScale(node.value || 0)}
                        />
                      </Group>
                    );
                  })}
              </Group>
            )}
          </Treemap>
        </svg>
      </div>
    </div>
  );
}
