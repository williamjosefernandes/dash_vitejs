
import { Progress } from "flowbite-react";
import { Icon } from "@iconify/react";

const NewCustomers = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="stat-icon bg-lightsecondary text-secondary">
          <Icon icon="solar:football-outline" height={24} />
        </div>
        <h5 className="card-title">New Customers</h5>
      </div>
      <div className="card-content">
        <div className="flex items-center justify-between mb-4">
          <p className="stat-label">New goals</p>
          <p className="text-sm font-semibold text-dark dark:text-white">83%</p>
        </div>
        <Progress progress={83} color="secondary" className="h-2" />
      </div>
    </div>
  );
};

export default NewCustomers;
