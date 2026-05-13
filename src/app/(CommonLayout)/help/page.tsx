import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help & Support | MindNest AI",
  description: "Guides for members, coaches, and admins using MindNest AI.",
};

export default function HelpPage() {
  return (
    <div className="container max-w-3xl mx-auto space-y-8 py-12 px-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Help center</h1>
        <p className="mt-2 text-muted-foreground">
          Quick answers for the most common questions across the marketplace.
        </p>
      </div>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Members</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Start at{" "}
            <Link href="/coaches" className="text-primary hover:underline">
              Browse coaches
            </Link>{" "}
            and use filters for category, price, and rating.
          </li>
          <li>
            After booking, track status under{" "}
            <Link
              href="/dashboard/bookings"
              className="text-primary hover:underline"
            >
              Dashboard → Bookings
            </Link>
            .
          </li>
          <li>Leave a review once a session is marked completed.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Coaches</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Open{" "}
            <Link
              href="/coach/availability"
              className="text-primary hover:underline"
            >
              Availability
            </Link>{" "}
            to publish slots and keep your public profile up to date.
          </li>
          <li>Link subjects and categories so members can discover you.</li>
          <li>Read feedback under Reviews after sessions complete.</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Still stuck?</h2>
        <p className="text-sm text-muted-foreground">
          Use the floating MindNest assistant on any page or email{" "}
          <a
            href="mailto:hello@mindnest.ai"
            className="text-primary hover:underline"
          >
            hello@mindnest.ai
          </a>
          .
        </p>
      </section>
    </div>
  );
}
