import { WeatherCard } from "./WeatherCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, TrendingUp } from "lucide-react";

interface WeatherDashboardProps {
  location: string;
  eventType: string;
  date: string;
}

export function WeatherDashboard({ location, eventType, date }: WeatherDashboardProps) {
  // Simulated weather data
  const weatherConditions = [
    {
      condition: "hot" as const,
      probability: 15,
      description: "Temperaturas superiores a 32°C",
      temperature: "28°C"
    },
    {
      condition: "cold" as const,
      probability: 5,
      description: "Temperaturas inferiores a 10°C",
      temperature: "18°C"
    },
    {
      condition: "windy" as const,
      probability: 25,
      description: "Vientos superiores a 30 km/h",
      temperature: ""
    },
    {
      condition: "humid" as const,
      probability: 60,
      description: "Humedad relativa superior al 80%",
      temperature: ""
    },
    {
      condition: "uncomfortable" as const,
      probability: 30,
      description: "Índice de calor elevado o sensación térmica incómoda",
      temperature: ""
    }
  ];

  const overallRisk = Math.max(...weatherConditions.map(c => c.probability));
  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return { label: "Alto", color: "bg-destructive" };
    if (risk >= 40) return { label: "Medio", color: "bg-accent" };
    return { label: "Bajo", color: "bg-green-500" };
  };

  const riskLevel = getRiskLevel(overallRisk);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/20 border-white/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Análisis Meteorológico</h2>
            <Badge className={`${riskLevel.color} text-white`}>
              Riesgo {riskLevel.label}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{new Date(date).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{eventType}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherConditions.map((condition, index) => (
          <div
            key={condition.condition}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <WeatherCard {...condition} />
          </div>
        ))}
      </div>

      <Card className="p-6 backdrop-blur-sm bg-white/20 border-white/30">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recomendaciones para tu {eventType}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Considera tener carpas o refugio disponible debido a la alta probabilidad de humedad</p>
            <p>• Los vientos moderados pueden afectar decoraciones ligeras o sonido</p>
            <p>• La temperatura será agradable para actividades al aire libre</p>
            <p>• Asegúrate de tener hidratación disponible para los asistentes</p>
          </div>
        </div>
      </Card>
    </div>
  );
}