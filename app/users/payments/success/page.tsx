import { auth } from "@/auth";
import TryAgain from "@/components/ui/BloodBanks/TryAgain";
import PaymentSuccessful from "@/components/ui/payments/PaymentSuccessful";
import React from "react";

async function page() {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return (
      <TryAgain message={"You Must Log-In as a User to access this page"} />
    );
  }
  return (
    <div>
      <PaymentSuccessful />
    </div>
  );
}

export default page;
