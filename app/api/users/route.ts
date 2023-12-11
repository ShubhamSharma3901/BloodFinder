import { NextRequest, NextResponse } from "next/server";
import { addUser, userParams, getUser, updateUser } from "@/servers/users";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

//Request To Add Users
export async function POST(req: NextRequest) {
  try {
    const { name, email, age, dob, address, phone, gender }: userParams =
      await req.json();

    const session = await auth();

    const response = await addUser({
      name,
      email,
      age,
      dob,
      address,
      phone,
      gender,
      userId: session?.user.id as string,
    });
    if (response === null) {
      return new NextResponse("You Cannot Create Multiple Entries", {
        status: 501,
      });
    }

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(`Error:${err}`);
  }
}

// Request to Get Users
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const response = await getUser(session?.user.id as string);
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(`Error:${err}`);
  }
}

//Request to Update Users
export async function PUT(req: NextRequest) {
  try {
    const { name, email, age, dob, address, phone, gender }: userParams =
      await req.json();

    const session = await auth();

    const response = await updateUser({
      name,
      email,
      age,
      dob,
      address,
      phone,
      gender,
      userId: session?.user.id as string,
    });

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(`Error:${err}`);
  }
}
