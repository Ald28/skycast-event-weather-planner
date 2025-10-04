import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface WeatherChartProps {
  weatherConditions: Array<{
    condition: string;
    probability: number;
    description: string;
    temperature?: string;
  }>;
}

export function WeatherChart({ weatherConditions }: WeatherChartProps) {
  const chartData = weatherConditions.map(w => ({
    name: w.condition === "hot" ? "Caluroso" :
          w.condition === "cold" ? "Frío" :
          w.condition === "windy" ? "Ventoso" :
          w.condition === "humid" ? "Húmedo" : "Incómodo",
    probabilidad: w.probability,
  }));

  const timeSeriesData = [
    { hora: "00:00", temperatura: 18, humedad: 75, viento: 15 },
    { hora: "03:00", temperatura: 16, humedad: 80, viento: 12 },
    { hora: "06:00", temperatura: 15, humedad: 85, viento: 10 },
    { hora: "09:00", temperatura: 20, humedad: 70, viento: 18 },
    { hora: "12:00", temperatura: 26, humedad: 55, viento: 25 },
    { hora: "15:00", temperatura: 28, humedad: 50, viento: 30 },
    { hora: "18:00", temperatura: 24, humedad: 60, viento: 22 },
    { hora: "21:00", temperatura: 20, humedad: 70, viento: 18 },
  ];

  const COLORS = ['hsl(var(--hot))', 'hsl(var(--cold))', 'hsl(var(--windy))', 'hsl(var(--humid))', 'hsl(var(--uncomfortable))'];

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/20 border-white/30">
      <h3 className="text-xl font-bold mb-4">Visualización de Datos</h3>
      <Tabs defaultValue="barras" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/20">
          <TabsTrigger value="barras">Barras</TabsTrigger>
          <TabsTrigger value="circular">Circular</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
          <TabsTrigger value="lineas">Líneas</TabsTrigger>
        </TabsList>

        <TabsContent value="barras" className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="probabilidad" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="circular" className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, probabilidad }) => `${name}: ${probabilidad}%`}
                outerRadius={100}
                fill="hsl(var(--primary))"
                dataKey="probabilidad"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="series" className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
              <XAxis dataKey="hora" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="temperatura" 
                stroke="hsl(var(--hot))" 
                fill="hsl(var(--hot) / 0.3)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="humedad" 
                stroke="hsl(var(--humid))" 
                fill="hsl(var(--humid) / 0.3)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="lineas" className="space-y-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.3)" />
              <XAxis dataKey="hora" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="viento" 
                stroke="hsl(var(--windy))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--windy))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
