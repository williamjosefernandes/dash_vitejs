import { Card } from 'flowbite-react';

const ProductRevenue = () => {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Product Revenue
        </h5>
      </div>
      <div className="flow-root">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">P1</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Product A
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Electronics
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $2,400
              </div>
            </div>
          </div>
          <div className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-medium text-sm">P2</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Product B
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Clothing
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $1,800
              </div>
            </div>
          </div>
          <div className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-sm">P3</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Product C
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Home & Garden
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $1,200
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductRevenue;