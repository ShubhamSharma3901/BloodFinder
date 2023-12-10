"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import EmailProvider from "next-auth/providers/email";
import { Input } from "../input";
import { Button } from "../button";
import { SetStateAction, useRef, useState } from "react";
import { Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmailSignInForm({
  isSubmitting,
  setIsSubmitting,
}: {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = "/sign-in/email-sent";

  const emailRef = useRef<string>();

  async function handleSubmit() {
    const email = emailRef.current;
    console.log(email);
    setIsSubmitting(true);
    await signIn("resend", { email, redirect: true });
    setIsSubmitting(false);
  }

  return (
    <form className="w-full">
      <div className="space-y-2">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="hello@me.com"
          autoComplete="email"
          onChange={(e) => {
            emailRef.current = e.target.value;
          }}
          required
          className="py-6 rounded-xl"
          disabled={isSubmitting}
        />
      </div>
      <Button
        type="button"
        onClick={handleSubmit}
        variant="default"
        color="gray"
        className="mt-3 w-full py-6 rounded-xl shadow-xl hover:shadow-none transition"
        disabled={isSubmitting}>
        {isSubmitting && <Loader2 className={cn("animate-spin mr-2")} />}
        Continue with email
      </Button>
    </form>
  );
}
