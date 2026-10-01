import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getRoom, ROOM_CAPACITY, TOTAL_ROOMS } from "@/data/rooms";
import { roomImage } from "@/data/room-images";

export const Route = createFileRoute("/rooms/$roomId")({
  loader: ({ params }) => {
    const room = getRoom(params.roomId);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.room.title ?? "Room"} — FANDDLE` },
      {
        name: "description",
        content:
          "A planned founding room inside FANDDLE: up to 1,000 members sharing experience and voluntary support around one kind of challenge.",
      },
      { property: "og:title", content: `${loaderData?.room.title ?? "Room"} — FANDDLE` },
      { property: "og:description", content: `One of the ${TOTAL_ROOMS} planned founding rooms inside FANDDLE.` },
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
      <section className="relative overflow-hidden border-b border-border">
        <img src={roomImage(room.category)} alt="" className="absolute inset-0 h-full w-full object-cover grayscale opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
          <Link to="/rooms" className="text-sm text-muted-foreground hover:text-foreground">
            ← All rooms
          </Link>
          <p className="mt-10 font-display text-xs tracking-[0.35em] text-primary">ROOM {room.id}</p>
          <h1 className="headline mt-6 text-4xl sm:text-6xl">{room.title}</h1>
          <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
            {room.category} · Planned
          </p>
        </div>
      </section>
      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {room.description} Members will be able to share the challenge they are facing, ask
          questions, share what worked for them, and offer help voluntarily. Responses come from
          members who choose to reply — no response or outcome is guaranteed.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          <div className="bg-card p-6">
            <p className="eyebrow">Maximum members</p>
            <p className="mt-3 font-display text-2xl">{ROOM_CAPACITY.toLocaleString("en-IN")}</p>
          </div>
          <div className="bg-card p-6">
            <p className="eyebrow">Availability</p>
            <p className="mt-3 font-display text-2xl">Registration not yet open</p>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Availability will be shown from real registration data only. No member counts are
          displayed until registration opens. When this founding room reaches its capacity, it
          will close to new founding members.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/rooms"
            className="rounded-full bg-primary px-7 py-4 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore other rooms →
          </Link>
          <Link
            to="/terms"
            hash="guidelines"
            className="rounded-full border border-border px-7 py-4 text-center text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Read the Community Guidelines
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
