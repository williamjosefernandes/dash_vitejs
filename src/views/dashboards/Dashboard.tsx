import { Link } from "react-router"
import BlogCards from "src/components/dashboard/BlogCards"
import DailyActivity from "src/components/dashboard/DailyActivity"
import NewCustomers from "src/components/dashboard/NewCustomers"
import ProductRevenue from "src/components/dashboard/ProductRevenue"
import { RevenueForecast } from "src/components/dashboard/RevenueForecast"
import TotalIncome from "src/components/dashboard/TotalIncome"


const Dashboard = () => {
  return (
    <div className="dashboard-grid min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Revenue Forecast - Main Chart */}
      <div className="lg:col-span-8 col-span-12 min-w-0">
        <div className="fade-in">
          <RevenueForecast/>
        </div>
      </div>
      
      {/* Right Column - Stats Cards */}
      <div className="lg:col-span-4 col-span-12 min-w-0">
        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="col-span-12">
            <div className="slide-up">
              <NewCustomers />
            </div>
          </div>
          <div className="col-span-12">
            <div className="fade-in">
              <TotalIncome />
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Revenue */}
      <div className="lg:col-span-8 col-span-12 min-w-0">
        <div className="slide-up">
          <ProductRevenue />
        </div>
      </div>
      
      {/* Daily Activity */}
      <div className="lg:col-span-4 col-span-12 min-w-0">
        <div className="fade-in">
          <DailyActivity />
        </div>
      </div>
      
      {/* Blog Cards - Full Width */}
      <div className="col-span-12 min-w-0">
        <div className="slide-up">
          <BlogCards />
        </div>
      </div>
      
      {/* Footer */}
      <div className="col-span-12 text-center min-w-0 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-base text-gray-600 dark:text-gray-400">
            Design and Developed by{" "}
            <Link
              to="https://adminmart.com/"
              target="_blank"
              className="pl-1 text-primary underline decoration-primary hover:text-primary-dark transition-colors font-medium"
            >
              adminmart.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard