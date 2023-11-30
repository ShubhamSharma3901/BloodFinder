"use server";

import { revalidateTag } from "next/cache";

export const fetchBanks = async () => {
  const response = await fetch("http://localhost:3000/api/bloodBank", {
    method: "GET",
    headers: {
      city: "Jaipur",
    },
    next: {
      tags: ["bloodbank"],
    },
  });
  const finalRes = await response.json();

  return finalRes;
};
export default async function action() {
  revalidateTag("bloodbank");
}
