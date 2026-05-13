import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | MindNest AI",
  description: "How MindNest AI handles personal data across the marketplace.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl mx-auto space-y-6 py-12 px-4">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <p className="text-muted-foreground leading-relaxed">
        MindNest AI collects account details, booking history, and messages you
        send through support channels to operate the service. We use cookies for
        authentication and preferences, and we only integrate AI features when
        a request is routed through our secured APIs.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        You may request export or deletion of your account by emailing{" "}
        <a
          href="mailto:hello@mindnest.ai"
          className="text-primary hover:underline"
        >
          hello@mindnest.ai
        </a>
        . Administrators may retain certain transaction records where required for
        compliance or fraud prevention.
      </p>
    </div>
  );
}
