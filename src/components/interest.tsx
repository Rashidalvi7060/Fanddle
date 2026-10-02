import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { categories, FOUNDING_PLACES } from "@/data/rooms";
import { CountUp } from "@/components/reveal";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  room_interest: z.string().max(120).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm to continue" }) }),
});

export function RegistrationCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    supabase.rpc("interest_count").then(({ data, error }) => {
      if (!error && typeof data === "number") setCount(data);
    });
  }, []);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-10">
        {count && count > 0 ? (
          <>
            <p className="font-display text-6xl font-extrabold text-primary sm:text-7xl">
              <CountUp value={count} />
            </p>
            <p className="eyebrow mt-4">People have registered interest in FANDDLE</p>
          </>
        ) : (
          <>
            <p className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">Be among the first</p>
            <p className="eyebrow mt-4">Registrations of interest are just opening</p>
          </>
        )}
      </div>
      <div className="rounded-2xl border border-primary/40 bg-card p-10">
        <p className="font-display text-6xl font-extrabold text-foreground sm:text-7xl">
          <CountUp value={FOUNDING_PLACES} />
        </p>
        <p className="eyebrow mt-4">Up to 200,000 founding places</p>
      </div>
    </div>
  );
}

export function InterestForm() {
  const [form, setForm] = useState({ name: "", email: "", room_interest: "", consent: false });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ ...form, room_interest: form.room_interest || undefined });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setStatus("sending");
    const { error: dbError } = await supabase.from("interest_registrations").insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      room_interest: parsed.data.room_interest ?? null,
      consent: true,
    });
    if (dbError) {
      setStatus("idle");
      setError(dbError.code === "23505" ? "This email has already registered interest." : "Something went wrong. Please try again.");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-primary/50 bg-card p-10 text-center">
        <p className="font-display text-2xl font-bold text-primary">THANK YOU.</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Your interest is recorded. This is not a confirmed membership — we'll contact you when founding registration opens.
        </p>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-8 sm:p-10" noValidate>
      <input className={field} placeholder="Your name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label="Your name" />
      <input className={field} type="email" placeholder="Email address" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-label="Email address" />
      <select className={field} value={form.room_interest} onChange={(e) => setForm({ ...form, room_interest: e.target.value })} aria-label="Area of interest">
        <option value="">Area of interest (optional)</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input type="checkbox" className="mt-0.5 accent-primary" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
        I understand that registering interest does not confirm membership, and I agree to be contacted about FANDDLE.
      </label>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-primary px-6 py-4 font-display text-sm font-bold tracking-wider text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
        {status === "sending" ? "SENDING…" : "REGISTER MY INTEREST →"}
      </button>
    </form>
  );
}
