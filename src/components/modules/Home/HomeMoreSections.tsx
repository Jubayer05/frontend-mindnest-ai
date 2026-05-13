"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HomeStatsStrip() {
  const stats = [
    { label: "Coaches onboarded", value: "120+" },
    { label: "Sessions hosted", value: "4.8k" },
    { label: "Avg. session rating", value: "4.7★" },
    { label: "Subjects live", value: "35+" },
  ];
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-border bg-gradient-to-b from-muted/40 to-background px-6 py-10"
    >
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-semibold tabular-nums text-primary">
              {s.value}
            </p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export function HomeHowItWorks() {
  const steps = [
    {
      title: "Discover",
      body: "Filter coaches by category, hourly rate, and rating. Read real reviews before you book.",
    },
    {
      title: "Book",
      body: "Choose a slot that fits your calendar, confirm details, and complete checkout securely.",
    },
    {
      title: "Grow",
      body: "Attend your session, leave feedback, and let MindNest AI refine future recommendations.",
    },
  ];
  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">How MindNest works</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A calm, premium flow from discovery to delivery—no noisy feeds or filler content.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Step {i + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeValues() {
  const items = [
    {
      title: "Clarity first",
      body: "Transparent pricing, visible availability, and structured profiles for every coach.",
    },
    {
      title: "Human-led",
      body: "AI assists search and support—sessions stay personal and accountable.",
    },
    {
      title: "Quality bar",
      body: "Reviews, verification cues, and admin oversight keep the marketplace trustworthy.",
    },
  ];
  return (
    <section className="space-y-6">
      <h2 className="text-center text-2xl font-semibold tracking-tight">
        Built for serious learners
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-6"
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeBlogTeaser() {
  const posts = [
    {
      title: "Designing a calm coaching marketplace",
      excerpt: "Why we prioritize contrast, spacing, and honest copy over growth hacks.",
      href: "/blog/calm-marketplace",
    },
    {
      title: "What members should ask before the first session",
      excerpt: "A short checklist to align goals, materials, and outcomes with your coach.",
      href: "/blog/first-session-checklist",
    },
  ];
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">From the journal</h2>
          <p className="text-sm text-muted-foreground">
            Product notes, coaching craft, and platform updates.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/blog">View all posts</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30"
          >
            <h3 className="text-lg font-semibold group-hover:text-primary">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomeNewsletter() {
  return (
    <section className="rounded-xl border border-border bg-gradient-to-br from-primary/10 via-background to-muted/30 px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          MindNest briefing
        </h2>
        <p className="text-sm text-muted-foreground">
          Occasional updates on new coaches, subject drops, and platform
          improvements. No spam—unsubscribe anytime.
        </p>
        <form
          className="mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="email"
            required
            placeholder="you@example.com"
            className="bg-background"
          />
          <Button type="submit" className="sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export function HomeFinalCta() {
  return (
    <section className="rounded-xl bg-primary px-6 py-12 text-primary-foreground shadow-lg">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready for your next breakthrough session?
        </h2>
        <p className="text-sm text-primary-foreground/85">
          Join as a member to book coaches, or apply as a coach to list your
          expertise on MindNest AI.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            asChild
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/auth/register">Get started</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/coaches">Browse coaches</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
