import React from "react";
interface ProgressBarProps {
    value: number;
    color?: string;
    hidePercentage?: boolean;
}
declare const ProgressBar: React.FC<ProgressBarProps>;
export default ProgressBar;
