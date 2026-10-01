import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const item = "block text-muted-foreground hover:text-foreground";
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-sm font-bold tracking-[0.35em]">FANDDLE</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A people-powered network of 200 planned founding rooms. Members share problems,
              exchange experience and voluntarily help each other.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div className="space-y-3">
              <p className="eyebrow">Explore</p>
              <Link to="/rooms" className={item}>Room directory</Link>
              <Link to="/" hash="how" className={item}>How it works</Link>
              <Link to="/" hash="faq" className={item}>FAQ</Link>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Legal</p>
              <Link to="/terms" className={item}>Terms</Link>
              <Link to="/terms" hash="privacy" className={item}>Privacy Policy</Link>
              <Link to="/terms" hash="guidelines" className={item}>Community Guidelines</Link>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Support</p>
              <Link to="/terms" hash="contact" className={item}>Contact</Link>
              <Link to="/terms" hash="report" className="block font-medium text-primary hover:opacity-80">
                Report misuse
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 hairline" />
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          FANDDLE provides a community space only. It does not participate in, control, or
          guarantee private assistance between members, including financial assistance. Legal,
          medical, psychological and financial questions may require qualified professionals.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} FANDDLE. Concept stage. Details marked as placeholders will
          be confirmed before registration opens.
        </p>
      </div>
    </footer>
  );
}
