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

import { sessionAction } from "@/app/actions";

function SideBar() {
  const { isLoad } = useOrigin();

  const buttonGroups = useRef<React.ReactNode>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    sessionAction().then((session) => {
      console.log(session);
      if (session?.user.id) {
        buttonGroups.current = (
          <Button
            variant={"outline"}
            onClick={async () => {
              setIsLoading(true);
              await signOut();
              setIsLoading(false);
            }}
            disabled={isLoading}
            className="border-red-200 hover:bg-red-100/20 w-full text-red-600 hover:text-red-700 shadow-sm rounded-xl  transition hover:shadow-inner">
            {isLoading && <Loader2 className="animate-spin" />}Sign-Out
          </Button>
        );
      } else {
        buttonGroups.current = (
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/users/sign-in`}>
            <Button
              variant={"default"}
              className="bg-red-600 hover:bg-red-700 shadow-sm rounded-xl hover:scale-95 transition hover:shadow-inner w-fit">
              Sign-In
            </Button>
          </Link>
        );
      }
    });
  }, [isLoading]);

  return (
    <div className="w-full h-full border-r border-white/10 text-black flex flex-col gap-10 p-6 z-[102] overflow-y-scroll scroll-smooth">
      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center ">
          <Image src={logo} alt={"logo"} className="w-[5rem] h-auto" />
          <p className="text-3xl font-bold">BloodFinder</p>
        </div>
        <div>{buttonGroups.current}</div>
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
      <div className={cn("", isLoad && "flex")}>
        {!isLoad && (
          <div className="w-full flex flex-col justify-center items-center p-5">
            <Loader2 className="h-[4rem] w-[4rem] animate-spin text-red-600 " />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
