import { auth } from "@/auth";
import TryAgain from "@/components/ui/BloodBanks/TryAgain";
import UserDetailsForm from "@/components/ui/users/UserDetails";
import { redirect } from "next/navigation";
import React from "react";

async function Details() {
  const session = await auth();
  if (session?.user.role === "BloodBanks") {
    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/bloodBanks/detailsForm`);
  } else if (session?.user.role !== "USER") {
    return (
      <TryAgain message={"You Must Log-In as a User to access this page"} />
    );
  }

  return (
    <div>
      <UserDetailsForm />
    </div>
  );
}

export default Details;
