import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy SkyBot, tu asistente meteorológico inteligente. ¿En qué puedo ayudarte con tu planificación de eventos?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const intelligentResponses = {
    general: [
      "¡Hola! Puedo ayudarte a planificar tu evento analizando las condiciones meteorológicas. ¿Qué tipo de evento estás planeando?",
      "Los datos meteorológicos históricos son muy útiles para planificar eventos. ¿Tienes ya una fecha y ubicación en mente?",
    ],
    location: [
      "Excelente elección de ubicación. ¿Qué tipo de evento planeas realizar allí?",
      "He analizado las condiciones típicas para esa zona. ¿Cuándo planeas tu evento?",
    ],
    weather: [
      "Basándome en los datos históricos, hay una probabilidad del 25% de lluvia para esa fecha. Te recomiendo tener un plan B bajo techo.",
      "Las condiciones para tu evento parecen favorables. La temperatura estará entre 22-26°C con vientos suaves.",
      "Para eventos al aire libre, te sugiero considerar las horas de la tarde, ya que las mañanas pueden tener mayor humedad.",
    ],
    recommendations: [
      "Para tu tipo de evento, te recomiendo prestar especial atención a: temperatura, viento y humedad.",
      "Basándome en tu consulta, aquí están mis recomendaciones: 1) Tener refugio disponible 2) Planificar hidratación 3) Considerar protección solar",
      "Los patrones meteorológicos indican condiciones estables. ¿Quieres que analice fechas alternativas?",
    ],
    features: [
      "¿Sabías que puedes exportar todos los datos en formato CSV o JSON? Solo presiona los botones de exportación en la sección de análisis.",
      "Puedes ver gráficos interactivos de las condiciones climáticas. ¡Explora las diferentes visualizaciones en la pestaña de gráficos!",
      "Configura alertas personalizadas para recibir notificaciones si las condiciones superan ciertos umbrales.",
    ],
    alerts: [
      "Recuerda configurar alertas para condiciones críticas como vientos fuertes o temperaturas extremas.",
      "Las alertas te ayudarán a estar preparado. ¿Quieres que te ayude a configurar una alerta personalizada?",
    ],
  };

  const getContextualResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("ubicación") || lowerInput.includes("lugar") || lowerInput.includes("dónde")) {
      return intelligentResponses.location[Math.floor(Math.random() * intelligentResponses.location.length)];
    }
    if (lowerInput.includes("clima") || lowerInput.includes("temperatura") || lowerInput.includes("lluvia")) {
      return intelligentResponses.weather[Math.floor(Math.random() * intelligentResponses.weather.length)];
    }
    if (lowerInput.includes("recomend") || lowerInput.includes("suger") || lowerInput.includes("consejo")) {
      return intelligentResponses.recommendations[Math.floor(Math.random() * intelligentResponses.recommendations.length)];
    }
    if (lowerInput.includes("export") || lowerInput.includes("descargar") || lowerInput.includes("guardar")) {
      return intelligentResponses.features[0];
    }
    if (lowerInput.includes("gráfico") || lowerInput.includes("visual") || lowerInput.includes("chart")) {
      return intelligentResponses.features[1];
    }
    if (lowerInput.includes("alerta") || lowerInput.includes("notifica")) {
      return intelligentResponses.alerts[Math.floor(Math.random() * intelligentResponses.alerts.length)];
    }
    
    return intelligentResponses.general[Math.floor(Math.random() * intelligentResponses.general.length)];
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate intelligent AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getContextualResponse(input),
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="h-full flex flex-col backdrop-blur-md bg-card/60 border-primary/30 shadow-[var(--shadow-elegant)]">
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">SkyBot AI</h3>
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Asistente Inteligente
            </Badge>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.sender === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                message.sender === "ai" 
                  ? "bg-gradient-to-r from-primary to-accent" 
                  : "bg-secondary"
              )}>
                {message.sender === "ai" ? 
                  <Bot className="w-3 h-3 text-white" /> : 
                  <User className="w-3 h-3 text-muted-foreground" />
                }
              </div>
              <div className={cn(
                "rounded-lg p-3 text-sm",
                message.sender === "ai"
                  ? "bg-white/30 text-foreground"
                  : "bg-primary text-primary-foreground"
              )}>
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-white/30 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator className="bg-white/20" />
      
      <div className="p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre el clima para tu evento..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-white/50 border-white/30"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}