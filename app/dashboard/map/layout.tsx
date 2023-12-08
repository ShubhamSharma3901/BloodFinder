"use client";
import React, { useState } from "react";
import SideBar from "@/components/ui/SideBar";
import { originContext } from "@/lib/contexts";
import SideBarMobile from "@/components/ui/sidebar-mobile";
import MobileSB from "@/components/ui/mobile-sidebar";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png";
import Image from "next/image";

function Layout({ children }: { children: React.ReactNode }) {
  const [origin, setOrigin] = React.useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const mapRef = React.useRef<google.maps.Map>();
  const [isLoad, setIsLoad] = useState(false);
  const [bloodType, setBloodType] = useState("On");
  const [open, setOpen] = useState(false);

  const [banksCoords, setBanksCoords] = useState<
    Array<{
      name: string;
      coordinates: { lat: number; lng: number };
      bloodTypes: {
        Ap: number;
        An: number;
        Bp: number;
        Bn: number;
        ABp: number;
        ABn: number;
        Op: number;
        On: number;
      };
      address: {
        street: string;
        city: string;
        state: string;
        zip: number;
      };
      phone: number;
      timings: {
        open: string;
        close: string;
        off: string;
      };
      sectors: string;
    }>
  >([]);

  return (
    <originContext.Provider
      value={{
        origin,
        setOrigin,
        mapRef,
        isLoad,
        setIsLoad,
        bloodType,
        setBloodType,
        banksCoords,
        setBanksCoords,
      }}>
      <div className="h-[100vh] tablet:flex-col">
        <div className="hidden laptop:flex laptop:w-[30rem] laptop:inset-y-0 laptop:flex-col laptop:fixed laptop:z-[100] border">
          <SideBar />
        </div>
        <div
          className={cn(
            "laptop:hidden bg-white h-fit py-5 flex justify-center items-center gap-10",
            open && "p-0"
          )}>
          <div className="w-full  ">
            <MobileSB setOpen={setOpen} open={open}>
              <SideBar />
            </MobileSB>
            <div className="w-full font-bold text-2xl text-center absolute tablet:top-2 phone:top-[0.9rem] flex justify-center items-center">
              <Image
                src={logo}
                alt={"logo"}
                className="tablet:w-[4rem] phone:w-[3rem] h-auto"
              />
              <span className="text-xl"> BloodFinder</span>
            </div>
          </div>
        </div>
        <div className="laptop:pl-[30rem] h-full">{children}</div>
      </div>
    </originContext.Provider>
  );
}

export default Layout;
