import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RoomDirectory } from "@/components/room-directory";
import { Disclosure } from "@/components/disclosure";
import { Reveal } from "@/components/reveal";
import { InterestForm, RegistrationCounter } from "@/components/interest";
import heroImg from "@/assets/hero.jpg";
import ideaImg from "@/assets/idea.jpg";
import doorImg from "@/assets/door.jpg";
import problemImg from "@/assets/problem.jpg";
import billsImg from "@/assets/card-bills.jpg";
import careerImg from "@/assets/card-career.jpg";
import businessImg from "@/assets/card-business.jpg";
import emergencyImg from "@/assets/card-emergency.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FANDDLE — You never have to face a problem alone" },
      { name: "description", content: "FANDDLE is a people-powered network of 200 founding rooms where people share problems, exchange experience and offer voluntary help." },
      { property: "og:title", content: "FANDDLE — 200 rooms. 200,000 founding places." },
      { property: "og:description", content: "A new kind of human network. Share what you're facing. People choose to show up." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const problems = [
  { title: "THE UNPAID BILLS", body: "When the numbers stop working and you don't know what to do next.", img: billsImg },
  { title: "THE UNCLEAR CAREER", body: "When you have potential, but can't find the direction or opportunity you need.", img: careerImg },
  { title: "THE STRUGGLING BUSINESS", body: "When you've tried everything you know and need a different perspective.", img: businessImg },
  { title: "THE EMERGENCY", body: "When life takes an unexpected turn and you need people who are willing to listen.", img: emergencyImg },
];

const steps = [
  "Find the room relevant to your situation.",
  "Share your problem, question, or challenge.",
  "Members who choose to respond can share ideas, experience, contacts, or help.",
  "Use those perspectives to explore possible next steps.",
];

const people = [
  "Business founders & entrepreneurs", "Industry leaders & experienced professionals", "Influencers & creators",
  "Sportspersons & coaches", "Sales professionals", "Psychologists & wellbeing professionals",
  "Finance specialists", "Legal professionals", "Educators & specialised skills",
  "People who built something meaningful or overcame hard challenges",
];

const benefits = [
  ["BE HEARD", "Share a challenge in a space designed around relevant conversations."],
  ["SEE A DIFFERENT PERSPECTIVE", "Learn from people who may have faced something similar."],
  ["FIND PRACTICAL IDEAS", "Explore different approaches and possible next steps."],
  ["OFFER A HELPING HAND", "Voluntarily share experience, knowledge, time, or assistance."],
  ["DISCOVER CONNECTIONS", "Meet people with relevant skills, interests, and experiences."],
  ["GROW TOGETHER", "Contribute to a network where people learn from one another."],
];

const rules = [
  "No scams, fake emergencies or misleading requests.",
  "No pressure, coercion or demands for money.",
  "No harassment, hate or abuse of any kind.",
  "Every post and member can be reported. Moderators review reports.",
  "Legal, medical and psychological questions may need a qualified professional.",
];

const faqs = [
  ["What is FANDDLE?", "A people-powered network of focused rooms where members share problems, exchange experience and voluntarily help one another. It is not a social feed, a charity, or an AI advice tool."],
  ["How do the rooms work?", "Each room is dedicated to one kind of situation. You join the room closest to what you're facing, share it, and members who choose to respond can offer ideas, experience or help."],
  ["What kinds of problems can people share?", "Financial, career, business, social, legal, emotional, educational or personal challenges — within the community rules."],
  ["Can members offer voluntary financial assistance?", "Yes, if they independently choose to. FANDDLE does not arrange, control or guarantee private assistance, and nobody should ever be pressured to give money."],
  ["Will every member receive a response?", "No. Responses are voluntary and no outcome or solution is guaranteed."],
  ["Will well-known people and experts participate?", "No participation is confirmed yet. The professions shown describe the kinds of people FANDDLE aims to bring together. Confirmed participants will be announced only once verified."],
  ["What is the founding capacity?", "200 founding rooms with up to 1,000 members each — up to 200,000 founding places. When they are full, founding registration for these rooms closes."],
  ["When will the network launch?", "[Launch date to be confirmed.] Register your interest and we'll let you know."],
  ["How will personal information be protected?", "Your details are used only to contact you about FANDDLE and are never sold. [Full privacy policy to be published.]"],
  ["What rules prevent harassment, scams, and misuse?", "Clear community rules, reporting on every post and member, and moderation. Breaking the rules can lead to removal."],
  ["How can someone contact the team?", "Through the Contact section on our Terms page. [Contact email to be confirmed.]"],
];

const cta = "inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-sm font-bold tracking-wider text-primary-foreground shadow-lime transition-opacity hover:opacity-90";
const ghost = "inline-flex items-center justify-center rounded-full border border-border px-8 py-4 font-display text-sm font-semibold tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary";
const h2 = "font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl";
const wrap = "mx-auto max-w-7xl px-5 sm:px-8";

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* 1 HERO */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <img src={heroImg} alt="A diverse group of people gathered together at night" className="absolute inset-0 h-full w-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className={`relative ${wrap} py-24`}>
          <p className="eyebrow rise">ONE WORLD. COUNTLESS EXPERIENCES. PEOPLE WHO SHOW UP.</p>
          <h1 className="rise mt-6 max-w-5xl font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            What if you never had to face a problem <span className="text-primary">alone?</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Somewhere in the world, someone has faced what you're facing. Someone has learned something you haven't. Someone might know a way forward that you haven't discovered yet.
          </p>
          <p className="mt-4 max-w-2xl text-base text-foreground">
            <strong className="font-display">FANDDLE</strong> — a new kind of human network where people come together to share their problems, exchange experience, offer voluntary help, and find possible ways forward.
          </p>
          <div className="glow-border mt-10 max-w-xl rounded-2xl bg-card/80 p-6 backdrop-blur">
            <p className="flex items-center gap-2 font-display text-xs font-bold tracking-[0.3em] text-primary"><span className="pulse-dot inline-block h-2 w-2 rounded-full bg-primary" /> THE FIRST FOUNDING ROOMS</p>
            <p className="mt-3 font-display text-2xl font-extrabold text-foreground">ONE FOUNDING CHAPTER</p>
            <p className="mt-1 font-display text-sm font-semibold tracking-wider text-foreground">WHEN THE ROOMS ARE FULL, REGISTRATION CLOSES.</p>
            <p className="mt-3 text-xs text-muted-foreground">Once a founding room reaches its capacity, it will not reopen for founding registration.</p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/rooms" className={cta}>EXPLORE THE ROOMS →</Link>
            <Link to="/" hash="how" className={ghost}>DISCOVER HOW IT WORKS</Link>
          </div>
        </div>
      </section>

      {/* 2 PROBLEMS */}
      <section className="bg-surface py-24 sm:py-32">
        <div className={wrap}>
          <Reveal><h2 className={`${h2} max-w-5xl`}>Life doesn't give you a warning before everything changes.</h2></Reveal>
          <Reveal delay={100}><p className="mt-6 max-w-2xl text-lg text-muted-foreground">You don't always need another motivational quote. Sometimes you need a person who understands, has experience, or is willing to help you think through what comes next.</p></Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <article className="group relative h-[420px] overflow-hidden rounded-2xl border border-border">
                  <img src={p.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-extrabold leading-tight text-foreground">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 IDEA */}
      <section id="idea" className="py-24 sm:py-32">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2`}>
          <Reveal>
            <h2 className={h2}>One person has one perspective. <span className="text-primary">A thousand people bring a thousand experiences.</span></h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">A large group can offer different ideas, relevant experience, practical suggestions, emotional support, useful contacts and voluntary assistance. FANDDLE doesn't promise to solve every problem — it makes it easier to discover possible next steps, together.</p>
          </Reveal>
          <Reveal delay={150}><img src={ideaImg} alt="People in a serious, meaningful conversation" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" /></Reveal>
        </div>
      </section>

      {/* 4 HOW */}
      <section id="how" className="bg-surface py-24 sm:py-32">
        <div className={wrap}>
          <Reveal><h2 className={`${h2} max-w-5xl`}>You share what you're facing. <span className="text-primary">People choose to show up.</span></h2></Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 100} className="h-full">
                <div className="h-full bg-card p-8">
                  <p className="font-display text-7xl font-extrabold text-primary">0{i + 1}</p>
                  <div className="my-6 h-px w-12 bg-primary" />
                  <p className="text-lg text-foreground">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 NETWORK */}
      <section className="py-24 sm:py-32">
        <div className={wrap}>
          <Reveal><h2 className={h2}>200 rooms. 1,000 people in each. <span className="text-primary">200,000 founding places.</span></h2></Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[["200", "Founding rooms"], ["1,000", "Maximum members per room"], ["200,000", "Total planned founding capacity"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card p-8">
                <p className="font-display text-5xl font-extrabold text-foreground sm:text-6xl">{n}</p>
                <p className="eyebrow mt-3">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-20 gap-1.5" aria-hidden="true" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
            {Array.from({ length: 200 }).map((_, i) => (
              <span key={i} className="aspect-square rounded-sm border border-primary/30 bg-primary/5" style={{ opacity: 0.35 + ((i * 37) % 65) / 100 }} />
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-muted-foreground">Dedicated rooms make it easier to find people facing similar situations — and people who want to offer relevant help. These are planned places, not existing registrations.</p>
          <Link to="/rooms" className={`${cta} mt-8`}>FIND YOUR ROOM →</Link>
        </div>
      </section>

      {/* 6 DIRECTORY */}
      <section id="rooms" className="bg-surface py-24 sm:py-32">
        <div className={wrap}>
          <Reveal><h2 className={h2}>The room directory</h2></Reveal>
          <div className="mt-12"><RoomDirectory limit={9} /></div>
        </div>
      </section>

      {/* 7 PEOPLE */}
      <section className="py-24 sm:py-32">
        <div className={wrap}>
          <Reveal><h2 className={`${h2} max-w-5xl`}>Imagine what becomes possible when experience meets opportunity.</h2></Reveal>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Different perspectives, practical insights, lessons learned, new ideas and possible connections. This is the vision: the kinds of people FANDDLE aims to bring together.</p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {people.map((p, i) => (
              <div key={p} className="flex min-h-40 flex-col justify-between bg-card p-6 transition-colors hover:bg-secondary">
                <span className="font-display text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display text-base font-semibold text-foreground">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">No individual participation is confirmed. No personal access to any expert is promised.</p>
        </div>
      </section>

      {/* 8 BENEFITS */}
      <section className="bg-surface py-24 sm:py-32">
        <div className={wrap}>
          <Reveal><h2 className={h2}>More than a place to talk.</h2></Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([t, b], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/60">
                  <p className="font-display text-xs text-primary">0{i + 1}</p>
                  <h3 className="mt-6 font-display text-xl font-extrabold text-foreground">{t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 SUPPORT */}
      <section id="support" className="py-24 sm:py-32">
        <div className={`${wrap} grid gap-14 lg:grid-cols-2`}>
          <Reveal>
            <h2 className={h2}>Ask when you need help. <span className="text-primary">Help when you can.</span></h2>
            <p className="mt-8 text-lg text-muted-foreground">Members may voluntarily offer practical support, ideas, useful contacts, time, or financial assistance — only if they independently choose to.</p>
            <p className="mt-4 text-muted-foreground">FANDDLE provides the community space. Members decide whether and how to help. FANDDLE does not control private assistance or make members' personal decisions for them.</p>
          </Reveal>
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">Community rules</p>
            <ul className="mt-6 space-y-4">
              {rules.map((r) => <li key={r} className="flex gap-3 text-foreground"><span className="text-primary">—</span>{r}</li>)}
            </ul>
            <Link to="/terms" className="mt-8 inline-block text-sm text-primary underline-offset-4 hover:underline">Read guidelines & report misuse →</Link>
          </div>
        </div>
      </section>

      {/* 10 WINDOW */}
      <section className="relative overflow-hidden py-32 sm:py-44">
        <img src={doorImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className={`relative ${wrap}`}>
          <Reveal><h2 className={`${h2} max-w-4xl`}>This founding chapter will not open again.</h2></Reveal>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">We are building a defined network of 200 founding rooms, with a maximum capacity of 1,000 people in each. Once all founding places are filled, registration for these specific founding rooms will close permanently.</p>
          <p className="mt-8 font-display text-xl font-bold tracking-wider text-primary">CHOOSE YOUR ROOM BEFORE IT FILLS.</p>
          <Link to="/rooms" className={`${cta} mt-8`}>EXPLORE THE ROOMS →</Link>
        </div>
      </section>

      {/* 11 COUNTER + INTEREST */}
      <section id="join" className="bg-surface py-24 sm:py-32">
        <div className={wrap}>
          <RegistrationCounter />
          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className={h2}>Register your interest.</h2>
              <p className="mt-6 text-lg text-muted-foreground">Be the first to know when founding registration opens. Registering interest is free and does not confirm membership.</p>
            </div>
            <InterestForm />
          </div>
        </div>
      </section>

      {/* 12 FINAL CTA */}
      <section className="relative overflow-hidden py-32 sm:py-44">
        <img src={problemImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15 grayscale" />
        <div className={`relative ${wrap} text-center`}>
          <h2 className={`${h2} mx-auto max-w-5xl`}>You never know which connection could change what happens next.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">Your problem does not have to be your entire story. Discover a network built around people, shared experience, and the willingness to help.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/rooms" className={cta}>EXPLORE FANDDLE'S ROOMS →</Link>
            <Link to="/" hash="how" className={ghost}>LEARN HOW IT WORKS</Link>
          </div>
        </div>
      </section>

      {/* 13 FAQ */}
      <section id="faq" className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className={h2}>Questions</h2>
          <div className="mt-12">
            {faqs.map(([q, a]) => <Disclosure key={q} title={q}>{a}</Disclosure>)}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
