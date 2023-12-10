"use server";

import { revalidateTag } from "next/cache";
import axios from "axios";
import { auth } from "@/auth";

export const fetchBanks = async (cityName: string, bloodType: string) => {
  console.log(cityName);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/bloodBank`,
      {
        method: "GET",
        headers: {
          city: cityName,
          bloodType: bloodType,
        },
        next: {
          tags: ["bloodbank"],
        },
      }
    );
    const finalRes = await response.json();

    return finalRes;
  } catch (err) {
    console.log(err);
  }
};

export default async function action() {
  revalidateTag("bloodbank");
}

export async function sessionAction() {
  const session = await auth();
  return session;
}
