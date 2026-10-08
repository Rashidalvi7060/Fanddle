import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as any;

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [{ title: "Member area — FANDDLE" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AppHome,
});

function AppHome() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [approved, setApproved] = useState<boolean | null>(null);

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
      setApproved(null);
      return;
    }
    db.rpc("is_approved_member").then(({ data }: any) => setApproved(data === true));
  }, [session]);

  const logout = () => supabase.auth.signOut();
  const box = "mx-auto max-w-xl px-5 py-24 text-center sm:px-8";
  const btn = "mt-8 inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary";

  let body;
  if (!ready || (session && approved === null)) {
    body = <p className="text-muted-foreground">Loading…</p>;
  } else if (!session) {
    body = (
      <>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Please log in</h1>
        <Link to="/login" className={btn}>Go to login</Link>
      </>
    );
  } else if (!approved) {
    body = (
      <>
        <h1 className="font-display text-3xl font-extrabold text-foreground">Not approved yet</h1>
        <p className="mt-4 text-muted-foreground">
          Your account ({session.user.email}) is not approved yet. Make sure your email is verified and that you are
          using the same email as your registration. We will contact you after approval.
        </p>
        <button className={btn} onClick={logout}>Log out</button>
      </>
    );
  } else {
    body = (
      <>
        <p className="eyebrow text-primary">WELCOME TO FANDDLE</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold uppercase text-foreground">You're in.</h1>
        <p className="mt-4 text-muted-foreground">The member platform is coming here. Logged in as {session.user.email}.</p>
        <button className={btn} onClick={logout}>Log out</button>
      </>
    );
  }

  return <div className="min-h-screen bg-background"><div className={box}>{body}</div></div>;
}
