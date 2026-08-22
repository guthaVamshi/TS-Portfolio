export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: "fab fa-github",      href: "https://github.com/guthaVamshi",            label: "GitHub" },
    { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", label: "LinkedIn" },
    { icon: "fas fa-envelope",    href: "mailto:vamshigutha@gmail.com",               label: "Email" },
  ];

  return (
    <footer
      style={{
        background: "var(--c-bg)",
        borderTop: "1px solid var(--c-border)",
      }}
      role="contentinfo"
    >
      <div
        className="content-container"
        style={{ paddingBlock: "32px" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Logo + tagline */}
          <div>
            <a
              href="#"
              className="font-outfit font-black text-base tracking-tight"
              style={{ color: "var(--c-text)" }}
              aria-label="Back to top"
            >
              Vamshi<span style={{ color: "var(--c-accent)" }}>.</span>
            </a>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--c-text-faint)" }}
            >
              Full Stack Java Developer
            </p>
          </div>

          {/* Copyright */}
          <p
            className="text-xs order-last sm:order-none"
            style={{ color: "var(--c-text-faint)" }}
          >
            © {year} Vamshi Gutha
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2" aria-label="Social links">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                className="social-link"
              >
                <i className={`${s.icon} text-xs`} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
