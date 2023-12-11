"use client";

import React from "react";
import Lottie from "lottie-react";
import PayFail from "@/public/PaymentFailed.json";

const PaymentFailure = () => {
  return (
    <>
      <div className="flex justify-center items-center border-2 h-[100vh]">
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>
        <div className="w-[40%] h-[95%] flex justify-center items-center border-2 rounded-2xl shadow-xl mt-5  ">
          <div className="w-[100%]">
            <Lottie animationData={PayFail} />
            <h1 className="flex justify-center items-center font-extrabold text-red-600 text-xl">
              Payment Failed!
            </h1>
            <p className="flex justify-center items-center mt-3">
              Oops! something went wrong please try again
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailure;
