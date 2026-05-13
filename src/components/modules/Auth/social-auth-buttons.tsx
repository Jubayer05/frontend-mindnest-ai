"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa";

function buildSocialUrl(provider: "google" | "facebook", callbackURL: string) {
  const q = new URLSearchParams({
    provider,
    callbackURL,
  });
  return `/api/auth/sign-in/social?${q.toString()}`;
}

export function SocialAuthButtons() {
  const [callbackURL, setCallbackURL] = useState("http://localhost:3000/dashboard");

  useEffect(() => {
    setCallbackURL(`${window.location.origin}/dashboard`);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        Continue with
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" type="button" asChild className="gap-2">
          <a href={buildSocialUrl("google", callbackURL)}>
            <FaGoogle className="size-4" aria-hidden />
            Google
          </a>
        </Button>
        <Button variant="outline" type="button" asChild className="gap-2">
          <a href={buildSocialUrl("facebook", callbackURL)}>
            <FaFacebook className="size-4" aria-hidden />
            Facebook
          </a>
        </Button>
      </div>
      <p className="text-center text-[10px] text-muted-foreground">
        Requires OAuth keys on the server. See backend environment variables for
        Google and Facebook.
      </p>
    </div>
  );
}
