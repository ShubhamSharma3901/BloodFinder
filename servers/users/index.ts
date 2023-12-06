import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export interface userParams {
  name: string;
  email: string;
  phone: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  gender: string;
  age: number;
  dob: {
    date: number;
    month: number;
    year: number;
  };
  UID: number;
}

export async function addUser({
  name,
  email,
  phone,
  address,
  gender,
  age,
  dob,
  UID,
}: userParams) {
  try {
    await prisma.users.create({
      data: {
        name,
        email,
        phone,
        gender,
        dob,
        address,
        UID,
        age,
      },
    });
    const response = await prisma.users.findMany({});
    return response;
  } catch (err) {
    return err;
  }
}

export async function getUser(UID: number) {
  try {
    const response = await prisma.users.findUnique({
      where: {
        UID: UID,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
}

export async function updateUser({
  name,
  email,
  phone,
  address,
  gender,
  age,
  dob,
  UID,
}: userParams) {
  try {
    const response = await prisma.users.update({
      where: {
        UID: UID,
      },
      data: {
        name,
        email,
        phone,
        gender,
        dob,
        address,
        age,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
}
