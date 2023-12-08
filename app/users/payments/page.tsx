"use client";
import Image from "next/image";
// import { checkout } from "@/checkout";
import { loadStripe } from "@stripe/stripe-js";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function Payments() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const bloodType = searchParams.get("bloodType");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY as string}`,
            name: `${name}` || "Blood Bank",
            bloodType: `${bloodType}` || "O-",
          },
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: `${error}`,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return <Button onClick={onSubscribe}>Checkout</Button>;
}
