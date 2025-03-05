import React from "react";
interface WidgetProps {
    value: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}
declare const Widget: React.FC<WidgetProps>;
export default Widget;
