import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Cloud, Sun, Wind, Droplets, Thermometer, AlertTriangle } from "lucide-react";

interface WeatherCardProps {
  condition: "hot" | "cold" | "windy" | "humid" | "uncomfortable";
  probability: number;
  description: string;
  temperature?: string;
  className?: string;
}

const conditionConfig = {
  hot: {
    icon: Sun,
    color: "hot",
    bgClass: "bg-gradient-to-br from-orange-400 to-red-500",
    label: "Muy Caluroso"
  },
  cold: {
    icon: Thermometer,
    color: "cold",
    bgClass: "bg-gradient-to-br from-blue-400 to-blue-600",
    label: "Muy Frío"
  },
  windy: {
    icon: Wind,
    color: "windy",
    bgClass: "bg-gradient-to-br from-green-400 to-teal-500",
    label: "Muy Ventoso"
  },
  humid: {
    icon: Droplets,
    color: "humid",
    bgClass: "bg-gradient-to-br from-purple-400 to-purple-600",
    label: "Muy Húmedo"
  },
  uncomfortable: {
    icon: AlertTriangle,
    color: "uncomfortable",
    bgClass: "bg-gradient-to-br from-yellow-400 to-orange-500",
    label: "Muy Incómodo"
  }
};

export function WeatherCard({ condition, probability, description, temperature, className }: WeatherCardProps) {
  const config = conditionConfig[condition];
  const Icon = config.icon;
  
  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return "bg-destructive text-destructive-foreground";
    if (prob >= 40) return "bg-accent text-accent-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <Card className={cn(
      "relative overflow-hidden backdrop-blur-md bg-card/60 border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] hover:border-primary/50 cursor-pointer",
      className
    )}>
      <div className={cn("absolute inset-0 opacity-10", config.bgClass)} />
      <div className="relative p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-foreground" />
            <span className="font-medium text-sm">{config.label}</span>
          </div>
          <Badge className={getProbabilityColor(probability)}>
            {probability}%
          </Badge>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Probabilidad</span>
              <span className="font-semibold">{probability}%</span>
            </div>
            <Progress value={probability} className="h-2" />
          </div>
          
          {temperature && (
            <div className="flex items-center gap-2 text-lg font-semibold pt-1">
              <Thermometer className="w-5 h-5" />
              {temperature}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}