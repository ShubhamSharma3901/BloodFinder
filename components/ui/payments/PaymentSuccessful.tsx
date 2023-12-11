"use client";
import React from "react";
import PaySuccess from "@/public/PaymentSuccessful.json";
import Lottie from "lottie-react";

const PaymentSuccessful = () => {
  return (
    <>
      <div className="flex justify-center items-center border-2 h-[100vh]">
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        <div className="bg-gradient-to-b from-blue-50 to-transparent w-full h-full absolute top-0 left-0 z-[-1]"></div>
        <div className="w-[40%] h-[95%] flex justify-center items-center border-2 rounded-2xl shadow-xl  mt-2 ">
          <div className="">
            <Lottie animationData={PaySuccess} className="mt-0" />
            <h1 className="flex justify-center items-center font-extrabold text-green-600 text-xl">
              Payment Successful!
            </h1>
            <p className="flex justify-center items-center mt-4">
              Transaction Number : 234563874567
            </p>

            <hr className=" mt-10" />
            <div className="flex justify-center items-center flex-col ">
              <div className="flex justify-between items-center w-[70%] mt-9">
                <p>Amount Paid :</p>
                <p>1550</p>
              </div>

              <div className="flex justify-between items-center w-[70%] mt-4">
                <p>Bank :</p>
                <p>HDFC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessful;
