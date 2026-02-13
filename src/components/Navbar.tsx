import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/projects", label: "Projects" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/reference", label: "Reference" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-lg font-bold text-primary glow-green">
          <Terminal className="h-5 w-5" />
          <span>ESP32_Hub</span>
          <span className="cursor-blink text-primary">_</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-md font-mono text-sm transition-colors ${
                pathname === l.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md font-mono text-sm ${
                pathname === l.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
