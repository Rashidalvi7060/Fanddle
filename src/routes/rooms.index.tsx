import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RoomDirectory } from "@/components/room-directory";
import { FOUNDING_PLACES, ROOM_CAPACITY } from "@/data/rooms";

export const Route = createFileRoute("/rooms/")({
  head: () => ({
    meta: [
      { title: "Room directory — FANDDLE" },
      {
        name: "description",
        content:
          "Search and filter the 100 planned founding rooms of FANDDLE, each with a capacity of 1,000 members.",
      },
      { property: "og:title", content: "Room directory — FANDDLE" },
      {
        property: "og:description",
        content: "100 planned founding rooms. Search by keyword, filter by category.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow">The first 100 rooms — planned directory</p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Find your room.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Every room holds {ROOM_CAPACITY.toLocaleString("en-IN")} members —{" "}
          {FOUNDING_PLACES.toLocaleString("en-IN")} founding places in total. Categories are
          marked as planned until the final directory is confirmed. Live availability appears once
          registration opens.
        </p>
        <div className="mt-14">
          <RoomDirectory />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
