"use client";

import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { postAssistantMessage } from "@/services/aiClient";

function decodeBasicHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function stripMiniMaxThinkingBlock(text: string): string {
  // MiniMax M2.x prefixes the reply with <think>…</think>. Take everything after the last closing tag.
  let s = decodeBasicHtmlEntities(text).replace(/\r\n/g, "\n").normalize("NFKC");
  const closeRe = /<\/think>/gi;
  const hits = [...s.matchAll(closeRe)];
  if (hits.length > 0) {
    const last = hits.at(-1)!;
    s = s.slice((last.index ?? 0) + last[0].length).trim();
  }
  for (let i = 0; i < 8; i++) {
    const n = s
      .replace(/<think>[\s\S]*?<\/think>/gi, "")
      .replace(/<think>[\s\S]*/gi, "");
    if (n === s) break;
    s = n;
  }
  s = s
    .split("\n")
    .filter((ln) => !/^\s*<\/?think>/i.test(ln))
    .join("\n");
  return s.trim();
}

function formatAssistantReplyForChat(text: string): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  for (const raw of lines) {
    const line = raw.trimEnd();
    const arrow = line.match(
      /^\s*[-*]\s*\*\*(.+?)\*\*\s*(?:→|->|\u2192)\s*(.+)$/u,
    );
    if (arrow?.[1] != null && arrow[2] != null) {
      out.push(`• ${arrow[1].trim()} — ${arrow[2].trim()}`);
      continue;
    }
    const plainArrow = line.match(
      /^\s*[-*]\s+(.+?)\s*(?:→|->|\u2192)\s*(.+)$/u,
    );
    if (plainArrow?.[1] != null && plainArrow[2] != null && !plainArrow[1].includes("**")) {
      out.push(`• ${plainArrow[1].trim()} — ${plainArrow[2].trim()}`);
      continue;
    }
    out.push(line.replace(/\*\*(.+?)\*\*/g, "$1"));
  }
  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatAssistantDisplay(content: string): string {
  return formatAssistantReplyForChat(stripMiniMaxThinkingBlock(content));
}

/** Renders processed assistant text with internal `/paths` as clickable links. */
function AssistantMessageContent({
  raw,
  onLinkClick,
}: {
  raw: string;
  onLinkClick?: () => void;
}) {
  const text = formatAssistantDisplay(raw);
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const m = line.match(/^(.*?—\s*)(\/.+?)\s*$/u);
        if (m?.[1] != null && m[2] != null) {
          return (
            <span key={i}>
              {i > 0 && "\n"}
              {m[1]}
              <Link
                href={m[2].trim()}
                className="font-medium text-[#2563FF] underline underline-offset-2 transition-opacity hover:opacity-75"
                onClick={onLinkClick}
              >
                {m[2].trim()}
              </Link>
            </span>
          );
        }
        return (
          <span key={i}>
            {i > 0 && "\n"}
            {line}
          </span>
        );
      })}
    </>
  );
}

function AssistantTypingDots() {
  return (
    <div className="flex items-center gap-1.5" aria-live="polite" aria-busy>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-2 animate-bounce rounded-full bg-[#2563FF]"
          style={{ animationDelay: `${delay}ms`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

function AssistantBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#2563FF] to-[#0f1f3d] shadow-sm">
        <Bot className="size-4 text-white" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-[#2563FF]">
          MindNest
        </span>
        <div className="rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm whitespace-pre-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 justify-end">
      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          You
        </span>
        <div className="rounded-2xl rounded-tr-sm bg-[#2563FF] px-3.5 py-2.5 text-sm text-white shadow-sm whitespace-pre-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MindNestAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hi, I’m the MindNest assistant. Ask how booking works, where to find coaches, or how to open availability as a coach.",
    },
  ]);
  const [sending, setSending] = useState(false);
  const [pendingTypeText, setPendingTypeText] = useState<string | null>(null);
  const [liveTyped, setLiveTyped] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, sending, pendingTypeText, liveTyped]);

  useEffect(() => {
    if (pendingTypeText === null) return;

    if (reduceMotion) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: pendingTypeText },
      ]);
      setPendingTypeText(null);
      setLiveTyped("");
      return;
    }

    const full = pendingTypeText;
    const lines = full.split("\n");
    let lineIdx = 0;
    let charIdx = 0;
    const charMs = 14;
    const linePauseMs = 100;

    const clearTimer = () => {
      if (typeTimerRef.current !== null) {
        clearTimeout(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    };

    const buildShown = (): string => {
      if (lineIdx >= lines.length) return full;
      const line = lines[lineIdx] ?? "";
      const prefix = lines.slice(0, lineIdx).join("\n");
      const current = line.slice(0, charIdx);
      if (lineIdx === 0) return current;
      return `${prefix}\n${current}`;
    };

    const step = () => {
      if (lineIdx >= lines.length) {
        setMessages((m) => [...m, { role: "assistant", content: full }]);
        setPendingTypeText(null);
        setLiveTyped("");
        clearTimer();
        return;
      }

      const line = lines[lineIdx] ?? "";
      if (charIdx < line.length) {
        charIdx += 1;
        setLiveTyped(buildShown());
        typeTimerRef.current = setTimeout(step, charMs);
        return;
      }

      lineIdx += 1;
      charIdx = 0;
      setLiveTyped(buildShown());
      typeTimerRef.current = setTimeout(step, linePauseMs);
    };

    setLiveTyped("");
    typeTimerRef.current = setTimeout(step, linePauseMs);

    return () => {
      clearTimer();
    };
  }, [pendingTypeText, reduceMotion]);

  const busy = sending || pendingTypeText !== null;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    void postAssistantMessage(next)
      .then((reply) => {
        const cleaned = formatAssistantDisplay(reply);
        if (!cleaned) {
          toast.error("Empty assistant reply");
          return;
        }
        if (reduceMotion) {
          setMessages((m) => [...m, { role: "assistant", content: cleaned }]);
        } else {
          setPendingTypeText(cleaned);
        }
      })
      .catch((e: unknown) => {
        toast.error(e instanceof Error ? e.message : "Assistant unavailable");
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="glass-gradient-animated h-14 w-14 rounded-full shadow-xl"
            aria-label="Open MindNest assistant"
          >
            <Sparkles className="size-5 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-full flex-col sm:max-w-md p-0 gap-0 rounded-tr-2xl rounded-tl-2xl"
        >
          {/* Branded header */}
          <div className="relative overflow-hidden rounded-t-2xl bg-linear-to-br from-[#0f1f3d] to-[#1a3260] px-6 pt-10 pb-5">
            <div className="pointer-events-none absolute bottom-0 left-1/3 size-16 rounded-full border border-amber-400/15 opacity-70" />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 opacity-70 transition-opacity hover:opacity-100 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400 shadow-sm">
                <Sparkles className="size-5 text-[#0f1f3d]" />
              </div>
              <div>
                <h2 className="font-heading text-white text-lg font-semibold leading-tight">
                  MindNest assistant
                </h2>
                <p className="text-[12px] text-white/60 font-normal mt-0.5">
                  Ask anything about the platform
                </p>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex flex-1 flex-col gap-3 overflow-hidden px-6 py-4">
            <div
              ref={scrollRef}
              className="scrollbar-thin flex flex-1 flex-col gap-4 overflow-y-auto text-sm"
            >
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <UserBubble key={`${i}-${m.role}`}>{m.content}</UserBubble>
                ) : (
                  <AssistantBubble key={`${i}-${m.role}`}>
                    <AssistantMessageContent raw={m.content} onLinkClick={() => setOpen(false)} />
                  </AssistantBubble>
                ),
              )}
              {sending && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <AssistantTypingDots />
                  <span>Thinking…</span>
                </div>
              )}
              {pendingTypeText !== null && !reduceMotion ? (
                <AssistantBubble>
                  <AssistantMessageContent raw={liveTyped} onLinkClick={() => setOpen(false)} />
                  <span className="ml-0.5 inline-block h-3.5 w-0.5 translate-y-px animate-pulse bg-[#2563FF] align-middle" />
                </AssistantBubble>
              ) : null}
            </div>

            {/* Input area */}
            <div className="relative rounded-xl border border-border bg-card shadow-sm">
              <Textarea
                ref={inputRef}
                placeholder="Ask about bookings, coaches, or your dashboard…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                disabled={busy}
                className="resize-none border-0 shadow-none focus-visible:ring-0 pr-14 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <Button
                onClick={send}
                disabled={busy || !input.trim()}
                size="sm"
                className="absolute bottom-3 right-3 h-8 w-8 p-0 rounded-lg"
                aria-label="Send message"
              >
                <Send className="size-3.5" />
              </Button>
            </div>
            <p className="text-center text-[11px] text-muted-foreground">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
