import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  trend, 
  className = '' 
}: StatsCardProps) {
  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">
              {value}
              {subtitle && (
                <span className="text-sm text-muted-foreground font-normal ml-1">
                  {subtitle}
                </span>
              )}
            </p>
            {trend && (
              <p className={`text-xs mt-1 ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}>
                {trend.isPositive ? '↗' : '↘'} {trend.value}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}