import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Member login — FANDDLE" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: LoginPage,
});

const inp = "w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary";
const btn = "w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const submit = async () => {
    setBusy(true);
    setError("");
    setInfo("");
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setError(error.message);
      else navigate({ to: "/app" });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/app` },
      });
      if (error) setError(error.message);
      else if (data.session) navigate({ to: "/app" });
      else setInfo("Check your email and click the verification link. Then come back and log in.");
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-md px-5 py-20 sm:px-8">
        <p className="eyebrow text-primary">MEMBER AREA</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold uppercase text-foreground">
          {mode === "login" ? "Log in" : "Create account"}
        </h1>
        {mode === "signup" && (
          <p className="mt-3 text-sm text-muted-foreground">
            Use the same email you used for your room registration. Access opens only after our team approves you.
          </p>
        )}
        <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
          <input className={inp} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            className={inp}
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          {info && <p className="text-sm text-primary">{info}</p>}
          <button className={btn} onClick={submit} disabled={busy || !email || password.length < 6}>
            {busy ? "Please wait…" : mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
          </button>
          <button
            className="w-full text-sm text-muted-foreground hover:text-primary"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setInfo("");
            }}
          >
            {mode === "login" ? "First time? Create your account" : "Already have an account? Log in"}
          </button>
        </div>
      </section>
    </div>
  );
}
