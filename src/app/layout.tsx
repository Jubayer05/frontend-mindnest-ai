import { SessionExpiredRedirect } from "@/components/auth/session-expired-redirect";
import { MindNestAssistant } from "@/components/modules/ai/MindNestAssistant";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontHeading = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MindNest AI",
  description:
    "MindNest AI is a premium coaching marketplace for members, coaches, and admins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontBody.variable} ${fontHeading.variable}`}
    >
      <head />
      <body suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionExpiredRedirect />
            <MindNestAssistant />
            {children}
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
