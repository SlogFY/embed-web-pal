import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import TerminalCard from "@/components/TerminalCard";
import { tutorials, categories } from "@/data/tutorials";

const diffColor = { Beginner: "bg-primary/20 text-primary", Intermediate: "bg-accent/20 text-accent", Advanced: "bg-destructive/20 text-destructive-foreground" };

const Tutorials = () => {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tutorials.filter(
    (t) =>
      (cat === "All" || t.category === cat) &&
      (t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-primary glow-green">&gt; tutorials/</h1>
      <p className="mb-8 text-muted-foreground">Step-by-step ESP32 guides with code examples</p>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
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
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-mono text-sm bg-secondary border-border"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Link key={t.id} to={`/tutorials/${t.id}`}>
            <TerminalCard className="group h-full transition-all hover:border-primary/50" title={t.category}>
              <div className="mb-2 flex items-center gap-2">
                <Badge className={diffColor[t.difficulty] + " border-0 font-mono text-xs"}>{t.difficulty}</Badge>
              </div>
              <h3 className="mb-2 font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {t.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.description}</p>
            </TerminalCard>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center font-mono text-muted-foreground">No tutorials found.</p>
      )}
    </div>
  );
};

export default Tutorials;
