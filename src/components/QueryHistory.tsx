import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { History, Trash2, Calendar, MapPin } from "lucide-react";

interface HistoryItem {
  id: string;
  location: string;
  eventType: string;
  date: string;
  timestamp: Date;
  riskLevel: string;
}

interface QueryHistoryProps {
  onLoadQuery: (location: string, eventType: string, date: string) => void;
}

export function QueryHistory({ onLoadQuery }: QueryHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      location: "Buenos Aires, Argentina",
      eventType: "Concierto",
      date: "2025-10-15",
      timestamp: new Date("2025-10-04T10:30:00"),
      riskLevel: "Bajo"
    },
    {
      id: "2",
      location: "Madrid, España",
      eventType: "Desfile",
      date: "2025-11-20",
      timestamp: new Date("2025-10-03T15:20:00"),
      riskLevel: "Medio"
    },
  ]);

  const deleteQuery = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const getRiskColor = (level: string) => {
    if (level === "Alto") return "bg-destructive";
    if (level === "Medio") return "bg-accent";
    return "bg-green-500";
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/20 border-white/30">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Historial de Consultas</h3>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {history.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              No hay consultas guardadas aún
            </p>
          ) : (
            history.map((item) => (
              <Card key={item.id} className="p-4 bg-white/10 border-white/20 hover:bg-white/20 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${getRiskColor(item.riskLevel)} text-white text-xs`}>
                      {item.riskLevel}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <span className="text-xs text-muted-foreground">
                      {item.eventType}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onLoadQuery(item.location, item.eventType, item.date)}
                        className="text-xs h-7 bg-white/20 border-white/30"
                      >
                        Cargar
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteQuery(item.id)}
                        className="h-7 w-7 p-0 hover:bg-destructive/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
