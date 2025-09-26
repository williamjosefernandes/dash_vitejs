import { Card } from 'flowbite-react';

const ProductRevenue = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h5 className="card-title">Product Revenue</h5>
      </div>
      <div className="card-content">
        <div className="space-y-4">
          <div className="stat-item bg-gray-50 dark:bg-gray-800/50">
            <div className="stat-icon bg-blue-100 dark:bg-blue-900/30">
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">P1</span>
            </div>
            <div className="stat-content">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Product A
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Electronics
              </p>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              $2,400
            </div>
          </div>
          
          <div className="stat-item bg-gray-50 dark:bg-gray-800/50">
            <div className="stat-icon bg-green-100 dark:bg-green-900/30">
              <span className="text-green-600 dark:text-green-400 font-medium text-sm">P2</span>
            </div>
            <div className="stat-content">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Product B
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Clothing
              </p>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              $1,800
            </div>
          </div>
          
          <div className="stat-item bg-gray-50 dark:bg-gray-800/50">
            <div className="stat-icon bg-purple-100 dark:bg-purple-900/30">
              <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">P3</span>
            </div>
            <div className="stat-content">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Product C
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Home & Garden
              </p>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              $1,200
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRevenue;