import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationSearchProps {
  onSearch: (location: string, eventType: string, date: string) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (location && eventType && date) {
      onSearch(location, eventType, date);
    }
  };

  const eventTypes = [
    "Desfile", "Concierto", "Boda", "Festival", "Caminata", 
    "Picnic", "Evento Deportivo", "Feria", "Graduación",
    "Camping", "Maratón", "Ciclismo", "Vacaciones", "Pesca",
    "Fotografía", "BBQ", "Yoga", "Mercado"
  ];

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/20 border-white/30">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Planifica tu Evento</h2>
          <p className="text-muted-foreground">
            Análisis meteorológico avanzado para cualquier actividad al aire libre. 
            Exporta datos, configura alertas y obtén recomendaciones inteligentes.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Ubicación
            </label>
            <Input
              placeholder="Ciudad o ubicación específica"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/50 border-white/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tipo de Evento
            </label>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2">
              {eventTypes.map((type) => (
                <Button
                  key={type}
                  variant={eventType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEventType(type)}
                  className={cn(
                    "text-xs",
                    eventType === type 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-white/30 border-white/40 hover:bg-white/40"
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha del Evento
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/50 border-white/30"
            />
          </div>

          <Button 
            onClick={handleSearch}
            disabled={!location || !eventType || !date}
            className="w-full"
            size="lg"
          >
            <Search className="w-4 h-4 mr-2" />
            Analizar Condiciones
          </Button>
        </div>
      </div>
    </Card>
  );
}