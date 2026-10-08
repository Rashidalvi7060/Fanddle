import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [{ title: "Thank you — FANDDLE" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <p className="eyebrow text-primary">FANDDLE FOUNDING ROOMS</p>
        <h1 className="mt-5 font-display text-4xl font-extrabold uppercase text-foreground sm:text-5xl">Thank you.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          We have your registration and payment. Our team is verifying it. Once approved, you will get a message from us
          with your access details.
        </p>
        <p className="mt-4 text-muted-foreground">
          To enter, log in with the <b className="text-foreground">same email</b> you used while registering.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-sm font-bold tracking-wider text-primary-foreground hover:opacity-90"
        >
          MEMBER LOGIN →
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
