import { useState, useEffect, useCallback, useRef } from "react";
import { Wifi, WifiOff, Activity, Thermometer, Droplets, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TerminalCard from "@/components/TerminalCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SensorData {
  time: string;
  temperature: number;
  humidity: number;
  light: number;
}

const MAX_POINTS = 30;

const generateMock = (): Omit<SensorData, "time"> => ({
  temperature: 20 + Math.random() * 15 + Math.sin(Date.now() / 5000) * 3,
  humidity: 40 + Math.random() * 30,
  light: 200 + Math.random() * 800,
});

const Dashboard = () => {
  const [wsUrl, setWsUrl] = useState("");
  const [connected, setConnected] = useState(false);
  const [mockMode, setMockMode] = useState(true);
  const [data, setData] = useState<SensorData[]>([]);
  const [latest, setLatest] = useState<Omit<SensorData, "time"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addPoint = useCallback((point: Omit<SensorData, "time">) => {
    const time = new Date().toLocaleTimeString();
    setLatest(point);
    setData((prev) => [...prev.slice(-(MAX_POINTS - 1)), { time, ...point }]);
  }, []);

  // Mock mode
  useEffect(() => {
    if (!mockMode) return;
    intervalRef.current = setInterval(() => addPoint(generateMock()), 1500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [mockMode, addPoint]);

  const connectWs = () => {
    if (!wsUrl) return;
    setMockMode(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const ws = new WebSocket(wsUrl);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (e) => {
      try { addPoint(JSON.parse(e.data)); } catch {}
    };
    wsRef.current = ws;
  };

  const disconnect = () => {
    wsRef.current?.close();
    setConnected(false);
    setMockMode(true);
    setData([]);
  };

  const gaugeItems = [
    { icon: Thermometer, label: "Temperature", value: latest?.temperature, unit: "°C", color: "hsl(0, 80%, 60%)" },
    { icon: Droplets, label: "Humidity", value: latest?.humidity, unit: "%", color: "hsl(200, 80%, 60%)" },
    { icon: Sun, label: "Light", value: latest?.light, unit: "lux", color: "hsl(45, 90%, 55%)" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-2 flex items-center gap-3">
        <h1 className="text-3xl font-bold text-primary glow-green">&gt; dashboard/</h1>
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono ${
          connected ? "bg-primary/10 text-primary" : mockMode ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive-foreground"
        }`}>
          <div className={`h-2 w-2 rounded-full ${connected ? "bg-primary pulse-indicator" : mockMode ? "bg-accent pulse-indicator" : "bg-destructive"}`} />
          {connected ? "Connected" : mockMode ? "Mock Mode" : "Disconnected"}
        </div>
      </div>
      <p className="mb-8 text-muted-foreground">Real-time sensor data via WebSocket</p>

      {/* Connection controls */}
      <TerminalCard title="connection.config" className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="ws://192.168.1.100:81"
            value={wsUrl}
            onChange={(e) => setWsUrl(e.target.value)}
            className="flex-1 font-mono text-sm bg-background border-border"
          />
          {!connected ? (
            <Button onClick={connectWs} disabled={!wsUrl} className="font-mono">
              <Wifi className="mr-2 h-4 w-4" /> Connect
            </Button>
          ) : (
            <Button variant="outline" onClick={disconnect} className="font-mono">
              <WifiOff className="mr-2 h-4 w-4" /> Disconnect
            </Button>
          )}
        </div>
      </TerminalCard>

      {/* Gauges */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {gaugeItems.map((g) => (
          <TerminalCard key={g.label}>
            <div className="flex items-center gap-3">
              <g.icon className="h-8 w-8" style={{ color: g.color }} />
              <div>
                <p className="text-xs text-muted-foreground font-mono">{g.label}</p>
                <p className="text-2xl font-bold font-mono" style={{ color: g.color }}>
                  {g.value != null ? g.value.toFixed(1) : "--"}<span className="text-sm text-muted-foreground ml-1">{g.unit}</span>
                </p>
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>

      {/* Chart */}
      <TerminalCard title="sensor_readings.log" className="mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 18%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 25%, 9%)",
                  border: "1px solid hsl(220, 20%, 18%)",
                  borderRadius: 8,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="temperature" stroke="hsl(0, 80%, 60%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="humidity" stroke="hsl(200, 80%, 60%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="light" stroke="hsl(45, 90%, 55%)" strokeWidth={2} dot={false} yAxisId={0} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Activity className="h-3 w-3" style={{ color: "hsl(0, 80%, 60%)" }} /> Temperature</span>
          <span className="flex items-center gap-1"><Activity className="h-3 w-3" style={{ color: "hsl(200, 80%, 60%)" }} /> Humidity</span>
          <span className="flex items-center gap-1"><Activity className="h-3 w-3" style={{ color: "hsl(45, 90%, 55%)" }} /> Light</span>
        </div>
      </TerminalCard>
    </div>
  );
};

export default Dashboard;
