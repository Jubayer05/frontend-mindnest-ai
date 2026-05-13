import { redirect } from "next/navigation";

/** Sidebar and bookmarks may use `/coach/dashboard`; home lives at `/dashboard`. */
export default function TutorDashboardAliasPage() {
  redirect("/dashboard");
}
