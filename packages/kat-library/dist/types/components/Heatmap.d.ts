export declare const background = "#28272c";
export type HeatmapProps = {
    width: number;
    height: number;
    type?: 'circle' | 'square';
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    separation?: number;
    events?: boolean;
    hover?: boolean;
    borderOnHover?: boolean;
};
declare function Heatmap({ width, height, type, events, hover, borderOnHover, margin, separation, }: HeatmapProps): import("react/jsx-runtime").JSX.Element | null;
export default Heatmap;
