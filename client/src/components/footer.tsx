import { Container } from "@/components/ui/container";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: "fab fa-github", href: "https://github.com/guthaVamshi", label: "GitHub" },
    { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", label: "LinkedIn" },
    { icon: "fas fa-envelope", href: "mailto:vamshigutha@gmail.com", label: "Email" },
    { icon: "fab fa-skype", href: "skype:vamshigutha?call", label: "Skype" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Container>
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <a href="#" className="text-white font-bold text-xl tracking-tight">
              Vamshi<span className="text-primary">.</span>
            </a>
            <p className="text-xs text-slate-500 mt-1">Salesforce Developer &amp; Full Stack Engineer</p>
          </div>

          {/* Center: copyright */}
          <p className="text-xs text-slate-600 order-last sm:order-none">
            © {year} Vamshi Gutha — Designed &amp; Built with ♥
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") || s.href.startsWith("skype:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
              >
                <i className={`${s.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
