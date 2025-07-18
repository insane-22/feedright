import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ title, value, icon: Icon, color = "text-blue-600" }) => (
  <Card className="shadow-sm border border-gray-200 dark:border-gray-700 transition hover:shadow-md hover:scale-[1.02] duration-200">
    <CardContent className="p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </h2>
      </div>
      {Icon && <Icon className={`w-6 h-6 ${color}`} />}
    </CardContent>
  </Card>
);

export default StatCard;
