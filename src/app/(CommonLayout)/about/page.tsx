import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MindNest AI",
  description:
    "Learn how MindNest AI helps members and coaches run premium one-on-one sessions.",
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto space-y-6 py-12 px-4">
      <h1 className="text-3xl font-semibold tracking-tight">About MindNest AI</h1>
      <p className="text-muted-foreground leading-relaxed">
        MindNest AI is a coaching marketplace built for clarity: structured
        profiles, transparent rates, live availability, and reviews after every
        completed session. Members find the right coach faster; coaches manage
        slots, catalog links, and feedback from one dashboard.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Our team blends product craft with responsible AI—search suggestions,
        in-product assistance, and gentle personalization—without replacing the
        human relationship at the center of every booking.
      </p>
    </div>
  );
}
