import { useState, type ReactNode } from "react";

export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-base text-foreground sm:text-lg">{title}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-6 text-sm leading-relaxed text-muted-foreground">{children}</div>
      )}
    </div>
  );
}
