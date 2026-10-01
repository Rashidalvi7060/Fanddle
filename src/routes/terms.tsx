import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ROOM_CAPACITY, TOTAL_ROOMS } from "@/data/rooms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms, Privacy & Community Guidelines — FANDDLE" },
      {
        name: "description",
        content: "FANDDLE terms, privacy policy, community guidelines, misuse reporting and contact.",
      },
      { property: "og:title", content: "Terms, Privacy & Community Guidelines — FANDDLE" },
      { property: "og:description", content: "How FANDDLE works, what it protects, and the rules members follow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow">Concept-stage document</p>
        <h1 className="headline mt-6 text-4xl sm:text-6xl">Terms, privacy & guidelines</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Items marked <strong className="text-foreground">[Placeholder]</strong> will be completed
          by FANDDLE before registration opens. Nothing here claims guarantees, certifications or
          partnerships.
        </p>

        <div className="mt-14 space-y-12">
          <Section id="terms" title="Terms">
            <p>
              FANDDLE is currently a concept and membership-interest website. Registration is not
              open and no membership is offered on this page. Full terms of use: [Placeholder].
            </p>
            <p>
              FANDDLE plans {TOTAL_ROOMS} founding rooms, each with a maximum of{" "}
              {ROOM_CAPACITY.toLocaleString("en-IN")} members. Room titles and categories may change
              before launch. When a founding room reaches capacity, it closes to new founding
              members.
            </p>
          </Section>

          <Section id="guidelines" title="Community Guidelines">
            <p>
              Members may voluntarily offer ideas, experience, time, contacts or financial help.
              Those decisions belong entirely to each member. FANDDLE does not control, hold,
              transfer or guarantee private assistance, and no member is entitled to receive help.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>No scams, fake emergencies or misleading requests.</li>
              <li>No coercion or pressure to send money or personal information.</li>
              <li>No harassment, hate, threats or sharing others' private details.</li>
              <li>Peer experience is not professional advice — legal, medical, psychological and financial matters may need qualified professionals.</li>
            </ul>
          </Section>

          <Section id="report" title="Report misuse">
            <p>
              When the network launches, every post and member profile will include report and
              block options reviewed by moderators. Until then, report concerns to: [Placeholder:
              reporting email].
            </p>
          </Section>

          <Section id="privacy" title="Privacy Policy">
            <p>
              FANDDLE will not publicly display members' email or phone numbers. Data collected,
              retention period, processors and the full privacy policy: [Placeholder].
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p>Team contact email and registered business details: [Placeholder].</p>
          </Section>
        </div>

        <div className="mt-16">
          <Link
            to="/rooms"
            className="inline-flex rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore the Rooms →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
