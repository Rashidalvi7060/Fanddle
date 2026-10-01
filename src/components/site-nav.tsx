import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { label: "The Idea", to: "/", hash: "idea" },
  { label: "How It Works", to: "/", hash: "how" },
  { label: "Rooms", to: "/rooms", hash: undefined },
  { label: "Community Rules", to: "/", hash: "support" },
  { label: "FAQ", to: "/", hash: "faq" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="font-display text-sm font-bold tracking-[0.35em] text-foreground">
          FANDDLE
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...(l.hash ? { hash: l.hash } : {})}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/rooms"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore the Rooms
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-card px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/rooms"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Explore the Rooms
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
