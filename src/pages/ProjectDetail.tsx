import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TerminalCard from "@/components/TerminalCard";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-mono text-muted-foreground">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block text-primary hover:underline font-mono text-sm">&lt; Back</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link to="/projects" className="mb-6 inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> projects/
      </Link>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Badge key={t} variant="outline" className="font-mono text-xs border-primary/30 text-primary">{t}</Badge>
        ))}
      </div>

      <h1 className="mb-6 text-3xl font-bold text-primary glow-green">{project.title}</h1>

      <div className="mb-8 space-y-4 text-foreground/90 leading-relaxed">
        {project.fullDescription.split("\n").map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i} className="mt-6 text-xl font-bold text-primary">{line.slice(3)}</h2>;
          if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc text-muted-foreground">{line.slice(2)}</li>;
          if (line.trim() === "") return null;
          return <p key={i} className="text-muted-foreground">{line}</p>;
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TerminalCard title="components.txt">
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-semibold text-foreground">Components</span>
          </div>
          <ul className="space-y-1">
            {project.components.map((c, i) => (
              <li key={i} className="font-mono text-sm text-muted-foreground">• {c}</li>
            ))}
          </ul>
        </TerminalCard>

        <TerminalCard title="wiring.txt">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-accent" />
            <span className="font-mono text-sm font-semibold text-foreground">Wiring</span>
          </div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">{project.wiring}</p>
        </TerminalCard>
      </div>
    </div>
  );
};

export default ProjectDetail;
