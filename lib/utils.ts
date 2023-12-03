import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBanks } from "@/app/actions";
import { setKey, geocode, RequestType } from "react-geocode";
import { useState } from "react";

export async function getAddressFromGeocode(
  origin: { lat: number; lng: number },
  setBanks: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        coords: { lat: number; lng: number };
        bloodTypes: {
          Ap: number;
          An: number;
          Bp: number;
          Bn: number;
          ABp: number;
          ABn: number;
          Op: number;
          On: number;
        };
        address: {
          street: string;
          city: string;
          state: string;
          zip: number;
        };
        phone: number;
        timings: {
          open: string;
          close: string;
          off: string;
        };
        sectors: string;
      }>
    >
  >,
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>,
  bloodType: string
) {
  setKey(String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY));
  const { results } = await geocode(
    RequestType.LATLNG,
    `${origin.lat},${origin.lng}`
  );
  const { city } = results[0].address_components.reduce(
    (
      acc: { city: string },
      component: { types: string; long_name: string }
    ) => {
      if (component.types.includes("locality")) acc.city = component.long_name;

      return acc;
    }
  );
  return city;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// .then(({ results }) => {
// const { city } = results[0].address_components.reduce(
//   (
//     acc: { city: string },
//     component: { types: string; long_name: string }
//   ) => {
//     if (component.types.includes("locality"))
//       acc.city = component.long_name;

//     return acc;
//   }
// );
//   return city;
// })
// .catch((err) => {
//   console.log(err);
// });
