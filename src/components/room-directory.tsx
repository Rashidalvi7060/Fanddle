import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, rooms, ROOM_CAPACITY, TOTAL_ROOMS, type Room } from "@/data/rooms";
import { roomImage } from "@/data/room-images";

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
      <div className="relative h-40 overflow-hidden">
        <img src={roomImage(room.category)} alt="" loading="lazy" width={768} height={1024} className="h-full w-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between px-6 pb-6">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-display text-xs tracking-[0.3em] text-primary">
            ROOM {room.id}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Planned
          </span>
        </div>
        <h3 className="mt-5 font-display text-lg leading-snug text-foreground">{room.title}</h3>
        <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
          {room.category}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
      </div>

      <div className="mt-6">
        <div className="hairline" />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Capacity {ROOM_CAPACITY.toLocaleString("en-IN")}
          </span>
          <Link
            to="/rooms/$roomId"
            params={{ roomId: room.id }}
            className="rounded-full border border-primary px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Explore Room →
          </Link>
        </div>
      </div>
      </div>
    </article>
  );
}

export function RoomDirectory({ limit }: { limit?: number }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rooms.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesQuery =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.id.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="w-full lg:max-w-sm">
          <span className="sr-only">Search rooms</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rooms by keyword…"
            className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </label>
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {rooms.length} planned rooms
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...categories].map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={
                active
                  ? "rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                  : "rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-14 text-center text-sm text-muted-foreground">
          No rooms match that search yet. Try another keyword.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      {limit && filtered.length > visible.length && (
        <div className="mt-10 text-center">
          <Link
            to="/rooms"
            className="inline-flex rounded-full border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View all {TOTAL_ROOMS} rooms →
          </Link>
        </div>
      )}
    </div>
  );
}
