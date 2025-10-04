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
      content: "¡Hola! Soy SkyBot 🤖, tu asistente meteorológico inteligente. Puedo ayudarte a:\n\n📊 Interpretar gráficos y datos\n🎯 Recomendar según tu tipo de evento\n💾 Exportar y guardar análisis\n⏰ Sugerir mejores horarios\n\n¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const intelligentResponses = [
    "Basándome en los datos históricos, hay una probabilidad del 25% de lluvia para esa fecha. Te recomiendo tener un plan B bajo techo.",
    "Las condiciones para tu evento parecen favorables. La temperatura estará entre 22-26°C con vientos suaves.",
    "Te sugiero considerar las horas de la tarde para tu evento, ya que las mañanas pueden tener mayor humedad.",
    "Para eventos al aire libre, es importante considerar el índice UV. ¿Necesitas recomendaciones sobre protección solar?",
    "Los patrones meteorológicos indican condiciones estables para esa semana. ¿Quieres que revise fechas alternativas?",
    "💡 Para un desfile, te recomiendo verificar especialmente: temperatura (para vestuario), viento (para decoraciones), y probabilidad de lluvia.",
    "🎯 Si estás planeando una caminata, prioriza revisar: temperatura, humedad, y condiciones del terreno (que pueden verse afectadas por lluvia reciente).",
    "📊 Puedes exportar estos datos en formato CSV o JSON usando los botones en la parte superior del análisis. Esto te ayudará a compartir la información con tu equipo.",
    "🌤️ Consejo: Los eventos matutinos generalmente tienen menor probabilidad de tormentas eléctricas en esta región.",
    "⚠️ Nota importante: Las condiciones de alta humedad pueden afectar equipos electrónicos al aire libre. ¿Necesitas recomendaciones para proteger tu equipo?",
    "📈 Los gráficos muestran las tendencias del día. La temperatura máxima suele ocurrir entre las 14:00 y 16:00 horas.",
    "🎪 Para festivales o eventos largos, considera las variaciones de temperatura a lo largo del día. Puedes ver el pronóstico horario en los gráficos.",
    "🏃 Para eventos deportivos, el índice de calor y la humedad son factores críticos. ¿Quieres que analice el nivel de confort térmico?",
    "🎨 ¿Sabías que puedes seleccionar múltiples condiciones meteorológicas para obtener un análisis más completo de tu evento?",
    "💾 Recuerda que puedes guardar tus consultas exportándolas. Así podrás comparar diferentes fechas para tu evento."
  ];

  const getContextualResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("exportar") || input.includes("descargar") || input.includes("csv") || input.includes("json")) {
      return "📊 Puedes exportar los datos del análisis usando los botones 'CSV' o 'JSON' en la parte superior del dashboard. El archivo CSV es ideal para Excel, mientras que JSON es perfecto para análisis programático.";
    }
    
    if (input.includes("gráfico") || input.includes("visualización") || input.includes("chart")) {
      return "📈 Los gráficos interactivos muestran: 1) Barras de probabilidad de condiciones extremas, 2) Distribución circular de riesgos, 3) Pronóstico del día con temperatura y humedad, y 4) Velocidad del viento por hora. ¡Puedes hacer hover sobre cualquier punto para ver detalles!";
    }
    
    if (input.includes("desfile") || input.includes("parade")) {
      return "🎭 Para un desfile, te recomiendo verificar especialmente: 1) Viento (puede afectar banderas y decoraciones), 2) Temperatura (importante para el vestuario), 3) Probabilidad de lluvia. Los gráficos de tiempo te ayudarán a elegir la mejor hora del día.";
    }
    
    if (input.includes("caminata") || input.includes("hiking") || input.includes("senderismo")) {
      return "🥾 Para caminatas, prioriza: 1) Temperatura y sensación térmica, 2) Humedad (afecta la hidratación), 3) Viento (puede cambiar la sensación térmica). Te sugiero revisar el pronóstico horario para planificar tu salida y regreso.";
    }
    
    if (input.includes("boda") || input.includes("wedding")) {
      return "💒 Para bodas al aire libre, considera: 1) Probabilidad de lluvia (ten un plan B), 2) Temperatura (para comodidad de invitados), 3) Viento (puede afectar decoraciones y audio). Las horas de la tarde suelen tener mejor iluminación natural.";
    }
    
    if (input.includes("concierto") || input.includes("festival") || input.includes("concert")) {
      return "🎵 Para eventos con audio y equipo, verifica: 1) Probabilidad de lluvia (protege el equipo), 2) Viento (afecta el sonido), 3) Temperatura nocturna si es un evento largo. Los gráficos te muestran cómo varían las condiciones durante el día.";
    }
    
    if (input.includes("deporte") || input.includes("sport") || input.includes("juego")) {
      return "⚽ Para eventos deportivos, el índice de calor es crucial: 1) Temperatura + Humedad determinan el nivel de esfuerzo seguro, 2) Viento puede afectar deportes con balón, 3) Hidratación es esencial en condiciones de alta humedad.";
    }
    
    if (input.includes("hora") || input.includes("tiempo") || input.includes("cuándo")) {
      return "⏰ Los gráficos de pronóstico del día te muestran las condiciones hora por hora. Generalmente: mañanas (6-9am) = más fresco y húmedo, mediodía (12-3pm) = más caluroso, tardes (6-9pm) = temperaturas agradables. ¡Usa el gráfico de líneas para planificar tu horario!";
    }
    
    if (input.includes("ayuda") || input.includes("help") || input.includes("cómo")) {
      return "🤖 ¡Estoy aquí para ayudarte! Puedo: 1) Interpretar los datos meteorológicos, 2) Darte recomendaciones según tu tipo de evento, 3) Explicar los gráficos, 4) Sugerir mejores horarios, 5) Ayudarte a exportar datos. ¿Qué te gustaría saber?";
    }
    
    // Return random intelligent response
    return intelligentResponses[Math.floor(Math.random() * intelligentResponses.length)];
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

    // Simulate AI response with contextual intelligence
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
    <Card className="h-full flex flex-col backdrop-blur-sm bg-white/20 border-white/30">
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