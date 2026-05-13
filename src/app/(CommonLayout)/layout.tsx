import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import type { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
