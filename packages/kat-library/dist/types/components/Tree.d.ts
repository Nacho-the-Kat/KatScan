export declare const color1 = "#f3e9d2";
export declare const background = "#114b5f";
export type TreemapProps = {
    width: number;
    height: number;
    data: any;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
};
export default function TreemapComponent({ width, height, data, margin }: TreemapProps): import("react/jsx-runtime").JSX.Element | null;
