"use client";
import { MenuIcon, X } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

function MobileSB({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className={cn(
          "hidden absolute z-[100] bg-white phone:w-full tablet:w-[max(55%,20rem)] h-full",
          open && "block"
        )}>
        <span>
          <Button
            className="absolute top-4 right-4 border"
            variant={"ghost"}
            onClick={() => {
              setOpen(false);
            }}>
            <X className="text-black font-bold " />
          </Button>
        </span>
        {children}
      </div>
      <div className={cn("hidden", !open && "block")}>
        <Button
          className="relative top-0 left-4  shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] z-[100] bg-transparent"
          variant={"ghost"}
          onClick={() => {
            setOpen(true);
          }}
          size={"sm"}>
          <MenuIcon className="text-black font-bold" />
        </Button>
      </div>
    </>
  );
}

export default MobileSB;
