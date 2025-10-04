import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

interface WeatherCondition {
  condition: string;
  probability: number;
  description: string;
  temperature?: string;
}

interface WeatherChartProps {
  conditions: WeatherCondition[];
}

const COLORS = {
  hot: 'hsl(15 100% 55%)',
  cold: 'hsl(200 100% 70%)',
  windy: 'hsl(120 40% 60%)',
  humid: 'hsl(280 60% 70%)',
  uncomfortable: 'hsl(25 100% 60%)',
};

const conditionLabels = {
  hot: "Muy Caluroso",
  cold: "Muy Frío",
  windy: "Muy Ventoso",
  humid: "Muy Húmedo",
  uncomfortable: "Incómodo"
};

export function WeatherChart({ conditions }: WeatherChartProps) {
  const chartData = conditions.map(c => ({
    name: conditionLabels[c.condition as keyof typeof conditionLabels] || c.condition,
    probability: c.probability,
    fill: COLORS[c.condition as keyof typeof COLORS] || '#8884d8'
  }));

  // Simulated time series data
  const timeSeriesData = [
    { time: '6:00', temp: 18, humidity: 75, wind: 12 },
    { time: '9:00', temp: 22, humidity: 70, wind: 15 },
    { time: '12:00', temp: 28, humidity: 65, wind: 20 },
    { time: '15:00', temp: 30, humidity: 60, wind: 25 },
    { time: '18:00', temp: 26, humidity: 68, wind: 18 },
    { time: '21:00', temp: 20, humidity: 72, wind: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Probability Bar Chart */}
      <div className="bg-white/30 p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-4 text-center">Probabilidad de Condiciones Extremas (%)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--foreground))"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.95)', 
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="probability" 
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/30 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-4 text-center">Distribución de Riesgos</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, probability }) => `${name}: ${probability}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="probability"
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Time Series Area Chart */}
        <div className="bg-white/30 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-4 text-center">Pronóstico del Día</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--foreground))"
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255,255,255,0.95)', 
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="hsl(15 100% 55%)" 
                fill="hsl(15 100% 55% / 0.3)"
                name="Temperatura (°C)"
                animationDuration={1000}
              />
              <Area 
                type="monotone" 
                dataKey="humidity" 
                stroke="hsl(280 60% 70%)" 
                fill="hsl(280 60% 70% / 0.3)"
                name="Humedad (%)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart for Wind */}
      <div className="bg-white/30 p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-4 text-center">Velocidad del Viento (km/h)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255,255,255,0.95)', 
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="wind" 
              stroke="hsl(120 40% 60%)" 
              strokeWidth={3}
              dot={{ fill: 'hsl(120 40% 60%)', r: 5 }}
              activeDot={{ r: 7 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
