import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { addBank, getCurrentBank, updateBanks } from "@/servers/bloodBank";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await getCurrentBank();
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
