import React from "react";
interface WidgetProps {
    value: string;
    icon?: React.ReactNode;
    legend?: string;
    onClick?: () => void;
}
declare const Widget: React.FC<WidgetProps>;
export default Widget;
