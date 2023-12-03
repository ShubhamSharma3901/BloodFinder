import { prisma } from "@/prisma";
import { MongoClient } from "mongodb";

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
  timings: {
    open: string;
    close: string;
    off: string;
  };
  sectors: string;
}

export async function addBank({
  name,
  coords,
  bloodTypes,
  address,
  phone,
  timings,
  sectors,
}: bankProps) {
  try {
    await prisma.bloodBanks.create({
      data: {
        name: name,
        coorinates: coords,
        bloodTypes: bloodTypes,
        address: address,
        phone: phone,
        timings: timings,
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
  //   const client = new MongoClient(process.env.DATABASE_URL);
  //   try {
  //     await client.connect();
  //     const database = await client.db("BloodFinder"); // Choose a name for your database

  //     const collection = await database.collection("BloodBanks");
  //     const response = await collection.find({ "address.city": city }).toArray();
  //     return response;
  //   } catch (er) {
  //     console.log(er);
  //   }
  try {
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
  timings,
  sectors,
}: bankProps) {
  try {
    await prisma.bloodBanks.update({
      where: {
        phone: phone,
      },
      data: {
        name: name,
        coorinates: coords,
        bloodTypes: bloodTypes,
        phone: phone,
        address: address,
        timings: timings,
        sectors: sectors,
      },
    });
    const response = await prisma.bloodBanks.findUnique({
      where: { phone: phone },
    });
    return response;
  } catch (err) {
    console.log("Error: ", err);
  }
}
