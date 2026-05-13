import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<
  string,
  { title: string; description: string; body: string[] }
> = {
  "calm-marketplace": {
    title: "Designing a calm coaching marketplace",
    description:
      "How MindNest AI uses restraint, typography, and real data to build trust.",
    body: [
      "Busy marketplaces often shout for attention. MindNest AI takes the opposite approach: fewer colors, consistent card geometry, and copy that explains what happens after you click.",
      "Every surface is tested in light and dark themes so coaches and members never fight the interface during high-stakes bookings.",
      "We will keep publishing build notes here as the product evolves—subscribe via the home page briefing if you want the highlights.",
    ],
  },
  "first-session-checklist": {
    title: "What members should ask before the first session",
    description:
      "A practical checklist to align with your coach before you meet.",
    body: [
      "Share the outcome you want, the timeframe you are working within, and any materials you already have.",
      "Ask how feedback will be delivered, how rescheduling works, and what success looks like for this coach.",
      "Confirm tooling (video link, whiteboard, files) ahead of time so the first minutes are about learning—not logistics.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post" };
  return { title: `${post.title} | MindNest AI`, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="container max-w-3xl mx-auto space-y-6 py-12 px-4">
      <Link href="/blog" className="text-sm text-primary hover:underline">
        ← Back to journal
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {post.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </article>
  );
}
