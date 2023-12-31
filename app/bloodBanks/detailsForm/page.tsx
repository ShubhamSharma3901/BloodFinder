import { auth } from "@/auth";
import TryAgain from "@/components/ui/BloodBanks/TryAgain";
import BankDetails from "@/components/ui/BloodBanks/details_form";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const session = await auth();

  if (session?.user.role !== "BloodBank") {
    return (
      <TryAgain
        message={"You Must be Registered as a BloodBank to Access this Page"}
      />
    );
  }

  return (
    <div>
      <BankDetails />
    </div>
  );
}

export default page;
