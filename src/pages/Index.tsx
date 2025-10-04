import { useState } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { WeatherDashboard } from "@/components/WeatherDashboard";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Sun, Wind, Droplets, Bot, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import heroImage from "@/assets/hero-weather.jpg";

interface SearchData {
  location: string;
  eventType: string;
  date: string;
}

const Index = () => {
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [activeTab, setActiveTab] = useState("search");
  const { toast } = useToast();

  const handleSearch = (location: string, eventType: string, date: string) => {
    setSearchData({ location, eventType, date });
    setActiveTab("analysis");
    toast({
      title: "Análisis completado",
      description: `Se han analizado las condiciones para ${eventType} en ${location}`,
    });
  };

  const features = [
    {
      icon: Cloud,
      title: "Predicciones Precisas",
      description: "Análisis basado en datos históricos y patrones meteorológicos"
    },
    {
      icon: BarChart3,
      title: "Análisis de Riesgo",
      description: "Evaluación de probabilidades para condiciones extremas"
    },
    {
      icon: Bot,
      title: "Asistente IA",
      description: "SkyBot te ayuda a interpretar los datos y planificar mejor"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                Sky<span className="text-primary">Cast</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Predicción meteorológica inteligente con IA para todo tipo de eventos y actividades al aire libre
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-4 backdrop-blur-sm bg-white/20 border-white/30 max-w-xs">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-8 h-8 text-primary animate-float" />
                    <div className="text-left">
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Buscar
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={!searchData} className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Análisis
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Asistente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <LocationSearch onSearch={handleSearch} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
              <Card className="p-4 text-center backdrop-blur-sm bg-white/20 border-white/30">
                <Sun className="w-8 h-8 mx-auto mb-2 text-hot" />
                <h3 className="font-semibold text-sm">Muy Caluroso</h3>
                <p className="text-xs text-muted-foreground">Temp. {'>'}32°C</p>
              </Card>
              <Card className="p-4 text-center backdrop-blur-sm bg-white/20 border-white/30">
                <Wind className="w-8 h-8 mx-auto mb-2 text-windy" />
                <h3 className="font-semibold text-sm">Muy Ventoso</h3>
                <p className="text-xs text-muted-foreground">Viento {'>'}30 km/h</p>
              </Card>
              <Card className="p-4 text-center backdrop-blur-sm bg-white/20 border-white/30">
                <Droplets className="w-8 h-8 mx-auto mb-2 text-humid" />
                <h3 className="font-semibold text-sm">Muy Húmedo</h3>
                <p className="text-xs text-muted-foreground">Humedad {'>'}80%</p>
              </Card>
              <Card className="p-4 text-center backdrop-blur-sm bg-white/20 border-white/30">
                <Cloud className="w-8 h-8 mx-auto mb-2 text-uncomfortable" />
                <h3 className="font-semibold text-sm">Incómodo</h3>
                <p className="text-xs text-muted-foreground">Índice térmico alto</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {searchData && (
              <WeatherDashboard
                location={searchData.location}
                eventType={searchData.eventType}
                date={searchData.date}
              />
            )}
          </TabsContent>

          <TabsContent value="assistant" className="space-y-6">
            <div className="max-w-4xl mx-auto h-[600px]">
              <AIChat />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;