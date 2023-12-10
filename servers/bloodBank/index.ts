import { auth } from "@/auth";
import { prisma } from "@/prisma";

interface bankProps {
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
  sectors: string;
  sessionUserId: string;
}

export async function addBank({
  name,
  coords,
  bloodTypes,
  address,
  phone,
  sectors,
  sessionUserId,
}: bankProps) {
  try {
    const session = await auth();

    const existingBank = await prisma.bloodBanks.findUnique({
      where: {
        sessionUserId: session?.user.id as string,
      },
    });

    if (existingBank !== null) {
      const res = await updateBanks({
        name,
        coords,
        bloodTypes,
        phone,
        address,
        sectors,
        sessionUserId,
      });
      return res;
    }

    await prisma.bloodBanks.create({
      data: {
        name: name,
        sessionUserId: sessionUserId,
        coordinates: coords,
        bloodTypes: bloodTypes,
        address: address,
        phone: phone,
        sectors: sectors,
      },
    });
    const allBanks = await prisma.bloodBanks.findMany();
    return allBanks;
  } catch (err) {
    console.log("Error in posting: ", err);
  }
}
export async function getBanks({
  city,
  bloodType,
}: {
  city: string;
  bloodType: string;
}) {
  try {
    const session = await auth();
    const bloodTypes = `bloodTypes.${bloodType}`;
    const response = await prisma.bloodBanks.findRaw({
      filter: {
        "address.city": city,
        [bloodTypes]: { $gte: 1 },
      },
    });
    return response;
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function updateBanks({
  name,
  coords,
  bloodTypes,
  phone,
  address,
  sectors,
}: bankProps) {
  try {
    const session = await auth();
    await prisma.bloodBanks.update({
      where: {
        sessionUserId: session?.user.id,
      },
      data: {
        name: name,
        coordinates: coords,
        bloodTypes: bloodTypes,
        phone: phone,
        address: address,
        sectors: sectors,
      },
    });
    const response = await prisma.bloodBanks.findUnique({
      where: {
        sessionUserId: session?.user.id,
      },
    });
    return response;
  } catch (err) {
    console.log("Error: ", err);
  }
}
