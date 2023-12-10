"use client";
import React, { useState } from "react";

import EmailSignInForm from "./EmailSignIn";
import GoogleSignInButton from "./GoogleSignIn";
import Image from "next/image";
import logo from "@/public/logo.png";

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="w-full h-[100vh] phone:flex-col flex laptop:flex-row tablet:justify-center phone:justify-between items-center laptop:p-16 ">
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>
      <div className="laptop:w-[50%] phone:w-[80%] phone:py-12">
        <p className="text-5xl font-bold">
          BloodFinder:
          <br /> Find Blood,
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br transition">
            Save Lives
          </span>
        </p>
      </div>

      <div className="laptop:w-[40%] tablet:w-[80%]  phone:w-[100%] laptop:h-[70%] phone:h-[100%] tablet:h-[70%] border flex flex-col tablet:justify-center items-center laptop:p-12 tablet:p-12 phone:p-6 phone:pt-[4rem] tablet:rounded-xl phone:rounded-t-[2rem] tablet:bg-white/50 phone:bg-white border-white backdrop-blur-md shadow-lg">
        <div className="w-full flex flex-col justify-center items-center gap-5">
          <div className="flex justify-center items-center mb-4 phone:pr-5">
            <Image src={logo} alt={"logo"} className="w-[4rem]" />
            <span className="font-bold tablet:text-3xl phone:text-2xl">
              BloodFinder
            </span>
          </div>

          <div className="w-full">
            <EmailSignInForm
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <hr className="w-full border mr-2" />
            <span className="text-neutral-400"> OR</span>
            <hr className="w-full border ml-2" />
          </div>
          <div className="w-full">
            <GoogleSignInButton
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
