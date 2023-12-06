import { NextRequest, NextResponse } from "next/server";
import { addUser, getUser, updateUser, userParams } from "@/servers/users";

//Request To Add Users
export async function POST(req: NextRequest) {
  try {
    const { name, email, age, dob, address, UID, phone, gender }: userParams =
      await req.json();

    const response = await addUser({
      name,
      email,
      age,
      dob,
      address,
      UID,
      phone,
      gender,
    });
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(`Error:${err}`);
  }
}

//Request to Get Users
export async function GET(req: NextRequest) {
  try {
    const UID = await req.headers.get("UID");
    const response = await getUser(Number(UID));
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(`Error:${err}`);
  }
}

//Request to Update Users
export async function PUT(req: NextRequest) {
  try {
    const { name, email, age, dob, address, UID, phone, gender }: userParams =
      await req.json();

    const response = await updateUser({
      name,
      email,
      age,
      dob,
      address,
      UID,
      phone,
      gender,
    });

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(`Error:${err}`);
  }
}
