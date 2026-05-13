import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | MindNest AI",
  description: "Terms of use for the MindNest AI coaching marketplace.",
};

export default function TermsPage() {
  return (
    <div className="container max-w-3xl mx-auto space-y-6 py-12 px-4">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of use</h1>
      <p className="text-muted-foreground leading-relaxed">
        By accessing MindNest AI you agree to provide accurate account
        information, follow applicable laws, and treat coaches, members, and
        staff respectfully. Coaches set their own session pricing; the platform
        may charge processing or service fees where disclosed at checkout.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        MindNest AI is provided “as is” to the maximum extent permitted by law.
        We may update these terms and will post changes on this page with a new
        effective date.
      </p>
    </div>
  );
}
