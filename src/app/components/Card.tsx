import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon = <ArrowTrendingUpIcon className="w-6 h-6 text-gray-900 dark:text-gray-100" />, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-4 text-teal-400">
        {icon}
        <h3 className="text-lg font-semibold text-teal-400">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
