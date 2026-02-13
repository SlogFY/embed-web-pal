import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import TerminalCard from "@/components/TerminalCard";
import { snippets, snippetCategories, pinoutData } from "@/data/snippets";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Reference = () => {
  const [cat, setCat] = useState("All");
  const filtered = snippets.filter((s) => cat === "All" || s.category === cat);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-primary glow-green">&gt; reference/</h1>
      <p className="mb-8 text-muted-foreground">Pinout tables, code snippets & quick reference</p>

      {/* Pinout Table */}
      <h2 className="mb-4 font-mono text-xl font-bold text-primary">// ESP32 DevKit Pinout</h2>
      <TerminalCard title="pinout.csv" className="mb-10 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-mono text-primary">Pin</TableHead>
              <TableHead className="font-mono text-primary">Function</TableHead>
              <TableHead className="font-mono text-primary">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pinoutData.map((row) => (
              <TableRow key={row.pin} className="border-border hover:bg-primary/5">
                <TableCell className="font-mono text-sm font-semibold text-foreground">{row.pin}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{row.func}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TerminalCard>

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

export default Reference;
