import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { setKey, geocode, RequestType } from "react-geocode";
import { Resend } from "resend";
import MagicLinkEmail from "@/emails/MagicLinkEmail";
import { SendVerificationRequestParams } from "next-auth/providers/email";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

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

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url } = params;
  const { host } = new URL(url);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [identifier],
      subject: `Log into ${host}`,
      text: `Sign into ${host}`,
      react: MagicLinkEmail({ url, host }),
    });
  } catch (err) {
    throw new Error("Failed to send the verification email");
  }
}
