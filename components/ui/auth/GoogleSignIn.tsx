"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "../button";
import { SetStateAction } from "react";
import { Loader2 } from "lucide-react";

const GoogleSignInButton = ({
  isSubmitting,
  setIsSubmitting,
}: {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || `${process.env.NEXT_PUBLIC_APP_URL}`;

  return (
    <Button
      className="w-full p-6 rounded-xl bg-black hover:bg-black/80 shadow-xl hover:shadow-none transition"
      onClick={async () => {
        setIsSubmitting(true);
        await signIn("google");
        setIsSubmitting(false);
      }}
      disabled={isSubmitting}>
      {isSubmitting ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <svg
            aria-hidden="true"
            focusable="false"
            data-icon="google"
            className="mr-8 w-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512">
            <path
              fill="red"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Continue with Google
        </>
      )}
    </Button>
  );
};

export default GoogleSignInButton;
