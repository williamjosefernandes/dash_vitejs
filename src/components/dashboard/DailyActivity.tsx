import { Link } from "react-router";

const DailyActivity = () => {

  const ActivitySteps = [
    {
      Time: "09:46",
      action: "Payment received from John Doe of $385.90",
      color: "bg-primary",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "New sale recorded",
      id: "#ML-3467",
      color: "bg-warning",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "Payment was made of $64.95 to Michael",
      color: "bg-warning",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "New sale recorded",
      id: "#ML-3467",
      color: "bg-secondary",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "Project meeting",
      color: "bg-error",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:46",
      action: "Payment received from John Doe of $385.90",
      color: "bg-primary"
    },
  ];
  
  return (
    <div className="card-container">
      <div className="card-header">
        <h5 className="card-title">Daily Activities</h5>
      </div>

      <div className="card-content">
        <div className="space-y-4">
          {ActivitySteps.map((item, index) => {
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium min-w-[40px]">
                  {item.Time}
                </div>
                <div className="flex flex-col items-center">
                  <div className={`rounded-full ${item.color} w-3 h-3 flex-shrink-0`}></div>
                  {index < ActivitySteps.length - 1 && (
                    <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-2">
                  <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                    {item.action}
                  </p>
                  {item.id && (
                    <Link 
                      to="#" 
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                    >
                      {item.id}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyActivity;
