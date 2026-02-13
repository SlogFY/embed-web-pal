import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import TerminalCard from "@/components/TerminalCard";
import { projects, projectTags } from "@/data/projects";

const Projects = () => {
  const [tag, setTag] = useState("All");

  const filtered = projects.filter((p) => tag === "All" || p.tags.includes(tag));

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-primary glow-green">&gt; projects/</h1>
      <p className="mb-8 text-muted-foreground">Complete ESP32 builds with wiring & code</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {projectTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
              tag === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`}>
            <TerminalCard className="group h-full transition-all hover:border-primary/50">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="outline" className="font-mono text-xs border-primary/30 text-primary">{t}</Badge>
                ))}
              </div>
              <h3 className="mb-2 font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </TerminalCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
