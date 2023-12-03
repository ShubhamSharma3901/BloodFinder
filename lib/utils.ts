import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBanks } from "@/app/actions";
import { setKey, geocode, RequestType } from "react-geocode";

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
  geocode(RequestType.LATLNG, `${origin.lat},${origin.lng}`)
    .then(({ results }) => {
      const { city } = results[0].address_components.reduce(
        (
          acc: { city: string },
          component: { types: string; long_name: string }
        ) => {
          if (component.types.includes("locality"))
            acc.city = component.long_name;

          return acc;
        }
      );
      console.log(city);
      fetchBanks(city, bloodType).then((res) => {
        setBanks(res);
        setIsLoad(true);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
