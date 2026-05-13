import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | MindNest AI",
  description: "Product notes and coaching craft from the MindNest AI team.",
};

const posts = [
  {
    slug: "calm-marketplace",
    title: "Designing a calm coaching marketplace",
    excerpt:
      "Why contrast, generous spacing, and honest copy outperform dark patterns.",
  },
  {
    slug: "first-session-checklist",
    title: "What members should ask before the first session",
    excerpt:
      "Align goals, materials, and outcomes with your coach in fifteen minutes.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="container max-w-3xl mx-auto space-y-8 py-12 px-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Journal</h1>
        <p className="mt-2 text-muted-foreground">
          Long-form notes on building MindNest AI and running great sessions.
        </p>
      </div>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-xl border border-border bg-card p-5 transition hover:border-primary/40"
            >
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
