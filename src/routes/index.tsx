import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RoomDirectory } from "@/components/room-directory";
import { Disclosure } from "@/components/disclosure";
import {
  FOUNDING_PLACES,
  ROOM_CAPACITY,
  TOTAL_ROOMS,
} from "@/data/rooms";
import heroImg from "@/assets/hero.jpg";
import problemImg from "@/assets/problem.jpg";
import ideaImg from "@/assets/idea.jpg";
import doorImg from "@/assets/door.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FANDDLE — The first 100 rooms" },
      {
        name: "description",
        content:
          "FANDDLE is a human-support network of 100 founding rooms with 1,000 members each. Share real problems, exchange experience and help voluntarily.",
      },
      { property: "og:title", content: "FANDDLE — The first 100 rooms" },
      {
        property: "og:description",
        content:
          "100 founding rooms. 1,000 people in each. One founding chapter of a people-powered network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const expertAreas = [
  "Business founders",
  "Industry professionals",
  "Influencers & creators",
  "Sportspersons",
  "Sales professionals",
  "Psychologists",
  "Finance specialists",
  "Educators",
  "Legal professionals",
  "People who have solved hard problems",
];

const steps = [
  {
    n: "01",
    title: "Explore the rooms",
    body: "Browse the planned directory of 100 founding rooms and see what each one is for.",
  },
  {
    n: "02",
    title: "Choose the room relevant to you",
    body: "Pick the space closest to your situation, or the one where your experience is useful to others.",
  },
  {
    n: "03",
    title: "Share a challenge, question or offer of help",
    body: "Post what you are facing, ask a question, share lived experience, or offer to help someone else.",
  },
  {
    n: "04",
    title: "Connect with members who choose to respond",
    body: "Some members will respond. Together you work towards possible ways forward. Nobody is obliged to reply.",
  },
];

const faqs = [
  {
    q: "What is FANDDLE?",
    a: "A people-powered network built around focused rooms where members share real-life problems, ask questions, exchange experience and voluntarily help one another. It is not a social feed, a charity, or an AI advice tool.",
  },
  {
    q: "Why are there 100 rooms?",
    a: "The founding chapter is deliberately limited to 100 rooms so each space stays focused on one kind of challenge instead of becoming a general forum.",
  },
  {
    q: "Why does each room have a capacity of 1,000?",
    a: "A thousand members is large enough to hold a wide range of experience and small enough that posts do not disappear. 100 rooms × 1,000 members = 100,000 founding places.",
  },
  {
    q: `What does the membership include?`,
    a: "A one-time Founding Membership fee covering participation in one selected founding room for the founding period. Exact duration, launch date and the full feature list are being finalised and will be shown in full before any payment is taken.",
  },
  {
    q: "Can I choose my own room?",
    a: "Yes. You select your room during registration and it is reserved for you once your membership is confirmed.",
  },
  {
    q: "Can I ask for financial help?",
    a: "You may describe a financial problem. Any help is entirely at another member's own discretion. FANDDLE does not arrange, control or guarantee private financial assistance and nobody should ever be pressured to send money.",
  },
  {
    q: "Can I offer help voluntarily?",
    a: "Yes — advice, time, practical assistance, useful contacts, or financial help if you independently decide to. That decision is always yours alone.",
  },
  {
    q: "Will famous people and experts be present?",
    a: "No expert participation is confirmed. The categories shown are intended areas of expertise. Any confirmed sessions or participants will be announced only once secured.",
  },
  {
    q: "Will someone definitely respond to my post?",
    a: "No. Responses are voluntary, and no outcome or solution is guaranteed.",
  },
  {
    q: "When does the platform launch?",
    a: "[Placeholder: launch date to be confirmed by the owner before registration opens.]",
  },
  {
    q: "Can I cancel or request a refund?",
    a: "[Placeholder: cancellation and refund terms must be finalised and published before any payment is accepted.]",
  },
  {
    q: "What happens when the rooms are full?",
    a: "A room that reaches 1,000 members is marked Room Full and its join button is disabled. When all founding places are filled, founding registration closes permanently for these rooms.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="A group of people standing in low light"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
          <div className="max-w-3xl rise">
            <p className="eyebrow">Something different is taking shape</p>
            <h1 className="mt-7 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Somewhere, someone has already faced the problem you're facing.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              What if you could connect with people who understand, people who've been through
              it, and people who may be able to help you move forward?
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              FANDDLE is a new kind of human network — built around meaningful connections,
              shared experience, and people helping people.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/rooms"
                className="rounded-full bg-primary px-7 py-4 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Find Your Room
              </Link>
              <Link
                to="/"
                hash="membership"
                className="rounded-full border border-border px-7 py-4 text-center text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Discover the Founding Membership
              </Link>
            </div>

            <div className="mt-16 line-draw hairline" />
            <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="eyebrow">The first</p>
                <p className="mt-2 font-display text-3xl">100 Rooms</p>
              </div>
              <div>
                <p className="eyebrow">Per room</p>
                <p className="mt-2 font-display text-3xl">
                  {ROOM_CAPACITY.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="eyebrow">Founding capacity</p>
                <p className="mt-2 font-display text-3xl">
                  {FOUNDING_PLACES.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The problem</p>
            <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
              You can know a thousand people and still have nobody to turn to.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
              Money running short. A career that stalled. A business that isn't working. A
              relationship coming apart. A legal notice nobody explains. A weight you carry
              quietly.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Most people don't lack contacts. They lack someone who has been there — and the
              honest conversation that follows.
            </p>
          </div>
          <img
            src={problemImg}
            alt="A person sitting alone by a window at night"
            loading="lazy"
            width={1408}
            height={1008}
            className="w-full rounded-xl object-cover"
          />
        </div>
      </section>

      {/* BIG IDEA */}
      <section id="idea" className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <img
              src={ideaImg}
              alt="A small group of people in conversation"
              loading="lazy"
              width={1408}
              height={1008}
              className="order-2 w-full rounded-xl object-cover lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <p className="eyebrow">The big idea</p>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
                What one person cannot change alone, people can work on together.
              </h2>
              <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                FANDDLE brings people into focused rooms where they can share challenges, offer
                ideas, exchange lived experience and voluntarily help one another.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Not every problem gets solved. But very few problems are faced for the first
                time — and a room of a thousand people carries a lot of experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT NETWORK VISION */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="eyebrow">The network we're building towards</p>
        <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
          Different worlds. Extraordinary experience.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          These are the areas of experience FANDDLE intends to bring together. They are intended
          areas, not confirmed participants. Any expert sessions or participation will be
          announced only when secured.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {expertAreas.map((a) => (
            <div key={a} className="bg-card p-6">
              <p className="font-display text-sm leading-snug text-foreground">{a}</p>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                Intended area
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FIRST 100 ROOMS */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-36">
          <p className="eyebrow">The first 100 rooms</p>
          <h2 className="mx-auto mt-7 max-w-4xl font-display text-4xl leading-[1.08] sm:text-6xl">
            100 rooms. 1,000 people in each. One founding chapter.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A hundred dedicated spaces for people navigating different challenges and looking for
            relevant experience, practical ideas, and voluntary support.
          </p>

          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {[
              { v: String(TOTAL_ROOMS), l: "Founding rooms" },
              { v: ROOM_CAPACITY.toLocaleString("en-IN"), l: "Members per room" },
              { v: FOUNDING_PLACES.toLocaleString("en-IN"), l: "Total founding places" },
            ].map((s) => (
              <div key={s.l} className="bg-background px-6 py-12">
                <p className="font-display text-5xl text-primary sm:text-6xl">{s.v}</p>
                <p className="mt-4 eyebrow">{s.l}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You choose the room most relevant to your situation — or the room where the kind of
            support you want to contribute is needed most.
          </p>
        </div>
      </section>

      {/* ROOM DIRECTORY */}
      <section id="rooms" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="eyebrow">Room directory — planned</p>
        <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
          Find the room that matches what you're dealing with.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          All 100 rooms are planned and grouped by category until the final directory is
          confirmed. Room availability will be shown from real registration data once
          registration opens.
        </p>
        <div className="mt-12">
          <RoomDirectory limit={9} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
            Four steps, and then it's people.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="bg-background p-8">
                <p className="font-display text-sm tracking-[0.3em] text-primary">{s.n}</p>
                <h3 className="mt-6 font-display text-lg leading-snug">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Members choose voluntarily whether to respond or help. A post is not sent to 1,000
            people for a guaranteed answer — it's an open invitation to the members who can add
            something useful.
          </p>
        </div>
      </section>

      {/* VOLUNTARY HELP */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Voluntary peer-to-peer help</p>
            <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
              Help when you can. Ask when you need to.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
              Members may voluntarily offer advice, time, practical assistance, useful contacts —
              or financial help, if they independently choose to.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              FANDDLE provides the community space. Members independently decide what they share
              and whether they help. FANDDLE does not control private assistance or make those
              decisions for anyone.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                t: "Financial help is never automatic",
                b: "It is not guaranteed, not an entitlement, and never something a member can be pressured into. Requests designed to pressure people are not allowed.",
              },
              {
                t: "Reporting and blocking built in",
                b: "Every post and member can be reported. Clear rules stand against scams, harassment, coercion and misleading requests.",
              },
              {
                t: "Some questions need professionals",
                b: "Legal, medical, psychological and financial matters may require qualified professionals. Peer experience is a starting point, not advice.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-base">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Founding membership</p>
              <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
                Be part of the first 100 rooms.
              </h2>
              <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                One membership. One founding room of your choice. You confirm the room during
                registration, and your place is reserved once your membership is confirmed.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Everything not yet finalised is marked as a placeholder below. Full terms appear
                on the review screen before any payment is taken.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/40 bg-background p-8 shadow-[var(--shadow-lime)]">
              <p className="eyebrow">Founding Membership</p>
              <p className="mt-5 font-display text-6xl text-primary">
                [to be confirmed]
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                One-time payment · one founding room
              </p>

              <div className="mt-7 hairline" />

              <ul className="mt-7 space-y-4 text-sm text-muted-foreground">
                {[
                  "Participation in one founding room you select (additional rooms are not included).",
                  "Founding member status and a unique member ID issued after confirmed payment.",
                  "Your reserved place in that room, held at a fixed capacity of 1,000 members.",
                  "Access duration covered by this payment: [Placeholder — to be confirmed before launch].",
                  "Launch timeline: [Placeholder — to be confirmed before launch].",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-primary" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/rooms"
                className="mt-9 block rounded-full bg-primary px-7 py-4 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Choose Your Room
              </Link>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Room selection first, then membership checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING WINDOW */}
      <section className="relative overflow-hidden">
        <img
          src={doorImg}
          alt="A dark doorway with a thin line of light"
          loading="lazy"
          width={1408}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
          <div className="max-w-2xl">
            <p className="eyebrow">A one-time founding window</p>
            <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
              The first 100 rooms will not open again.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
              We are creating 100 founding rooms with a fixed capacity of 1,000 members each.
              When all founding places are filled, registration for these founding rooms will
              close permanently.
            </p>
            <div className="mt-10 line-draw hairline" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              No countdowns, no invented totals. A full room shows <em>Room Full</em> and its join
              button is disabled. When every founding place is taken,{" "}
              <em>Founding Registration Closed</em> is shown. FANDDLE itself continues — only
              these founding rooms close.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="border-y border-border bg-card">
        <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="eyebrow">Trust, privacy and safety</p>
          <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
            The things you should know before you join.
          </h2>
          <div className="mt-12">
            <Disclosure title="What FANDDLE is, and what's available at launch">
              FANDDLE is a members' network of focused rooms for sharing problems, questions and
              experience. At launch it offers room participation, posting, replies, reporting and
              blocking. [Placeholder: the confirmed launch feature list and date must be provided
              before registration opens.] No feature is promised here that has not been decided.
            </Disclosure>
            <Disclosure title="Who can join, and the minimum age">
              Membership is for adults. Minimum age: 18. [Placeholder: any additional eligibility
              or regional restrictions to be confirmed by the owner.]
            </Disclosure>
            <Disclosure title="How posts and personal information are handled">
              Your name, email and phone number are used for your membership account, room
              assignment and support. Your posts are visible to members of your room. Private
              contact details are never shown publicly by FANDDLE. [Placeholder: the full privacy
              notice, data retention period and processor list must be published before launch.]
            </Disclosure>
            <Disclosure title="Moderation, reporting, blocking and anti-harassment">
              Every post and member can be reported, and members can block one another.
              Harassment, coercion, scams, spam and misleading requests are grounds for removal.
              [Placeholder: moderation team structure and response times to be confirmed.]
            </Disclosure>
            <Disclosure title="Assistance between members is voluntary">
              Any help — advice, time, contacts or money — is given entirely at a member's own
              discretion. FANDDLE does not arrange, hold, transfer, control or guarantee private
              assistance between members, and no member is entitled to receive it.
            </Disclosure>
            <Disclosure title="Expert participation is not guaranteed">
              The areas of expertise shown on this page describe the network we intend to build.
              No expert, celebrity or organisation is confirmed. Confirmed sessions will be
              announced only once secured.
            </Disclosure>
            <Disclosure title="Payment, membership duration, cancellation and refunds">
              The Founding Membership is [to be confirmed], a one-time payment covering one
              selected founding room. [Placeholder: access duration, cancellation window and
              refund policy must be finalised and published before any payment is accepted.] No
              payments are being collected until then.
            </Disclosure>
            <Disclosure title="Contacting support">
              [Placeholder: support email address and response window to be provided by the owner
              before launch.]
            </Disclosure>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="eyebrow">Questions</p>
        <h2 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
          Straight answers, no promises we can't keep.
        </h2>
        <div className="mt-12">
          {faqs.map((f) => (
            <Disclosure key={f.q} title={f.q}>
              {f.a}
            </Disclosure>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <h2 className="font-display text-3xl leading-tight sm:text-5xl">
            You never know which connection could change what happens next.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
            Explore the first 100 rooms. Find the one that matters to you. Become part of the
            founding chapter of FANDDLE.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              to="/rooms"
              className="rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Find Your Room
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Read the Membership Terms
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
