"use client";
import React from "react";
import Lottie from "lottie-react";
import emailLottie from "@/public/Animation - 1702212382277.json";
import Link from "next/link";
import { Button } from "../button";

function Verify() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>

      <div className="border laptop:h-[60%] laptop:w-[40%] tablet:w-[60%] phone:w-[90%] tablet:py-10 phone:h-fit phone:pb-10 rounded-2xl shadow-xl flex flex-col justify-center items-center gap-10 bg-white">
        <div className="tablet:w-1/3 phone:w-full phone:h-fit shadow-inner rounded-xl bg-orange-50">
          <Lottie animationData={emailLottie} loop={true} />
        </div>
        <div className="phone:px-5 text-center space-y-5">
          <p className="font-bold text-2xl">A Magic Link Has Been Sent</p>
          <p className="font-light text-neutral-400 text-sm">
            The Link is for one-time use and will expire in 24Hrs
          </p>
        </div>
        <div>
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/map`}>
            <Button>Go Back To The Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Verify;
