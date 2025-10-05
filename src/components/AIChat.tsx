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
      "¡Hola! Soy SkyBot, tu asistente meteorológico. Puedo ayudarte a planificar cualquier evento al aire libre analizando las condiciones climáticas. ¿Qué tipo de evento estás planeando? Puedo analizar desde bodas y conciertos hasta caminatas y picnics.",
      "Los datos meteorológicos históricos y los patrones climáticos son muy útiles para planificar eventos exitosos. ¿Tienes ya una fecha y ubicación en mente? También puedo sugerirte fechas alternativas si lo necesitas.",
      "¿En qué puedo ayudarte hoy? Puedo analizar condiciones climáticas, crear alertas personalizadas, exportar datos meteorológicos, o darte recomendaciones específicas para tu tipo de evento.",
      "¡Bienvenido! Estoy aquí para asegurarte que tu evento sea un éxito. Pregúntame sobre temperatura, viento, lluvia, humedad, o cualquier otra condición que te preocupe para tu actividad.",
    ],
    location: [
      "Excelente elección de ubicación. ¿Qué tipo de evento planeas realizar allí? Según el tipo de actividad, te recomendaré qué variables climáticas son más importantes a considerar.",
      "He analizado las condiciones típicas para esa zona. ¿Cuándo planeas tu evento? También puedo mostrarte las mejores épocas del año para actividades al aire libre en ese lugar.",
      "Esa ubicación tiene características climáticas interesantes. ¿Te gustaría que analice los patrones históricos de temperatura, viento o precipitación para ese lugar?",
    ],
    weather: [
      "Basándome en los datos históricos y patrones estacionales, la probabilidad de lluvia es moderada. Te recomiendo tener un plan B bajo techo o carpas disponibles. ¿Quieres que configure una alerta de lluvia para esa fecha?",
      "Las condiciones para tu evento parecen muy favorables. La temperatura estará entre 22-26°C con vientos suaves de 15-20 km/h. Ideal para actividades al aire libre. ¿Necesitas información sobre humedad o índice UV?",
      "Para eventos al aire libre en esa fecha, te sugiero considerar las horas de la tarde (después de las 15:00), ya que las mañanas suelen tener mayor humedad y posible neblina matinal.",
      "Los patrones meteorológicos indican vientos moderados. Si tu evento incluye decoraciones ligeras, carpas o equipos de sonido, te recomendaría anclarlos bien. ¿Quieres detalles sobre la velocidad del viento esperada?",
      "La temperatura será agradable, pero el índice UV estará alto. Recomiendo protector solar, sombrillas o zonas de sombra para los asistentes. ¿Te ayudo a planificar las medidas de protección?",
    ],
    recommendations: [
      "Para tu tipo de evento, te recomiendo prestar especial atención a: temperatura ambiente, velocidad del viento, y probabilidad de precipitación. También considera el índice UV si es durante el día.",
      "Basándome en tu consulta, aquí están mis recomendaciones detalladas: 1) Tener refugio o carpas disponibles para protección 2) Planificar estaciones de hidratación cada 50 metros 3) Protección solar (sombrillas, protector solar) 4) Plan de contingencia para condiciones adversas",
      "Los patrones meteorológicos indican condiciones estables para esa fecha. Sin embargo, te sugiero tener un plan alternativo. ¿Quieres que analice fechas alternativas o te ayude a crear alertas para condiciones críticas?",
      "Para maximizar el éxito de tu evento, te recomiendo: revisar el pronóstico 48 horas antes, configurar alertas para vientos >40km/h, tener refugio para al menos 30% de los asistentes, y considerar la hora del día para evitar temperaturas extremas.",
    ],
    features: [
      "¿Sabías que puedes exportar todos los datos en formato CSV o JSON? Solo presiona los botones de exportación en la sección de análisis. Los archivos incluyen metadatos completos como fuente de datos, ubicación, fecha y hora de actualización.",
      "¡Puedes ver gráficos interactivos de las condiciones climáticas! Explora las diferentes visualizaciones en la pestaña de análisis: gráficos de barras, líneas temporales, distribución de probabilidades y más. Todo completamente interactivo.",
      "Configura alertas personalizadas en la pestaña 'Alertas' para recibir notificaciones si las condiciones superan ciertos umbrales. Puedes crear alertas para lluvia, viento, temperatura, humedad y más.",
      "En el historial puedes ver todas tus consultas anteriores y recargarlas con un solo clic. Muy útil si planeas eventos recurrentes en el mismo lugar.",
      "Los gráficos muestran probabilidades y rangos de condiciones. Puedes hacer hover sobre cualquier punto para ver detalles específicos de temperatura, viento o cualquier otra variable.",
    ],
    alerts: [
      "Recuerda configurar alertas para condiciones críticas como vientos fuertes (>40 km/h), temperaturas extremas (>35°C o <5°C), o alta probabilidad de lluvia (>70%). Ve a la pestaña 'Alertas' para configurarlas.",
      "Las alertas te ayudarán a estar preparado y tomar decisiones a tiempo. ¿Quieres que te ayude a configurar una alerta personalizada? Puedo guiarte paso a paso sobre qué umbrales configurar según tu tipo de evento.",
      "Para tu evento, te sugiero configurar alertas para: 1) Vientos >35 km/h 2) Temperatura >32°C 3) Lluvia >60% de probabilidad. ¿Te ayudo a crearlas?",
    ],
    events: [
      "Para un evento deportivo al aire libre, las variables críticas son: temperatura (ideal 15-25°C), viento (<25 km/h para deportes de precisión), y cero probabilidad de lluvia.",
      "En el caso de bodas al aire libre, además del clima, considera: hora dorada para fotos (atardecer), vientos bajos para decoraciones, y tener siempre un plan B bajo techo.",
      "Para caminatas o senderismo, verifica: temperatura ambiente, visibilidad, punto de rocío (para evitar niebla), y pronóstico de tormentas. La seguridad es lo primero.",
      "Conciertos al aire libre requieren: verificar vientos (pueden afectar el sonido y estructuras), temperatura cómoda para el público, y cero probabilidad de lluvia o tormentas.",
    ],
    help: [
      "Puedo ayudarte con: análisis de condiciones climáticas, crear y gestionar alertas, exportar datos, interpretar gráficos, sugerir fechas alternativas, y darte recomendaciones específicas para tu tipo de evento. ¿Qué necesitas?",
      "Mis capacidades incluyen: análisis meteorológico avanzado, predicciones basadas en datos históricos, configuración de alertas inteligentes, exportación de datos en CSV/JSON, y recomendaciones personalizadas. ¿En qué te ayudo primero?",
    ],
  };

  const getContextualResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Saludos y ayuda
    if (lowerInput.includes("hola") || lowerInput.includes("buenos") || lowerInput.includes("buenas")) {
      return intelligentResponses.general[0];
    }
    if (lowerInput.includes("ayuda") || lowerInput.includes("ayudar") || lowerInput.includes("puedes") || lowerInput.includes("qué haces")) {
      return intelligentResponses.help[Math.floor(Math.random() * intelligentResponses.help.length)];
    }
    
    // Ubicación y lugar
    if (lowerInput.includes("ubicación") || lowerInput.includes("lugar") || lowerInput.includes("dónde") || lowerInput.includes("ciudad")) {
      return intelligentResponses.location[Math.floor(Math.random() * intelligentResponses.location.length)];
    }
    
    // Condiciones climáticas
    if (lowerInput.includes("clima") || lowerInput.includes("temperatura") || lowerInput.includes("lluvia") || lowerInput.includes("viento") || lowerInput.includes("humedad")) {
      return intelligentResponses.weather[Math.floor(Math.random() * intelligentResponses.weather.length)];
    }
    
    // Recomendaciones
    if (lowerInput.includes("recomend") || lowerInput.includes("suger") || lowerInput.includes("consejo") || lowerInput.includes("qué hacer") || lowerInput.includes("debo")) {
      return intelligentResponses.recommendations[Math.floor(Math.random() * intelligentResponses.recommendations.length)];
    }
    
    // Exportación
    if (lowerInput.includes("export") || lowerInput.includes("descargar") || lowerInput.includes("guardar") || lowerInput.includes("csv") || lowerInput.includes("json")) {
      return intelligentResponses.features[0];
    }
    
    // Gráficos
    if (lowerInput.includes("gráfico") || lowerInput.includes("visual") || lowerInput.includes("chart") || lowerInput.includes("datos") || lowerInput.includes("estadística")) {
      return intelligentResponses.features[1];
    }
    
    // Alertas
    if (lowerInput.includes("alerta") || lowerInput.includes("notifica") || lowerInput.includes("aviso")) {
      return intelligentResponses.alerts[Math.floor(Math.random() * intelligentResponses.alerts.length)];
    }
    
    // Tipos de eventos
    if (lowerInput.includes("boda") || lowerInput.includes("concierto") || lowerInput.includes("deporte") || lowerInput.includes("caminata") || lowerInput.includes("evento")) {
      return intelligentResponses.events[Math.floor(Math.random() * intelligentResponses.events.length)];
    }
    
    // Historial
    if (lowerInput.includes("historial") || lowerInput.includes("anterior") || lowerInput.includes("consulta")) {
      return intelligentResponses.features[3];
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