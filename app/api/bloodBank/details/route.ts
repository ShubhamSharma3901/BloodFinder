export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { addBank, getCurrentBank, updateBanks } from "@/servers/bloodBank";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id: string = (await headers().get("id")) as string;
    const response = await getCurrentBank(id);
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
