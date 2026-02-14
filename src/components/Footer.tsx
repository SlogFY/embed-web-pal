import { Github, Twitter, Youtube, BookOpen, ExternalLink, Cpu, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-mono text-lg font-bold text-primary mb-3">
              <Cpu className="h-5 w-5" />
              ESP32 Hub
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your terminal into the world of ESP32 — tutorials, projects, live dashboards & quick reference.
            </p>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="font-mono text-sm font-bold text-primary mb-3">// Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: "/tutorials", label: "Tutorials" },
                { to: "/projects", label: "Projects" },
                { to: "/dashboard", label: "Live Dashboard" },
                { to: "/reference", label: "Reference" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
                    &gt; {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Resources */}
          <div>
            <h4 className="font-mono text-sm font-bold text-primary mb-3">// Community</h4>
            <ul className="space-y-2">
              {[
                { href: "https://docs.espressif.com/", label: "Espressif Docs" },
                { href: "https://github.com/espressif/esp-idf", label: "ESP-IDF (GitHub)" },
                { href: "https://github.com/espressif/arduino-esp32", label: "Arduino-ESP32" },
                { href: "https://www.esp32.com/", label: "ESP32 Forum" },
                { href: "https://randomnerdtutorials.com/", label: "Random Nerd Tutorials" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-mono text-sm font-bold text-primary mb-3">// Connect</h4>
            <div className="flex gap-3">
              {[
                { href: "https://github.com/espressif", icon: Github, label: "GitHub" },
                { href: "https://twitter.com/espaboratory", icon: Twitter, label: "Twitter" },
                { href: "https://www.youtube.com/@EspressifSystems", icon: Youtube, label: "YouTube" },
                { href: "https://www.esp32.com/", icon: MessageSquare, label: "Forum" },
                { href: "https://docs.espressif.com/", icon: BookOpen, label: "Docs" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary hover:shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              Built with ⚡ for the ESP32 community
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} ESP32 Hub — Open source & community driven
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/50">
            v1.0.0 // powered by caffeine & solder fumes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
