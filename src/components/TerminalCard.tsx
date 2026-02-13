import { cn } from "@/lib/utils";

interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const TerminalCard = ({ title, children, className }: TerminalCardProps) => (
  <div className={cn("terminal-card overflow-hidden", className)}>
    {title && (
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-primary/70" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export default TerminalCard;
