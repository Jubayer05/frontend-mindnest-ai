"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const slides = [
  {
    tag: "MindNest AI · Premium coaching",
    headline: "Human expertise,\namplified with clarity.",
    sub: "Book vetted coaches by subject, compare transparent rates and ratings, and learn in focused one-on-one sessions.",
    primaryCta: { label: "Create your member account", href: "/auth/register" },
    secondaryCta: { label: "Browse coaches", href: "/coaches" },
    trust: ["Verified coach profiles", "Secure checkout", "Reviews after every session"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80",
    bar: "linear-gradient(135deg,#2563FF 0%,#6BA6FF 100%)",
    accent: "#2563FF",
    dot: "#4F8CFF",
  },
  {
    tag: "For members",
    headline: "Find the right coach\nin minutes.",
    sub: "Filter by category, price, and rating. See real availability, book a slot, and keep every session organized in your dashboard.",
    primaryCta: { label: "Explore subjects", href: "/subjects" },
    secondaryCta: { label: "View categories", href: "/categories" },
    trust: ["Smart search suggestions", "Live marketplace data", "Booking history"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80",
    bar: "linear-gradient(135deg,#2563FF 0%,#7CB8FF 100%)",
    accent: "#4F8CFF",
    dot: "#7CB8FF",
  },
  {
    tag: "For coaches",
    headline: "Teach on your terms.\nGrow your practice.",
    sub: "Publish your profile, attach subjects, open calendar slots, and let MindNest AI surface you to the members who fit best.",
    primaryCta: { label: "Join as a coach", href: "/auth/register" },
    secondaryCta: { label: "How it works", href: "/help" },
    trust: ["Availability tooling", "Member feedback loop", "Admin-backed catalog"],
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80",
    bar: "linear-gradient(135deg,#1d4ed8 0%,#60a5fa 100%)",
    accent: "#2563FF",
    dot: "#93c5fd",
  },
];

export function HomeBanner({ className }: { className?: string }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex gap-2 justify-center items-center mt-4">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        className="w-2 h-2 rounded-full transition-all duration-200"
        style={{ background: slides[i].dot, opacity: 0.4 }}
      />
    ),
  };

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl max-h-[70vh] min-h-[60vh]",
        className,
      )}
    >
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={i}>
            <div
              className="relative flex min-h-[58vh] max-h-[70vh] flex-col items-center justify-center px-8 py-16 text-center sm:px-16 sm:py-24"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Top color bar */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] z-10"
                style={{ background: s.bar }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-0">
                {/* Badge */}
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium mb-5 backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    border: "0.5px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: s.accent }}
                  />
                  {s.tag}
                </span>

                {/* Headline */}
                <h1 className="text-4xl font-semibold tracking-tight whitespace-pre-line mb-3 text-white sm:text-5xl">
                  {s.headline}
                </h1>

                {/* Sub */}
                <p className="text-base max-w-md mx-auto mb-7 leading-relaxed text-white/75">
                  {s.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  <Link
                    href={s.primaryCta.href}
                    className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ background: s.accent }}
                  >
                    {s.primaryCta.label}
                  </Link>
                  <Link
                    href={s.secondaryCta.href}
                    className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "0.5px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {s.secondaryCta.label}
                  </Link>
                </div>

                {/* Trust items */}
                <div className="flex flex-wrap gap-5 justify-center">
                  {s.trust.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 text-xs text-white/60"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 text-white"
                        style={{ background: s.accent }}
                      >
                        ✓
                      </span>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
