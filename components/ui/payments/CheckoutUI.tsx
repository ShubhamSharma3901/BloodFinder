"use client";
import React from "react";
import Checkout from "@/public/Checkout.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { Button } from "../button";
import {
  ArrowLeft,
  BadgeDollarSignIcon,
  DollarSignIcon,
  IndianRupeeIcon,
} from "lucide-react";

export const CheckoutUI = ({
  onSubscribe,
}: {
  onSubscribe: () => Promise<void>;
}) => {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>

        <div className="border laptop:h-fit laptop:w-[40%] tablet:w-[60%] phone:w-[90%] phone:h-fit phone:pb-10 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-10 bg-white">
          <div className="tablet:w-full phone:w-full phone:h-fit tablet:h-fit shadow-inner rounded-xl bg-teal-50 p-10">
            <Lottie animationData={Checkout} loop={true} />
          </div>
          <div className="phone:px-5 text-center space-y-5">
            <p className="font-bold text-2xl text-teal-600">
              Proceed to Payment
            </p>
            <p className="font-light text-neutral-400 text-[12px]">
              A Convenience fee of INR200/- will be Charged
            </p>
          </div>
          <div className="flex gap-5">
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/map`}>
              <Button variant={"outline"}>
                <ArrowLeft className="w-5 mr-1" /> Go Back
              </Button>
            </Link>
            <Button
              onClick={onSubscribe}
              className="bg-teal-600 hover:bg-teal-500 shadow-lg hover:shadow-none transition">
              Checkout
              <IndianRupeeIcon className="w-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
