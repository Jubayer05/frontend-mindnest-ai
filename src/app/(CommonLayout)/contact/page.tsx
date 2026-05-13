import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact MindNest AI",
  description: "Reach the MindNest AI team for partnerships and support.",
};

export default function ContactPage() {
  return (
    <div className="container max-w-3xl mx-auto space-y-6 py-12 px-4">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-muted-foreground leading-relaxed">
        For platform support, billing questions, or coach onboarding, email{" "}
        <a
          href="mailto:hello@mindnest.ai"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          hello@mindnest.ai
        </a>
        . We respond within two business days.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Press and partnerships: include context, timelines, and the best address
        to reach you so we can route your note to the right owner.
      </p>
    </div>
  );
}
