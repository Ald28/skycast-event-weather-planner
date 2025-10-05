import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Alert {
  id: string;
  condition: string;
  threshold: number;
  enabled: boolean;
  unit: string;
}

export function WeatherAlerts() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", condition: "Lluvia", threshold: 70, enabled: true, unit: "%" },
    { id: "2", condition: "Viento", threshold: 40, enabled: true, unit: "km/h" },
    { id: "3", condition: "Temperatura", threshold: 32, enabled: false, unit: "°C" },
  ]);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
    toast({
      title: "Alerta actualizada",
      description: "La configuración de alerta se ha guardado correctamente",
    });
  };

  const updateThreshold = (id: string, value: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, threshold: value } : alert
    ));
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alerta eliminada",
      description: "La alerta ha sido eliminada correctamente",
    });
  };

  return (
    <Card className="p-6 backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Alertas Personalizadas</h3>
          </div>
          <Badge variant="secondary" className="gap-1">
            <AlertTriangle className="w-3 h-3" />
            {alerts.filter(a => a.enabled).length} activas
          </Badge>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4 bg-card/40 border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={alert.enabled}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                    <Label className="font-medium">{alert.condition}</Label>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeAlert(alert.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">
                    Alertar si supera:
                  </Label>
                  <Input
                    type="number"
                    value={alert.threshold}
                    onChange={(e) => updateThreshold(alert.id, Number(e.target.value))}
                    className="w-20 h-8 bg-card/60 border-primary/30 focus:border-primary transition-all"
                    disabled={!alert.enabled}
                  />
                  <span className="text-sm text-muted-foreground">{alert.unit}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-[var(--shadow-glow)] transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Nueva Alerta
        </Button>
      </div>
    </Card>
  );
}
