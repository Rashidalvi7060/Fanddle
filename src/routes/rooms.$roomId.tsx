import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getRoom, MEMBERSHIP_PRICE_INR, ROOM_CAPACITY } from "@/data/rooms";

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = getRoom(params.roomId);
    if (!room) throw notFound();
    return { room };
  },
  head: () => ({
    meta: [
      { title: "Room — FANDDLE" },
      {
        name: "description",
        content:
          "A founding room inside FANDDLE: 1,000 members sharing experience and voluntary support around one kind of challenge.",
      },
      { property: "og:title", content: "Room — FANDDLE" },
      {
        property: "og:description",
        content: "One of the 100 planned founding rooms inside FANDDLE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoomDetail,
});

function RoomDetail() {
  const { room } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <Link to="/rooms" className="text-sm text-muted-foreground hover:text-foreground">
          ← All rooms
        </Link>

        <p className="mt-10 font-display text-xs tracking-[0.35em] text-primary">
          ROOM {room.id}
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">{room.title}</h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
          {room.category} · Planned
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {room.description} Members post the challenge they are facing, ask questions, share
          what worked for them, and offer help voluntarily. Responses come from members who
          choose to reply — no outcome is guaranteed.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          <div className="bg-card p-6">
            <p className="eyebrow">Capacity</p>
            <p className="mt-3 font-display text-2xl">
              {ROOM_CAPACITY.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-card p-6">
            <p className="eyebrow">Places left</p>
            <p className="mt-3 font-display text-2xl">Not yet open</p>
          </div>
          <div className="bg-card p-6">
            <p className="eyebrow">Membership</p>
            <p className="mt-3 font-display text-2xl">₹{MEMBERSHIP_PRICE_INR}</p>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Availability is shown from real registration data only. No counts are displayed until
          registration opens. A room that reaches {ROOM_CAPACITY.toLocaleString("en-IN")} members
          shows <em>Room Full</em> and its join button is disabled.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/join/$roomId"
            params={{ roomId: room.id }}
            className="rounded-full bg-primary px-7 py-4 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Join this room — ₹{MEMBERSHIP_PRICE_INR}
          </Link>
          <Link
            to="/terms"
            className="rounded-full border border-border px-7 py-4 text-center text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Read the Membership Terms
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
