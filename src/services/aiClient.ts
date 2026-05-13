import { API_ENDPOINTS } from "@/config/apiConfig";
import { apiFetch } from "@/lib/api-fetch";

export async function fetchSearchSuggestions(q: string): Promise<string[]> {
  const trimmed = q.trim();
  if (trimmed.length < 2) return [];
  const res = await apiFetch<{ suggestions: string[] }>(
    API_ENDPOINTS.ai.searchSuggestions(trimmed),
    { method: "GET" },
  );
  return res.data?.suggestions ?? [];
}

export async function postAssistantMessage(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
): Promise<string> {
  const res = await apiFetch<{ reply: string }>(API_ENDPOINTS.ai.chat, {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
  if (!res.data?.reply) throw new Error("Empty assistant reply");
  return res.data.reply;
}

export async function fetchCoachRecommendations(): Promise<
  { userId: string; headline: string; rating: string | null }[]
> {
  const res = await apiFetch<{
    recommendations: { userId: string; headline: string; rating: string | null }[];
  }>(API_ENDPOINTS.ai.coachRecommendations, { method: "GET" });
  return res.data?.recommendations ?? [];
}
