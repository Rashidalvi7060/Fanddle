import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { defaultSettings, type SiteSettingsRow } from "@/lib/use-site-settings";

const db = supabase as any;

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — FANDDLE" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

const inp = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";
const btn = "rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50";
const btnGhost = "rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    db.from("admin_users")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data }: any) => setIsAdmin(!!data));
  }, [session]);

  const logout = () => supabase.auth.signOut();

  let body;
  if (!ready) body = <p className="text-muted-foreground">Loading…</p>;
  else if (!session) body = <Login />;
  else if (isAdmin === null) body = <p className="text-muted-foreground">Checking access…</p>;
  else if (!isAdmin)
    body = (
      <div className="space-y-4">
        <p className="text-foreground">This account does not have admin access.</p>
        <button className={btnGhost} onClick={logout}>Log out</button>
      </div>
    );
  else body = <Dashboard onLogout={logout} email={session.user.email ?? ""} />;

  return (
    <div className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 font-display text-3xl font-extrabold">FANDDLE Admin</h1>
        {body}
      </div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <div className="max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6">
      <p className="font-display text-lg font-bold">Admin login</p>
      <input className={inp} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        className={inp}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button className={btn} onClick={submit} disabled={busy || !email || !password}>
        {busy ? "Logging in…" : "Log in"}
      </button>
    </div>
  );
}

function Dashboard({ onLogout, email }: { onLogout: () => void; email: string }) {
  const [tab, setTab] = useState<"users" | "settings">("users");
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button className={tab === "users" ? btn : btnGhost} onClick={() => setTab("users")}>Registered users</button>
        <button className={tab === "settings" ? btn : btnGhost} onClick={() => setTab("settings")}>Page settings</button>
        <span className="ml-auto text-xs text-muted-foreground">{email}</span>
        <button className={btnGhost} onClick={onLogout}>Log out</button>
      </div>
      {tab === "users" ? <UsersTab /> : <SettingsTab />}
    </div>
  );
}

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  city: string;
  occupation: string;
  reason: string;
  room_id: string;
  room_name: string;
  created_at: string;
};

function UsersTab() {
  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db.from("fanddle_room_registrations").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => [r.name, r.email, r.phone, r.city, r.room_name, r.occupation].some((v) => (v ?? "").toLowerCase().includes(s)));
  }, [rows, q]);

  const remove = async (id: string) => {
    if (!window.confirm("Delete this registration? This cannot be undone.")) return;
    const { error } = await db.from("fanddle_room_registrations").delete().eq("id", id);
    if (error) setError(error.message);
    else setRows((r) => r.filter((x) => x.id !== id));
  };

  const exportCsv = () => {
    const esc = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [
      ["Name", "Email", "Phone", "Age", "City", "Occupation", "Room", "Reason", "Registered at"].join(","),
      ...filtered.map((r) => [r.name, r.email, r.phone, r.age, r.city, r.occupation, `${r.room_id} ${r.room_name}`, r.reason, new Date(r.created_at).toLocaleString("en-IN")].map(esc).join(",")),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fanddle-registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-display text-lg font-bold">{rows.length} registered</p>
        <input className={`${inp} max-w-xs`} placeholder="Search name, email, phone, city, room" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className={btnGhost} onClick={load}>Refresh</button>
        <button className={btnGhost} onClick={exportCsv} disabled={!filtered.length}>Download CSV</button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-xs text-muted-foreground">
              <tr>
                {["Name", "Email", "Phone", "City", "Room", "Registered", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">{r.city}</td>
                  <td className="px-4 py-3">{r.room_id} · {r.room_name}</td>
                  <td className="whitespace-nowrap px-4 py-3">{new Date(r.created_at).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-red-400 hover:underline" onClick={() => remove(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function SettingsTab() {
  const [form, setForm] = useState<SiteSettingsRow>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [realCount, setRealCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await db.from("site_settings").select("*").eq("id", 1).maybeSingle();
      if (data) {
        const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== null));
        setForm({ ...defaultSettings, ...clean });
      }
      const { data: c } = await db.rpc("get_registration_count");
      if (typeof c === "number") setRealCount(c);
      setLoading(false);
    })();
  }, []);

  const set = <K extends keyof SiteSettingsRow>(k: K, v: SiteSettingsRow[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error } = await db.from("site_settings").update(payload).eq("id", 1);
    setMsg(error ? `Could not save: ${error.message}` : "Saved. Refresh the landing page to see it.");
    setSaving(false);
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  const shownCount = (form.use_real_count ? realCount : 0) + form.count_offset;

  return (
    <div className="max-w-2xl space-y-8">
      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <p className="font-display text-lg font-bold">Registration number</p>
        <p className="text-sm text-muted-foreground">
          Real registrations: <b>{realCount}</b>. Number shown on the landing page right now: <b>{shownCount}</b>.
        </p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.use_real_count} onChange={(e) => set("use_real_count", e.target.checked)} />
          Count real registrations automatically
        </label>
        <Field label="Extra number to add" hint="Added on top of the real count. Use 0 to show only real registrations.">
          <input className={inp} type="number" min={0} value={form.count_offset} onChange={(e) => set("count_offset", Math.max(0, Number(e.target.value) || 0))} />
        </Field>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <p className="font-display text-lg font-bold">Countdown timer</p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.show_countdown} onChange={(e) => set("show_countdown", e.target.checked)} />
          Show the countdown on the landing page
        </label>
        <Field label="Registration closes at" hint="Uses your computer's time zone.">
          <input
            className={inp}
            type="datetime-local"
            value={toLocalInput(form.registration_deadline)}
            onChange={(e) => e.target.value && set("registration_deadline", new Date(e.target.value).toISOString())}
          />
        </Field>
        <Field label="Countdown title">
          <input className={inp} value={form.countdown_text} onChange={(e) => set("countdown_text", e.target.value)} />
        </Field>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <p className="font-display text-lg font-bold">Hero section</p>
        <Field label="Top line">
          <input className={inp} value={form.hero_eyebrow} onChange={(e) => set("hero_eyebrow", e.target.value)} />
        </Field>
        <Field label="Headline">
          <input className={inp} value={form.hero_headline} onChange={(e) => set("hero_headline", e.target.value)} />
        </Field>
        <Field label="Highlighted end of headline" hint="Shown in the accent colour after the headline.">
          <input className={inp} value={form.hero_highlight} onChange={(e) => set("hero_highlight", e.target.value)} />
        </Field>
        <Field label="Intro paragraph">
          <textarea className={inp} rows={4} value={form.hero_subtext} onChange={(e) => set("hero_subtext", e.target.value)} />
        </Field>
      </section>

      <div className="flex items-center gap-4">
        <button className={btn} onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </div>
    </div>
  );
}
