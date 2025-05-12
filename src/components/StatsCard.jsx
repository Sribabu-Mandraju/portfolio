import React from "react";

const StatsCard = ({ title, value, change, period, icon: Icon }) => {
  const isPositive = change > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm font-medium ${
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          {period}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
