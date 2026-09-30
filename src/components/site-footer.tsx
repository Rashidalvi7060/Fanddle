import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-sm font-semibold tracking-[0.35em]">FANDDLE</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A people-powered network of 100 founding rooms. Members share real problems,
              exchange experience and voluntarily help each other.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div className="space-y-3">
              <p className="eyebrow">Explore</p>
              <Link to="/rooms" className="block text-muted-foreground hover:text-foreground">
                Room directory
              </Link>
              <Link to="/" hash="membership" className="block text-muted-foreground hover:text-foreground">
                Founding membership
              </Link>
              <Link to="/" hash="faq" className="block text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Legal</p>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground">
                Membership terms
              </Link>
              <Link to="/terms" hash="privacy" className="block text-muted-foreground hover:text-foreground">
                Privacy notice
              </Link>
              <Link to="/terms" hash="refunds" className="block text-muted-foreground hover:text-foreground">
                Refund policy
              </Link>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Support</p>
              <p className="text-muted-foreground">
                [Placeholder: support email to be provided before launch]
              </p>
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
          © {new Date().getFullYear()} FANDDLE. Pre-launch. Details marked as placeholders must be
          confirmed before registration opens.
        </p>
      </div>
    </footer>
  );
}
