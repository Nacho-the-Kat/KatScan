import React from "react";
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
declare const WidgetChartComponent: React.FC<WidgetChartProps>;
export default WidgetChartComponent;
