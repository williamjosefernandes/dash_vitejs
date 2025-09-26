import { Card } from 'flowbite-react';

export const RevenueForecast = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h5 className="card-title">Revenue Forecast</h5>
        <div className="flex gap-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Current: $30K
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Forecast: $35K
          </span>
        </div>
      </div>
      <div className="card-content">
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3">$35,000</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">Projected Revenue</div>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">$30K</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-green-600 dark:text-green-400">+16.7%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};