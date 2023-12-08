import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      }
    );
    const lineItems = sessionWithLineItems.line_items;

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await prisma.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripePriceId: lineItems?.data[0].price?.id,
        status: sessionWithLineItems.status as string,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
