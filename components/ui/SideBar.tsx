import React, { useEffect, useState } from "react";
import Locations from "./Locations";
import Filters from "./filters";
import BanksList from "./BanksList";
import { useOrigin } from "@/lib/contexts";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@mui/material";

function SideBar() {
  const { isLoad } = useOrigin();

  return (
    <div className="w-full h-full border-r border-white/10 text-black flex flex-col gap-10 p-6 z-[102] overflow-y-scroll scroll-smooth">
      <div className="mt-7">
        <p className="text-3xl font-bold">BloodFinder</p>
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
