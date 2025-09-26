import { Card } from 'flowbite-react';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';

const TotalIncome = () => {
  const currentIncome = 45280;
  const previousIncome = 42150;
  const percentageChange = ((currentIncome - previousIncome) / previousIncome * 100).toFixed(1);
  const isPositive = currentIncome > previousIncome;

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Income
          </h5>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            ${currentIncome.toLocaleString()}
          </div>
          <div className={`flex items-center text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <HiArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <HiArrowDown className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">
              {Math.abs(parseFloat(percentageChange))}%
            </span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <svg
              className={`w-6 h-6 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ${currentIncome.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last Month</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              ${previousIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TotalIncome;