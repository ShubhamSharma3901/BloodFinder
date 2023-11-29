import { addBank, getBanks, updateBanks } from "@/servers/bloodBank";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, coords, bloodTypes, address, phone } = await req.json();
    const response = await addBank({
      name,
      coords,
      bloodTypes,
      address,
      phone,
    });
    return NextResponse.json({ response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err });
  }
}

export async function GET(req: NextRequest) {
  try {
    const city = await req.headers.get("city");
    if (city === null) {
      return new NextResponse("City Name Required", { status: 401 });
    }
    const response = await getBanks({ city });
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { name, coords, bloodTypes, address, phone } = await req.json();
    const response = await updateBanks({
      name,
      coords,
      bloodTypes,
      address,
      phone,
    });
    return NextResponse.json({ response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err });
  }
}
