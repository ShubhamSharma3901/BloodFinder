import { auth } from "@/auth";
import Verify from "@/components/ui/auth/Verify";
import React from "react";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();

  if (session?.user.id) {
    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/map`);
  }

  return (
    <div>
      <Verify />
    </div>
  );
}

export default page;
