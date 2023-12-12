import React, { useEffect, useState, useRef } from "react";
import Locations from "./Locations";
import Filters from "./filters";
import BanksList from "./BanksList";
import { useOrigin } from "@/lib/contexts";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@mui/material";
import { signOut } from "next-auth/react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import loadingLottie from "@/public/Loader.json";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { sessionAction } from "@/app/actions";
import Lottie from "lottie-react";

function SideBar() {
  const { isLoad } = useOrigin();

  const buttonGroups = useRef<React.ReactNode>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    sessionAction().then((session) => {
      if (session?.user.id) {
        buttonGroups.current = (
          <>
            <Dialog>
              <DialogTrigger>
                <Button
                  variant={"outline"}
                  className="border-red-200 hover:bg-red-100/20 w-full text-red-600 hover:text-red-700 shadow-sm rounded-xl  transition hover:shadow-inner">
                  <p className="text-[12px]">Sign-Out</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="absolute z-[200] phone:bg-white border border-red-400 text-red-600 rounded-2xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">{`${session.user.name}, Are You Sure ?`}</DialogTitle>
                  <DialogDescription className="text-violet-900/70 py-3 flex flex-col gap-[1.65rem]">
                    <Button
                      variant={"outline"}
                      onClick={async () => {
                        setIsLoading(true);
                        await signOut();
                        setIsLoading(false);
                      }}
                      disabled={isLoading}
                      className="border-red-200 hover:bg-red-100/20 phone:text-[10px] tablet:text-[12px] w-full text-red-600 hover:text-red-700 shadow-sm rounded-xl  transition hover:shadow-inner">
                      {isLoading && <Loader2 className="animate-spin" />}
                      Sign-Out
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Link
              href={
                session?.user.role === "USER"
                  ? `${process.env.NEXT_PUBLIC_APP_URL}/users/details`
                  : `${process.env.NEXT_PUBLIC_APP_URL}/bloodBanks/detailsForm`
              }>
              <Button
                className="rounded-xl phone:text-[10px] tablet:text-[12px] bg-neutral-100 "
                variant={"ghost"}>
                Details
              </Button>
            </Link>
          </>
        );
      } else {
        buttonGroups.current = (
          <>
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/users/sign-in`}>
              <Button
                variant={"default"}
                className="bg-red-600 hover:bg-red-700 phone:text-[10px] tablet:text-[12px] shadow-sm rounded-xl hover:scale-95 transition hover:shadow-inner w-fit">
                Sign-In
              </Button>
            </Link>
            <Link
              href={
                session?.user.role === "USER"
                  ? `${process.env.NEXT_PUBLIC_APP_URL}/users/details`
                  : `${process.env.NEXT_PUBLIC_APP_URL}/bloodBanks/detailsForm`
              }>
              <Button
                className="rounded-xl phone:text-[10px] tablet:text-[12px] bg-neutral-100 "
                variant={"ghost"}>
                Details
              </Button>
            </Link>
          </>
        );
      }
    });
  }, [isLoading]);

  return (
    <div className="w-full h-full border-r border-white/10 text-black flex flex-col gap-10 p-6 z-[102] overflow-y-scroll scroll-smooth">
      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center ">
          <Image src={logo} alt={"logo"} className="w-[4rem] h-auto" />
          <p className="xlPhone:text-2xl phone:text-xl font-bold">
            BloodFinder
          </p>
        </div>
        <div className="flex gap-2">{buttonGroups.current}</div>
      </div>
      <div className="">
        <Locations />
      </div>
      <div>
        <Filters />
      </div>
      <div className={cn("bg-white", !isLoad && "hidden")}>
        <BanksList />
      </div>
      <div
        className={cn(
          "flex flex-col justify-center items-center ",
          isLoad && "flex"
        )}>
        {!isLoad && (
          <div className="w-[50%] flex flex-col justify-center items-center p-5">
            <Lottie animationData={loadingLottie} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
