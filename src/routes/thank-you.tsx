import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { rooms } from "@/data/rooms";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/lib/use-site-settings";

const db = supabase as any;

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Thank you — FANDDLE" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: ThankYou,
});

/* ---------- Share card (drawn in the browser, nothing is uploaded) ---------- */

const W = 1080;
const H = 1350;
const FONT = '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif';

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const cut = lines.slice(0, maxLines);
    cut[maxLines - 1] = cut[maxLines - 1].replace(/\s*\S*$/, "") + "…";
    return cut;
  }
  return lines;
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + r, r, Math.PI / 2, (Math.PI * 3) / 2);
  ctx.closePath();
}

function drawCard(name: string, room: string, host: string) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const spacing = (px: number) => {
    (ctx as any).letterSpacing = `${px}px`;
  };

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0b0f0d");
  bg.addColorStop(1, "#050706");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W - 100, 150, 20, W - 100, 150, 650);
  glow.addColorStop(0, "rgba(214,238,102,0.28)");
  glow.addColorStop(1, "rgba(214,238,102,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(214,238,102,0.45)";
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#d6ee66";
  ctx.font = `800 36px ${FONT}`;
  spacing(14);
  ctx.fillText("FANDDLE", 100, 140);

  ctx.fillStyle = "#9aa39e";
  ctx.font = `600 28px ${FONT}`;
  spacing(6);
  ctx.fillText("I'M JOINING AS A FOUNDING MEMBER OF", 100, 310);

  spacing(0);
  ctx.fillStyle = "#f4f6f2";
  ctx.font = `800 80px ${FONT}`;
  const titleLines = wrapLines(ctx, room.toUpperCase(), W - 200, 4);
  let y = 410;
  titleLines.forEach((l) => {
    ctx.fillText(l, 100, y);
    y += 92;
  });
  y -= 92;

  let nameSize = 46;
  ctx.font = `700 ${nameSize}px ${FONT}`;
  const label = `— ${name}`;
  while (ctx.measureText(label).width > W - 200 && nameSize > 26) {
    nameSize -= 2;
    ctx.font = `700 ${nameSize}px ${FONT}`;
  }
  ctx.fillStyle = "#d6ee66";
  ctx.fillText(label, 100, y + 90);

  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(100, y + 140, W - 200, 2);

  const tagTop = Math.max(y + 230, 900);
  ctx.fillStyle = "#e8ece9";
  ctx.font = `600 46px ${FONT}`;
  const tag = wrapLines(ctx, "What if you never had to face a problem alone?", W - 200, 2);
  let ty = tagTop;
  tag.forEach((l) => {
    ctx.fillText(l, 100, ty);
    ty += 62;
  });

  ctx.fillStyle = "#9aa39e";
  ctx.font = `500 30px ${FONT}`;
  ctx.fillText("200 founding rooms · up to 1,000 people in each", 100, ty + 24);

  const btnY = H - 250;
  ctx.fillStyle = "#d6ee66";
  pill(ctx, 100, btnY, W - 200, 100);
  ctx.fill();
  ctx.fillStyle = "#0b0f0d";
  ctx.font = `800 36px ${FONT}`;
  ctx.textAlign = "center";
  spacing(2);
  ctx.fillText(`JOIN ME  →  ${host}`, W / 2, btnY + 63);
  ctx.textAlign = "left";

  return canvas;
}

/* ---------- Page ---------- */

const inp = "w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary";
const btn = "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50";
const btnGhost = "inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary";

function ThankYou() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const [origin, setOrigin] = useState("");
  const [img, setImg] = useState("");
  const [customText, setCustomText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { settings } = useSiteSettings();
  const [refInfo, setRefInfo] = useState<{ ref_code: string; total: number; qualified: number } | null>(null);
  const [refBusy, setRefBusy] = useState(false);
  const [refMsg, setRefMsg] = useState("");

  const [postUrl, setPostUrl] = useState("");
  const [proofBusy, setProofBusy] = useState(false);
  const [proofMsg, setProofMsg] = useState("");
  const [proofOk, setProofOk] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      const saved = JSON.parse(window.localStorage.getItem("fanddle:registration") ?? "null");
      if (saved) {
        setName(saved.name ?? "");
        setEmail(saved.email ?? "");
        setRoomId(saved.room_id ?? "");
        if (saved.email) loadReferral(saved.email);
      }
    } catch {
      // ignore
    }
  }, []);

  const loadReferral = async (value: string) => {
    if (!value.trim()) return;
    setRefBusy(true);
    setRefMsg("");
    const { data, error } = await db.rpc("get_referral_info", { p_email: value.trim() });
    if (error || !data) {
      setRefInfo(null);
      setRefMsg("We could not find a registration with this email.");
    } else {
      setRefInfo(data);
    }
    setRefBusy(false);
  };

  const room = rooms.find((r) => r.id === roomId);
  const refLink = refInfo ? `${origin}/?ref=${refInfo.ref_code}` : origin;
  const host = origin.replace(/^https?:\/\//, "");

  useEffect(() => {
    if (!name.trim() || !host) {
      setImg("");
      return;
    }
    setImg(drawCard(name.trim(), room?.title ?? "the founding rooms", host).toDataURL("image/png"));
  }, [name, room, host]);

  const defaultText = useMemo(
    () =>
      `I just joined ${room ? `the "${room.title}" room` : "a founding room"} on FANDDLE, a people-powered network where people share problems, exchange experience and offer voluntary help. There are only 200 founding rooms and registration is limited. Join me: ${refLink}`,
    [room, refLink],
  );
  const text = customText ?? defaultText;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(refLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const nativeShare = async () => {
    const nav = navigator as any;
    try {
      const blob = await (await fetch(img)).blob();
      const file = new File([blob], "fanddle-founding-member.png", { type: "image/png" });
      if (nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], text });
      } else if (nav.share) {
        await nav.share({ text });
      } else {
        await copy();
      }
    } catch {
      // user cancelled
    }
  };

  const submitProof = async () => {
    setProofBusy(true);
    setProofMsg("");
    setProofOk(false);
    const { data, error } = await db.rpc("submit_share_proof", { p_email: email.trim(), p_url: postUrl.trim() });
    if (error) setProofMsg("Please paste a valid link that starts with https://");
    else if (data === true) {
      setProofOk(true);
      setProofMsg("Received. Our team will check your post and approve your access.");
    } else setProofMsg("We could not find a pending registration for this email. Use the same email you registered with.");
    setProofBusy(false);
  };

  const enc = encodeURIComponent;
  const links = [
    ["WhatsApp", `https://wa.me/?text=${enc(text)}`],
    ["X", `https://twitter.com/intent/tweet?text=${enc(text)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(refLink)}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${enc(refLink)}`],
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-primary">FANDDLE FOUNDING ROOMS</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold uppercase text-foreground sm:text-5xl">Thank you.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Thanks for registering. If you have completed your payment, our team will verify it and approve your access.
          Sharing is optional, but there are benefits for bringing friends.
        </p>

        <ol className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <li className="rounded-xl border border-border bg-card p-4"><b className="text-primary">1.</b> We verify your payment and approve your access.</li>
          <li className="rounded-xl border border-border bg-card p-4"><b className="text-primary">2.</b> Optional: share your card with your personal link.</li>
          <li className="rounded-xl border border-border bg-card p-4"><b className="text-primary">3.</b> Friends who join through your link count towards your benefits.</li>
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            {img ? (
              <img src={img} alt="Your FANDDLE share card" className="w-full rounded-2xl border border-border" />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Enter your name to see your card.
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-1 text-sm font-semibold">
                Your name
                <input className={`${inp} font-normal`} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="block space-y-1 text-sm font-semibold">
                Your room
                <select className={`${inp} font-normal`} value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                  <option value="">Choose a room</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.id} · {r.title}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block space-y-1 text-sm font-semibold">
              Your message (you can edit it)
              <textarea className={`${inp} font-normal`} rows={5} value={text} onChange={(e) => setCustomText(e.target.value)} />
            </label>

            <div className="flex flex-wrap gap-3">
              <a
                href={img || undefined}
                download="fanddle-founding-member.png"
                className={`${btn} ${img ? "" : "pointer-events-none opacity-50"}`}
              >
                DOWNLOAD CARD
              </a>
              <button className={btnGhost} onClick={copy}>{copied ? "Copied" : "Copy message"}</button>
              <button className={btnGhost} onClick={nativeShare} disabled={!img}>Share…</button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted-foreground">Open:</span>
              {links.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer noopener" className="text-primary underline-offset-4 hover:underline">
                  {label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Social sites cannot attach the image automatically. Download the card first, then add it to your post.
            </p>
          </div>
        </div>

        {settings.referral_enabled !== false && (
          <div className="mt-14 rounded-2xl border border-primary/40 bg-card p-6">
            <p className="eyebrow text-primary">INVITE FRIENDS (OPTIONAL)</p>
            <p className="mt-3 font-display text-xl font-bold text-foreground">Bring people in with your personal link.</p>
            {settings.referral_offer?.trim() && (
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{settings.referral_offer}</p>
            )}
            {refInfo ? (
              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input readOnly className={`${inp} flex-1 font-mono text-xs`} value={refLink} onFocus={(e) => e.currentTarget.select()} />
                  <button className={btnGhost} onClick={copyLink}>{linkCopied ? "Copied" : "Copy link"}</button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Friends who joined with your link: <b className="text-foreground">{refInfo.total}</b> · paid and verified:{" "}
                  <b className="text-primary">{refInfo.qualified}</b>
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                <p className="text-sm text-muted-foreground">Enter the email you registered with to see your link.</p>
                <div className="flex flex-wrap gap-3">
                  <input className={`${inp} flex-1`} type="email" placeholder="Registered email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button className={btn} onClick={() => loadReferral(email)} disabled={refBusy || !email.trim()}>
                    {refBusy ? "Please wait…" : "GET MY LINK"}
                  </button>
                </div>
                {refMsg && <p className="text-sm text-red-400">{refMsg}</p>}
              </div>
            )}
          </div>
        )}

        <div className="mt-14 max-w-2xl rounded-2xl border border-border bg-card p-6">
          <p className="font-display text-lg font-bold text-foreground">Send us your post link (optional)</p>
          <p className="mt-2 text-sm text-muted-foreground">
            After you post, copy the link of your post and paste it here with the email you registered with.
          </p>
          <div className="mt-4 space-y-3">
            <input className={inp} type="email" placeholder="Registered email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={inp} placeholder="https://… (link of your post)" value={postUrl} onChange={(e) => setPostUrl(e.target.value)} />
            <button className={btn} onClick={submitProof} disabled={proofBusy || !email.trim() || !postUrl.trim()}>
              {proofBusy ? "Sending…" : "SUBMIT LINK"}
            </button>
            {proofMsg && <p className={`text-sm ${proofOk ? "text-primary" : "text-red-400"}`}>{proofMsg}</p>}
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Already approved? <a href="/login" className="text-primary underline-offset-4 hover:underline">Member login →</a>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
