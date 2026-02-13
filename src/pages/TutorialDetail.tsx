import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/CodeBlock";
import { tutorials } from "@/data/tutorials";

const TutorialDetail = () => {
  const { id } = useParams();
  const tutorial = tutorials.find((t) => t.id === id);

  if (!tutorial) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="font-mono text-muted-foreground">Tutorial not found.</p>
        <Link to="/tutorials" className="mt-4 inline-block text-primary hover:underline font-mono text-sm">
          &lt; Back to tutorials
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link to="/tutorials" className="mb-6 inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> tutorials/
      </Link>

      <div className="mb-4 flex items-center gap-2">
        <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">{tutorial.category}</Badge>
        <Badge variant="outline" className="font-mono text-xs border-border">{tutorial.difficulty}</Badge>
      </div>

      <h1 className="mb-6 text-3xl font-bold text-primary glow-green">{tutorial.title}</h1>

      {/* Content rendered as simple paragraphs */}
      <div className="mb-8 space-y-4 text-foreground/90 leading-relaxed">
        {tutorial.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i} className="mt-6 text-xl font-bold text-primary">{line.slice(3)}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="mt-4 text-lg font-semibold text-accent">{line.slice(4)}</h3>;
          if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc text-muted-foreground">{line.slice(2)}</li>;
          if (line.match(/^\d+\. /)) return <li key={i} className="ml-4 list-decimal text-muted-foreground">{line.replace(/^\d+\. /, "")}</li>;
          if (line.trim() === "") return null;
          return <p key={i} className="text-muted-foreground">{line}</p>;
        })}
      </div>

      <h2 className="mb-4 font-mono text-xl font-bold text-primary">// Code</h2>
      <CodeBlock code={tutorial.code} title={`${tutorial.id}.ino`} />
    </div>
  );
};

export default TutorialDetail;
