import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBanks } from "@/app/actions";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

export async function getAddressFromGeocode(origin, setBanks, setIsLoad) {
  setKey(`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`);

  geocode(RequestType.LATLNG, `${origin.lat},${origin.lng}`)
    .then(({ results }) => {
      // const address = results[0].formatted_address;
      const { city } = results[0].address_components.reduce(
        (acc, component) => {
          if (component.types.includes("locality", "political"))
            acc.city = component.long_name;
          //   else if (component.types.includes("administrative_area_level_1"))
          //     acc.state = component.long_name;
          //   else if (component.types.includes("country"))
          //     acc.country = component.long_name;
          return acc;
        }
      );
      console.log(city);
      fetchBanks(city).then((res) => {
        setBanks(res);
        setIsLoad(true);
      });
    })
    .catch(console.error);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
