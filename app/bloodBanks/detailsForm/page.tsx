import { auth } from "@/auth";
import BankDetails from "@/components/ui/BloodBanks/details_form";
import React from "react";

async function page() {
  const session = await auth();
  console.log(session?.user);
  if (!session?.user) {
    return <div>Null</div>;
  }
  return (
    <div>
      <BankDetails />
    </div>
  );
}

export default page;
