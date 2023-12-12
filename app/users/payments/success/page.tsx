import { auth } from "@/auth";
import TryAgain from "@/components/ui/BloodBanks/TryAgain";
import PaymentSuccessful from "@/components/ui/payments/PaymentSuccessful";
import { getCurrentTransactionId } from "@/servers/users";
import React, { useEffect } from "react";

async function page() {
  const session = await auth();

  if (session?.user.role !== "USER") {
    return (
      <TryAgain message={"You Must Log-In as a User to access this page"} />
    );
  }
  const trnsID = await getCurrentTransactionId();
  return (
    <div>
      <PaymentSuccessful trnsID={trnsID as string} />
    </div>
  );
}

export default page;
