import { auth } from "@/auth";
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
  userId: string;
}

export async function addUser({
  name,
  email,
  phone,
  address,
  gender,
  age,
  dob,
  userId,
}: userParams) {
  try {
    const existingUser = await prisma.usersModel.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingUser !== null) {
      const res = await updateUser({
        name,
        email,
        phone,
        address,
        gender,
        age,
        dob,
        userId,
      });
      return { response: res, message: "User updated successfully" };
    }

    await prisma.usersModel.create({
      data: {
        name,
        email,
        phone,
        gender,
        dob,
        address,
        age,
        userId,
      },
    });
    const response = await prisma.usersModel.findMany({});
    return { response, message: "User Added successfully" };
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(userId: string) {
  try {
    const response = await prisma.usersModel.findUnique({
      where: {
        userId: userId,
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
  userId,
}: userParams) {
  try {
    const response = await prisma.usersModel.update({
      where: {
        userId: userId,
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

export async function getCurrentTransactionId() {
  try {
    const session = await auth();
    const response = await prisma.userSubscription.findMany({
      where: {
        userId: session?.user.id,
      },
      select: {
        id: true,
      },
    });
    return response[response.length - 1].id;
  } catch (err) {
    return err;
  }
}
