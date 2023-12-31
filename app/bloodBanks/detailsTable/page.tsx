export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import TryAgain from "@/components/ui/BloodBanks/TryAgain";
import BankTable from "@/components/ui/BloodBanks/details_table";

import React from "react";

async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (session?.user.role !== "BloodBank") {
    return (
      <TryAgain
        message={"You Must Log-In as a Blood Bank to Aceess this page"}
      />
    );
  }

  return (
    <div>
      <BankTable id={session?.user.id} />
    </div>
  );
}

export default page;
