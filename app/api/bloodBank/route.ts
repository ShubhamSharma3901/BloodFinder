import { addBank, getBanks, updateBanks } from "@/servers/bloodBank";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, coords, bloodTypes, address, phone, timings, sectors } =
      await req.json();
    const response = await addBank({
      name,
      coords,
      bloodTypes,
      address,
      phone,
      timings,
      sectors,
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
    let bloodType = await req.headers.get("bloodType");

    if (city === null) {
      return new NextResponse("Invalid Headers", { status: 500 });
    }
    if (bloodType === null) {
      bloodType = "On";
    }
    const response = await getBanks({ city, bloodType });
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { name, coords, bloodTypes, address, phone, timings, sectors } =
      await req.json();
    const response = await updateBanks({
      name,
      coords,
      bloodTypes,
      address,
      phone,
      timings,
      sectors,
    });
    return NextResponse.json({ response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err });
  }
}
