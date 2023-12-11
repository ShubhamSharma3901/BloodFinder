import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { headers } from "next/headers";

const settingsUrl = absoluteUrl("/users/payments/success");

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const name = headers().get("name");
    const bloodType = headers().get("bloodType");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/map`,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "required",
      customer_email: session?.user?.email as string,
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: `${name}` || "Bloodfinder",
              description:
                bloodType !== null || bloodType !== undefined
                  ? `1 Unit of ${
                      bloodType?.endsWith("p")
                        ? bloodType?.replace("p", "+")
                        : bloodType?.replace("n", "-")
                    } blood`
                  : "1 unit of O- Blood",
            },
            unit_amount: 150000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
