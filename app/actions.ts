"use server";

import { revalidateTag } from "next/cache";

export const fetchBanks = async (cityName: string, bloodType: string) => {
  console.log(cityName);
  const response = await fetch("http://localhost:3000/api/bloodBank", {
    method: "GET",
    headers: {
      city: cityName,
      bloodType: bloodType,
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
