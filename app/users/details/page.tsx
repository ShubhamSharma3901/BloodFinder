import { auth } from "@/auth";
import TryAgain from "@/components/ui/BloodBanks/TryAgain";
import UserDetailsForm from "@/components/ui/users/UserDetails";
import React from "react";

async function Details() {
  const session = await auth();

  if (session?.user.role !== "USER") {
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
