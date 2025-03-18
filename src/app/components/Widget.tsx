import React from "react";

interface WidgetProps {
  value: string;
  icon?: React.ReactNode;
  legend?: string;
  onClick?: () => void;
}

const Widget: React.FC<WidgetProps> = ({ value, icon, onClick, legend }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.stopPropagation(); // Prevent unwanted bubbling
      onClick();
    }
  };

  return (
    <div
      className={`flex min-h-36 items-center flex-col col-span-full sm:col-span-4 xl:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out ${
        onClick ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900' : ''
      }`}
      onClick={onClick ? handleClick : undefined}
    >
      <div className="px-5 pt-5 pb-4">
        <header className="flex justify-center items-center mb-2">
          <div className="text-teal-400">{icon}</div>
        </header>
        <div className="flex justify-center items-center">
          <div className="text-lg center text-gray-500 dark:text-gray-100">
            {value}
          </div>
        </div>
        {legend && (
          <div className="text-md text-teal-500 mt-2">
            {legend}
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
