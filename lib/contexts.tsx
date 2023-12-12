import { createContext, useContext } from "react";

export type origins = {
  origin: { lat: number; lng: number };
  setOrigin: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  mapRef: React.MutableRefObject<google.maps.Map | undefined>;
  isLoad: boolean;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
  bloodType: string;
  setBloodType: React.Dispatch<React.SetStateAction<string>>;
  banksCoords: Array<{
    name: string;
    coordinates: { lat: number; lng: number };
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
  }>;
  setBanksCoords: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        coordinates: { lat: number; lng: number };
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
  >;
};

export const originContext = createContext<origins | null>(null);

export function useOrigin() {
  return useContext(originContext) as origins;
}
