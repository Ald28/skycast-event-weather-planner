import { useState } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { WeatherDashboard } from "@/components/WeatherDashboard";
import { AIChat } from "@/components/AIChat";
import { QueryHistory } from "@/components/QueryHistory";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Sun, Wind, Droplets, Bot, BarChart3, History, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import heroImage from "@/assets/hero-weather.jpg";
import dashboardBg from "@/assets/weather-dashboard-bg.jpg";
import analyticsIllustration from "@/assets/analytics-illustration.jpg";
import aiAssistantIcon from "@/assets/ai-assistant-icon.png";
import alertsIcon from "@/assets/alerts-icon.png";

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
      <div className="relative overflow-hidden shadow-[var(--shadow-elegant)]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${dashboardBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                Sky<span className="text-primary">Cast</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Predicción meteorológica inteligente para eventos al aire libre
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-4 backdrop-blur-md bg-card/40 border-primary/30 max-w-xs transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] hover:border-primary/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="w-8 h-8 text-primary animate-float" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
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
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto mb-8 bg-card/60 backdrop-blur-md border border-primary/20 shadow-[var(--shadow-elegant)]">
            <TabsTrigger value="search" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <Cloud className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={!searchData} className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Análisis</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Asistente</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Historial</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alertas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <LocationSearch onSearch={handleSearch} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
              <Card className="p-4 text-center backdrop-blur-md bg-card/50 border-primary/20 hover:border-hot/50 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] cursor-pointer group">
                <div className="p-3 rounded-full bg-hot/10 w-fit mx-auto mb-2 group-hover:bg-hot/20 transition-colors">
                  <Sun className="w-8 h-8 text-hot" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Muy Caluroso</h3>
                <p className="text-xs text-muted-foreground">Temp. {'>'}32°C</p>
              </Card>
              <Card className="p-4 text-center backdrop-blur-md bg-card/50 border-primary/20 hover:border-windy/50 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] cursor-pointer group">
                <div className="p-3 rounded-full bg-windy/10 w-fit mx-auto mb-2 group-hover:bg-windy/20 transition-colors">
                  <Wind className="w-8 h-8 text-windy" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Muy Ventoso</h3>
                <p className="text-xs text-muted-foreground">Viento {'>'}30 km/h</p>
              </Card>
              <Card className="p-4 text-center backdrop-blur-md bg-card/50 border-primary/20 hover:border-humid/50 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] cursor-pointer group">
                <div className="p-3 rounded-full bg-humid/10 w-fit mx-auto mb-2 group-hover:bg-humid/20 transition-colors">
                  <Droplets className="w-8 h-8 text-humid" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Muy Húmedo</h3>
                <p className="text-xs text-muted-foreground">Humedad {'>'}80%</p>
              </Card>
              <Card className="p-4 text-center backdrop-blur-md bg-card/50 border-primary/20 hover:border-uncomfortable/50 transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] cursor-pointer group">
                <div className="p-3 rounded-full bg-uncomfortable/10 w-fit mx-auto mb-2 group-hover:bg-uncomfortable/20 transition-colors">
                  <Cloud className="w-8 h-8 text-uncomfortable" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Incómodo</h3>
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
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)] mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={aiAssistantIcon} alt="AI Assistant" className="w-16 h-16" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">SkyBot - Tu Asistente IA</h2>
                    <p className="text-muted-foreground">Pregúntame sobre condiciones climáticas y te ayudaré a planificar mejor</p>
                  </div>
                </div>
              </Card>
              <div className="h-[600px]">
                <AIChat />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <QueryHistory 
                onLoadQuery={(location, eventType, date) => {
                  setSearchData({ location, eventType, date });
                  setActiveTab("analysis");
                  toast({
                    title: "Consulta cargada",
                    description: `Se ha cargado la consulta para ${eventType} en ${location}`,
                  });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 relative overflow-hidden rounded-lg">
                <img src={alertsIcon} alt="Weather Alerts" className="absolute right-4 top-4 w-20 h-20 opacity-20" />
                <Card className="p-6 backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)]">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Sistema de Alertas Inteligentes</h2>
                  <p className="text-muted-foreground">Configura alertas personalizadas y recibe notificaciones cuando las condiciones superen tus umbrales</p>
                </Card>
              </div>
              <WeatherAlerts />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;