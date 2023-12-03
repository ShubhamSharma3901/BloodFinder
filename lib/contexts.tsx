import { createContext, useContext } from "react";
import { any } from "zod";

export type origins = {
  origin: { lat: number; lng: number };
  setOrigin: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  isLoad: boolean;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
  bloodType: string;
  setBloodType: React.Dispatch<React.SetStateAction<string>>;
};

export const originContext = createContext<origins | null>(null);

export function useOrigin() {
  return useContext(originContext) as origins;
}
