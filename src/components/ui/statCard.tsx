import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "#4DA6FF",
}: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow transition duration-200">
      <div className="flex items-center justify-between gap-4 flex-row-reverse">
        <div className="flex-1 text-right">
          <p className="text-muted-foreground mb-1 text-sm">
            {title}
          </p>
          <h3 className="text-2xl font-bold leading-tight">{value}</h3>
          {trend && (
            <div
              className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: iconColor }}
        >
          <Icon className="w-9 h-9 text-white" />
        </div>
      </div>
    </Card>
  );
}
