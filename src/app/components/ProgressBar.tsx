import React from "react";

interface ProgressBarProps {
  value: number; // Percentage value (0-100)
  color?: string; // Optional color override
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = "bg-teal-400" }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 text-[10px] font-medium text-gray-900 dark:text-white">
        {value}%
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
