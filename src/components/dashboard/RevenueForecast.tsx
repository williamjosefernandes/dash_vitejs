import { Card } from 'flowbite-react';

export const RevenueForecast = () => {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Revenue Forecast
        </h5>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Current: $30K
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Forecast: $35K
          </span>
        </div>
      </div>
      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$35,000</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Projected Revenue</div>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">$30K</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">+16.7%</div>
              <div className="text-xs text-gray-500">Growth</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};