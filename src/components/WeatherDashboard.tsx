import { WeatherCard } from "./WeatherCard";
import { WeatherChart } from "./WeatherChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, TrendingUp, Download, FileJson } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WeatherDashboardProps {
  location: string;
  eventType: string;
  date: string;
}

export function WeatherDashboard({ location, eventType, date }: WeatherDashboardProps) {
  const { toast } = useToast();
  
  // Simulated weather data with more variables
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

  const additionalMetrics = [
    { name: "Índice UV", value: "Moderado (6)", icon: "☀️" },
    { name: "Visibilidad", value: "10 km", icon: "👁️" },
    { name: "Presión", value: "1013 hPa", icon: "🌡️" },
    { name: "Punto de Rocío", value: "14°C", icon: "💧" },
  ];

  const exportToCSV = () => {
    const csvContent = [
      ["Ubicación", location],
      ["Tipo de Evento", eventType],
      ["Fecha", new Date(date).toLocaleDateString('es-ES')],
      ["Hora de Actualización", new Date().toLocaleString('es-ES')],
      [""],
      ["Condición", "Probabilidad (%)", "Descripción", "Temperatura"],
      ...weatherConditions.map(c => [
        c.condition,
        c.probability.toString(),
        c.description,
        c.temperature || "N/A"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `skycast-${location}-${date}.csv`;
    link.click();
    
    toast({
      title: "Datos exportados",
      description: "El archivo CSV se ha descargado correctamente",
    });
  };

  const exportToJSON = () => {
    const jsonData = {
      metadata: {
        location,
        eventType,
        date,
        timestamp: new Date().toISOString(),
        source: "SkyCast Weather Analysis",
      },
      weatherConditions: weatherConditions.map(c => ({
        condition: c.condition,
        probability: c.probability,
        description: c.description,
        temperature: c.temperature || null,
        unit: c.temperature ? "°C" : null
      })),
      additionalMetrics
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `skycast-${location}-${date}.json`;
    link.click();
    
    toast({
      title: "Datos exportados",
      description: "El archivo JSON se ha descargado correctamente",
    });
  };

  const overallRisk = Math.max(...weatherConditions.map(c => c.probability));
  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return { label: "Alto", color: "bg-destructive" };
    if (risk >= 40) return { label: "Medio", color: "bg-accent" };
    return { label: "Bajo", color: "bg-green-500" };
  };

  const riskLevel = getRiskLevel(overallRisk);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Análisis Meteorológico</h2>
              <Badge className={`${riskLevel.color} text-white`}>
                Riesgo {riskLevel.label}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportToCSV}
                className="bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportToJSON}
                className="bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              >
                <FileJson className="w-4 h-4 mr-2" />
                JSON
              </Button>
            </div>
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

      <WeatherChart weatherConditions={weatherConditions} />

      <Card className="p-6 backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)]">
        <h3 className="text-lg font-semibold mb-4">Métricas Adicionales</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalMetrics.map((metric, index) => (
            <Card key={index} className="p-4 bg-card/40 border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 text-center cursor-pointer group">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl mb-2">{metric.icon}</div>
                <div className="text-xs text-muted-foreground mb-1">{metric.name}</div>
                <div className="font-semibold">{metric.value}</div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)]">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recomendaciones Inteligentes para tu {eventType}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Refugio:</strong> Considera tener carpas o refugio disponible debido a la alta probabilidad de humedad (60%)</p>
            <p>• <strong>Decoraciones:</strong> Los vientos moderados (25%) pueden afectar decoraciones ligeras o equipos de sonido</p>
            <p>• <strong>Temperatura:</strong> La temperatura será agradable (18-28°C) para actividades al aire libre</p>
            <p>• <strong>Hidratación:</strong> Asegúrate de tener agua disponible para los asistentes</p>
            <p>• <strong>Protección Solar:</strong> Índice UV moderado - se recomienda protector solar</p>
            <p>• <strong>Vestimenta:</strong> Ropa ligera y transpirable, con una chaqueta por si refresca</p>
          </div>
        </div>
      </Card>
    </div>
  );
}