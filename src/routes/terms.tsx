import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { MEMBERSHIP_PRICE_INR, ROOM_CAPACITY } from "@/data/rooms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Membership terms, privacy and refunds — FANDDLE" },
      {
        name: "description",
        content:
          "The FANDDLE Founding Membership terms, privacy notice and refund policy, including items still to be finalised before launch.",
      },
      { property: "og:title", content: "Membership terms — FANDDLE" },
      {
        property: "og:description",
        content: "Founding Membership terms, privacy notice and refund policy for FANDDLE.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow">Pre-launch document</p>
        <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
          Membership terms, privacy and refunds
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Items marked <strong className="text-foreground">[Placeholder]</strong> must be
          completed by FANDDLE before registration or payments open. Nothing on this page invents
          guarantees, certifications or partnerships.
        </p>

        <div className="mt-14 space-y-12">
          <Section id="membership" title="Founding Membership">
            <p>
              The Founding Membership is a one-time payment of ₹{MEMBERSHIP_PRICE_INR}. It covers
              participation in one founding room that you select during registration. Additional
              rooms are not included.
            </p>
            <p>
              Access duration covered by this payment: [Placeholder]. Launch date: [Placeholder].
              Full feature list at launch: [Placeholder].
            </p>
            <p>
              Your place is reserved only after a verified successful payment, at which point a
              unique member ID is issued and your room place is confirmed by email.
            </p>
          </Section>

          <Section id="rooms" title="Rooms and capacity">
            <p>
              There are 100 founding rooms, each with a fixed capacity of{" "}
              {ROOM_CAPACITY.toLocaleString("en-IN")} members. Capacity is enforced at
              registration; a full room cannot be joined. When all founding places are filled,
              founding registration closes permanently for these rooms.
            </p>
            <p>
              The room directory is marked as planned until the final directory is confirmed.
              Room titles and categories may change before launch.
            </p>
          </Section>

          <Section id="conduct" title="Voluntary help and member conduct">
            <p>
              Members may voluntarily offer advice, time, practical assistance, contacts or
              financial help. Those decisions belong entirely to the individual member. FANDDLE
              does not participate in, control, hold, transfer or guarantee private assistance
              between members, and no member is entitled to receive help.
            </p>
            <p>
              Scams, harassment, coercion, pressure to send money and misleading requests are
              prohibited and are grounds for removal without refund. Reporting and blocking are
              available on every post and member.
            </p>
            <p>
              Peer experience is not professional advice. Legal, medical, psychological and
              financial matters may require qualified professionals.
            </p>
          </Section>

          <Section id="privacy" title="Privacy notice">
            <p>
              We collect your name, email address and phone number to create your membership
              account, assign your room and provide support. Posts you write are visible to
              members of your room. FANDDLE does not publicly display your email or phone number.
            </p>
            <p>
              Data retention period, processors, and the full privacy notice: [Placeholder]. No
              privacy certification or guarantee is claimed.
            </p>
          </Section>

          <Section id="payments" title="Payments">
            <p>
              Payments will be processed by a configurable payment gateway. Registration is
              confirmed only after the gateway verifies a successful payment via webhook. Failed,
              cancelled, pending, duplicate and refunded payments do not reserve a place.
            </p>
            <p>
              Payment provider and currency handling: [Placeholder]. Payments are not being
              collected until this and the policies below are finalised.
            </p>
          </Section>

          <Section id="refunds" title="Cancellation and refunds">
            <p>
              Cancellation window, refund eligibility and processing time: [Placeholder]. These
              terms must be published before any payment is accepted.
            </p>
          </Section>

          <Section id="support" title="Support">
            <p>Support contact and response window: [Placeholder].</p>
          </Section>
        </div>

        <div className="mt-16">
          <Link
            to="/rooms"
            className="inline-flex rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Find Your Room
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
