import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, Cpu, BarChart3, Code, BookOpen, FolderOpen } from "lucide-react";
import TypingEffect from "@/components/TypingEffect";
import TerminalCard from "@/components/TerminalCard";

const navCards = [
  { to: "/tutorials", icon: BookOpen, title: "Tutorials", desc: "Step-by-step guides for WiFi, BLE, sensors & more" },
  { to: "/projects", icon: FolderOpen, title: "Projects", desc: "Complete builds with wiring diagrams & code" },
  { to: "/dashboard", icon: BarChart3, title: "Dashboard", desc: "Live sensor data via WebSocket connection" },
  { to: "/reference", icon: Code, title: "Reference", desc: "Pinout tables, snippets & circuit patterns" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Index = () => (
  <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
    {/* Hero */}
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
          <Cpu className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs text-primary">ESP32 Development Hub</span>
        </div>
      </motion.div>

      <motion.h1
        className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl glow-green text-primary"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      >
        &gt; ESP32_Hub
      </motion.h1>

      <div className="mb-8 h-8 font-mono text-lg text-muted-foreground sm:text-xl">
        <TypingEffect
          texts={[
            "Build IoT projects with confidence",
            "Real-time sensor dashboards",
            "WiFi • Bluetooth • GPIO • Sensors",
            "From blink to production",
          ]}
        />
      </div>

      <motion.div
        className="mb-4 flex items-center gap-3 font-mono text-sm text-muted-foreground"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
      >
        <Wifi className="h-4 w-4 text-accent" />
        <span>Dual-core • 240 MHz • WiFi + BLE • 34 GPIO</span>
      </motion.div>
    </section>

    {/* Navigation Cards */}
    <section className="container mx-auto px-4 pb-20">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container} initial="hidden" animate="show"
      >
        {navCards.map((c) => (
          <motion.div key={c.to} variants={item}>
            <Link to={c.to}>
              <TerminalCard className="group h-full transition-all hover:border-primary/50 hover:border-glow">
                <c.icon className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <h3 className="mb-1 font-mono text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </TerminalCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  </div>
);

export default Index;
