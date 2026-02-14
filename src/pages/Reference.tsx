import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import TerminalCard from "@/components/TerminalCard";
import { snippets, snippetCategories } from "@/data/snippets";
import { esp32Variants } from "@/data/esp32-variants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Wifi, Bluetooth, Zap, MemoryStick, Usb, Radio } from "lucide-react";

const Reference = () => {
  const [cat, setCat] = useState("All");
  const [variantId, setVariantId] = useState("esp32");
  const filtered = snippets.filter((s) => cat === "All" || s.category === cat);
  const variant = esp32Variants.find((v) => v.id === variantId)!;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-primary glow-green">&gt; reference/</h1>
      <p className="mb-8 text-muted-foreground">All ESP32 variants — pinout, specs, protocols & code snippets</p>

      {/* Variant Selector */}
      <h2 className="mb-4 font-mono text-xl font-bold text-primary">// Select ESP32 Variant</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {esp32Variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setVariantId(v.id)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-colors ${
              variantId === v.id
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Variant Description */}
      <TerminalCard title={`${variant.id}.info`} className="mb-8">
        <p className="font-mono text-sm text-foreground">{variant.description}</p>
      </TerminalCard>

      {/* Tabs: Specs / Pinout / Protocols */}
      <Tabs defaultValue="specs" className="mb-12">
        <TabsList className="bg-secondary border border-border mb-4">
          <TabsTrigger value="specs" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Specs
          </TabsTrigger>
          <TabsTrigger value="pinout" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Pinout
          </TabsTrigger>
          <TabsTrigger value="protocols" className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Protocols
          </TabsTrigger>
        </TabsList>

        {/* Specs Tab */}
        <TabsContent value="specs">
          <TerminalCard title={`${variant.id}_specs.json`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SpecCard icon={<Cpu className="h-4 w-4" />} label="CPU" value={variant.cpu} sub={variant.frequency} />
              <SpecCard icon={<MemoryStick className="h-4 w-4" />} label="Memory" value={`Flash: ${variant.flash}`} sub={`SRAM: ${variant.sram}`} />
              <SpecCard icon={<Wifi className="h-4 w-4" />} label="WiFi" value={variant.wifi || "None"} />
              <SpecCard icon={<Bluetooth className="h-4 w-4" />} label="Bluetooth" value={variant.bluetooth || "None"} />
              <SpecCard icon={<Usb className="h-4 w-4" />} label="USB" value={variant.usb} />
              <SpecCard icon={<Zap className="h-4 w-4" />} label="Voltage" value={variant.operatingVoltage} />
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <h4 className="mb-3 font-mono text-sm font-bold text-primary">// Peripheral Count</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                <MiniStat label="GPIO" value={variant.gpio} />
                <MiniStat label="UART" value={variant.uart} />
                <MiniStat label="SPI" value={variant.spi} />
                <MiniStat label="I2C" value={variant.i2c} />
                <MiniStat label="I2S" value={variant.i2s} />
                <MiniStat label="Touch" value={variant.touchSensors} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="rounded bg-background/50 p-2 font-mono text-xs">
                  <span className="text-muted-foreground">ADC:</span> <span className="text-foreground">{variant.adc}</span>
                </div>
                <div className="rounded bg-background/50 p-2 font-mono text-xs">
                  <span className="text-muted-foreground">DAC:</span> <span className="text-foreground">{variant.dac}</span>
                </div>
                <div className="rounded bg-background/50 p-2 font-mono text-xs">
                  <span className="text-muted-foreground">PWM:</span> <span className="text-foreground">{variant.pwm}</span>
                </div>
                <div className="rounded bg-background/50 p-2 font-mono text-xs">
                  <span className="text-muted-foreground">CAN:</span> <span className="text-foreground">{variant.canBus}</span>
                </div>
                <div className="rounded bg-background/50 p-2 font-mono text-xs">
                  <span className="text-muted-foreground">Ethernet:</span> <span className="text-foreground">{variant.ethernet}</span>
                </div>
              </div>
            </div>
          </TerminalCard>
        </TabsContent>

        {/* Pinout Tab */}
        <TabsContent value="pinout">
          <TerminalCard title={`${variant.id}_pinout.csv`} className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-mono text-primary">Pin</TableHead>
                  <TableHead className="font-mono text-primary">Function</TableHead>
                  <TableHead className="font-mono text-primary">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variant.pinout.map((row, i) => (
                  <TableRow key={i} className="border-border hover:bg-primary/5">
                    <TableCell className="font-mono text-sm font-semibold text-foreground whitespace-nowrap">{row.pin}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{row.func}</TableCell>
                    <TableCell className={`text-sm ${row.note.includes("NOT") || row.note.includes("avoid") || row.note.includes("do not") ? "text-destructive" : "text-muted-foreground"}`}>
                      {row.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TerminalCard>
        </TabsContent>

        {/* Protocols Tab */}
        <TabsContent value="protocols">
          <TerminalCard title={`${variant.id}_protocols.md`}>
            <div className="space-y-2">
              {variant.protocols.map((p, i) => (
                <div key={i} className="flex items-start gap-3 rounded bg-background/50 p-3">
                  <Radio className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="font-mono text-sm text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </TerminalCard>
        </TabsContent>
      </Tabs>

      {/* Code Snippets */}
      <h2 className="mb-4 font-mono text-xl font-bold text-primary">// Code Snippets</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {snippetCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
              cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((s) => (
          <div key={s.id}>
            <h3 className="mb-1 font-mono text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">{s.description}</p>
            <CodeBlock code={s.code} title={`${s.id}.ino`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const SpecCard = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) => (
  <div className="rounded-lg border border-border bg-background/50 p-3">
    <div className="mb-1 flex items-center gap-2 text-primary">
      {icon}
      <span className="font-mono text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <p className="font-mono text-sm text-foreground">{value}</p>
    {sub && <p className="mt-0.5 font-mono text-xs text-muted-foreground">{sub}</p>}
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded bg-background/50 p-2 text-center">
    <div className="font-mono text-lg font-bold text-primary">{value}</div>
    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
  </div>
);

export default Reference;
